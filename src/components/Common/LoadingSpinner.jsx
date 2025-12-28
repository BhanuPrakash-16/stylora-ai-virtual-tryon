import React from 'react';

/**
 * Premium Inline Spinner
 * @param {string} size - 'sm' or 'lg'
 * @param {string} color - CSS color
 */
export default function LoadingSpinner({ size = 'sm', color }) {
    const sizeClass = size === 'sm' ? 'spinner-sm' : (size === 'lg' ? 'spinner-lg' : '');

    return (
        <div
            className={`premium-spinner ${sizeClass}`}
            style={{
                '--color-text-primary': color || 'var(--color-text-primary)'
            }}
        />
    );
}
