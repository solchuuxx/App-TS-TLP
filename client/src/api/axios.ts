import axios from 'axios';

// Configuración de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`
  }
});

export default apiClient;
