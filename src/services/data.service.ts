import { Injectable, signal } from '@angular/core';
import { Student, Grade } from '../models';

const INITIAL_STUDENTS: Student[] = [
  { "id": 1, "name": "Hugo David", "username": "hugo.david", "matricule": "ISP/24/1001", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Hôtellerie", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 8 }, { "courseName": "Systèmes d’exploitation", "score": 10 }, { "courseName": "Programmation orientée objet", "score": 10 }], "status": "approved" },
  { "id": 2, "name": "Benoit David", "username": "benoit.david", "matricule": "ISP/24/1002", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Restauration", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 6 }, { "courseName": "Systèmes d’exploitation", "score": 9 }, { "courseName": "Programmation orientée objet", "score": 15 }], "status": "approved" },
  { "id": 3, "name": "Hugo Leroy", "username": "hugo.leroy", "matricule": "ISP/24/1003", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Informatique de Gestion", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 14 }, { "courseName": "Systèmes d’exploitation", "score": 20 }, { "courseName": "Programmation orientée objet", "score": 7 }], "status": "approved" },
  { "id": 4, "name": "Giselle Dubois", "username": "giselle.dubois", "matricule": "ISP/24/1004", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 12 }, { "courseName": "Systèmes d’exploitation", "score": 12 }, { "courseName": "Programmation orientée objet", "score": 17 }], "status": "approved" },
  { "id": 5, "name": "Hugo Leroy", "username": "hugo.leroy", "matricule": "ISP/24/1005", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Economiques", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 6 }, { "courseName": "Mathématiques générales", "score": 20 }, { "courseName": "Communication écrite", "score": 14 }], "status": "approved" },
  { "id": 6, "name": "Fabien Moreau", "username": "fabien.moreau", "matricule": "ISP/24/1006", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 6 }, { "courseName": "Mathématiques générales", "score": 15 }, { "courseName": "Communication écrite", "score": 10 }], "status": "approved" },
  { "id": 7, "name": "Fabien David", "username": "fabien.david", "matricule": "ISP/24/1007", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Commerciales et Administratives", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 10 }, { "courseName": "Mathématiques générales", "score": 5 }, { "courseName": "Communication écrite", "score": 13 }], "status": "approved" },
  { "id": 8, "name": "Ines Laurent", "username": "ines.laurent", "matricule": "ISP/24/1008", "section": "Lettres et Sciences Humaines", "department": "Histoire et Sciences Sociales", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 13 }, { "courseName": "Systèmes d’exploitation", "score": 6 }, { "courseName": "Programmation orientée objet", "score": 11 }], "status": "approved" },
  { "id": 9, "name": "Fabien David", "username": "fabien.david", "matricule": "ISP/24/1009", "section": "Sciences Exactes", "department": "Biologie - Chimie", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 9 }, { "courseName": "Mathématiques générales", "score": 16 }, { "courseName": "Communication écrite", "score": 9 }], "status": "approved" },
  { "id": 10, "name": "Aline Simon", "username": "aline.simon", "matricule": "ISP/24/1010", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Hôtellerie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 8 }, { "courseName": "Algèbre linéaire", "score": 7 }, { "courseName": "Structures de données", "score": 18 }], "status": "approved" },
  { "id": 11, "name": "Céline Laurent", "username": "céline.laurent", "matricule": "ISP/24/1011", "section": "Lettres et Sciences Humaines", "department": "Français et Langues Africaines", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 17 }, { "courseName": "Algèbre linéaire", "score": 16 }, { "courseName": "Structures de données", "score": 6 }], "status": "approved" },
  { "id": 12, "name": "Elodie Lefebvre", "username": "elodie.lefebvre", "matricule": "ISP/24/1012", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Hôtellerie", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 19 }, { "courseName": "Systèmes d’exploitation", "score": 18 }, { "courseName": "Programmation orientée objet", "score": 16 }], "status": "approved" },
  { "id": 13, "name": "Hugo Lefebvre", "username": "hugo.lefebvre", "matricule": "ISP/24/1013", "section": "Sciences Exactes", "department": "Biologie - Chimie", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 11 }, { "courseName": "Mathématiques générales", "score": 13 }, { "courseName": "Communication écrite", "score": 17 }], "status": "approved" },
  { "id": 14, "name": "Benoit Simon", "username": "benoit.simon", "matricule": "ISP/24/1014", "section": "Sciences Exactes", "department": "Biologie - Chimie", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 12 }, { "courseName": "Systèmes d’exploitation", "score": 7 }, { "courseName": "Programmation orientée objet", "score": 18 }], "status": "approved" },
  { "id": 15, "name": "Elodie Garcia", "username": "elodie.garcia", "matricule": "ISP/24/1015", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Informatique de Gestion", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 16 }, { "courseName": "Mathématiques générales", "score": 15 }, { "courseName": "Communication écrite", "score": 10 }], "status": "approved" },
  { "id": 16, "name": "Elodie Simon", "username": "elodie.simon", "matricule": "ISP/24/1016", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Informatique de Gestion", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 19 }, { "courseName": "Algèbre linéaire", "score": 14 }, { "courseName": "Structures de données", "score": 12 }], "status": "approved" },
  { "id": 17, "name": "Elodie Bernard", "username": "elodie.bernard", "matricule": "ISP/24/1017", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 11 }, { "courseName": "Mathématiques générales", "score": 20 }, { "courseName": "Communication écrite", "score": 12 }], "status": "approved" },
  { "id": 18, "name": "Céline Laurent", "username": "céline.laurent", "matricule": "ISP/24/1018", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Hôtellerie", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 16 }, { "courseName": "Mathématiques générales", "score": 18 }, { "courseName": "Communication écrite", "score": 13 }], "status": "approved" },
  { "id": 19, "name": "Aline Leroy", "username": "aline.leroy", "matricule": "ISP/24/1019", "section": "Sciences Exactes", "department": "Biologie - Chimie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 6 }, { "courseName": "Algèbre linéaire", "score": 17 }, { "courseName": "Structures de données", "score": 8 }], "status": "approved" },
  { "id": 20, "name": "Hugo Garcia", "username": "hugo.garcia", "matricule": "ISP/24/1020", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 15 }, { "courseName": "Systèmes d’exploitation", "score": 14 }, { "courseName": "Programmation orientée objet", "score": 12 }], "status": "approved" },
  { "id": 21, "name": "Julien Lefebvre", "username": "julien.lefebvre", "matricule": "ISP/24/1021", "section": "Lettres et Sciences Humaines", "department": "Histoire et Sciences Sociales", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 11 }, { "courseName": "Systèmes d’exploitation", "score": 19 }, { "courseName": "Programmation orientée objet", "score": 19 }], "status": "approved" },
  { "id": 22, "name": "David Simon", "username": "david.simon", "matricule": "ISP/24/1022", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 20 }, { "courseName": "Mathématiques générales", "score": 8 }, { "courseName": "Communication écrite", "score": 8 }], "status": "approved" },
  { "id": 23, "name": "Benoit David", "username": "benoit.david", "matricule": "ISP/24/1023", "section": "Lettres et Sciences Humaines", "department": "Français et Langues Africaines", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 5 }, { "courseName": "Mathématiques générales", "score": 9 }, { "courseName": "Communication écrite", "score": 9 }], "status": "approved" },
  { "id": 24, "name": "Julien Laurent", "username": "julien.laurent", "matricule": "ISP/24/1024", "section": "Sciences Exactes", "department": "Géographie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 15 }, { "courseName": "Algèbre linéaire", "score": 13 }, { "courseName": "Structures de données", "score": 6 }], "status": "approved" },
  { "id": 25, "name": "Aline Lefebvre", "username": "aline.lefebvre", "matricule": "ISP/24/1025", "section": "Lettres et Sciences Humaines", "department": "Histoire et Sciences Sociales", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 8 }, { "courseName": "Algèbre linéaire", "score": 11 }, { "courseName": "Structures de données", "score": 9 }], "status": "approved" },
  { "id": 26, "name": "Elodie Michel", "username": "elodie.michel", "matricule": "ISP/24/1026", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Restauration", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 8 }, { "courseName": "Algèbre linéaire", "score": 15 }, { "courseName": "Structures de données", "score": 7 }], "status": "approved" },
  { "id": 27, "name": "Céline Leroy", "username": "céline.leroy", "matricule": "ISP/24/1027", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Informatique de Gestion", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 7 }, { "courseName": "Systèmes d’exploitation", "score": 9 }, { "courseName": "Programmation orientée objet", "score": 17 }], "status": "approved" },
  { "id": 28, "name": "Elodie Bernard", "username": "elodie.bernard", "matricule": "ISP/24/1028", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 12 }, { "courseName": "Mathématiques générales", "score": 13 }, { "courseName": "Communication écrite", "score": 13 }], "status": "approved" },
  { "id": 29, "name": "Aline Dubois", "username": "aline.dubois", "matricule": "ISP/24/1029", "section": "Lettres et Sciences Humaines", "department": "Français et Langues Africaines", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 18 }, { "courseName": "Algèbre linéaire", "score": 18 }, { "courseName": "Structures de données", "score": 19 }], "status": "approved" },
  { "id": 30, "name": "Fabien David", "username": "fabien.david", "matricule": "ISP/24/1030", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Restauration", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 18 }, { "courseName": "Systèmes d’exploitation", "score": 14 }, { "courseName": "Programmation orientée objet", "score": 7 }], "status": "approved" },
  { "id": 31, "name": "Ines Leroy", "username": "ines.leroy", "matricule": "ISP/24/1031", "section": "Lettres et Sciences Humaines", "department": "Anglais et Cultures Africaines", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 14 }, { "courseName": "Systèmes d’exploitation", "score": 5 }, { "courseName": "Programmation orientée objet", "score": 16 }], "status": "approved" },
  { "id": 32, "name": "Céline Michel", "username": "céline.michel", "matricule": "ISP/24/1032", "section": "Lettres et Sciences Humaines", "department": "Histoire et Sciences Sociales", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 18 }, { "courseName": "Algèbre linéaire", "score": 16 }, { "courseName": "Structures de données", "score": 14 }], "status": "approved" },
  { "id": 33, "name": "Elodie David", "username": "elodie.david", "matricule": "ISP/24/1033", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Informatique de Gestion", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 9 }, { "courseName": "Algèbre linéaire", "score": 13 }, { "courseName": "Structures de données", "score": 6 }], "status": "approved" },
  { "id": 34, "name": "Céline Simon", "username": "céline.simon", "matricule": "ISP/24/1034", "section": "Lettres et Sciences Humaines", "department": "Psycho-Pédagogie", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 8 }, { "courseName": "Mathématiques générales", "score": 13 }, { "courseName": "Communication écrite", "score": 18 }], "status": "approved" },
  { "id": 35, "name": "Julien Lefebvre", "username": "julien.lefebvre", "matricule": "ISP/24/1035", "section": "Sciences Exactes", "department": "Géographie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 7 }, { "courseName": "Algèbre linéaire", "score": 13 }, { "courseName": "Structures de données", "score": 12 }], "status": "approved" },
  { "id": 36, "name": "Fabien Garcia", "username": "fabien.garcia", "matricule": "ISP/24/1036", "section": "Lettres et Sciences Humaines", "department": "Anglais et Cultures Africaines", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 9 }, { "courseName": "Systèmes d’exploitation", "score": 14 }, { "courseName": "Programmation orientée objet", "score": 19 }], "status": "approved" },
  { "id": 37, "name": "David Leroy", "username": "david.leroy", "matricule": "ISP/24/1037", "section": "Sciences Exactes", "department": "Géographie", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 18 }, { "courseName": "Systèmes d’exploitation", "score": 14 }, { "courseName": "Programmation orientée objet", "score": 5 }], "status": "approved" },
  { "id": 38, "name": "Elodie Lefebvre", "username": "elodie.lefebvre", "matricule": "ISP/24/1038", "section": "Sciences Exactes", "department": "Chimie - Physique", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 11 }, { "courseName": "Systèmes d’exploitation", "score": 14 }, { "courseName": "Programmation orientée objet", "score": 11 }], "status": "approved" },
  { "id": 39, "name": "Julien Michel", "username": "julien.michel", "matricule": "ISP/24/1039", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 7 }, { "courseName": "Systèmes d’exploitation", "score": 13 }, { "courseName": "Programmation orientée objet", "score": 8 }], "status": "approved" },
  { "id": 40, "name": "Hugo David", "username": "hugo.david", "matricule": "ISP/24/1040", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Commerciales et Administratives", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 20 }, { "courseName": "Mathématiques générales", "score": 14 }, { "courseName": "Communication écrite", "score": 11 }], "status": "approved" },
  { "id": 41, "name": "Benoit Lefebvre", "username": "benoit.lefebvre", "matricule": "ISP/24/1041", "section": "Sciences Exactes", "department": "Biologie - Chimie", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 5 }, { "courseName": "Mathématiques générales", "score": 16 }, { "courseName": "Communication écrite", "score": 11 }], "status": "approved" },
  { "id": 42, "name": "Benoit Lefebvre", "username": "benoit.lefebvre", "matricule": "ISP/24/1042", "section": "Lettres et Sciences Humaines", "department": "Histoire et Sciences Sociales", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 17 }, { "courseName": "Algèbre linéaire", "score": 7 }, { "courseName": "Structures de données", "score": 10 }], "status": "approved" },
  { "id": 43, "name": "Elodie Michel", "username": "elodie.michel", "matricule": "ISP/24/1043", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 5 }, { "courseName": "Algèbre linéaire", "score": 9 }, { "courseName": "Structures de données", "score": 7 }], "status": "approved" },
  { "id": 44, "name": "David Lefebvre", "username": "david.lefebvre", "matricule": "ISP/24/1044", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Economiques", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 15 }, { "courseName": "Systèmes d’exploitation", "score": 17 }, { "courseName": "Programmation orientée objet", "score": 9 }], "status": "approved" },
  { "id": 45, "name": "Elodie Simon", "username": "elodie.simon", "matricule": "ISP/24/1045", "section": "Sciences Exactes", "department": "Physique et Technologie", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 18 }, { "courseName": "Mathématiques générales", "score": 11 }, { "courseName": "Communication écrite", "score": 11 }], "status": "approved" },
  { "id": 46, "name": "Hugo Moreau", "username": "hugo.moreau", "matricule": "ISP/24/1046", "section": "Lettres et Sciences Humaines", "department": "Psycho-Pédagogie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 14 }, { "courseName": "Algèbre linéaire", "score": 9 }, { "courseName": "Structures de données", "score": 17 }], "status": "approved" },
  { "id": 47, "name": "Hugo Garcia", "username": "hugo.garcia", "matricule": "ISP/24/1047", "section": "Sciences Exactes", "department": "Biologie - Chimie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 9 }, { "courseName": "Algèbre linéaire", "score": 17 }, { "courseName": "Structures de données", "score": 8 }], "status": "approved" },
  { "id": 48, "name": "Julien David", "username": "julien.david", "matricule": "ISP/24/1048", "section": "Lettres et Sciences Humaines", "department": "Français et Langues Africaines", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 13 }, { "courseName": "Systèmes d’exploitation", "score": 19 }, { "courseName": "Programmation orientée objet", "score": 17 }], "status": "approved" },
  { "id": 49, "name": "Giselle Moreau", "username": "giselle.moreau", "matricule": "ISP/24/1049", "section": "Lettres et Sciences Humaines", "department": "Anglais et Cultures Africaines", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 17 }, { "courseName": "Mathématiques générales", "score": 20 }, { "courseName": "Communication écrite", "score": 11 }], "status": "approved" },
  { "id": 50, "name": "Benoit Garcia", "username": "benoit.garcia", "matricule": "ISP/24/1050", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 5 }, { "courseName": "Algèbre linéaire", "score": 17 }, { "courseName": "Structures de données", "score": 16 }], "status": "approved" },
  { "id": 51, "name": "David David", "username": "david.david", "matricule": "ISP/24/1051", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Commerciales et Administratives", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 13 }, { "courseName": "Systèmes d’exploitation", "score": 13 }, { "courseName": "Programmation orientée objet", "score": 13 }], "status": "approved" },
  { "id": 52, "name": "David Dubois", "username": "david.dubois", "matricule": "ISP/24/1052", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Hôtellerie", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 15 }, { "courseName": "Systèmes d’exploitation", "score": 13 }, { "courseName": "Programmation orientée objet", "score": 11 }], "status": "approved" },
  { "id": 53, "name": "Giselle Leroy", "username": "giselle.leroy", "matricule": "ISP/24/1053", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Informatique de Gestion", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 18 }, { "courseName": "Mathématiques générales", "score": 16 }, { "courseName": "Communication écrite", "score": 19 }], "status": "approved" },
  { "id": 54, "name": "Fabien David", "username": "fabien.david", "matricule": "ISP/24/1054", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Informatique de Gestion", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 8 }, { "courseName": "Algèbre linéaire", "score": 15 }, { "courseName": "Structures de données", "score": 6 }], "status": "approved" },
  { "id": 55, "name": "Hugo Dubois", "username": "hugo.dubois", "matricule": "ISP/24/1055", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Commerciales et Administratives", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 19 }, { "courseName": "Mathématiques générales", "score": 7 }, { "courseName": "Communication écrite", "score": 12 }], "status": "approved" },
  { "id": 56, "name": "David Leroy", "username": "david.leroy", "matricule": "ISP/24/1056", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Commerciales et Administratives", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 17 }, { "courseName": "Systèmes d’exploitation", "score": 13 }, { "courseName": "Programmation orientée objet", "score": 10 }], "status": "approved" },
  { "id": 57, "name": "Fabien Lefebvre", "username": "fabien.lefebvre", "matricule": "ISP/24/1057", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Restauration", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 13 }, { "courseName": "Systèmes d’exploitation", "score": 17 }, { "courseName": "Programmation orientée objet", "score": 17 }], "status": "approved" },
  { "id": 58, "name": "Hugo David", "username": "hugo.david", "matricule": "ISP/24/1058", "section": "Lettres et Sciences Humaines", "department": "Anglais et Cultures Africaines", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 19 }, { "courseName": "Systèmes d’exploitation", "score": 18 }, { "courseName": "Programmation orientée objet", "score": 20 }], "status": "approved" },
  { "id": 59, "name": "Giselle Dubois", "username": "giselle.dubois", "matricule": "ISP/24/1059", "section": "Sciences Exactes", "department": "Géographie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 9 }, { "courseName": "Algèbre linéaire", "score": 11 }, { "courseName": "Structures de données", "score": 14 }], "status": "approved" },
  { "id": 60, "name": "Ines David", "username": "ines.david", "matricule": "ISP/24/1060", "section": "Sciences Exactes", "department": "Mathématiques - I", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 18 }, { "courseName": "Algèbre linéaire", "score": 20 }, { "courseName": "Structures de données", "score": 12 }], "status": "approved" },
  { "id": 61, "name": "Julien Leroy", "username": "julien.leroy", "matricule": "ISP/24/1061", "section": "Sciences Exactes", "department": "Géographie", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 8 }, { "courseName": "Mathématiques générales", "score": 19 }, { "courseName": "Communication écrite", "score": 20 }], "status": "approved" },
  { "id": 62, "name": "Aline Simon", "username": "aline.simon", "matricule": "ISP/24/1062", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Commerciales et Administratives", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 7 }, { "courseName": "Systèmes d’exploitation", "score": 18 }, { "courseName": "Programmation orientée objet", "score": 6 }], "status": "approved" },
  { "id": 63, "name": "Ines David", "username": "ines.david", "matricule": "ISP/24/1063", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Commerciales et Administratives", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 11 }, { "courseName": "Systèmes d’exploitation", "score": 6 }, { "courseName": "Programmation orientée objet", "score": 13 }], "status": "approved" },
  { "id": 64, "name": "Elodie Garcia", "username": "elodie.garcia", "matricule": "ISP/24/1064", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Economiques", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 18 }, { "courseName": "Systèmes d’exploitation", "score": 19 }, { "courseName": "Programmation orientée objet", "score": 18 }], "status": "approved" },
  { "id": 65, "name": "Julien Simon", "username": "julien.simon", "matricule": "ISP/24/1065", "section": "Sciences Exactes", "department": "Mathématiques - I", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 13 }, { "courseName": "Mathématiques générales", "score": 8 }, { "courseName": "Communication écrite", "score": 15 }], "status": "approved" },
  { "id": 66, "name": "Hugo Garcia", "username": "hugo.garcia", "matricule": "ISP/24/1066", "section": "Lettres et Sciences Humaines", "department": "Français et Langues Africaines", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 17 }, { "courseName": "Mathématiques générales", "score": 8 }, { "courseName": "Communication écrite", "score": 12 }], "status": "approved" },
  { "id": 67, "name": "David Bernard", "username": "david.bernard", "matricule": "ISP/24/1067", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Economiques", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 15 }, { "courseName": "Algèbre linéaire", "score": 17 }, { "courseName": "Structures de données", "score": 7 }], "status": "approved" },
  { "id": 68, "name": "David David", "username": "david.david", "matricule": "ISP/24/1068", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Economiques", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 11 }, { "courseName": "Algèbre linéaire", "score": 11 }, { "courseName": "Structures de données", "score": 14 }], "status": "approved" },
  { "id": 69, "name": "Elodie Garcia", "username": "elodie.garcia", "matricule": "ISP/24/1069", "section": "Lettres et Sciences Humaines", "department": "Psycho-Pédagogie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 10 }, { "courseName": "Algèbre linéaire", "score": 11 }, { "courseName": "Structures de données", "score": 7 }], "status": "approved" },
  { "id": 70, "name": "Elodie Simon", "username": "elodie.simon", "matricule": "ISP/24/1070", "section": "Sciences Exactes", "department": "Géographie", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 7 }, { "courseName": "Mathématiques générales", "score": 6 }, { "courseName": "Communication écrite", "score": 18 }], "status": "approved" },
  { "id": 71, "name": "Aline Moreau", "username": "aline.moreau", "matricule": "ISP/24/1071", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Economiques", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 7 }, { "courseName": "Mathématiques générales", "score": 5 }, { "courseName": "Communication écrite", "score": 18 }], "status": "approved" },
  { "id": 72, "name": "Hugo Dubois", "username": "hugo.dubois", "matricule": "ISP/24/1072", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Hôtellerie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 17 }, { "courseName": "Algèbre linéaire", "score": 12 }, { "courseName": "Structures de données", "score": 5 }], "status": "approved" },
  { "id": 73, "name": "David Leroy", "username": "david.leroy", "matricule": "ISP/24/1073", "section": "Lettres et Sciences Humaines", "department": "Histoire et Sciences Sociales", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 18 }, { "courseName": "Mathématiques générales", "score": 11 }, { "courseName": "Communication écrite", "score": 11 }], "status": "approved" },
  { "id": 74, "name": "Elodie Dubois", "username": "elodie.dubois", "matricule": "ISP/24/1074", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Commerciales et Administratives", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 7 }, { "courseName": "Systèmes d’exploitation", "score": 7 }, { "courseName": "Programmation orientée objet", "score": 13 }], "status": "approved" },
  { "id": 75, "name": "Fabien Lefebvre", "username": "fabien.lefebvre", "matricule": "ISP/24/1075", "section": "Lettres et Sciences Humaines", "department": "Français et Langues Africaines", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 17 }, { "courseName": "Mathématiques générales", "score": 8 }, { "courseName": "Communication écrite", "score": 5 }], "status": "approved" },
  { "id": 76, "name": "Céline Leroy", "username": "céline.leroy", "matricule": "ISP/24/1076", "section": "Sciences Exactes", "department": "Mathématiques - Physique", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 10 }, { "courseName": "Mathématiques générales", "score": 6 }, { "courseName": "Communication écrite", "score": 11 }], "status": "approved" },
  { "id": 77, "name": "Céline Moreau", "username": "céline.moreau", "matricule": "ISP/24/1077", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Informatique de Gestion", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 9 }, { "courseName": "Algèbre linéaire", "score": 11 }, { "courseName": "Structures de données", "score": 6 }], "status": "approved" },
  { "id": 78, "name": "Aline Leroy", "username": "aline.leroy", "matricule": "ISP/24/1078", "section": "Sciences Exactes", "department": "Chimie - Physique", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 7 }, { "courseName": "Algèbre linéaire", "score": 6 }, { "courseName": "Structures de données", "score": 10 }], "status": "approved" },
  { "id": 79, "name": "Elodie Lefebvre", "username": "elodie.lefebvre", "matricule": "ISP/24/1079", "section": "Sciences Exactes", "department": "Mathématiques - I", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 7 }, { "courseName": "Systèmes d’exploitation", "score": 18 }, { "courseName": "Programmation orientée objet", "score": 7 }], "status": "approved" },
  { "id": 80, "name": "Hugo Simon", "username": "hugo.simon", "matricule": "ISP/24/1080", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 14 }, { "courseName": "Mathématiques générales", "score": 5 }, { "courseName": "Communication écrite", "score": 5 }], "status": "approved" },
  { "id": 81, "name": "Ines Michel", "username": "ines.michel", "matricule": "ISP/24/1081", "section": "Sciences Exactes", "department": "Mathématiques - Physique", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 20 }, { "courseName": "Mathématiques générales", "score": 19 }, { "courseName": "Communication écrite", "score": 20 }], "status": "approved" },
  { "id": 82, "name": "Giselle Garcia", "username": "giselle.garcia", "matricule": "ISP/24/1082", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Commerciales et Administratives", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 14 }, { "courseName": "Algèbre linéaire", "score": 8 }, { "courseName": "Structures de données", "score": 20 }], "status": "approved" },
  { "id": 83, "name": "Fabien Laurent", "username": "fabien.laurent", "matricule": "ISP/24/1083", "section": "Sciences Exactes", "department": "Physique et Technologie", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 6 }, { "courseName": "Systèmes d’exploitation", "score": 7 }, { "courseName": "Programmation orientée objet", "score": 7 }], "status": "approved" },
  { "id": 84, "name": "Giselle Bernard", "username": "giselle.bernard", "matricule": "ISP/24/1084", "section": "Lettres et Sciences Humaines", "department": "Psycho-Pédagogie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 17 }, { "courseName": "Algèbre linéaire", "score": 7 }, { "courseName": "Structures de données", "score": 11 }], "status": "approved" },
  { "id": 85, "name": "Benoit Lefebvre", "username": "benoit.lefebvre", "matricule": "ISP/24/1085", "section": "Sciences Exactes", "department": "Géographie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 20 }, { "courseName": "Algèbre linéaire", "score": 20 }, { "courseName": "Structures de données", "score": 5 }], "status": "approved" },
  { "id": 86, "name": "Aline Michel", "username": "aline.michel", "matricule": "ISP/24/1086", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Restauration", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 11 }, { "courseName": "Mathématiques générales", "score": 14 }, { "courseName": "Communication écrite", "score": 12 }], "status": "approved" },
  { "id": 87, "name": "Giselle Dubois", "username": "giselle.dubois", "matricule": "ISP/24/1087", "section": "Sciences Exactes", "department": "Chimie - Physique", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 19 }, { "courseName": "Algèbre linéaire", "score": 6 }, { "courseName": "Structures de données", "score": 8 }], "status": "approved" },
  { "id": 88, "name": "Giselle Moreau", "username": "giselle.moreau", "matricule": "ISP/24/1088", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Restauration", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 11 }, { "courseName": "Systèmes d’exploitation", "score": 19 }, { "courseName": "Programmation orientée objet", "score": 6 }], "status": "approved" },
  { "id": 89, "name": "Céline Leroy", "username": "céline.leroy", "matricule": "ISP/24/1089", "section": "Sciences Exactes", "department": "Mathématiques - I", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 16 }, { "courseName": "Systèmes d’exploitation", "score": 10 }, { "courseName": "Programmation orientée objet", "score": 11 }], "status": "approved" },
  { "id": 90, "name": "Ines Garcia", "username": "ines.garcia", "matricule": "ISP/24/1090", "section": "Sciences Exactes", "department": "Mathématiques - Physique", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 19 }, { "courseName": "Systèmes d’exploitation", "score": 6 }, { "courseName": "Programmation orientée objet", "score": 8 }], "status": "approved" },
  { "id": 91, "name": "Céline Simon", "username": "céline.simon", "matricule": "ISP/24/1091", "section": "Lettres et Sciences Humaines", "department": "Psycho-Pédagogie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 18 }, { "courseName": "Algèbre linéaire", "score": 7 }, { "courseName": "Structures de données", "score": 11 }], "status": "approved" },
  { "id": 92, "name": "Aline Simon", "username": "aline.simon", "matricule": "ISP/24/1092", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Economiques", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 20 }, { "courseName": "Algèbre linéaire", "score": 17 }, { "courseName": "Structures de données", "score": 11 }], "status": "approved" },
  { "id": 93, "name": "Hugo David", "username": "hugo.david", "matricule": "ISP/24/1093", "section": "Lettres et Sciences Humaines", "department": "Anglais et Cultures Africaines", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 17 }, { "courseName": "Mathématiques générales", "score": 13 }, { "courseName": "Communication écrite", "score": 7 }], "status": "approved" },
  { "id": 94, "name": "Ines Laurent", "username": "ines.laurent", "matricule": "ISP/24/1094", "section": "Sciences Exactes", "department": "Agro Vétérinaire", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 19 }, { "courseName": "Algèbre linéaire", "score": 10 }, { "courseName": "Structures de données", "score": 7 }], "status": "approved" },
  { "id": 95, "name": "Julien Laurent", "username": "julien.laurent", "matricule": "ISP/24/1095", "section": "Sciences Commerciales Administratives et Informatique (SCAI)", "department": "Sciences Economiques", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 11 }, { "courseName": "Systèmes d’exploitation", "score": 11 }, { "courseName": "Programmation orientée objet", "score": 13 }], "status": "approved" },
  { "id": 96, "name": "Benoit David", "username": "benoit.david", "matricule": "ISP/24/1096", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Accueil et Tourisme", "promotion": "L1 LMD", "grades": [{ "courseName": "Introduction à l’informatique", "score": 10 }, { "courseName": "Mathématiques générales", "score": 12 }, { "courseName": "Communication écrite", "score": 18 }], "status": "approved" },
  { "id": 97, "name": "Aline David", "username": "aline.david", "matricule": "ISP/24/1097", "section": "Lettres et Sciences Humaines", "department": "Français et Langues Africaines", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 11 }, { "courseName": "Systèmes d’exploitation", "score": 7 }, { "courseName": "Programmation orientée objet", "score": 11 }], "status": "approved" },
  { "id": 98, "name": "Ines Lefebvre", "username": "ines.lefebvre", "matricule": "ISP/24/1098", "section": "Lettres et Sciences Humaines", "department": "Anglais et Cultures Africaines", "promotion": "L3 LMD", "grades": [{ "courseName": "Bases de données", "score": 20 }, { "courseName": "Systèmes d’exploitation", "score": 14 }, { "courseName": "Programmation orientée objet", "score": 10 }], "status": "approved" },
  { "id": 99, "name": "Julien Michel", "username": "julien.michel", "matricule": "ISP/24/1099", "section": "Hôtellerie, Accueil et Tourisme (HAT)", "department": "Hôtellerie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 7 }, { "courseName": "Algèbre linéaire", "score": 9 }, { "courseName": "Structures de données", "score": 11 }], "status": "approved" },
  { "id": 100, "name": "Ines David", "username": "ines.david", "matricule": "ISP/24/1100", "section": "Sciences Exactes", "department": "Biologie - Chimie", "promotion": "L2 LMD", "grades": [{ "courseName": "Programmation impérative", "score": 5 }, { "courseName": "Algèbre linéaire", "score": 16 }, { "courseName": "Structures de données", "score": 16 }], "status": "approved" }
];

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
    // Initial data is now loaded from the constant above.
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
