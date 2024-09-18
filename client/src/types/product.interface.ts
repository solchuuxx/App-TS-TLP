export interface Product {
    _id?: string;
    name: string;
    type: string;
    status: 'Disponible' | 'En Reparación' | 'Asignado' | 'OtroEstado';
    location: string;
    acquisitionDate: string;
}
  
  
  