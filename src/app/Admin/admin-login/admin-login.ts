import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Myapi } from '../../myapi';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule, Footer],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  login: any = { username: '', userpassword: '' };
  successMessage = '';
  errorMessage = '';

  constructor(
    private myapi: Myapi,
    private router: Router,
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.successMessage = '';
      return;
    }

    this.myapi.loginAdmin(this.login).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        localStorage.setItem('adminDetails', JSON.stringify(res.adminDetails));
        form.reset();
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Login failed. Try again.';
        this.successMessage = '';
      },
    });
  }
}
