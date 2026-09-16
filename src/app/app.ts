import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {
  OpenclawService
} from './core/services/openclaw';

@Component({
  imports: [
    RouterOutlet,
    FormsModule
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html'
})
export class App {
  private readonly openclaw =
    inject(OpenclawService);

  protected readonly phoneNumber =
    signal('');

  protected readonly message =
    signal('');

  protected readonly loading =
    signal(false);

  protected readonly successMessage =
    signal('');

  protected readonly errorMessage =
    signal('');

  protected sendWhatsAppMessage(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    const to =
      this.phoneNumber().trim();

    const message =
      this.message().trim();

    if (!to) {
      this.errorMessage.set(
        'Please enter a WhatsApp phone number.'
      );
      return;
    }

    if (!message) {
      this.errorMessage.set(
        'Please enter a message.'
      );
      return;
    }

    this.loading.set(true);

    this.openclaw
      .sendWhatsAppMessage({
        to,
        message
      })
      .subscribe({
        next: (response) => {
          this.loading.set(false);

          if (response.success) {
            this.successMessage.set(
              'WhatsApp message sent successfully.'
            );

            this.message.set('');
          } else {
            this.errorMessage.set(
              response.message ??
              'Failed to send WhatsApp message.'
            );
          }
        },

        error: (error) => {
          console.error(
            'WhatsApp send error:',
            error
          );

          this.loading.set(false);

          this.errorMessage.set(
            error?.error?.message ??
            'Failed to communicate with the backend.'
          );
        }
      });
  }
}
