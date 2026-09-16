import {
  Injectable,
  PLATFORM_ID,
  inject
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

// import {
//   io,
//   Socket
// } from 'socket.io-client';

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

export interface WhatsAppMessage {
  _id?: string;

  direction:
    | 'inbound'
    | 'outbound';

  from: string;

  to: string;

  message: string;

  timestamp: number;

  messageId?: string | null;

  senderName?: string | null;

  sessionKey?: string | null;

  channel: 'whatsapp';
}

interface WhatsAppMessagesResponse {
  success: boolean;

  data: WhatsAppMessage[];
}

@Injectable({
  providedIn: 'root'
})
export class OpenclawService {
  private readonly http =
    inject(HttpClient);

  private readonly platformId =
    inject(PLATFORM_ID);

  private readonly apiUrl =
    'http://localhost:3000/api/openclaw';

//   private socket?: Socket;

//   private connectSocket(): void {
//     if (
//       !isPlatformBrowser(
//         this.platformId
//       )
//     ) {
//       return;
//     }

//     if (this.socket) {
//       return;
//     }

//     this.socket =
//       io(
//         'http://localhost:3000',
//         {
//           transports: [
//             'websocket',
//             'polling'
//           ]
//         }
//       );

//     this.socket.on(
//       'connect',
//       () => {
//         console.log(
//           'Socket.IO connected:',
//           this.socket?.id
//         );
//       }
//     );

//     this.socket.on(
//       'disconnect',
//       (reason) => {
//         console.log(
//           'Socket.IO disconnected:',
//           reason
//         );
//       }
//     );

//     this.socket.on(
//       'connect_error',
//       (error) => {
//         console.error(
//           'Socket.IO connection error:',
//           error
//         );
//       }
//     );
//   }

  sendWhatsAppMessage(
    request: WhatsAppSendRequest
  ): Observable<WhatsAppSendResponse> {
    return this.http.post<WhatsAppSendResponse>(
      `${this.apiUrl}/whatsapp/send`,
      request
    );
  }

  getWhatsAppMessages():
    Observable<WhatsAppMessagesResponse> {
    return this.http.get<WhatsAppMessagesResponse>(
      `${this.apiUrl}/whatsapp/messages`
    );
  }

//   onWhatsAppMessage(
//     callback: (
//       message: WhatsAppMessage
//     ) => void
//   ): void {
//     this.connectSocket();

//     this.socket?.on(
//       'whatsapp:message',
//       callback
//     );
//   }
}