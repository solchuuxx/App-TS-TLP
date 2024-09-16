export interface Equipment {
    name: string;
    type: string;
    status: 'Disponible' | 'En Reparación' | 'Asignado';
    location: string;
    acquisitionDate: string;
  }
  