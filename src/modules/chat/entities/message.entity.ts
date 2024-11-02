import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  senderId: string;

  @Column()
  senderType: 'user' | 'ai';

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;

  @Column({ nullable: true })
  parentMessageId?: string;

  @CreateDateColumn()
  createdAt: Date;
}