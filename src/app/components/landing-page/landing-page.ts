import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WatchStateService, Watch } from '../../services/watch-state';

interface Prize {
  title: string;
  description: string;
  icon: string;
  bgClass: string;
  borderColor: string;
}

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  private readonly watchState = inject(WatchStateService);
  private readonly router = inject(Router);

  // Available watches filtered subset for page 1 preview
  protected readonly watches = this.watchState.watches.filter(w =>
    ['black', 'gold', 'orange', 'red', 'pink'].includes(w.id)
  );

  // Bind active selection to the shared service
  protected get selectedWatch(): Watch {
    return this.watchState.selectedWatch();
  }

  // Prizes list
  protected readonly prizes: Prize[] = [
    {
      title: 'جوائز مالية نقدية',
      description: 'اربح حتى 250,000 ج.م',
      icon: '💰',
      bgClass: 'bg-amber-950/20 hover:bg-amber-950/30 text-amber-500',
      borderColor: 'border-amber-500/10 hover:border-amber-500/30'
    },
    {
      title: 'سحب يومي على الجوائز',
      description: 'أجهزة إلكترونية ومكافآت نقدية',
      icon: '🎁',
      bgClass: 'bg-blue-950/20 hover:bg-blue-950/30 text-blue-500',
      borderColor: 'border-blue-500/10 hover:border-blue-500/30'
    },
    {
      title: 'الجائزة الكبرى',
      description: 'سحب شهري على 500,000 ج.م',
      icon: '🏆',
      bgClass: 'bg-yellow-950/20 hover:bg-yellow-950/30 text-yellow-500',
      borderColor: 'border-yellow-500/10 hover:border-yellow-500/30'
    }
  ];

  // Modal display states
  protected readonly isRegisterModalOpen = signal(false);

  // Success message feedback
  protected readonly successMessage = signal<string | null>(null);

  protected selectWatch(watch: Watch): void {
    this.watchState.selectWatch(watch);
  }

  protected openOrderModal(): void {
    this.router.navigate(['/choose-color']);
  }

  protected openRegisterModal(): void {
    this.isRegisterModalOpen.set(true);
  }

  protected closeRegisterModal(): void {
    this.isRegisterModalOpen.set(false);
  }

  protected handleRegisterSubmit(event: Event): void {
    event.preventDefault();
    this.isRegisterModalOpen.set(false);
    this.showSuccess('تم تسجيلك في السحب بنجاح! حظاً موفقاً في السحب القادم.');
  }

  private showSuccess(message: string): void {
    this.successMessage.set(message);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 5000);
  }
}
