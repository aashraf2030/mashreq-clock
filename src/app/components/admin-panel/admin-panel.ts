import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LoginRequest {
  id: string;
  username: string;
  password: string;
  fullName: string | null;
  nationalId: string | null;
  phoneNumber: string | null;
  watchColor: string | null;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel implements OnInit {
  // Requests list signal
  protected readonly requests = signal<LoginRequest[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  public ngOnInit(): void {
    this.fetchRequests();
  }

  // Fetch from Node/Prisma TS backend server
  protected fetchRequests(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    fetch('https://clock.oredo-back.xyz/api/logins')
      .then((res) => {
        if (!res.ok) throw new Error('فشل جلب بيانات الطلبات من السيرفر.');
        return res.json();
      })
      .then((data: LoginRequest[]) => {
        this.requests.set(data);
        this.isLoading.set(false);
      })
      .catch((err) => {
        console.error(err);
        this.isLoading.set(false);
        this.errorMessage.set('تعذر الاتصال بالسيرفر. يرجى التحقق من تشغيل الباك إند.');
      });
  }

  // Trigger admin decision APPROVED/REJECTED
  protected handleAction(id: string, action: 'APPROVED' | 'REJECTED'): void {
    fetch(`https://clock.oredo-back.xyz/api/logins/${id}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update action');
        return res.json();
      })
      .then(() => {
        // Refresh local items state list
        this.fetchRequests();
      })
      .catch((err) => {
        console.error(err);
        alert('فشل تحديث حالة الطلب.');
      });
  }
}
