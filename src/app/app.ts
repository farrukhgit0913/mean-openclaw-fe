import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterOutlet
} from '@angular/router';

import {
  OpenclawService,
  WhatsAppMessage
} from './core/services/openclaw';

@Component({
  selector: 'app-root',

  imports: [
    RouterOutlet,
    FormsModule
  ],

  templateUrl: './app.html',

  styleUrl: './app.scss'
})
export class App
  implements OnInit {

  private readonly openclaw =
    inject(OpenclawService);

  protected readonly phoneNumber =
    signal('');

  protected readonly message =
    signal('');

  protected readonly messages =
    signal<WhatsAppMessage[]>([]);

  protected readonly loading =
    signal(false);

  protected readonly loadingMessages =
    signal(true);

  protected readonly successMessage =
    signal('');

  protected readonly errorMessage =
    signal('');

  ngOnInit(): void {
    this.loadMessages();

    // this.openclaw.onWhatsAppMessage(
    //   (message) => {
    //     console.log(
    //       'Angular received WhatsApp message:',
    //       message
    //     );

    //     this.messages.update(
    //       (messages) => [
    //         ...messages,
    //         message
    //       ]
    //     );
    //   }
    // );
  }

  private loadMessages(): void {
    this.loadingMessages.set(
      true
    );

    this.openclaw
      .getWhatsAppMessages()
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.messages.set(
              response.data
            );
          }

          this.loadingMessages.set(
            false
          );
        },

        error: (error) => {
          console.error(
            'Failed to load WhatsApp messages:',
            error
          );

          this.loadingMessages.set(
            false
          );
        }
      });
  }

  protected sendWhatsAppMessage(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    const to =
      this.phoneNumber()
        .trim();

    const text =
      this.message()
        .trim();

    if (!to) {
      this.errorMessage.set(
        'Enter a WhatsApp phone number.'
      );

      return;
    }

    if (!/^\+\d{8,15}$/.test(to)) {
      this.errorMessage.set(
        'Use a valid E.164 number, for example +923001234567.'
      );

      return;
    }

    if (!text) {
      this.errorMessage.set(
        'Enter a message.'
      );

      return;
    }

    this.loading.set(true);

    this.openclaw
      .sendWhatsAppMessage({
        to,
        message: text
      })
      .subscribe({
        next: (response) => {
          this.loading.set(false);

          if (!response.success) {
            this.errorMessage.set(
              response.message ??
              'Failed to send message.'
            );

            return;
          }

          /**
           * Show our outbound message
           * immediately in the chatbox.
           */
          const outboundMessage:
            WhatsAppMessage = {
              direction:
                'outbound',

              from:
                'me',

              to,

              message:
                text,

              timestamp:
                Date.now(),

              messageId:
                response.data
                  ?.messageId ??
                null,

              senderName:
                null,

              sessionKey:
                null,

              channel:
                'whatsapp'
            };

          this.messages.update(
            (messages) => [
              ...messages,
              outboundMessage
            ]
          );

          this.message.set('');

          this.successMessage.set(
            'WhatsApp message sent.'
          );
        },

        error: (error) => {
          console.error(
            'WhatsApp send error:',
            error
          );

          this.loading.set(false);

          this.errorMessage.set(
            'Failed to send WhatsApp message.'
          );
        }
      });
  }

  protected trackMessage(
    index: number,
    message: WhatsAppMessage
  ): string {
    return (
      message.messageId ??
      `${message.timestamp}-${index}`
    );
  }

  protected formatTime(
    timestamp: number
  ): string {
    return new Date(
      timestamp
    ).toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  }
}