import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChatAiService } from '../../service/ai-call.service';
import { marked } from 'marked';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-ai-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule,RouterLink],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css'
})
export class AiComponent implements OnInit {

  userMessage = '';
  messages: any[] = [];
  loading = false;

  // backend health data
  height!: number;
  weight!: number;
  bmi!: number;
  goal!: string;

  constructor(
    private chatAi: ChatAiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const saved = localStorage.getItem('ai_chat_history');
    if (saved) {
      this.messages = JSON.parse(saved).map((m: any) => ({
        ...m,
        html: m.role === 'bot' ? marked.parse(m.text) : null
      }));
    }

    this.fetchUserHealthData();
  }

  fetchUserHealthData() {
    this.http.get<any>('http://localhost:5001/api/auth/me', {
      withCredentials: true
    }).subscribe({
      next: (data) => {
        this.height = data.height;
        this.weight = data.weight;
        this.bmi = data.bmi;
        this.goal = data.goal;
      },
      error: () => {
        alert('Failed to load user health data');
      }
    });
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({
      role: 'user',
      text: this.userMessage
    });

    this.loading = true;

    const userContext = {
      height: this.height,
      weight: this.weight,
      bmi: this.bmi,
      goal: this.goal
    };

    this.chatAi.askDoubt(this.userMessage, userContext)
      .subscribe({
        next: (res) => {
          const rawText =
            res?.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Sorry, I could not generate a response.';

          this.messages.push({
            role: 'bot',
            text: rawText,
            html: marked.parse(rawText)
          });

          this.saveChat();
          this.loading = false;
          this.userMessage = '';
        },
        error: () => {
          this.loading = false;
          alert('AI failed to respond');
        }
      });
  }

  saveChat() {
    localStorage.setItem('ai_chat_history', JSON.stringify(this.messages));
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
    alert('AI response copied!');
  }
  clearChat() {
  const confirmClear = confirm('Clear chat history?');
  if (!confirmClear) return;

  this.messages = [];
  localStorage.removeItem('ai_chat_history');
}

}
