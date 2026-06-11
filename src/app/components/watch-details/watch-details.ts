import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WatchStateService, Watch } from '../../services/watch-state';

@Component({
  selector: 'app-watch-details',
  imports: [CommonModule],
  templateUrl: './watch-details.html',
  styleUrl: './watch-details.css',
})
export class WatchDetails {
  private readonly watchState = inject(WatchStateService);
  private readonly router = inject(Router);

  // Bind active selection to the shared service
  protected get selectedWatch(): Watch {
    return this.watchState.selectedWatch();
  }

  protected confirmOrder(): void {
    this.router.navigate(['/personal-info']);
  }

  protected goBack(): void {
    this.router.navigate(['/choose-color']);
  }
}
