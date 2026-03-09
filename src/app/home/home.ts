import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../footer/footer';
import { Myapi } from '../myapi';
import { FormsModule, NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Footer, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  productList = signal<any[]>([]);

  userDetails: any;
  farmerDetial: any;
  buyId: any;
  canItBuy: boolean = false;
  constructor(
    private myApi: Myapi,
    private router: Router,
  ) {
    effect(() => {
      this.myApi.getAllProducts().subscribe({
        next: (res) => {
          this.productList.set(res.products || []); // update signal
          console.log('Products:', this.productList);
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.productList.set([]); // fallback
        },
      });
    });
  }
  ngOnInit(): void {
    this.canItBuy = false;
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.farmerDetial = JSON.parse(localStorage.getItem('farmarDetails') || '{}');
    this.myApi.getAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.products || []); // update signal
        console.log('Products:', this.productList);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.productList.set([]); // fallback
      },
    });
  }

  gotouser() {
    if (this.userDetails && Object.keys(this.userDetails).length > 0) {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.router.navigate(['/user-login']);
    }
  }

  gotofarmer() {
    if (this.farmerDetial && Object.keys(this.farmerDetial).length > 0) {
      this.router.navigate(['/farmer-dashboard']);
    } else {
      this.router.navigate(['/farmer-login']);
    }
  }

  selectedId(obj: any) {
    this.buyId = obj;
    if (this.userDetails && Object.keys(this.userDetails).length > 0) {
      this.canItBuy = true;
      this.orderData.cid = this.userDetails.customerId;
      this.orderData.pid = this.buyId.id;
      this.orderData.logid = this.buyId.fid;
    } else {
      this.canItBuy = false;
    }
  }

  orderData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    pid: '', // selected product id
    quantity: '',
    logid: '', // from localStorage
    cid: '', // from localStorage
  };

  placeOrder(form: NgForm) {
    this.orderData.cid = this.userDetails.customerId;
    this.orderData.pid = this.buyId.id;
    this.orderData.logid = this.buyId.fid;
    this.myApi.insertOrder(this.orderData).subscribe({
      next: (res) => {
        alert('Order placed successfully! Order ID: ' + res.orderId);
        form.reset();
        // Close modal by ID
        const modalElement = document.getElementById('buyModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          }
          window.location.reload();
        }
      },
      error: (err) => {
        console.error('Error placing order:', err);
        alert('Failed to place order');
      },
    });
  }
}
