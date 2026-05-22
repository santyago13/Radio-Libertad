// src/api/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = {
    // Un método genérico para hacer GET
    get: async (endpoint) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        return response.json();
    },
    
    // Si necesitás exponer la URL base para cosas más complejas (como FormData)
    baseUrl: API_BASE_URL
};