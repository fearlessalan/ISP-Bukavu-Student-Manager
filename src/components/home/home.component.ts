import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  dataService = inject(DataService);

  sections = this.dataService.sections;
  departmentsMap = this.dataService.departmentsMap;
  promotions = this.dataService.promotions;

  totalDepartments = computed(() => {
    const departmentsMap = this.dataService.departmentsMap;
    return Object.values(departmentsMap).reduce((total: number, departments: string[]) => total + departments.length, 0);
  });

  totalCourses = computed(() => {
    const coursesMap = this.dataService.coursesMap;
    const courseSet = new Set<string>();
    for (const promo in coursesMap) {
      if (Object.prototype.hasOwnProperty.call(coursesMap, promo)) {
        const departments = coursesMap[promo];
        for (const dept in departments) {
          if (Object.prototype.hasOwnProperty.call(departments, dept)) {
            const courses = departments[dept];
            courses.forEach(course => courseSet.add(course));
          }
        }
      }
    }
    return courseSet.size;
  });
}
