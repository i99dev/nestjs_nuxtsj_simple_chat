import {
  Controller,
  Post,
  UseGuards,
  Param,
  ParseIntPipe,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { NotNullPipe } from '../auth/pipes/not-null.pipe';
import { FilterConversation } from './dto/filter-conversation.dto';
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { Get } from '@nestjs/common';

@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(private conversationService: ConversationService) {}

  @Post(':receiverId/sendMessage')
  sendMessage(
    @GetUser() user: User,
    @Param('receiverId') receiverId: string,
    @Body('message', NotNullPipe) message: string,
  ) {
    const createConversationDTO = new CreateConversationDTO();
    createConversationDTO.senderId = user.id ; 
    createConversationDTO.receiverId = receiverId.toString();
    createConversationDTO.message = message;
    return this.conversationService.saveConversation(createConversationDTO);
  }

  @Get(':receiverId/messages')
  getMessages(
    @GetUser() user: User,
    @Param('receiverId', ParseIntPipe) receiverId: string,
    @Query() filter: FilterConversation,
  ) {
    return this.conversationService.getConversation(
      user.id,
      receiverId,
      filter,
    );
  }

  @Get('messages')
  getMyMessages(@GetUser() user: User, @Query() filter: FilterConversation) {
    return this.conversationService.getConversation(user.id, null, filter);
  }

}
