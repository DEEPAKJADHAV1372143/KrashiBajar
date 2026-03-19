import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../../footer/footer';
import { Myapi } from '../../myapi';

@Component({
  selector: 'app-admin-dashaboard',
   imports: [CommonModule, Footer, FormsModule,
    ReactiveFormsModule,  
],
  templateUrl: './admin-dashaboard.html',
  styleUrl: './admin-dashaboard.css',
})
export class AdminDashaboard implements OnInit , OnDestroy{
 url:any='http://localhost:8000/uploads/';
    all = signal<any[]>([]);
  farmerId = signal<string | null>(null);

  order:any= signal<any[]>([]);
  farmar:any= signal<any[]>([]);
  customer:any= signal<any[]>([]);
  product:any= signal<any[]>([]);


   farmerForm!: FormGroup;
   adminDetails: any;


  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private myapi: Myapi,
    private http: HttpClient
  ) {
    effect(() => {
      this.adminDetails = JSON.parse(localStorage.getItem('adminDetails') || '{}');
      const fid = this.adminDetails.farmerId;
      this.adminDetails = JSON.parse(localStorage.getItem('adminDetails') || '{}');
      this.myapi.getAllTables().subscribe((res)=>{
      this.order.set(res.ordertable);
      this.farmar.set(res.farmerlogintable);
      this.customer.set(res.customerlogintable);
      this.product.set(res.producttable);
    })
    });
  }
  ngOnDestroy(): void {
   const out=window.confirm("Do you want to EXIT ?");
   if(out){
    this.logout();
   }else{
    this.router.navigate(['/admin-dashboard']);
   }
  }

  ban(){
    alert('You can not BAN Withour any Complain.');
  }
  ngOnInit(): void {
     this.adminDetails = JSON.parse(localStorage.getItem('adminDetails') || '{}');
      const fid = this.adminDetails.farmerId;
      this.adminDetails = JSON.parse(localStorage.getItem('adminDetails') || '{}');
      this.myapi.getAllTables().subscribe((res)=>{
      this.order.set(res.ordertable);
      this.farmar.set(res.farmerlogintable);
      this.customer.set(res.customerlogintable);
      this.product.set(res.producttable);
      })
  }

  logout() {
    this.router.navigate(['/home']);
    localStorage.removeItem('adminDetails');
  }

}
