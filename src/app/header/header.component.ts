import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { CognitoService } from '../cognito.service';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true, // explain: standalone gets properties of Module
  imports: [CommonModule, MatButtonModule, MatIconModule, AppRoutingModule], // explain: without CommonModule not working directives such ngIf | AppRoutingModule we need if component is standalone
})
export class HeaderComponent {
  constructor(private router: Router, public cognito: CognitoService) {
  }

  isActive(link: string): boolean {
    return this.router.isActive(link, true);
  }
}
