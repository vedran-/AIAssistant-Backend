import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleJoinChat(client: Socket, chatId: string): Promise<void>;
    handleLeaveChat(client: Socket, chatId: string): Promise<void>;
    handleMessage(client: Socket, payload: {
        chatId: string;
        content: string;
        senderId: string;
        senderType: 'user' | 'ai';
        parentMessageId?: string;
    }): Promise<void>;
}
