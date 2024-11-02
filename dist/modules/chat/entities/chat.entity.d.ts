import { Message } from './message.entity';
export declare class Chat {
    id: string;
    name: string;
    participants: string[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}
