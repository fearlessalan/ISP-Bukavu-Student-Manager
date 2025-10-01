import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component.js';
import { RegisterComponent } from './components/register/register.component.js';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, RegisterComponent]
})
export class AppComponent {
  title = 'ISP Bukavu Student Manager';
  currentYear = 2024;
}