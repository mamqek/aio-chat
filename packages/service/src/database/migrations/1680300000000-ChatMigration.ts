import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from "typeorm";

export class ChatMigration1680300000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.getTable("chats")) {
            console.warn("Table 'chats' already exists. Skipping 'up' migration.");
            return;
        }

        await queryRunner.createTable(
            new Table({
                name: "chats",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user1_id",
                        type: "int",
                    },
                    {
                        name: "user2_id",
                        type: "int",
                    },
                    {
                        name: "user1_unread_count",
                        type: "int",
                        default: 0,
                    },
                    {
                        name: "user2_unread_count",
                        type: "int",
                        default: 0,
                    },
                    {
                        name: "last_message_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            "chats",
            new TableIndex({
                name: "IDX_CHAT_USER1",
                columnNames: ["user1_id"],
            }),
        );
        await queryRunner.createIndex(
            "chats",
            new TableIndex({
                name: "IDX_CHAT_USER2",
                columnNames: ["user2_id"],
            }),
        );
        await queryRunner.createIndex(
            "chats",
            new TableIndex({
                name: "IDX_CHAT_LAST_MESSAGE",
                columnNames: ["last_message_id"],
            }),
        );

        console.log("Migration for Chat table completed successfully.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("chats");
        if (!table) {
            console.warn("Table 'chats' does not exist. Skipping 'down' migration.");
            return;
        }

        await queryRunner.dropIndex("chats", "IDX_CHAT_USER1");
        await queryRunner.dropIndex("chats", "IDX_CHAT_USER2");
        await queryRunner.dropIndex("chats", "IDX_CHAT_LAST_MESSAGE");
        await queryRunner.dropTable("chats");
        console.log("Revert migration for Chat table completed successfully.");
    }
}
