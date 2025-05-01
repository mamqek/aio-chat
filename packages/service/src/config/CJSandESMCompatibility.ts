// // This file is used to set the __dirname variable in a way that works for both CommonJS and ESM modules.
// // and provide file extension for the built files to be used
// import path from 'path';
// import { fileURLToPath } from 'url';

// const isCommonJS: boolean = typeof __dirname !== 'undefined';
// // console.warn("isCommonJS", isCommonJS, global.__srcDir);
// // console.trace(`[compat/init trace] PID: ${process.pid}`);

// if (!global.__srcDir) {
//     if (!isCommonJS) {
//         try {
//             const __filename = fileURLToPath(import.meta.url);
//             global.__srcDir = path.dirname(__filename);
//         } catch (error) {
//             console.error("Error in ESM path resolution:", error);
//         }
//     } else {
//         global.__srcDir = __dirname;
//     }
// }

// // As package.json has type: "module", js is for ESM, cjs is for CommonJS
// export const builtFileExtension = isCommonJS ? 'cjs' : 'js';

// export { isCommonJS };



import path from 'path';
import { fileURLToPath } from 'url';

const isCommonJS: boolean = typeof __dirname !== 'undefined';

if (!global.__srcDir) {
    let calculatedDir: string;

    if (!isCommonJS) {
        try {
            const currentFileDir = path.dirname(fileURLToPath(import.meta.url));
            global.__dirname = currentFileDir;

            if (path.basename(currentFileDir) === 'dist') {
                // If running from dist, go up one more level and then into 'src'
                calculatedDir = path.resolve(currentFileDir, '../src');
            } else {
                // If not in dist, then in config, so just go up one level to 'src'
                calculatedDir = path.resolve(currentFileDir, '..');
            }
            global.__srcDir = calculatedDir;

        } catch (error) {
            console.error("Error in ESM path resolution:", error);
            // Fallback or default if calculation fails
            global.__srcDir = process.cwd(); // Or some other sensible default
        }
    } else {
        // For CommonJS, __dirname usually points to the directory of the executed file.
        // We need similar logic to ensure it points to 'src'.
        const currentFileDir = __dirname; // In CJS, __dirname is available
        global.__dirname = currentFileDir;
        const parentDir = path.resolve(currentFileDir, '..');

        if (path.basename(parentDir) === 'dist') {
            calculatedDir = path.resolve(parentDir, '../src');
        } else {
            calculatedDir = parentDir;
        }
        global.__srcDir = calculatedDir;
    }
}

// As package.json has type: "module", js is for ESM, cjs is for CommonJS
export const builtFileExtension = isCommonJS ? 'cjs' : 'js';

export { isCommonJS };

// Optional: Log the final __dirname for verification during startup
// console.log(`[Compatibility] global.__srcDir set to: ${global.__srcDir}`);