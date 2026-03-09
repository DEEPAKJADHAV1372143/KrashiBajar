import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Myapi } from '../myapi';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {
  login = {
    username: '',
    password: '',
  };

  constructor(
    private myapi: Myapi,
    private router: Router,
  ) {}

  onLogin(form: NgForm) {
    this.myapi.loginCustomer(this.login).subscribe({
      next: (response) => {
        console.log('Customer login successfully:', response);
        alert('Loign successful!');
        localStorage.setItem('userDetails', JSON.stringify(response.customer));
        form.reset();
        // Redirect to dashboard
        this.router.navigate(['/user-dashboard']);
      },
      error: (err) => {
        console.error('Error login Customer:', err);
        alert('Loign failed!');
      },
    });
  }
}
