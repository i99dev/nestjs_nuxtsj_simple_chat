import { IsNotEmpty } from 'class-validator';

export class MarkAsReadConversationDTO {
  @IsNotEmpty()
  senderId: string;
  receiverId: string;
  createdAt: Date;
}
