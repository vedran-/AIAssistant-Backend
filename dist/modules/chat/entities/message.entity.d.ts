import { Chat } from './chat.entity';
export declare class Message {
    id: string;
    content: string;
    senderId: string;
    senderType: 'user' | 'ai';
    chat: Chat;
    parentMessageId?: string;
    createdAt: Date;
}
