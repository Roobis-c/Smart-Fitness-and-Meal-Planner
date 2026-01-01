import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatAiService {

  constructor(private api: ApiService) {}

  askDoubt(
    question: string,
    userContext: {
      height: number;
      weight: number;
      bmi: number;
      goal: string;
    }
  ): Observable<any> {
    return this.api.post('/ai/ask-ai', {
      question,
      userContext
    });
  }
}
