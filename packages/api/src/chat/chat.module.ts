import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';


@Module({
  imports: [
   InMemoryDBModule.forFeature('Conversation',{}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: jwtConstants.signOptions,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ChatController],
  providers: [ConversationService, ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
