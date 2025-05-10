import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeys1680300000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {




        // Foreign keys for 'chat_messages' table
        await queryRunner.createForeignKey(
            "chat_messages",
            new TableForeignKey({
                columnNames: ["chat_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "chats",
                onDelete: "CASCADE",
            }),
        );
        await queryRunner.createForeignKey(
            "chat_messages",
            new TableForeignKey({
                columnNames: ["replied_to"],
                referencedColumnNames: ["id"],
                referencedTableName: "chat_messages",
                onDelete: "SET NULL",
            }),
        );



        // Foreign keys for 'chat_message_statuses' table
        await queryRunner.createForeignKey(
            "chat_message_statuses",
            new TableForeignKey({
                columnNames: ["message_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "chat_messages",
                onDelete: "CASCADE",
            }),
        );
        
        console.log("Migration for Foreign key constraints completed successfully.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys for 'chat_messages' table
        const chatMessagesTable = await queryRunner.getTable("chat_messages");
         if (chatMessagesTable) {
            const fkChat = chatMessagesTable.foreignKeys.find(fk => fk.columnNames.indexOf("chat_id") !== -1);
            if (fkChat) await queryRunner.dropForeignKey("chat_messages", fkChat);
            const fkRepliedTo = chatMessagesTable.foreignKeys.find(fk => fk.columnNames.indexOf("replied_to") !== -1);
            if (fkRepliedTo) await queryRunner.dropForeignKey("chat_messages", fkRepliedTo);
         } else {
              console.warn("Table 'chat_messages' not found, skipping FK drop.");
         }

        // Drop foreign keys for 'chat_message_statuses' table
        const chatMessageStatusesTable = await queryRunner.getTable("chat_message_statuses");
        if (chatMessageStatusesTable) {
            const fkMessage = chatMessageStatusesTable.foreignKeys.find(fk => fk.columnNames.indexOf("message_id") !== -1);
            if (fkMessage) await queryRunner.dropForeignKey("chat_message_statuses", fkMessage);
        } else {
             console.warn("Table 'chat_message_statuses' not found, skipping FK drop.");
        }

        console.log("Foreign key constraints removed successfully.");
    }
}
