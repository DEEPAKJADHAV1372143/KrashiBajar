import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../footer/footer';
import { Myapi } from '../myapi';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-farmer-dashaboard',
  imports: [CommonModule, Footer, FormsModule,
    ReactiveFormsModule,  
],
  templateUrl: './farmer-dashaboard.html',
  styleUrl: './farmer-dashaboard.css',
})
export class FarmerDashaboard implements OnInit {
  orders = signal<any[]>([]);
  farmerId = signal<string | null>(null);

   farmerForm!: FormGroup;
   farmerDetails: any;


  constructor(
    private router: Router,
    private myapi: Myapi,
    private fb: FormBuilder, 
    private http: HttpClient
  ) {
    effect(() => {
      this.farmarDetails = JSON.parse(localStorage.getItem('farmarDetails') || '{}');
      const fid = this.farmarDetails.farmerId;
      this.farmarDetails = JSON.parse(localStorage.getItem('farmarDetails') || '{}');
      if (fid) {
        this.myAllProduct(fid);
      } else {
        console.error('No fid found in localStorage');
      }

      if (fid) {
        this.myapi.getOrdersByFarmer(fid).subscribe({
          next: (res) => this.orders.set(res.orders || []),
          error: (err) => {
            console.error('Error fetching farmer orders:', err);
            this.orders.set([]);
          },
        });
      }
    });
  }

  allmyProduct = signal<any[]>([]);

  farmarDetails: any;
  ngOnInit(): void {
    this.farmarDetails = JSON.parse(localStorage.getItem('farmarDetails') || '{}');
    this.farmerId.set(this.farmarDetails.farmerId);

    const fid = this.farmarDetails.farmerId;
    this.myAllProduct(this.farmarDetails.farmerId);
    if (fid) {
      this.product.fid = fid;
    }


    const storedData = localStorage.getItem('farmarDetails');
    if (storedData) {
      this.farmerDetails = JSON.parse(storedData);
    }

    this.farmerForm = this.fb.group({
      farmerFirstName: [this.farmerDetails?.farmerFirstName, [Validators.required, Validators.minLength(2)]],
      farmerLastName: [this.farmerDetails?.farmerLastName, [Validators.required, Validators.minLength(2)]],
      farmerEmail: [this.farmerDetails?.farmerEmail, [Validators.required, Validators.email]],
      farmerPhone: [this.farmerDetails?.farmerPhone, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      farmerImage: [this.farmerDetails?.farmerImage],
      farmerAddress: [this.farmerDetails?.farmerAddress, Validators.required],
      farmerAccount: [this.farmerDetails?.farmerAccount, Validators.required],
      username: [this.farmerDetails?.username, [Validators.required, Validators.minLength(5)]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]] // optional new password
    });

    
  }

  onUpdate(): void {
    if (this.farmerForm.invalid) {
      this.farmerForm.markAllAsTouched();
      return;
    }

    const updateData = { ...this.farmerForm.value };

    this.myapi.updateFarmer(this.farmerDetails.farmerId, updateData)
      .subscribe({
        next: (res: any) => {
          alert('Farmer updated successfully! login again');
          this.logout();
        },
        error: (err) => {
          console.error('Error updating farmer:', err);
          alert('Update failed');
        }
      });
  }


  logout() {
    this.router.navigate(['/home']);
    localStorage.removeItem('farmarDetails');
  }

  changeStatus(orderId: number, newStatus: string = 'InProgress') {
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

  goBack() {
    this.router.navigate(['/home']);
  }

  myAllProduct(fid: any) {
    if (fid) {
      this.myapi.getProductsByFarmer(fid).subscribe({
        next: (res) => {
          this.allmyProduct.set(res.products || []); // update signal
          console.log('Products:', this.allmyProduct());
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.allmyProduct.set([]); // fallback
        },
      });
    }
  }

  deleteProduct(id: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.myapi.deleteProduct(id).subscribe({
        next: () => {
          this.farmarDetails = JSON.parse(localStorage.getItem('farmarDetails') || '{}');
          alert('Product deleted successfully');
          this.myAllProduct(this.farmarDetails.farmerId);
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product');
        },
      });
    }
  }

  product = {
    name: '',
    image: '',
    price: null,
    quantity: null,
    fid: '', // will be set from localStorage
  };

  onSubmit(form: any) {
    this.product.fid = this.farmarDetails.farmerId;
    this.myapi.insertProduct(this.product).subscribe({
      next: (res) => {
        console.log('Product added:', res);
        alert('Product inserted successfully!');
        form.reset();
        this.product.fid = this.farmarDetails.farmerid; // re-set fid after reset
        this.myAllProduct(this.farmarDetails.farmerId);
      },
      error: (err) => {
        console.error('Error inserting product:', err);
        alert('Failed to insert product');
      },
    });
  }




}
