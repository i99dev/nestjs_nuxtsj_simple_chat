import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User } from './user.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ChatGateway } from '../chat/chat.gateway';
import { FilterUserDTO } from './dto/filter-user.dto';
import * as bcriptjs from 'bcryptjs';


@Injectable()
export class UserService {
    constructor(
        private userRepository: InMemoryDBService<User>,
        private chatGateway: ChatGateway,
      ) {}
    async hashPassword(password: string): Promise<string> {
    return await bcriptjs.hash(password, 10);
    }
  async findOrCreateSocialUser(profile: any) {
    let [user] = await this.userRepository.query((re)=>re.username === profile.username);
    if (!user) {
      const salt = await bcriptjs.genSalt();
      const password = await bcriptjs.hash(profile.id, salt);
      user = new User();
      user.username = profile.displayName;
      user.salt = salt;
      user.password = await this.hashPassword(password);
      if (profile.emails[0]) {
        user.email = profile.emails[0].value;
      } else {
        throw new UnprocessableEntityException('User must Provide email');
      }
      this.saveUser(user);
    }
    return user;
  }

  async findUserbyEmail(email: string) {
    const [user] = await this.userRepository.query((re)=>re.email === email);
    return user;
  }

  async saveUser(user: User) {
    const usersaved: User = await this.userRepository.create(user);
    this.chatGateway.wss.emit('users/new', usersaved);
    return usersaved;
  }

  async findByUsernameOrEmail(username: string): Promise<User> {
    const [user]=this.userRepository.query((re) => re.username === username);
    return user;
  }

  async getUsers(filter: FilterUserDTO): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
   let hashPassword = await bcriptjs.compare(password, hash);
    return hashPassword;
  }
}
