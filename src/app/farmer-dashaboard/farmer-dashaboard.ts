import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-farmer-dashaboard',
  imports: [RouterLink, CommonModule, Footer],
  templateUrl: './farmer-dashaboard.html',
  styleUrl: './farmer-dashaboard.css',
})
export class FarmerDashaboard {

}
