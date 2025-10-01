import { Injectable, signal, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models.js';
import { DataService } from './data.service.js';

const CURRENT_USER_STORAGE_KEY = 'isp-bk-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataService = inject(DataService);
  private router: Router = inject(Router);

  currentUser = signal<User | null>(this.getStoredUser());

  constructor() {
    effect(() => {
        const user = this.currentUser();
        if (user) {
            sessionStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
        } else {
            sessionStorage.removeItem(CURRENT_USER_STORAGE_KEY);
        }
    });
  }

  private getStoredUser(): User | null {
    if (typeof sessionStorage === 'undefined') return null;
    const storedUser = sessionStorage.getItem(CURRENT_USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  login(username: string, password_matricule: string): boolean {
    // Admin check
    if (username.toLowerCase() === 'fearless' && password_matricule === 'fearless') {
      this.currentUser.set({ username: 'fearless', name: 'Administrator', role: 'admin' });
      this.router.navigate(['/admin']);
      return true;
    }

    // Student check
    const student = this.dataService
      .students()
      .find(
        (s) =>
          s.username === username.toLowerCase() && s.matricule === password_matricule && s.status === 'approved'
      );

    if (student) {
      this.currentUser.set({
        username: student.username,
        name: student.name,
        role: 'student',
        studentId: student.id,
      });
      this.router.navigate(['/student']);
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}