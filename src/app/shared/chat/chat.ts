import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, HttpClientModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
})
export class Chat {
  chatOpen = false;
  userMessage = '';
  apiUrl = 'https://chat-node-seven.vercel.app/chat';

  messages: { sender: 'user' | 'bot'; text: string }[] = [
    { sender: 'bot', text: 'Oiiee! Seja super bem-vindo(a) à Beijo Rosado! 💗' },
    { sender: 'bot', text: 'Eu sou o beijinho, como posso te ajudar hoje?' }
  ];

  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  toggleChat() {
    this.chatOpen = !this.chatOpen;
    this.scrollToBottom();
  }

  sendMessage() {
    const texto = this.userMessage.trim();
    if (!texto) return;

    this.messages.push({ sender: 'user', text: texto });
    this.cdr.detectChanges();
    this.scrollToBottom();

    this.http.post<{ reply: string }>(this.apiUrl, { message: texto }).subscribe({
      next: (res) => {
        this.messages.push({ sender: 'bot', text: res.reply });
        this.cdr.detectChanges();
        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({ sender: 'bot', text: 'Erro ao conectar com o servidor 😢' });
        this.cdr.detectChanges();
        this.scrollToBottom();
      }
    });

    this.userMessage = '';
  }

  private scrollToBottom() {
    try {
      setTimeout(() => {
        if (this.chatBody?.nativeElement) {
          this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
        }
      }, 100);
    } catch (err) {
      console.error('Erro ao rolar para baixo:', err);
    }
  }
}
