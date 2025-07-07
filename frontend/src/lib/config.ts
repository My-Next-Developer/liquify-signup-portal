// Environment configuration
export const config = {
    // API Configuration
    api: {
        baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    },
    // App Configuration
    app: {
        name: 'Liquify Signup Portal',
        version: '1.0.0',
    },
} as const
