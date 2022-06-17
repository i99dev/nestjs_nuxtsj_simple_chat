import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Conversation implements InMemoryDBEntity {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
}
