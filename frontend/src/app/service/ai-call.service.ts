import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatAiService {

  private API_KEY = 'AIzaSyBhfeEoqay-l_zWvndltH7rL6N4fQOmOOQ';
  private URL =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.API_KEY}`;

  constructor(private http: HttpClient) {}

  askDoubt(
    question: string,
    userContext: {
      height: number;
      weight: number;
      bmi: number;
      goal: string;
    }
  ) {

    const prompt = `
You are a professional fitness assistant.

USER PROFILE:
- Height: ${userContext.height} cm
- Weight: ${userContext.weight} kg
- BMI: ${userContext.bmi}
- Goal: ${userContext.goal}

INSTRUCTIONS:
- Respond in Markdown
- Simple and short
- Use headings and bullet points
- Be clear and practical
- Avoid medical diagnosis

USER QUESTION:
${question}
`;

    return this.http.post<any>(this.URL, {
      contents: [
        { parts: [{ text: prompt }] }
      ]
    });
  }
}
