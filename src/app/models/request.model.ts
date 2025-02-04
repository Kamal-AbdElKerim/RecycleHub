export interface CollectionRequest {
  id: string;
  userId: string;
  collectorId?: string;
  wasteTypes: string[];
  weight: number;
  address: string;
  date: string;
  timeSlot: string;
  status: 'En attente' | 'Occupée' | 'En cours' | 'Validée' | 'Rejetée';
  pointsEarned?: number;
}
