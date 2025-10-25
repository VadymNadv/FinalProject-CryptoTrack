// src/services/api/interceptors.ts
import axios, { AxiosError } from 'axios';
import {API_BASE_URL} from "@/config/api.config.ts";


export const coingeckoApi = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    timeout: 15000,
});


coingeckoApi.interceptors.request.use(
    (config) => {
        console.log(`[API Request] => ${config.method?.toUpperCase()} ${config.url}`, config.params || ''); // Додано params для деталей
        return config;
    },
    (error) => {
        console.error("[API Request Error]", error);
        return Promise.reject(error);
    }
);


coingeckoApi.interceptors.response.use(
    (response) => {

        return response; // Повертаємо відповідь далі
    },
    (error: AxiosError) => {
        if (error.response) {
            console.error(`[API Response Error] Status: ${error.response.status}, URL: ${error.config?.url}`, error.response.data || error.message);
        } else if (error.request) {
            console.error(`[API Network Error] No response for URL: ${error.config?.url}`, error.message);
        } else {
            console.error('[API Setup Error]', error.message); // Інша помилка
        }
        return Promise.reject(error); // Передаємо помилку далі
    }
);