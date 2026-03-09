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
  farmer = {
    farmerFirstName: '',
    farmerLastName: '',
    farmerEmail: '',
    farmerPhone: '',
    farmerImage: '',
    farmerAddress: '',
    farmerAccount: '',
  };

  constructor(private myapi: Myapi) {}

  onSubmit(form: NgForm) {
    this.myapi.registerFarmer(this.farmer).subscribe({
      next: (response) => {
        console.log('Farmer registered successfully:', response);
        alert('Registration successful!');
        form.reset();
      },
      error: (err) => {
        console.error('Error registering farmer:', err);
        alert('Registration failed!');
      },
    });
  }
}
