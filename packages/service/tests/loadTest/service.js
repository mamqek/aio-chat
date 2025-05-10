import { startService, handleMigrations, initializeData } from "@aio-chat/service";

const config = {
    production: false,

    PORT: 5555,
    SERVICE_URL: "http://localhost:5555",
    CORS_ORIGIN: ["http://127.0.0.1:8000", "https://mamqek-hub.vercel.app"],

    DB_PATH: "tests/loadTest/db.sqlite",

    // DB_TYPE: "postgres",
    // // DB_URL: "postgresql://postgres.hpptdlkausozmuxtczby:Vlad311020022%21@aws-0-eu-central-1.pooler.supabase.com:6543/postgres", // Hub
    // DB_URL: "postgresql://postgres.gquvgjieqndssqwqrqdi:Vlad311020022%21@aws-0-eu-central-1.pooler.supabase.com:6543/postgres", // caht test
    logging: [ "error"],
};



startService(config)
    .then(async () => {
        // await handleMigrations();
        // revertMigrations()
        console.log("Chat service started successfully.")
        // initializeData();
    })
    .catch((err) => console.error("Failed to start chat service:", err));
