import { Routes } from '@angular/router';
import { Home } from './home/home';
import { FarmerLogin } from './farmer-login/farmer-login';
import { FarmerRegister } from './farmer-register/farmer-register';
import { FarmerDashaboard } from './farmer-dashaboard/farmer-dashaboard';
import { UserLogin } from './user-login/user-login';
import { UserRegister } from './user-register/user-register';
import { UserDashaboard } from './user-dashaboard/user-dashaboard';

export const routes: Routes = [
    {path:'', component: Home},
    {path:'home', component:Home},
    {path:'farmer-login', component: FarmerLogin},
    {path:'farmer-register', component: FarmerRegister},
    {path:'farmer-dashboard', component:FarmerDashaboard},
    {path:'user-login', component:UserLogin},
    {path:'user-register', component:UserRegister},
    {path:'user-dashboard', component:UserDashaboard}, 
];
