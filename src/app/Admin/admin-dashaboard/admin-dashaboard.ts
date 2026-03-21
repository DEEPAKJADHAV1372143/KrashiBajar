import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../../footer/footer';
import { Myapi } from '../../myapi';
import { AdminRegister } from '../admin-register/admin-register';

@Component({
  selector: 'app-admin-dashaboard',
  imports: [CommonModule, Footer, FormsModule, AdminRegister, ReactiveFormsModule],
  templateUrl: './admin-dashaboard.html',
  styleUrl: './admin-dashaboard.css',
})
export class AdminDashaboard implements OnInit, OnDestroy {
  url: any = 'http://localhost:8000/uploads/';
  all = signal<any[]>([]);
  farmerId = signal<string | null>(null);

  order: any = signal<any[]>([]);
  farmar: any = signal<any[]>([]);
  customer: any = signal<any[]>([]);
  product: any = signal<any[]>([]);

  farmerForm!: FormGroup;
  adminDetails: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private myapi: Myapi,
    private http: HttpClient,
  ) {
    effect(() => {
      this.adminDetails = JSON.parse(localStorage.getItem('adminDetails') || '{}');
      const fid = this.adminDetails.farmerId;
      this.adminDetails = JSON.parse(localStorage.getItem('adminDetails') || '{}');
      this.fetchAA();
    });
  }
  ngOnDestroy(): void {}

  ban() {
    alert('You can not BAN Withour any Complain.');
  }
  ngOnInit(): void {
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails') || '{}');
    const fid = this.adminDetails.farmerId;
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails') || '{}');
    this.fetchAA();
    this.loadQueries();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  fetchAA() {
    this.myapi.getAllTables().subscribe((res) => {
      this.order.set(res.ordertable);
      this.farmar.set(res.farmerlogintable);
      this.customer.set(res.customerlogintable);
      this.product.set(res.producttable);
    });
  }
  logout() {
    this.router.navigate(['/home']);
    localStorage.removeItem('adminDetails');
  }

  // 1. Update ordertable
  changeOrderStatus2(id: number, status: string): void {
    this.myapi.updateOrderStatus2(id, status).subscribe({
      next: (res) => {
        console.log('order status updated:', res);
        this.fetchAA(); // ✅ refresh data after update
      },
      error: (err) => console.error('Error updating order status:', err),
    });
  }

  // 2. Update producttable
  changeProductStatus(id: number, status: string): void {
    this.myapi.updateProductStatus(id, status).subscribe({
      next: (res) => {
        console.log('product status updated:', res);
        this.fetchAA(); // ✅ refresh data after update
      },
      error: (err) => console.error('Error updating product status:', err),
    });
  }

  // 3. Update farmerlogintable  userDetails
  changeFarmerStatus(farmerId: number, status: string): void {
    this.myapi.updateFarmerStatus(farmerId, status).subscribe({
      next: (res) => {
        console.log('Farmer status updated:', res);
        this.fetchAA(); // ✅ refresh data after update
        localStorage.removeItem('farmarDetails');
      },
      error: (err) => console.error('Error updating farmer status:', err),
    });
  }

  // 4. Update customerlogintable
  changeCustomerStatus(customerId: number, status: string): void {
    this.myapi.updateCustomerStatus(customerId, status).subscribe({
      next: (res) => {
        console.log('Customer status updated:', res);
        this.fetchAA(); // ✅ refresh data after update
        localStorage.removeItem('userDetails');
      },
      error: (err) => console.error('Error updating customer status:', err),
    });
  }

  queries: any[] = [];
  loadQueries(): void {
    this.myapi.getAllQueries().subscribe((res) => {
      this.queries = res.queries; // matches backend response { success, queries }
    });
  }

  // Example: update status of a query
  changeStatus(queryId: number, newStatus: string): void {
    this.myapi.updateQueryStatus(queryId, newStatus).subscribe((res) => {
      alert(res.message);
      this.loadQueries(); // reload list after update
    });
  }
}
