import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    createChat(name: string, participants: string[]): Promise<import("./entities/chat.entity").Chat>;
    getChats(): Promise<import("./entities/chat.entity").Chat[]>;
    getChatById(id: string): Promise<import("./entities/chat.entity").Chat>;
    sendMessage(chatId: string, content: string, senderId: string, senderType: 'user' | 'ai', parentMessageId?: string): Promise<import("./entities/message.entity").Message>;
}
