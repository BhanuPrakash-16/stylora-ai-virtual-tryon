/**
 * Safety Validation Service
 * ==========================
 * Frontend pre-checks + Backend validation calls.
 * 
 * IMPORTANT: Backend is FINAL AUTHORITY.
 * These frontend checks are for UX only.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Safety error messages (user-friendly)
 */
export const SAFETY_MESSAGES = {
    // Person image rejections
    under_18: "This service is only for users above 18 years of age.",
    nudity: "This image cannot be processed. Please upload an appropriate image.",
    partial_nudity: "Please upload a photo with full clothing coverage.",
    revealing_clothes: "Please upload a photo with modest clothing.",
    transparent_clothes: "Transparent or see-through clothing is not allowed.",
    cleavage: "Please upload a photo with modest clothing.",
    too_close: "Please move slightly away from the camera for better results.",
    too_far: "Please come closer to the camera for better accuracy.",
    partial_body: "Please ensure your full torso is visible in the frame.",
    inappropriate_pose: "Please upload a photo with a natural standing pose.",
    no_person_detected: "No person detected in the image. Please upload a clear photo.",
    multiple_persons: "Please upload a photo with only one person.",

    // Garment image rejections
    banned_category: "This garment category is not supported.",
    transparent: "Transparent or see-through garments are not allowed.",
    revealing: "Revealing garments are not supported.",
    not_garment: "Please upload an image of clothing/garment.",
    unsupported_category: "This garment type is not currently supported.",

    // Generic
    moderation_error: "Unable to verify image safety. Please try again."
};

/**
 * Validate person image via backend
 * 
 * @param {File|Blob} imageFile - Image file to validate
 * @returns {Promise<{status: string, reason?: string, message?: string}>}
 */
export async function validatePersonImage(imageFile) {
    try {
        const formData = new FormData();
        formData.append('person_image', imageFile);

        const response = await fetch(`${API_BASE}/api/v1/validate-safety`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.results?.person) {
            const personResult = result.results.person;
            return {
                status: personResult.safe ? 'safe' : 'unsafe',
                reason: personResult.reason,
                message: SAFETY_MESSAGES[personResult.reason] || personResult.message || 'Processing complete'
            };
        }

        return { status: 'safe' };
    } catch (error) {
        console.error('Safety validation error:', error);
        return {
            status: 'error',
            message: 'Unable to validate image. Please try again.'
        };
    }
}

/**
 * Validate garment image via backend
 * 
 * @param {File|Blob} imageFile - Image file to validate
 * @returns {Promise<{status: string, reason?: string, message?: string}>}
 */
export async function validateGarmentImage(imageFile) {
    try {
        const formData = new FormData();
        formData.append('garment_image', imageFile);

        const response = await fetch(`${API_BASE}/api/v1/validate-safety`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.results?.garment) {
            const garmentResult = result.results.garment;
            return {
                status: garmentResult.safe ? 'safe' : 'unsafe',
                reason: garmentResult.reason,
                message: SAFETY_MESSAGES[garmentResult.reason] || garmentResult.message || 'Processing complete'
            };
        }

        return { status: 'safe' };
    } catch (error) {
        console.error('Safety validation error:', error);
        return {
            status: 'error',
            message: 'Unable to validate image. Please try again.'
        };
    }
}

/**
 * Check user status (blocked/allowed)
 * 
 * @param {string} authToken - Firebase ID token
 * @returns {Promise<{allowed: boolean, reason?: string}>}
 */
export async function checkUserStatus(authToken) {
    try {
        const response = await fetch(`${API_BASE}/api/v1/user-status`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        return await response.json();
    } catch (error) {
        console.error('User status check error:', error);
        return { allowed: true }; // Fail open for UX, backend will enforce
    }
}

/**
 * Convert file to blob for validation
 */
export function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

export default {
    validatePersonImage,
    validateGarmentImage,
    checkUserStatus,
    SAFETY_MESSAGES
};
