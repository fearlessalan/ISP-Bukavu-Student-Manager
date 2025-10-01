import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Student } from '../../models';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  templateUrl: './student-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDashboardComponent {
  authService = inject(AuthService);
  dataService = inject(DataService);

  currentUser = this.authService.currentUser;

  studentData = computed<Student | undefined>(() => {
    const user = this.currentUser();
    if (user?.role === 'student' && user.studentId) {
      return this.dataService.students().find(s => s.id === user.studentId);
    }
    return undefined;
  });

  studentStats = computed(() => {
    const student = this.studentData();
    if (!student || student.grades.length === 0) {
      return {
        averageScore: 0,
        passedCourses: 0,
        failedCourses: 0,
        totalCourses: 0,
      };
    }

    const totalScore = student.grades.reduce((sum, grade) => sum + grade.score, 0);
    const averageScore = totalScore / student.grades.length;
    const passedCourses = student.grades.filter(g => g.score >= 10).length;
    const failedCourses = student.grades.length - passedCourses;

    return {
      averageScore: parseFloat(averageScore.toFixed(2)),
      passedCourses,
      failedCourses,
      totalCourses: student.grades.length,
    };
  });
}
