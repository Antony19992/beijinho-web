import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, MatIconModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
})
export class Chat {
  chatOpen = false;
  messages: string[] = [
    'Oiiee! Seja super bem-vindo(a) à Beijo Rosado! 💗',
    'Como posso te ajudar hoje?',
  ];
  userMessage = '';

  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push('Você: ' + this.userMessage);
      this.messages.push('Beijo Rosado: Obrigado pela sua mensagem 💕');
      this.userMessage = '';
    }
  }
}
