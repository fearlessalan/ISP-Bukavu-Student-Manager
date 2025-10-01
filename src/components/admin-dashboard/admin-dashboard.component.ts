import { Component, ChangeDetectionStrategy, inject, computed, signal, effect, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service.js';
import { Student, Grade } from '../../models.js';
import * as d3 from 'd3';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  dataService = inject(DataService);

  // Data
  students = this.dataService.students;
  approvedStudents = computed(() => this.students().filter(s => s.status === 'approved'));
  pendingStudents = computed(() => this.students().filter(s => s.status === 'pending'));
  
  // Data for filters and stats
  sections = this.dataService.sections;
  promotions = this.dataService.promotions;

  // Filter state
  filterSection = signal('');
  filterPromotion = signal('');
  filterSearch = signal('');

  filteredStudents = computed(() => {
    const approved = this.approvedStudents();
    const section = this.filterSection();
    const promotion = this.filterPromotion();
    const search = this.filterSearch().toLowerCase().trim();

    if (!section && !promotion && !search) {
      return approved;
    }

    return approved.filter(student => {
      const sectionMatch = section ? student.section === section : true;
      const promotionMatch = promotion ? student.promotion === promotion : true;
      const searchMatch = search 
          ? student.name.toLowerCase().includes(search) || student.matricule.toLowerCase().includes(search)
          : true;
      return sectionMatch && promotionMatch && searchMatch;
    });
  });

  // --- NEW: Pagination State & Logic ---
  currentPage = signal(1);
  readonly itemsPerPage = 10;

  paginatedStudents = computed(() => {
    const students = this.filteredStudents();
    const page = this.currentPage();
    const startIndex = (page - 1) * this.itemsPerPage;
    return students.slice(startIndex, startIndex + this.itemsPerPage);
  });
  
  totalPages = computed(() => {
    const totalStudents = this.filteredStudents().length;
    return Math.max(1, Math.ceil(totalStudents / this.itemsPerPage));
  });

  // UI State
  activeTab = signal<'management' | 'approvals' | 'tools' | 'stats'>('management');

  // Modals State
  isEditModalOpen = signal(false);
  isDeleteModalOpen = signal(false);
  selectedStudent = signal<Student | null>(null);
  editedGrades = signal<Grade[]>([]);
  studentToDelete = signal<Student | null>(null);

  // Tools State
  studentCount = signal(100);
  generatedJson = computed(() => JSON.stringify(this.students(), null, 2));
  toolStatus = signal<{type: 'success' | 'error' | 'info', message: string} | null>(null);

  // --- Stats ---
  stats = computed(() => {
    const students = this.approvedStudents();
    if (students.length === 0) {
      return {
        byPromotion: [],
        bySection: [],
        overallAverage: 0,
        passFailRatio: { passed: 0, failed: 0 },
        topStudent: null,
        studentToWatch: null,
        easiestCourse: null,
        hardestCourse: null,
      };
    }

    // Basic distributions
    const byPromotion = d3.rollup(students, v => v.length, d => d.promotion);
    const bySection = d3.rollup(students, v => v.length, d => d.section);
    
    // Averages and pass/fail
    let totalScore = 0;
    let totalGrades = 0;
    let passedGrades = 0;
    const courseScores: { [key: string]: { total: number; count: number } } = {};

    for (const student of students) {
        for (const grade of student.grades) {
            totalScore += grade.score;
            totalGrades++;
            if (grade.score >= 10) {
                passedGrades++;
            }
            if (!courseScores[grade.courseName]) {
              courseScores[grade.courseName] = { total: 0, count: 0 };
            }
            courseScores[grade.courseName].total += grade.score;
            courseScores[grade.courseName].count++;
        }
    }

    // Student performance
    const studentAverages = students
      .map(s => {
        if (s.grades.length === 0) return { student: s, average: 0 };
        const total = s.grades.reduce((acc, g) => acc + g.score, 0);
        return { student: s, average: parseFloat((total / s.grades.length).toFixed(2)) };
      })
      .filter(s => s.average > 0);

    const topStudent = studentAverages.length > 0 ? studentAverages.reduce((max, current) => current.average > max.average ? current : max) : null;
    const studentToWatch = studentAverages.length > 0 ? studentAverages.reduce((min, current) => current.average < min.average ? current : min) : null;

    // Course performance
    const courseAverages = Object.entries(courseScores).map(([name, data]) => ({
        name,
        average: parseFloat((data.total / data.count).toFixed(2)),
    }));
    
    const easiestCourse = courseAverages.length > 0 ? courseAverages.reduce((max, current) => current.average > max.average ? current : max) : null;
    const hardestCourse = courseAverages.length > 0 ? courseAverages.reduce((min, current) => current.average < min.average ? current : min) : null;

    return {
      byPromotion: Array.from(byPromotion, ([key, value]) => ({ key, value })).sort((a,b) => b.value - a.value),
      bySection: Array.from(bySection, ([key, value]) => ({ key, value })).sort((a,b) => b.value - a.value),
      overallAverage: totalGrades > 0 ? parseFloat((totalScore / totalGrades).toFixed(2)) : 0,
      passFailRatio: { passed: passedGrades, failed: totalGrades - passedGrades },
      topStudent,
      studentToWatch,
      easiestCourse,
      hardestCourse,
    };
  });

  // Chart Elements
  promotionChartEl = viewChild<ElementRef<HTMLDivElement>>('promotionChart');
  sectionChartEl = viewChild<ElementRef<HTMLDivElement>>('sectionChart');

  constructor() {
    // Effect to reset page when filters change
    effect(() => {
      // Re-read signals to create dependency
      this.filterSection();
      this.filterPromotion();
      this.filterSearch();
      
      // Reset to page 1
      this.currentPage.set(1);
    }, { allowSignalWrites: true });

    // Effect to draw charts when stats tab is active and elements are available
    effect(() => {
      const promotionEl = this.promotionChartEl();
      const sectionEl = this.sectionChartEl();
      const tab = this.activeTab();
      
      if (promotionEl && sectionEl && tab === 'stats' && this.students().length > 0) {
        this.drawCharts();
      }
    });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  // --- Student Management ---
  openEditModal(student: Student): void {
    this.selectedStudent.set(student);
    this.editedGrades.set(JSON.parse(JSON.stringify(student.grades))); // Deep copy
    this.isEditModalOpen.set(true);
  }

  openDeleteModal(student: Student): void {
    this.studentToDelete.set(student);
    this.isDeleteModalOpen.set(true);
  }

  closeModals(): void {
    this.isEditModalOpen.set(false);
    this.isDeleteModalOpen.set(false);
    this.selectedStudent.set(null);
    this.studentToDelete.set(null);
    this.editedGrades.set([]);
  }

  onGradeChange(courseName: string, newScoreStr: string): void {
    const newScore = parseInt(newScoreStr, 10);
    if (!isNaN(newScore)) {
      this.editedGrades.update(grades => 
        grades.map(g => g.courseName === courseName ? { ...g, score: newScore } : g)
      );
    }
  }

  saveGrades(): void {
    const student = this.selectedStudent();
    if (student) {
      this.dataService.updateStudentGrades(student.id, this.editedGrades());
    }
    this.closeModals();
  }

  confirmDelete(): void {
    const student = this.studentToDelete();
    if (student) {
      this.dataService.deleteStudent(student.id);
    }
    this.closeModals();
  }

  approve(studentId: number): void {
    this.dataService.approveStudent(studentId);
  }

  reject(studentId: number): void {
    this.dataService.rejectStudent(studentId);
  }


  // --- Data Tools ---
  generateData() {
    this.toolStatus.set(null);
    const count = this.studentCount();
    if (count > 0 && count <= 1000) {
      this.dataService.generateStudents(count);
      this.toolStatus.set({ type: 'success', message: `${count} étudiant(s) généré(s) avec succès.` });
      setTimeout(() => this.toolStatus.set(null), 5000);
    } else {
      this.toolStatus.set({ type: 'error', message: `Veuillez entrer un nombre d'étudiants entre 1 et 1000.` });
    }
  }

  exportJson() {
    const blob = new Blob([this.generatedJson()], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  onFileSelected(event: Event): void {
    this.toolStatus.set(null);
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const success = this.dataService.loadStudentsFromJson(text);
          if (success) {
            this.toolStatus.set({ type: 'success', message: 'Base de données importée avec succès !' });
            this.activeTab.set('management');
            setTimeout(() => this.toolStatus.set(null), 5000);
          } else {
            this.toolStatus.set({ type: 'error', message: 'Erreur lors de l\'importation. Vérifiez le format du fichier JSON.' });
          }
        } else {
            this.toolStatus.set({ type: 'error', message: 'Impossible de lire le fichier.' });
        }
        input.value = ''; // Reset file input
      };
      
      reader.onerror = () => {
        this.toolStatus.set({ type: 'error', message: 'Erreur lors de la lecture du fichier.' });
        input.value = '';
      };

      reader.readAsText(file);
    }
  }

  private drawCharts(): void {
    this.drawBarChart(this.promotionChartEl(), this.stats().byPromotion);
    this.drawBarChart(this.sectionChartEl(), this.stats().bySection);
  }

  private drawBarChart(elementRef: ElementRef<HTMLDivElement> | undefined, data: {key: string; value: number}[]): void {
    if (!elementRef || !data || data.length === 0) return;

    const el = elementRef.nativeElement;
    d3.select(el).select('svg').remove(); // Clear previous chart

    const margin = { top: 30, right: 30, bottom: 150, left: 50 };
    const width = el.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(el)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${el.clientWidth} 400`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand()
      .domain(data.map(d => d.key))
      .range([0, width])
      .padding(0.2);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('fill', '#9ca3af');

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) ?? 0])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', '#9ca3af');

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.key)!)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#0ea5e9');
      
    svg.selectAll('.bar-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'bar-label')
        .attr('x', d => x(d.key)! + x.bandwidth() / 2)
        .attr('y', d => y(d.value) - 5)
        .attr('text-anchor', 'middle')
        .style('fill', '#e5e7eb')
        .style('font-size', '12px')
        .text(d => d.value);
  }
}