import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
export declare class ChatService {
    private chatRepository;
    private messageRepository;
    constructor(chatRepository: Repository<Chat>, messageRepository: Repository<Message>);
    createChat(name: string, participants: string[]): Promise<Chat>;
    getChats(): Promise<Chat[]>;
    getChatById(id: string): Promise<Chat>;
    sendMessage(chatId: string, content: string, senderId: string, senderType: 'user' | 'ai', parentMessageId?: string): Promise<Message>;
}
