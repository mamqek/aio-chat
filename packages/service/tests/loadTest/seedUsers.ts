import "../../src/config/CJSandESMCompatibility"

import { DataSource } from "typeorm";
import { DefaultUser } from "../../src/entities/DefaultUser";
import { Chat } from "../../src/entities/Chat";
import { ChatMessage } from "../../src/entities/ChatMessage";
import { ChatMessageStatus } from "../../src/entities/ChatMessageStatus";


// Keep DataSource configuration separate or pass it if it needs to be dynamic
const ds = new DataSource({
    type: "sqlite",
    database: "tests/loadTest/db.sqlite", 

    // type: "postgres",
    // url: "postgresql://postgres.gquvgjieqndssqwqrqdi:Vlad311020022%21@aws-0-eu-central-1.pooler.supabase.com:6543/postgres", // chat test db
    // database: "chatdb",


    entities: [DefaultUser,
                Chat, 
                ChatMessage, 
                ChatMessageStatus, 
            ],

});

export async function seedUsers() {
    let connectionInitialized = false;
    try {
        if (!ds.isInitialized) {
            await ds.initialize();
            connectionInitialized = true;
        }
        const repo = ds.getRepository(DefaultUser);

        for (let i = 1; i <= 200; i++) {
            const u = repo.create({
                full_name: `loadtest${i}`,
                bio: `loadtest bio ${i}`,
                avatar: `https://example.com/avatar${i}.png`,
            });
            await repo.save(u);
        }

        
    } catch (error) {
        console.error("Error during seeding:", error);
        throw error; // Re-throw the error to be caught by the caller
    } finally {
        if (connectionInitialized && ds.isInitialized) {
            await ds.destroy();
            console.log("DataSource destroyed after seeding.");
        }
    }
}

seedUsers()
  .then(() => {
    console.log("Seeding finished.");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });