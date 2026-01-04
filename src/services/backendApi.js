/**
 * Backend API Service
 * ===================
 * Client for communicating with FastAPI backend.
 */

import { auth } from '../config/firebase';

// Backend URL from environment
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

/**
 * Get Firebase ID token for authenticated requests
 */
async function getAuthToken() {
    const user = auth.currentUser;
    if (!user) return null;

    try {
        const token = await user.getIdToken();
        return token;
    } catch (error) {
        console.warn('Failed to get auth token:', error);
        return null;
    }
}

/**
 * Perform virtual try-on
 * @param {File} personFile - Person image file
 * @param {File} garmentFile - Garment image file
 * @returns {Promise<Object>} Try-on result
 */
export async function performTryOn(personFile, garmentFile) {
    try {
        const formData = new FormData();
        formData.append('person_image', personFile);
        formData.append('garment_image', garmentFile);

        // Get auth token (optional)
        const token = await getAuthToken();
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE}/api/tryon`, {
            method: 'POST',
            headers,
            body: formData
        });

        const result = await response.json();

        return result;

    } catch (error) {
        console.error('Try-on API error:', error);
        return {
            status: 'error',
            message: `Network error: ${error.message}. Please check if backend is running.`,
            reason: 'network_error'
        };
    }
}

/**
 * Validate images before try-on
 * @param {File} personFile - Person image file (optional)
 * @param {File} garmentFile - Garment image file (optional)
 * @returns {Promise<Object>} Validation result
 */
export async function validateImages(personFile, garmentFile) {
    try {
        const formData = new FormData();
        if (personFile) formData.append('person_image', personFile);
        if (garmentFile) formData.append('garment_image', garmentFile);

        const token = await getAuthToken();
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE}/api/validate`, {
            method: 'POST',
            headers,
            body: formData
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Validation API error:', error);
        return {
            error: `Network error: ${error.message}`
        };
    }
}

/**
 * Get safety rules
 * @returns {Promise<Object>} Safety rules
 */
export async function getSafetyRules() {
    try {
        const response = await fetch(`${API_BASE}/api/safety-rules`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Safety rules API error:', error);
        return null;
    }
}

/**
 * Health check
 * @returns {Promise<Object>} Health status
 */
export async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE}/health`);
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            overall: 'unhealthy',
            error: error.message
        };
    }
}

export default {
    performTryOn,
    validateImages,
    getSafetyRules,
    checkBackendHealth
};
