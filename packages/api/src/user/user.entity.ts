import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
export class User implements InMemoryDBEntity {
  id: string;
  username: string;
  email: string;
  country: string;
  password: string;
  salt: string;
}
