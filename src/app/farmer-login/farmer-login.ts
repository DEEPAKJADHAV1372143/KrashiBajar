import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Myapi } from '../myapi';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-farmer-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './farmer-login.html',
  styleUrl: './farmer-login.css',
})
export class FarmerLogin {
  login = {
    username: '',
    password: '',
  };

  constructor(
    private myapi: Myapi,
    private router: Router,
  ) {}

  onLogin(form: NgForm) {
    this.myapi.loginFarmer(this.login).subscribe({
      next: (response) => {
        console.log('Farmer login successfully:', response);
        alert('Loign successful!');
        localStorage.setItem('farmarDetails', JSON.stringify(response.farmer));
        form.reset();
        // Redirect to dashboard
        this.router.navigate(['/farmer-dashboard']);
      },
      error: (err) => {
        console.error('Error login farmer:', err);
        alert('Loign failed!');
      },
    });
  }
}
