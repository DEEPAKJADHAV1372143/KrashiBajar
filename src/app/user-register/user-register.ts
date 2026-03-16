import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Myapi } from '../myapi';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './user-register.html',
  styleUrl: './user-register.css',
})
export class UserRegister {
 

  constructor(private myapi: Myapi) {}

 customer = {
  customerFirstName: '',
  customerLastName: '',
  customerEmail: '',
  customerPhone: '',
  customerAddress: '',
  customerAccount: ''
};

selectedFile: File | null = null;

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}

onSubmit(form: NgForm) {
  if (form.invalid || !this.selectedFile) {
    return;
  }

  const formData = new FormData();
  formData.append('customerFirstName', this.customer.customerFirstName);
  formData.append('customerLastName', this.customer.customerLastName);
  formData.append('customerEmail', this.customer.customerEmail);
  formData.append('customerPhone', this.customer.customerPhone);
  formData.append('customerAddress', this.customer.customerAddress);
  formData.append('customerAccount', this.customer.customerAccount);
  formData.append('customerImage', this.selectedFile);

  this.myapi.registerCustomer(formData).subscribe({
    next: (response) => {
      console.log('Customer registered successfully:', response);
      alert('Registration successful!');
      form.reset();
      this.selectedFile = null;
    },
    error: (err) => {
      console.error('Error registering Customer:', err);
      alert('Registration failed!');
    },
  });
}
}
