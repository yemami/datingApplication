import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

export interface Chat {
  id: number;
  recipient: string;
  recipientId: string;
  sender: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  chats: Chat[] = [];
  userId: string = '';
  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {
    this.chatService.getChatList().subscribe((response: any) => {
      this.chats = response.data as Chat[];
    });
    this.userId = this.authService.getUserId() as string;
  }

  ngOnInit(): void {}
}
