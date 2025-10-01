export interface Grade {
  courseName: string;
  score: number;
}

export interface Student {
  id: number;
  name: string;
  username: string;
  matricule: string;
  section: string;
  department: string;
  promotion: string;
  grades: Grade[];
  status: 'pending' | 'approved';
}

export interface Course {
  name: string;
  promotion: 'L1 LMD' | 'L2 LMD' | 'L3 LMD';
}

export interface User {
  username: string;
  name?: string;
  role: 'admin' | 'student';
  studentId?: number;
}
