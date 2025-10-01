import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service.js';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  authService = inject(AuthService);

  username = '';
  password = '';
  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    this.errorMessage.set(null);
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.errorMessage.set('Identifiants incorrects. Veuillez réessayer.');
    }
  }
}