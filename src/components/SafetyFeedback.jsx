import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SafetyFeedback - Displays validation status and error messages
 */
export function SafetyFeedback({ status, message }) {
    if (!status) return null;

    const getStatusStyles = () => {
        switch (status) {
            case 'checking':
                return {
                    bg: 'rgba(59, 130, 246, 0.1)',
                    border: 'rgba(59, 130, 246, 0.3)',
                    color: '#3B82F6',
                    icon: '🔄'
                };
            case 'safe':
                return {
                    bg: 'rgba(34, 197, 94, 0.1)',
                    border: 'rgba(34, 197, 94, 0.3)',
                    color: '#22C55E',
                    icon: '✓'
                };
            case 'unsafe':
                return {
                    bg: 'rgba(239, 68, 68, 0.1)',
                    border: 'rgba(239, 68, 68, 0.3)',
                    color: '#EF4444',
                    icon: '✕'
                };
            case 'error':
                return {
                    bg: 'rgba(251, 191, 36, 0.1)',
                    border: 'rgba(251, 191, 36, 0.3)',
                    color: '#F59E0B',
                    icon: '⚠'
                };
            default:
                return {
                    bg: 'rgba(156, 163, 175, 0.1)',
                    border: 'rgba(156, 163, 175, 0.3)',
                    color: '#9CA3AF',
                    icon: '?'
                };
        }
    };

    const styles = getStatusStyles();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={status}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                    padding: '0.75rem 1rem',
                    background: styles.bg,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                }}
            >
                <span style={{
                    fontSize: '1rem',
                    animation: status === 'checking' ? 'spin 1s linear infinite' : 'none'
                }}>
                    {styles.icon}
                </span>
                <span style={{
                    color: styles.color,
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    lineHeight: 1.4
                }}>
                    {status === 'checking'
                        ? 'Checking safety...'
                        : message || (status === 'safe' ? 'Image approved ✓' : 'Issue detected')
                    }
                </span>
            </motion.div>
        </AnimatePresence>
    );
}

/**
 * SafetyWarning - Pre-upload content guidelines warning
 */
export function SafetyWarning({ compact = false }) {
    if (compact) {
        return (
            <div style={{
                padding: '0.75rem 1rem',
                background: 'rgba(251, 191, 36, 0.08)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                borderRadius: '8px',
                marginBottom: '1rem'
            }}>
                <p style={{
                    fontSize: '0.8rem',
                    color: '#92400E',
                    margin: 0,
                    lineHeight: 1.5
                }}>
                    ⚠️ <strong>18+ only</strong> • No revealing/transparent clothing • Supported: shirts, pants, dresses, sarees
                </p>
            </div>
        );
    }

    return (
        <div style={{
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(245, 158, 11, 0.05))',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '12px',
            marginBottom: '1.5rem'
        }}>
            <h4 style={{
                fontSize: '0.9rem',
                color: '#92400E',
                margin: '0 0 0.75rem 0',
                fontWeight: '600'
            }}>
                ⚠️ Content Guidelines
            </h4>
            <ul style={{
                fontSize: '0.85rem',
                color: '#B45309',
                margin: 0,
                paddingLeft: '1.25rem',
                lineHeight: 1.7
            }}>
                <li>Users must be <strong>18+ years old</strong></li>
                <li>No revealing, transparent, or inappropriate clothing</li>
                <li>Supported garments: shirts, t-shirts, pants, dresses, sarees</li>
                <li>Stand with full torso visible, natural pose</li>
            </ul>
        </div>
    );
}

/**
 * SafetyBadge - Small badge showing safety status
 */
export function SafetyBadge({ status }) {
    if (!status) return null;

    const config = {
        safe: { bg: '#22C55E', text: '✓ Safe' },
        unsafe: { bg: '#EF4444', text: '✕ Unsafe' },
        checking: { bg: '#3B82F6', text: '...' },
        error: { bg: '#F59E0B', text: '!' }
    };

    const { bg, text } = config[status] || config.checking;

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.25rem 0.6rem',
            background: bg,
            color: 'white',
            borderRadius: '100px',
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.03em'
        }}>
            {text}
        </span>
    );
}

export default SafetyFeedback;
