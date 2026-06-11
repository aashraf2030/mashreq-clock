import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WatchStateService } from '../../services/watch-state';

@Component({
  selector: 'app-personal-info',
  imports: [CommonModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export class PersonalInfo {
  private readonly watchState = inject(WatchStateService);
  private readonly router = inject(Router);

  // Form Field Signals initialized from shared state if already entered
  protected readonly fullName = signal(this.watchState.fullName());
  protected readonly nationalId = signal(this.watchState.nationalId());
  protected readonly phoneNumber = signal(this.watchState.phoneNumber());

  // Validation feedback signals
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);

  // Helper method to set input values
  protected onInput(field: 'name' | 'id' | 'phone', event: Event): void {
    const input = event.target as HTMLInputElement;
    if (field === 'name') {
      this.fullName.set(input.value);
    } else if (field === 'id') {
      // Allow only numbers and cap at 14 digits
      const cleaned = input.value.replace(/\D/g, '').substring(0, 14);
      input.value = cleaned;
      this.nationalId.set(cleaned);
    } else if (field === 'phone') {
      // Allow only numbers and cap at 11 digits
      const cleaned = input.value.replace(/\D/g, '').substring(0, 11);
      input.value = cleaned;
      this.phoneNumber.set(cleaned);
    }
    this.errorMessage.set(null); // Clear errors when user types
  }

  // Handle Form Submission
  protected handleFormSubmit(event: Event): void {
    event.preventDefault();
    this.errorMessage.set(null);

    const name = this.fullName().trim();
    const id = this.nationalId();
    const phone = this.phoneNumber();

    // 1. Validate Full Name
    if (!name) {
      this.errorMessage.set('يرجى إدخال الاسم الكامل.');
      return;
    }
    const nameWords = name.split(/\s+/);
    if (nameWords.length < 3) {
      this.errorMessage.set('يرجى إدخال الاسم ثلاثياً على الأقل.');
      return;
    }

    // 2. Validate National ID (14 digits)
    if (id.length !== 14) {
      this.errorMessage.set('الرقم القومي يجب أن يتكون من 14 رقماً.');
      return;
    }

    // 3. Validate Phone Number (11 digits, starts with 01)
    if (phone.length !== 11 || !/^(010|011|012|015)/.test(phone)) {
      this.errorMessage.set('يرجى إدخال رقم هاتف محمول صحيح مكون من 11 رقماً (مثال: 01xxxxxxxxx).');
      return;
    }

    // Save into shared state service
    this.watchState.fullName.set(name);
    this.watchState.nationalId.set(id);
    this.watchState.phoneNumber.set(phone);

    this.successMessage.set('تم حفظ البيانات الشخصية بنجاح! جاري الانتقال لصفحة تسجيل الدخول...');

    setTimeout(() => {
      this.successMessage.set(null);
      this.router.navigate(['/login']);
    }, 1200);
  }

  protected goBack(): void {
    this.router.navigate(['/watch-details']);
  }
}
