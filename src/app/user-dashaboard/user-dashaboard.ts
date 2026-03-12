import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../footer/footer';
import { Myapi } from '../myapi';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dashaboard',
  imports: [CommonModule, Footer, ReactiveFormsModule],
  templateUrl: './user-dashaboard.html',
  styleUrl: './user-dashaboard.css',
})
export class UserDashaboard implements OnInit {
  orders = signal<any[]>([]);
  cid = signal<string | null>(null);



  customerForm!: FormGroup;

  constructor(
    private router: Router,
    private myapi: Myapi,
     private fb: FormBuilder, 
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
  customerDetails:any;
  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

    this.cid.set(this.userDetails.customerId);

     const storedData = localStorage.getItem('userDetails');
  if (storedData) {
    this.customerDetails = JSON.parse(storedData);
  }

  this.customerForm = this.fb.group({
    customerFirstName: [this.customerDetails?.customerFirstName, Validators.required],
    customerLastName: [this.customerDetails?.customerLastName, Validators.required],
    customerEmail: [this.customerDetails?.customerEmail, [Validators.required, Validators.email]],
    customerPhone: [this.customerDetails?.customerPhone, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    customerImage: [this.customerDetails?.customerImage],
    customerAddress: [this.customerDetails?.customerAddress],
    customerAccount: [this.customerDetails?.customerAccount],
    username: [this.customerDetails?.username, Validators.required],
    userPassword: ['', [Validators.required, Validators.minLength(6)]], // optional new password
  });

  }


  onUpdate(): void {
  if (this.customerForm.invalid) {
    this.customerForm.markAllAsTouched();
    return;
  }

  const updateData = { ...this.customerForm.value };

  this.myapi.updateCustomer(this.customerDetails.customerId, updateData)
    .subscribe({
      next: (res: any) => {
        alert('Customer updated successfully! login again');
        this.logout();
      },
      error: (err) => {
        console.error('Error updating customer:', err);
        alert('Update failed');
      }
    });
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
