import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createChat(name: string, participants: string[]): Promise<Chat> {
    const chat = this.chatRepository.create({ name, participants });
    return this.chatRepository.save(chat);
  }

  async getChats(): Promise<Chat[]> {
    return this.chatRepository.find({ relations: ['messages'] });
  }

  async getChatById(id: string): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ 
      where: { id },
      relations: ['messages']
    });
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }
    return chat;
  }

  async sendMessage(
    chatId: string,
    content: string,
    senderId: string,
    senderType: 'user' | 'ai',
    parentMessageId?: string,
  ): Promise<Message> {
    const chat = await this.getChatById(chatId);
    const message = this.messageRepository.create({
      content,
      senderId,
      senderType,
      parentMessageId,
      chat,
    });
    return this.messageRepository.save(message);
  }
}