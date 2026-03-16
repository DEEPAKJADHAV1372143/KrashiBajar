import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Myapi } from '../myapi';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-farmer-register',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './farmer-register.html',
  styleUrl: './farmer-register.css',
})
export class FarmerRegister {
  constructor(private myapi: Myapi) {}

  farmer = {
  farmerFirstName: '',
  farmerLastName: '',
  farmerEmail: '',
  farmerPhone: '',
  farmerAddress: '',
  farmerAccount: ''
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
  formData.append('farmerFirstName', this.farmer.farmerFirstName);
  formData.append('farmerLastName', this.farmer.farmerLastName);
  formData.append('farmerEmail', this.farmer.farmerEmail);
  formData.append('farmerPhone', this.farmer.farmerPhone);
  formData.append('farmerAddress', this.farmer.farmerAddress);
  formData.append('farmerAccount', this.farmer.farmerAccount);
  formData.append('farmerImage', this.selectedFile);

  this.myapi.registerFarmer(formData).subscribe({
    next: (response) => {
      console.log('Farmer registered successfully:', response);
      alert('Registration successful!');
      form.reset();
      this.selectedFile = null;
    },
    error: (err) => {
      console.error('Error registering farmer:', err);
      alert('Registration failed!');
    },
  });
}
}
