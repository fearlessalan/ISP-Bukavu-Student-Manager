

import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service.js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private dataService = inject(DataService);
  // FIX: Explicitly type `router` as `Router` to resolve type inference issue.
  private router: Router = inject(Router);

  // Form Model
  student = {
    name: '',
    section: '',
    department: '',
    promotion: '',
  };

  // UI State
  submissionStatus = signal<{ type: 'success' | 'error'; message: string } | null>(null);
  selectedSection = signal('');

  // Data for selects
  sections = this.dataService.sections;
  promotions = this.dataService.promotions;
  
  availableDepartments = computed(() => {
    const section = this.selectedSection();
    if (section) {
      return this.dataService.departmentsMap[section] || [];
    }
    return [];
  });

  onSectionChange(): void {
    // Update the signal to trigger the computed value
    this.selectedSection.set(this.student.section);
    // Reset department when section changes
    this.student.department = '';
  }

  onSubmit(): void {
    if (this.student.section && this.student.department) {
      this.dataService.registerStudent(this.student);
      this.submissionStatus.set({ 
        type: 'success', 
        message: 'Inscription réussie ! Votre demande est en attente d\'approbation par un administrateur.' 
      });
      setTimeout(() => this.router.navigate(['/login']), 3000);
    } else {
       this.submissionStatus.set({ type: 'error', message: 'Veuillez remplir tous les champs requis.' });
    }
  }
}