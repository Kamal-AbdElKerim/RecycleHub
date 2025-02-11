export interface Collecte {
  id: string;
  CollecteId: string;
  type: string[];
  poids: number;
  adresse: string;
  date: string;
  horaire: string;
  notes?: string;
  status: 'En attente' | 'Occupée' | 'En cours' | 'Validée' | 'Rejetée';
  collecteurId: string;
}
