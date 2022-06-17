import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import {InMemoryDBModule} from '@nestjs-addons/in-memory-db'

@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    AuthModule,
    ChatModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
