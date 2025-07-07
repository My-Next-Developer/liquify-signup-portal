interface ApiError {
    detail?: string
    message?: string
    errors?: Record<string, string[]>
    status?: number
}

export function getErrorMessage(error: unknown): string {
    // Handle axios error response
    const axiosError = error as { response?: { data?: ApiError; status?: number } }
    if (axiosError?.response?.data) {
        const apiError: ApiError = axiosError.response.data

        // Always prioritize backend error messages over frontend generic ones
        if (apiError.detail) {
            return apiError.detail
        }

        if (apiError.message) {
            return apiError.message
        }

        // Handle field-specific errors with specific messages
        if (apiError.errors) {
            const fieldErrors = Object.entries(apiError.errors)
            const specificMessages: string[] = []

            for (const [field, errors] of fieldErrors) {
                const errorMessages = Array.isArray(errors) ? errors : [errors]

                for (const errorMsg of errorMessages) {
                    // Handle specific field errors
                    if (field === 'username') {
                        if (errorMsg.includes('already exists') || errorMsg.includes('unique')) {
                            specificMessages.push('An account with this username already exists.')
                        } else {
                            specificMessages.push(`Username: ${errorMsg}`)
                        }
                    } else if (field === 'email') {
                        if (errorMsg.includes('already exists') || errorMsg.includes('unique')) {
                            specificMessages.push('An account with this email already exists.')
                        } else {
                            specificMessages.push(`Email: ${errorMsg}`)
                        }
                    } else if (field === 'password') {
                        specificMessages.push(`Password: ${errorMsg}`)
                    } else if (field === 'non_field_errors') {
                        specificMessages.push(errorMsg)
                    } else {
                        specificMessages.push(`${field}: ${errorMsg}`)
                    }
                }
            }

            if (specificMessages.length > 0) {
                return specificMessages.join(' ')
            }
        }

        // Only show generic messages if backend didn't provide any specific messages
        const status = axiosError.response.status
        switch (status) {
            case 400:
                return 'Invalid request. Please check your input and try again.'
            case 401:
                return 'Invalid username or password. Please try again.'
            case 403:
                return 'You do not have permission to perform this action.'
            case 404:
                return 'The requested resource was not found.'
            case 422:
                return 'Validation error. Please check your input.'
            case 500:
                return 'Server error. Please try again later.'
            default:
                return 'An unexpected error occurred. Please try again.'
        }
    }

    // Handle network errors
    const genericError = error as { code?: string; message?: string }
    if (genericError?.code === 'NETWORK_ERROR' || genericError?.message?.includes('Network Error')) {
        return 'Network error. Please check your internet connection and try again.'
    }

    // Handle timeout errors
    if (genericError?.code === 'ECONNABORTED' || genericError?.message?.includes('timeout')) {
        return 'Request timed out. Please try again.'
    }

    // Handle generic errors
    if (genericError?.message) {
        return genericError.message
    }

    return 'An unexpected error occurred. Please try again.'
}

export function getErrorVariant(error: unknown): 'error' | 'warning' | 'info' {
    const axiosError = error as { response?: { status?: number } }
    if (axiosError?.response?.status) {
        const status = axiosError.response.status
        if (status >= 500) return 'error'
        if (status >= 400) return 'warning'
        return 'info'
    }
    return 'error'
}
