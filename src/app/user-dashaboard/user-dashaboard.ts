import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../footer/footer';
import { Myapi } from '../myapi';

@Component({
  selector: 'app-user-dashaboard',
  imports: [CommonModule, Footer],
  templateUrl: './user-dashaboard.html',
  styleUrl: './user-dashaboard.css',
})
export class UserDashaboard implements OnInit {
  orders = signal<any[]>([]);
  cid = signal<string | null>(null);

  constructor(
    private router: Router,
    private myapi: Myapi,
  ) {
    effect(() => {
      const customerId = this.cid();
      if (customerId) {
        this.myapi.getOrdersByCustomer(customerId).subscribe({
          next: (res) => this.orders.set(res.orders || []),
          error: (err) => {
            console.error('Error fetching orders:', err);
            this.orders.set([]);
          },
        });
      }
    });
  }

  userDetails: any;
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

    this.cid.set(this.userDetails.customerId);
  }

  logout() {
    this.router.navigate(['/home']);
    localStorage.removeItem('userDetails');
  }
  goHome() {
    this.router.navigate(['/home']);
  }

  cngST = signal<any[]>([]);

  changeStatus2(orderId: number, newStatus: string = 'Canceled') {
    this.myapi.updateOrderStatus(orderId, newStatus).subscribe({
      next: (res) => {
        console.log(res.message);
        // Update local signal so UI reflects change
        this.orders.update((current) =>
          current.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o)),
        );
      },
      error: (err) => {
        console.error('Error updating status:', err);
      },
    });
  }
}
