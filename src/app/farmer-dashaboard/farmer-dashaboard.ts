import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../footer/footer';
import { Myapi } from '../myapi';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-farmer-dashaboard',
  imports: [CommonModule, Footer, FormsModule, ReactiveFormsModule],
  templateUrl: './farmer-dashaboard.html',
  styleUrl: './farmer-dashaboard.css',
})
export class FarmerDashaboard implements OnInit {
  url: any = 'http://localhost:8000/uploads/';
  orders = signal<any[]>([]);
  farmerId = signal<string | null>(null);

  farmerForm!: FormGroup;
  farmerDetails: any;

  constructor(
    private router: Router,
    private myapi: Myapi,
    private fb: FormBuilder,
    private http: HttpClient,
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
    this.loadQueries();

    const storedData = localStorage.getItem('farmarDetails');
    if (storedData) {
      this.farmerDetails = JSON.parse(storedData);
    }

    this.farmerForm = this.fb.group({
      farmerFirstName: [
        this.farmerDetails?.farmerFirstName,
        [Validators.required, Validators.minLength(2)],
      ],
      farmerLastName: [
        this.farmerDetails?.farmerLastName,
        [Validators.required, Validators.minLength(2)],
      ],
      farmerEmail: [this.farmerDetails?.farmerEmail, [Validators.required, Validators.email]],
      farmerPhone: [
        this.farmerDetails?.farmerPhone,
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      farmerImage: [this.farmerDetails?.farmerImage, Validators.required],
      farmerAddress: [this.farmerDetails?.farmerAddress, Validators.required],
      farmerAccount: [this.farmerDetails?.farmerAccount, Validators.required],
      username: [this.farmerDetails?.username, [Validators.required, Validators.minLength(5)]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]], // optional new password
    });
  }

  selectedFile2: File | null = null;

  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile2 = file;
    }
  }

  onUpdate(): void {
    if (this.farmerForm.invalid) {
      this.farmerForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.keys(this.farmerForm.value).forEach((key) => {
      formData.append(key, this.farmerForm.value[key]);
    });

    if (this.selectedFile2) {
      formData.append('farmerImage', this.selectedFile2);
    }

    this.myapi.updateFarmer(this.farmerDetails.farmerId, formData).subscribe({
      next: (res: any) => {
        alert('Farmer updated successfully! login again');
        this.logout();
      },
      error: (err) => {
        console.error('Error updating farmer:', err);
        alert('Update failed');
      },
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

  changeStatus3(orderId: number, newStatus: string = 'Completed') {
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
    price: '',
    quantity: '',
    fid: '', // set from farmerDetails
  };

  selectedFile: File | null = null;
  fileError: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.fileError = 'Only JPG or PNG images are allowed.';
        this.selectedFile = null;
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        this.fileError = 'File size must be under 2MB.';
        this.selectedFile = null;
        return;
      }
      this.fileError = null;
      this.selectedFile = file;
    }
  }

  onSubmit(form: any) {
    if (form.invalid || !this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price?.toString() || '');
    formData.append('quantity', this.product.quantity?.toString() || '');
    formData.append('fid', this.farmarDetails.farmerId.toString());
    formData.append('image', this.selectedFile);

    this.myapi.insertProduct(formData).subscribe({
      next: (res) => {
        console.log('Product added:', res);
        alert('Product inserted successfully!');
        form.reset();
        this.product.fid = this.farmarDetails.farmerId;
        this.myAllProduct(this.farmarDetails.farmerId);
      },
      error: (err) => {
        console.error('Error inserting product:', err);
        alert('Failed to insert product');
      },
    });
  }

  queries: any[] = [];
  loadQueries(): void {
    const userId = this.farmarDetails.farmerId; // Example, replace with logged-in userId
    const whoText = 'Farmer'; // Example filter

    this.myapi.getQueries(userId, whoText).subscribe((res) => {
      this.queries = res.queries;
    });
  }

  newQuery = {
    userId: 0,
    body: '',
    whoText: 'Farmer',
    status: 'open',
  };

  addQuery(form: any): void {
    this.newQuery.userId = this.farmarDetails.farmerId;
    this.newQuery.status = 'open';
    this.newQuery.whoText = 'Farmer';
    this.myapi.addQuery(this.newQuery).subscribe((res) => {
      alert(res.message);
      // Reset the form after successful submit
      this.loadQueries();
      form.resetForm({
        userId: this.farmarDetails.farmerId,
        status: 'open',
        whoText: 'Farmer',
      });
    });
  }

  cancelForm(form: any): void {
    // Reset form when user clicks cancel
    form.resetForm({
      userId: this.farmarDetails.farmerId,
      status: 'open',
      whoText: 'Farmer',
    });
  }
}
