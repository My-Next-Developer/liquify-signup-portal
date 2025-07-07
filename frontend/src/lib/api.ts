import axios from 'axios'
import { config } from './config'

// Base URL for all API calls
export const API_BASE_URL = config.api.baseURL

// Create axios instance with base URL
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add request interceptor to include auth token
apiClient.interceptors.request.use((config) => {
    const authTokens = localStorage.getItem('authTokens')
    if (authTokens) {
        const tokens = JSON.parse(authTokens)
        config.headers.Authorization = `Bearer ${tokens.access}`
    }
    return config
})

// Helper function for fetch requests
export const apiFetch = (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })
}
