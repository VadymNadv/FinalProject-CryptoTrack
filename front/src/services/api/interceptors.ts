import axios, { AxiosError } from 'axios';
import {API_BASE_URL} from "@/config/api.config.ts";

export const coingeckoApi = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    timeout: 15000,
});

coingeckoApi.interceptors.request.use(
    (config) => {

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

coingeckoApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            console.error(`[API Error] Status: ${error.response.status}, Message: ${error.message}`);
        } else if (error.request) {
            console.error("[Network Error] Немає відповіді від сервера.");
        }
        return Promise.reject(error);
    }
);