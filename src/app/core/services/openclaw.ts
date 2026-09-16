import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OpenClawMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenClawChatRequest {
  message: string;
  conversationId?: string;
}

export interface OpenClawChatResponse {
  message: string;
  conversationId?: string;
}

export interface WhatsAppSendRequest {
  to: string;
  message: string;
}

export interface WhatsAppSendResponse {
  success: boolean;
  data?: {
    success: boolean;
    messageId: string | null;
    output: string;
  };
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OpenclawService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/api/openclaw';

  chat(
    request: OpenClawChatRequest
  ): Observable<OpenClawChatResponse> {
    return this.http.post<OpenClawChatResponse>(
      `${this.apiUrl}/chat`,
      request
    );
  }

  sendWhatsAppMessage(
    request: WhatsAppSendRequest
  ): Observable<WhatsAppSendResponse> {
    return this.http.post<WhatsAppSendResponse>(
      `${this.apiUrl}/whatsapp/send`,
      request
    );
  }

  health(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(
      `${this.apiUrl}/health`
    );
  }
}
