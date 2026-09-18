import {
  Component,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface CrmChatResponse {
  success: boolean;
  message?: string;
  toolCalls?: Array<{
    name: string;
    arguments: Record<string, unknown>;
    result: unknown;
  }>;
}

@Component({
  selector: 'app-crm-agent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crm-agent.component.html',
  styleUrl: './crm-agent.component.scss'
})
export class CrmAgentComponent {
  private readonly http = inject(HttpClient);

  protected readonly input = signal('');

  protected readonly messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hello! I can help you search customers, create or update customer records, check customer information, and send WhatsApp messages.'
    }
  ]);

  protected readonly loading = signal(false);

  protected sendMessage(): void {
    const content = this.input().trim();

    if (!content || this.loading()) {
      return;
    }

    this.messages.update((messages) => [
      ...messages,
      {
        role: 'user',
        content
      }
    ]);

    this.input.set('');
    this.loading.set(true);

    this.http
      .post<CrmChatResponse>(
        'http://localhost:3000/api/openclaw/agent/chat',
        {
          message: content
        }
      )
      .subscribe({
        next: (response) => {
          this.loading.set(false);

          if (!response.success) {
            this.messages.update((messages) => [
              ...messages,
              {
                role: 'assistant',
                content:
                  response.message ??
                  'The CRM agent could not process your request.'
              }
            ]);

            return;
          }

          this.messages.update((messages) => [
            ...messages,
            {
              role: 'assistant',
              content:
                response.message ??
                'The agent returned an empty response.'
            }
          ]);
        },

        error: (error) => {
          console.error('CRM chat error:', error);

          this.loading.set(false);

          this.messages.update((messages) => [
            ...messages,
            {
              role: 'assistant',
              content:
                'Unable to connect to the CRM agent. Please check that the backend and OpenClaw are running.'
            }
          ]);
        }
      });
  }
}