import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export interface Message {
  text: string;
  sender: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  messageInput = '';
  sender!: { _id: string; name: string };
  receiver!: { _id: string; name: string };
  chatId = '';
  userId = this.authService.getUserId();

  // get chatId from route params

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.getMessages();
  }

  getMessages() {
    this.chatId = this.route.snapshot.paramMap.get('chatId') as string;
    this.chatService.getChatMessages(this.chatId).subscribe((response: any) => {
      this.messages = response.data.messages as Message[];
      this.sender = response.data.sender;
      this.receiver = response.data.receiver;
    });
  }

  ngOnInit(): void {}

  sendMessage() {
    if (this.messageInput.trim() !== '') {
      const message = {
        text: this.messageInput,
        sender: this.sender._id as string,
      };
      this.messageInput = '';
      this.chatService
        .sendMessage(this.chatId, message)
        .subscribe((response: any) => {
          console.log(response);
        });
      this.getMessages();
    }
  }
}
