import axios from 'axios';

// URL base de tu API de Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

export default api;
