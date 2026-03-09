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
  customer = {
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPhone: '',
    customerImage: '',
    customerAddress: '',
    customerAccount: '',
  };

  constructor(private myapi: Myapi) {}

  onSubmit(form: NgForm) {
    this.myapi.registerCustomer(this.customer).subscribe({
      next: (response) => {
        console.log('Customer registered successfully:', response);
        alert('Registration successful!');
        form.reset();
      },
      error: (err) => {
        console.error('Error registering Customer:', err);
        alert('Registration failed!');
      },
    });
  }
}
