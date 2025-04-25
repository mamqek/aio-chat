import {
  Entity,
  Column,
} from 'typeorm';
import { BaseUser } from './BaseUser.js';

@Entity({ name: 'users' })
export class DefaultUser extends BaseUser {
    @Column({ type: 'text' })
    full_name!: string;

    @Column({ type: 'text' })
    avatar!: string;

    @Column({ type: 'text' })
    bio!: string;
}
