import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  createChat(@Body('name') name: string, @Body('participants') participants: string[]) {
    return this.chatService.createChat(name, participants);
  }

  @Get()
  getChats() {
    return this.chatService.getChats();
  }

  @Get(':id')
  getChatById(@Param('id') id: string) {
    return this.chatService.getChatById(id);
  }

  @Post(':id/messages')
  sendMessage(
    @Param('id') chatId: string,
    @Body('content') content: string,
    @Body('senderId') senderId: string,
    @Body('senderType') senderType: 'user' | 'ai',
    @Body('parentMessageId') parentMessageId?: string,
  ) {
    return this.chatService.sendMessage(chatId, content, senderId, senderType, parentMessageId);
  }
}