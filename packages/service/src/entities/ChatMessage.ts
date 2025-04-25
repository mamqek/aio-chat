import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Chat } from './Chat.js';
import { ChatMessageStatus } from './ChatMessageStatus.js';

@Entity({ name: 'chat_messages' })
export class ChatMessage {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'chat_id' })
    chat!: Relation<Chat>;

    @Column({ type: 'int' })
    sender_id!: number;

    @Column({ type: 'int' })
    receiver_id!: number;

    @ManyToOne(() => ChatMessage, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'replied_to' })
    replied_to?: ChatMessage;

    @Column({ type: 'text', nullable: true })
    text?: string;

    // Setting eager to true ensures it's loaded automatically and cascade so the status is automatically saved.
    @OneToOne(() => ChatMessageStatus, status => status.message, { eager: true, nullable: true })
    status?: Relation<ChatMessageStatus>;

    // Using simple-json to store JSON data (like attachment information)
    @Column({ type: 'simple-json', nullable: true })
    attachment?: any;

    @Column({ type: 'boolean', default: false })
    deleted?: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
