import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WatchStateService, Watch } from '../../services/watch-state';

@Component({
  selector: 'app-watch-customizer',
  imports: [CommonModule],
  templateUrl: './watch-customizer.html',
  styleUrl: './watch-customizer.css',
})
export class WatchCustomizer {
  private readonly watchState = inject(WatchStateService);
  private readonly router = inject(Router);

  // Consume full catalog of 13 watches from shared service
  protected readonly watches = this.watchState.watches;

  // Bind active selection to the shared service
  protected get selectedWatch(): Watch {
    return this.watchState.selectedWatch();
  }

  protected selectWatch(watch: Watch): void {
    this.watchState.selectWatch(watch);
  }

  protected confirmSelection(): void {
    this.router.navigate(['/watch-details']);
  }

  protected goBack(): void {
    this.router.navigate(['/']);
  }
}
