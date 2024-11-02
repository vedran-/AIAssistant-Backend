import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  private aiEndpoint: string;

  constructor() {
    this.aiEndpoint = process.env.AI_ENDPOINT || 'http://localhost:8080/v1';
  }

  async sendMessage(message: string, model: string = 'default'): Promise<string> {
    try {
      const response = await fetch(`${this.aiEndpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: message }],
        }),
      });

      if (!response.ok) {
        throw new Error(`AI service responded with status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling AI service:', error);
      throw error;
    }
  }
}