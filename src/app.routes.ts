import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { RegisterComponent } from './components/register/register.component';

const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  // FIX: Explicitly type `router` as `Router` to resolve type inference issue.
  const router: Router = inject(Router);
  if (authService.currentUser()?.role === 'admin') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

const studentGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  // FIX: Explicitly type `router` as `Router` to resolve type inference issue.
  const router: Router = inject(Router);
  if (authService.currentUser()?.role === 'student') {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'student', component: StudentDashboardComponent, canActivate: [studentGuard] },
  { path: '**', redirectTo: '' }
];
