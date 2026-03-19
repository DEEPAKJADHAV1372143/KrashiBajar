import { Routes } from '@angular/router';
import { Home } from './home/home';
import { FarmerLogin } from './farmer-login/farmer-login';
import { FarmerRegister } from './farmer-register/farmer-register';
import { FarmerDashaboard } from './farmer-dashaboard/farmer-dashaboard';
import { UserLogin } from './user-login/user-login';
import { UserRegister } from './user-register/user-register';
import { UserDashaboard } from './user-dashaboard/user-dashaboard';
import { auth2Guard } from './auth2-guard';
import { authGuard } from './auth-guard';
import { PageNotFound } from './page-not-found/page-not-found';
import { AdminLogin } from './Admin/admin-login/admin-login';
import { AdminDashaboard } from './Admin/admin-dashaboard/admin-dashaboard';
import { AdminRegister } from './Admin/admin-register/admin-register';
import { adminGuard } from './admin-guard';

export const routes: Routes = [
    {path:'', component: Home},
    {path:'home', component:Home},
    {path:'farmer-login', component: FarmerLogin},
    {path:'farmer-register', component: FarmerRegister},
    {path:'farmer-dashboard', component:FarmerDashaboard , canActivate: [auth2Guard]},
    {path:'user-login', component:UserLogin},
    {path:'user-register', component:UserRegister},
    {path:'user-dashboard', component:UserDashaboard ,canActivate: [authGuard] }, 
    {path:'admin', component:AdminLogin},
    {path:'admin-dashboard', component:AdminDashaboard , canActivate: [adminGuard]},
    {path:'admin-register', component:AdminRegister},
    { path: '**', component: PageNotFound }

];
