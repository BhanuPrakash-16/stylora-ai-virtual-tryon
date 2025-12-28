import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Loading Overlay
 * @param {string} message - Optional message to show
 * @param {boolean} fullScreen - Whether to cover the whole screen or just parent
 */
export default function LoadingOverlay({ message = "Loading...", fullScreen = true }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: fullScreen ? 'fixed' : 'absolute',
                inset: 0,
                zIndex: 1000,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'inherit'
            }}
        >
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                {/* Glow Effect */}
                <div
                    className="pulse-glow"
                    style={{
                        position: 'absolute',
                        inset: -20,
                        background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)',
                        opacity: 0.3,
                        borderRadius: '50%'
                    }}
                />

                {/* Liquid Spinner */}
                <div className="premium-spinner spinner-lg" />
            </div>

            {message && (
                <p className="loading-shimmer" style={{ fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
                    {message}
                </p>
            )}
        </motion.div>
    );
}
