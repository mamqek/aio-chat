import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from "typeorm";

export class ChatMessageMigration1680300000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.getTable("chat_messages")) {
            console.warn("Table 'chat_messages' already exists. Skipping 'up' migration.");
            return;
        }

        await queryRunner.createTable(
            new Table({
                name: "chat_messages",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "chat_id",
                        type: "int",
                    },
                    {
                        name: "sender_id",
                        type: "int",
                    },
                    {
                        name: "receiver_id",
                        type: "int",
                    },
                    {
                        name: "replied_to",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "text",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "attachment",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "deleted",
                        type: "boolean",
                        default: false,
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
            "chat_messages",
            new TableIndex({
                name: "IDX_CHAT_MESSAGE_CHAT",
                columnNames: ["chat_id"],
            }),
        );
        await queryRunner.createIndex(
            "chat_messages",
            new TableIndex({
                name: "IDX_CHAT_MESSAGE_REPLIED_TO",
                columnNames: ["replied_to"],
            }),
        );

        console.log("Migration for ChatMessage table completed successfully.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("chat_messages");

        if (!table) {
            console.warn("Table 'chat_messages' does not exist. Skipping 'down' migration.");
            return;
        }

        await queryRunner.dropIndex("chat_messages", "IDX_CHAT_MESSAGE_CHAT");
        await queryRunner.dropIndex("chat_messages", "IDX_CHAT_MESSAGE_REPLIED_TO");
        await queryRunner.dropTable("chat_messages");

        console.log("Revert migration for ChatMessage table completed successfully.");
    }
}
