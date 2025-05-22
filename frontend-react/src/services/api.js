import axios from 'axios';

// URL base de tu API de Spring Boot (asegúrate de que sea correcta)
const api = axios.create({
  baseURL: 'http://localhost:8080/api/',  // Cambia esta URL a la que corresponda con tu backend
});

export default api;
