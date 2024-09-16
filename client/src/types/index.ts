export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
  }
  
  export interface Product {
    id?: string;
    name: string;
    type: string;
    status: 'Disponible' | 'En Reparación' | 'Asignado';
    location: string;
    acquisitionDate: string;
  }
  
  
  