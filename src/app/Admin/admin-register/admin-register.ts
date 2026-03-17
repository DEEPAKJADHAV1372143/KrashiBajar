import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Myapi } from '../../myapi';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin-register',
  imports: [ReactiveFormsModule, CommonModule   ,FormsModule],
  templateUrl: './admin-register.html',
  styleUrl: './admin-register.css',
})
export class AdminRegister {
 
  admin: any = {
    firstName: '',
    lastName: '',
    emailId: '',
    mobile: ''
  };

  selectedFile: File | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(private myapi: Myapi) {}

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Submit form with validation
  onSubmit(form: NgForm) {
    
    if (form.invalid || !this.selectedFile) {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.successMessage = '';
      return;
    }

    // Extra validation for mobile number (must be exactly 10 digits)
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(this.admin.mobile)) {
      this.errorMessage = 'Mobile number must be exactly 10 digits.';
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.admin.firstName);
    formData.append('lastName', this.admin.lastName);
    formData.append('emailId', this.admin.emailId);
    formData.append('mobile', this.admin.mobile);
    formData.append('adminImage', this.selectedFile);

    this.myapi.registerAdmin(formData).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        form.resetForm();
        form.reset();
        this.selectedFile = null;

        // Show backend-generated credentials
        if (res.username && res.rawPassword) {
          this.successMessage += ` | Username: ${res.username}, Password: ${res.rawPassword}`;
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Registration failed. Try again.';
        this.successMessage = '';
      }
    });
  }
}