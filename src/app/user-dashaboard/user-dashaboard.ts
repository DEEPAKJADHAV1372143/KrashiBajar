import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-user-dashaboard',
  imports: [RouterLink, CommonModule, Footer],
  templateUrl: './user-dashaboard.html',
  styleUrl: './user-dashaboard.css',
})
export class UserDashaboard {

}
