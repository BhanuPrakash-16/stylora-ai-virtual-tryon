/**
 * Cloudinary Service - Web Version
 * Image upload + optimization for web browsers
 */

export const cloudinaryConfig = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

/**
 * Upload image to Cloudinary
 * @param {File|Blob|string} imageInput - File, Blob, or base64 string
 * @returns {Promise<Object>} Upload result with URL
 */
export async function uploadToCloudinary(imageInput) {
    if (!imageInput) {
        return {
            url: null,
            publicId: null,
            error: 'Image is required',
        };
    }

    try {
        const formData = new FormData();

        // Handle different input types
        if (imageInput instanceof File) {
            formData.append('file', imageInput);
        } else if (imageInput instanceof Blob) {
            formData.append('file', imageInput, 'image.jpg');
        } else if (typeof imageInput === 'string') {
            // Base64 string
            formData.append('file', imageInput);
        }

        formData.append('upload_preset', cloudinaryConfig.uploadPreset);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.error?.message || 'Upload failed');
        }

        return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            error: null,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return {
            url: null,
            publicId: null,
            error: error.message || 'Upload failed',
        };
    }
}

/**
 * Get optimized image URL from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Optimization options
 * @returns {string} Optimized URL
 */
export function getOptimizedUrl(publicId, options = {}) {
    if (!publicId) return null;

    const {
        width = 800,
        quality = 'auto',
        format = 'auto',
    } = options;

    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/w_${width},q_${quality},f_${format}/${publicId}`;
}

export default uploadToCloudinary;
