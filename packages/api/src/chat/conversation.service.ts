import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { FilterConversation } from './dto/filter-conversation.dto';
import { Conversation } from './conversation.entity';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { ChatGateway } from './chat.gateway';
import { chatGatewayConst } from '../config/chat.config';

@Injectable()
export class ConversationService {
  constructor(
    private conversationRepo: InMemoryDBService<Conversation>,
    private chatGateway: ChatGateway,
  ) {}

  async getConversation(
    senderId: string,
    receiverId: string,
    filter: FilterConversation,
  ): Promise<Conversation[]> {
    return this.conversationRepo.query(re=>re.senderId === senderId && re.receiverId === receiverId);
  }

  async saveConversation(createConversationDTO: CreateConversationDTO) {
    const result: Conversation = await this.conversationRepo.create(
        createConversationDTO,
    );
    this.chatGateway.wss.emit(
      'conversation',
      result,
    );
    console.log(result);
    return result;
  }
}
