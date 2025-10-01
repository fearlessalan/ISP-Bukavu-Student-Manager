import { Injectable, signal } from '@angular/core';
import { Student, Grade } from '../models.js';
import INITIAL_STUDENTS from '../students.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Institutional Data
  readonly sections = [
    'Sciences Exactes',
    'Lettres et Sciences Humaines',
    'Sciences Commerciales Administratives et Informatique (SCAI)',
    'Hôtellerie, Accueil et Tourisme (HAT)',
  ];

  readonly departmentsMap: { [key: string]: string[] } = {
    'Sciences Exactes': [
      'Mathématiques - Physique', 'Mathématiques - I', 'Chimie - Physique',
      'Physique et Technologie', 'Biologie - Chimie', 'Géographie', 'Agro Vétérinaire',
    ],
    'Lettres et Sciences Humaines': [
      'Français et Langues Africaines', 'Anglais et Cultures Africaines',
      'Histoire et Sciences Sociales', 'Psycho-Pédagogie',
    ],
    'Sciences Commerciales Administratives et Informatique (SCAI)': [
      'Sciences Commerciales et Administratives', 'Informatique de Gestion', 'Sciences Economiques',
    ],
    'Hôtellerie, Accueil et Tourisme (HAT)': ['Accueil et Tourisme', 'Hôtellerie', 'Restauration'],
  };

  readonly promotions = ['L1 LMD', 'L2 LMD', 'L3 LMD'];

  readonly coursesMap: { [promo: string]: { [dept: string]: string[] } } = {
    'L1 LMD': {
      'Mathématiques - Physique': ['Analyse I', 'Algèbre I', 'Mécanique du Point', 'Chimie Générale', 'Optique Géométrique'],
      'Mathématiques - I': ['Analyse I', 'Algèbre et Géométrie', 'Introduction à la Programmation', 'Logique Mathématique'],
      'Chimie - Physique': ['Chimie Générale', 'Liaisons Chimiques', 'Thermodynamique Chimique', 'Mécanique du Point', 'Analyse I'],
      'Physique et Technologie': ['Mécanique du Point', 'Électricité Générale', 'Introduction à l\'Électronique', 'Dessin Technique', 'Algèbre I'],
      'Biologie - Chimie': ['Biologie Cellulaire', 'Biochimie Structurale', 'Chimie Organique Générale', 'Botanique Générale', 'Zoologie Générale'],
      'Géographie': ['Géographie Physique Générale', 'Cartographie et Topographie', 'Climatologie', 'Géologie Générale', 'Statistiques Appliquées'],
      'Agro Vétérinaire': ['Biologie Végétale', 'Anatomie Comparée des Animaux Domestiques', 'Pédologie', 'Génétique Générale', 'Biochimie'],
      'Français et Langues Africaines': ['Grammaire Normative', 'Introduction à la Linguistique', 'Littérature Française (Moyen-Âge)', 'Phonétique et Phonologie', 'Langues Congolaises'],
      'Anglais et Cultures Africaines': ['English Grammar I', 'Introduction to Literature', 'Phonetics and Phonology', 'African Civilizations', 'Oral Expression'],
      'Histoire et Sciences Sociales': ['Histoire du Congo', 'Introduction à la Sociologie', 'Grands Courants de la Pensée Historique', 'Anthropologie Culturelle', 'Méthodologie de la Recherche'],
      'Psycho-Pédagogie': ['Psychologie Générale', 'Pédagogie Générale', 'Statistiques Descriptives', 'Biologie Humaine', 'Philosophie de l\'Éducation'],
      'Sciences Commerciales et Administratives': ['Comptabilité Générale', 'Économie Politique I', 'Introduction au Droit', 'Management I', 'Mathématiques Financières'],
      'Informatique de Gestion': ['Introduction à l\'informatique', 'Algorithmique & Programmation', 'Logique Mathématique', 'Système d\'exploitation I', 'Architecture des ordinateurs'],
      'Sciences Economiques': ['Microéconomie I', 'Macroéconomie I', 'Comptabilité Nationale', 'Histoire de la Pensée Économique', 'Statistiques Économiques'],
      'Accueil et Tourisme': ['Introduction au Tourisme', 'Techniques d\'Accueil', 'Géographie Touristique', 'Communication Professionnelle', 'Anglais du Tourisme I'],
      'Hôtellerie': ['Introduction à l\'Hôtellerie', 'Techniques de Restaurant', 'Hébergement I', 'Hygiène et Sécurité', 'Gestion des Approvisionnements'],
      'Restauration': ['Technologie Culinaire I', 'Pâtisserie de Base', 'Hygiène Alimentaire (HACCP)', 'Sciences des Aliments', 'Gestion de Restaurant'],
    },
    'L2 LMD': {
      'Mathématiques - Physique': ['Analyse II', 'Algèbre II', 'Électricité et Magnétisme', 'Thermodynamique', 'Probabilités'],
      'Mathématiques - I': ['Analyse Numérique', 'Topologie Générale', 'Programmation Avancée', 'Calcul Formel'],
      'Chimie - Physique': ['Chimie Organique II', 'Cinétique Chimique', 'Spectroscopie', 'Physique Statistique', 'Électrochimie'],
      'Physique et Technologie': ['Électronique Analogique', 'Circuits Logiques', 'Mécanique des Fluides', 'Ondes et Vibrations', 'Matériaux'],
      'Biologie - Chimie': ['Génétique Moléculaire', 'Physiologie Végétale', 'Physiologie Animale', 'Microbiologie Générale', 'Chimie Analytique'],
      'Géographie': ['Géomorphologie', 'Biogéographie', 'Télédétection', 'Systèmes d\'Information Géographique (SIG)', 'Géographie Urbaine'],
      'Agro Vétérinaire': ['Nutrition Animale', 'Phytopathologie', 'Pharmacologie Vétérinaire', 'Zootechnie', 'Amélioration des Plantes'],
      'Français et Langues Africaines': ['Syntaxe du Français', 'Sémantique et Pragmatique', 'Littérature Africaine Francophone', 'Sociolinguistique', 'Morphologie'],
      'Anglais et Cultures Africaines': ['Advanced English Grammar', 'British Literature', 'American Literature', 'African Oral Literature', 'Discourse Analysis'],
      'Histoire et Sciences Sociales': ['Histoire de l\'Afrique Contemporaine', 'Théories Sociologiques', 'Questions Spéciales d\'Histoire', 'Démographie', 'Relations Internationales'],
      'Psycho-Pédagogie': ['Psychologie du Développement', 'Didactique Générale', 'Psychologie Sociale', 'Docimologie', 'Troubles d\'Apprentissage'],
      'Sciences Commerciales et Administratives': ['Comptabilité des Sociétés', 'Gestion des Ressources Humaines', 'Marketing Fondamental', 'Droit Commercial', 'Fiscalité'],
      'Informatique de Gestion': ['Structures de Données', 'Programmation Orientée Objet', 'Systèmes d\'Information', 'Comptabilité Analytique', 'Analyse Financière'],
      'Sciences Economiques': ['Microéconomie II', 'Macroéconomie II', 'Économétrie', 'Finances Publiques', 'Économie du Développement'],
      'Accueil et Tourisme': ['Marketing Touristique', 'Droit du Tourisme', 'Conception de Produits Touristiques', 'E-tourisme', 'Anglais du Tourisme II'],
      'Hôtellerie': ['Gestion Hôtelière', 'Marketing Hôtelier', 'Contrôle de Gestion en Hôtellerie', 'Hébergement II', 'Logiciels Hôteliers'],
      'Restauration': ['Ingénierie de la Restauration', 'Sommellerie et Oenologie', 'Technologie Culinaire II', 'Marketing de la Restauration', 'Gestion des Coûts'],
    },
    'L3 LMD': {
      'Mathématiques - Physique': ['Analyse III', 'Mécanique Analytique', 'Physique Quantique I', 'Optique Physique', 'Équations Différentielles'],
      'Mathématiques - I': ['Théorie de la Mesure et Intégration', 'Recherche Opérationnelle', 'Modélisation Mathématique', 'Cryptographie'],
      'Chimie - Physique': ['Chimie Quantique', 'Chimie des Matériaux', 'Génie Chimique', 'Projet de Recherche', 'Chimie Inorganique Avancée'],
      'Physique et Technologie': ['Électronique Numérique', 'Automatique', 'Physique des semi-conducteurs', 'Télécommunications', 'Projet Technologique'],
      'Biologie - Chimie': ['Immunologie', 'Biotechnologie', 'Biologie Moléculaire', 'Pharmacognosie', 'Projet de Fin d\'Études'],
      'Géographie': ['Aménagement du Territoire', 'Géographie Rurale', 'Gestion des Risques Naturels', 'Stage Professionnel', 'Mémoire de Fin d\'Études'],
      'Agro Vétérinaire': ['Pathologie Infectieuse', 'Chirurgie Vétérinaire', 'Économie Rurale', 'Stage en Clinique/Exploitation', 'Travail de Fin de Cycle'],
      'Français et Langues Africaines': ['Analyse du Discours', 'Stylistique', 'Séminaire de Littérature Comparée', 'Dialectologie', 'Mémoire'],
      'Anglais et Cultures Africaines': ['Applied Linguistics', 'Translation Studies', 'Research Methodology', 'Postcolonial Literature', 'Dissertation'],
      'Histoire et Sciences Sociales': ['Séminaire de Recherche Historique', 'Sociologie Politique', 'Stage et Rapport', 'Questions Approfondies de Sociologie', 'Mémoire'],
      'Psycho-Pédagogie': ['Psychologie Clinique', 'Évaluation et Intervention', 'Gestion de Classe', 'Pédagogie Spécialisée', 'Mémoire'],
      'Sciences Commerciales et Administratives': ['Gestion Financière', 'Audit et Contrôle de Gestion', 'Stratégie d\'Entreprise', 'Management International', 'Mémoire'],
      'Informatique de Gestion': ['Bases de Données Relationnelles', 'Réseaux Informatiques', 'Développement Web', 'Gestion de Projets Informatiques', 'Sécurité des SI'],
      'Sciences Economiques': ['Politiques Économiques', 'Économie Internationale', 'Théories de la Croissance', 'Gestion de Portefeuille', 'Mémoire'],
      'Accueil et Tourisme': ['Management d\'Événements', 'Stratégies des Entreprises Touristiques', 'Tourisme Durable', 'Stage de Fin d\'Études', 'Travail de Fin de Cycle'],
      'Hôtellerie': ['Management Hôtelier International', 'Stratégie Marketing en Hôtellerie', 'Yield Management', 'Stage de Management', 'Travail de Fin de Cycle'],
      'Restauration': ['Création et Gestion d\'un Restaurant', 'Gastronomie Moléculaire', 'Design Culinaire', 'Stage de Direction', 'Travail de Fin de Cycle'],
    }
  };

  // State
  students = signal<Student[]>(INITIAL_STUDENTS);

  private readonly firstNames = ['Aline', 'Benoit', 'Céline', 'David', 'Elodie', 'Fabien', 'Giselle', 'Hugo', 'Ines', 'Julien'];
  private readonly lastNames = ['Dubois', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'David', 'Bernard'];

  constructor() {
    // Initial data is now loaded from the imported students.json file.
  }

  private getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private normalizeName(name: string): string {
    return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ');
  }

  generateStudents(count: number): void {
    const existingStudents = this.students();
    const newStudents: Student[] = [];
    const maxId = Math.max(0, ...existingStudents.map(s => s.id));

    for (let i = 1; i <= count; i++) {
      const firstName = this.getRandomElement(this.firstNames);
      const lastName = this.getRandomElement(this.lastNames);
      const name = `${firstName} ${lastName}`;
      const username = this.normalizeName(name);
      const matricule = `ISP/24/${String(1000 + maxId + i).padStart(4, '0')}`;
      const section = this.getRandomElement(this.sections);
      const department = this.getRandomElement(this.departmentsMap[section]);
      const promotion = this.getRandomElement(this.promotions) as 'L1 LMD' | 'L2 LMD' | 'L3 LMD';
      
      const studentCourses = this.coursesMap[promotion]?.[department] ?? [];
      
      const grades = studentCourses.map(courseName => ({
        courseName,
        score: Math.floor(Math.random() * 16) + 5,
      }));

      newStudents.push({
        id: maxId + i,
        name,
        username,
        matricule,
        section,
        department,
        promotion,
        grades,
        status: Math.random() < 0.05 ? 'pending' : 'approved',
      });
    }
    this.students.update(s => [...s, ...newStudents]);
  }
  
  loadStudentsFromJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data) && data.every(item => 'id' in item && 'name' in item && 'matricule' in item)) {
        const validatedStudents = data.map(student => ({
          ...student,
          grades: student.grades ?? [],
          status: student.status ?? 'approved',
        }));
        this.students.set(validatedStudents);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to parse or load JSON", e);
      return false;
    }
  }

  registerStudent(studentData: Omit<Student, 'id' | 'grades' | 'status' | 'matricule' | 'username'>): void {
    const maxId = Math.max(0, ...this.students().map(s => s.id));
    const studentCourses = this.coursesMap[studentData.promotion as 'L1 LMD' | 'L2 LMD' | 'L3 LMD']?.[studentData.department] ?? [];
    const grades = studentCourses.map(courseName => ({ courseName, score: 0 }));

    const newStudent: Student = {
      ...studentData,
      id: maxId + 1,
      username: this.normalizeName(studentData.name),
      matricule: `ISP/24/${String(1000 + maxId + 1).padStart(4, '0')}`,
      grades,
      status: 'pending',
    };
    this.students.update(students => [...students, newStudent]);
  }

  approveStudent(studentId: number): void {
    this.students.update(students =>
      students.map(s => (s.id === studentId ? { ...s, status: 'approved' } : s))
    );
  }

  rejectStudent(studentId: number): void {
    this.students.update(students => students.filter(s => s.id !== studentId));
  }
  
  deleteStudent(studentId: number): void {
    this.rejectStudent(studentId); // Same logic
  }

  updateStudentGrades(studentId: number, newGrades: Grade[]): void {
    this.students.update(students =>
      students.map(s => (s.id === studentId ? { ...s, grades: newGrades } : s))
    );
  }
}