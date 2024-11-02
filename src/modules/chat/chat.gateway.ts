import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('joinChat')
  async handleJoinChat(client: Socket, chatId: string) {
    client.join(chatId);
    console.log(`Client ${client.id} joined chat ${chatId}`);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('leaveChat')
  async handleLeaveChat(client: Socket, chatId: string) {
    client.leave(chatId);
    console.log(`Client ${client.id} left chat ${chatId}`);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { 
    chatId: string;
    content: string;
    senderId: string;
    senderType: 'user' | 'ai';
    parentMessageId?: string;
  }) {
    const message = await this.chatService.sendMessage(
      payload.chatId,
      payload.content,
      payload.senderId,
      payload.senderType,
      payload.parentMessageId,
    );

    this.server.to(payload.chatId).emit('newMessage', message);
  }
}