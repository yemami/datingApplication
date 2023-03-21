import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  getChatList() {
    return this.http
      .get(this.url + `/chats`)
      .pipe(tap((response) => console.log(response)));
  }

  getChatMessages(chatId: string) {
    return this.http
      .get(this.url + `/chats/${chatId}`)
      .pipe(tap((response) => console.log(response)));
  }

  sendMessage(chatId: string, message: any) {
    return this.http
      .post(this.url + `/chats/${chatId}`, message)
      .pipe(tap((response) => console.log(response)));
  }
}
