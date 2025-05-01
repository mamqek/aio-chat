#!/usr/bin/env node

import { builtFileExtension, isCommonJS } from "../config/CJSandESMCompatibility.js";
import { fileURLToPath } from 'url';

let runMain = false;
if (isCommonJS) {
    runMain = (require.main === module);
} else {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const entryBase = path.basename(process.argv[1]);
        const currentBase = path.basename(__filename);
        runMain = (entryBase === currentBase);
    } catch (error) {
        console.error("Error in ESM path resolution utils:", error);
    }
}

if (runMain) {
    const args = process.argv.slice(2); 

    // Check if a database path is provided
    const dbPathIndex = args.indexOf("--db-path");
    if (dbPathIndex !== -1 && args[dbPathIndex + 1]) {
        const dbPath = args[dbPathIndex + 1];
        setConfigVariable("DB_PATH", dbPath);
        console.log(`Database path set to: ${dbPath}`);
    }

    if (args.includes("--revert")) {
        try {
            revertMigrations();
        } catch (error) {
            console.error("Migration reverting failed:", error);
        }
    } else {
        handleMigrations().catch((error) => {
            console.error("Error during migration compilation process", error);
            process.exit(1);
        });
    }
}

import path from "path";
import { getConfig, setConfigVariable } from "../config/config.server.js";
import { spawn, exec } from "child_process";
import { promptUser } from "../helper.js"

// Wrap the exec commands in a Promise so program waits for it to finish

export async function handleMigrations(): Promise<void> {
    try {
        await buildMigrations();
        await buildDataSource();
        await runMigrations();
    } catch (error) {
        console.error("handleMigrations() failed:", error);
        process.exit(1);
    }
}

async function buildMigrations(): Promise<void> {
    const serviceDir = path.resolve(global.__dirname, "../"); // packages/service
    return new Promise((resolve, reject) => {
        exec("npm run build:migrations", { cwd: serviceDir }, (err, stdout, stderr) => {
            if (err) {
                console.error("Error building migrations:", err.message);
                return reject(err);
            }
            if (stderr) {
                console.error("Migrations build stderr:", stderr);
                return reject(new Error(stderr));
            }
            console.log("Migrations build");
            resolve();
        });
    });
}

async function buildDataSource(): Promise<void> {
    const serviceDir = path.resolve(global.__dirname, "../"); // packages/service
    return new Promise((resolve, reject) => {
        exec("npm run build:datasource", { cwd: serviceDir }, (err, stdout, stderr) => {
            if (err) {
                console.error("Error building data source:", err.message);
                return reject(err);
            }
            if (stderr) {
                console.error("Data source build stderr:", stderr);
                return reject(new Error(stderr));
            }
            console.log("Data source build");
            resolve();
        });
    });
}
// TODO: figure out how to preuilt migrations and amaybe datasource, so there is no need to include whol src into publish (need it as migrations imports other files and if import files are absent error happens)
export async function runMigrations(): Promise<void> {
    console.log("Running migrations...");
    const dataSourcePath = path.resolve(global.__dirname, `../dist/dataSourceRef.cjs`);

    // Add User_Config to ENV so spawned process has access to config developer provided (needed for User migration)
    const USER_CONFIG = JSON.stringify(getConfig());
    return new Promise<void>((resolve, reject) => {
        // Use spawn here as it might be interactive prompt 
        const child = spawn("npx.cmd", ["typeorm", "migration:run", "-d", dataSourcePath], {
            env: { ...process.env, USER_CONFIG },
            stdio: ['inherit', 'pipe', 'pipe'],
            shell: true, // Had to add after updating from node 20 to 23 
        });
        let migrationsCompleted = 0;
        child.stdout.on("data", (data) => {
            const output = data.toString();
            // Track migration progress
            if (output.includes("Migration for")) {
                console.log(output);
                migrationsCompleted++;
            }
        });
        child.stderr.on("data", (data) => {
            console.error(data.toString());
        });
        child.on("close", (code) => {
            if (code === 0) {
                if (migrationsCompleted === 0) {
                    console.log("All migrations are already up to date.");
                } else {
                    console.log(`${migrationsCompleted} migrations run successfully.`);
                }
                resolve();
            } else {
                reject(new Error(`Migration process exited with code ${code}`));
            }
        });
        child.on("error", (error) => {
            console.error(`Error running migrations: ${error.message}`);
            reject(error);
        });
    });
}

export async function revertMigrations(): Promise<void> {
    console.log("Reverting migrations...");
    const dataSourcePath = path.resolve(global.__dirname, `../dist/dataSourceRef.${builtFileExtension}`);
    
    // Add User_Config to ENV so spawned process has access to config developer provided (needed for User migration)
    const USER_CONFIG = JSON.stringify(getConfig());
    let migrationsCompleted = 0;
    await new Promise<void>((resolve, reject) => {
        // Use spawn here as it might be interactive prompt 
        const child = spawn("npx.cmd", ["typeorm", "migration:revert", "-d", dataSourcePath], {
            env: { ...process.env, USER_CONFIG },
            stdio: ['inherit', 'pipe', 'pipe'], // Capture stdout and stderr
            shell: true, // Had to add after updating from node 20 to 23 
        });
        child.stdout.on("data", (data) => {
            if (data.toString().includes("Revert migration")) {
                console.log(data.toString()); // Log the output to the console
                migrationsCompleted++;
            }
        });
        child.stderr.on("data", (data) => {
            console.error(data.toString());
        });
        child.on("close", (code) => {
            if (code === 0) {
                if (migrationsCompleted === 0) {
                    console.log("Nothing to revert.");
                } else {
                    console.log(`${migrationsCompleted} migration reverted successfully.`);
                }
                resolve();
            } else {
                reject(new Error(`Revert process exited with code ${code}`));
            }
        });
        child.on("error", (error) => {
            console.error(`Error running reverts: ${error.message}`);
            reject(error);
        });
    });

    if (migrationsCompleted !== 0) {
        const runAgain = await promptUser(
            `Do you want to revert next migration? (y/n): `
        );
        
        if (runAgain) {
            await revertMigrations();
        } else {
            console.log("Migration process completed. Exiting...");
        }
    }
}


