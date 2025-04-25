import { startService } from './server.js';
import { initializeData } from './database/initializeData.js';
import { handleMigrations, runMigrations } from './database/migrationUtils.js';

let config = {
        // setConfigVariable('User', 
        //     { 
        //         field_mapping: {
        //             full_name: {
        //                 name: "username",
        //                 default: "'User'",
        //             },
        //             bio: {
        //                 name: "description",
        //                 isNullable: true,
        //             },
        //         },
        //     }
        // );
};

// 2. Initialize Data
startService()
.then( async () => {
    await handleMigrations()
    initializeData();
    console.log("Chat service started successfully.")
})
.catch((err) => console.error("Failed to start chat service:", err));

