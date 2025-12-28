import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import '../../styles/styles.css';

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section style={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 0',
            background: 'var(--color-background)',
            overflow: 'hidden'
        }}>
            {/* 2-Column Grid Container */}
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(2rem, 5vw, 6rem)',
                alignItems: 'center',
                width: '100%'
            }}>

                {/* LEFT COLUMN: Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.5rem 1rem',
                        background: 'var(--color-surface)',
                        borderRadius: '100px',
                        border: '1px solid var(--color-border)',
                        marginBottom: '2rem'
                    }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            background: 'var(--color-success)',
                            borderRadius: '50%',
                            marginRight: '0.75rem',
                            boxShadow: '0 0 0 2px rgba(124, 148, 115, 0.2)'
                        }} />
                        <span style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            letterSpacing: '0.02em',
                            color: 'var(--color-text-primary)'
                        }}>
                            AI Virtual Try-On Studio
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-hero" style={{
                        color: 'var(--color-text-primary)',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1
                    }}>
                        See how clothes look on you
                        <span style={{ display: 'block', color: 'var(--color-text-secondary)' }}>
                            before you buy.
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-body-lg" style={{
                        color: 'var(--color-text-secondary)',
                        marginBottom: '3rem',
                        maxWidth: '480px'
                    }}>
                        Real body. Real fabric. Real fit. Experience the confidence of knowing exactly how it looks without a dressing room.
                    </p>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate('/auth')}
                            style={{
                                padding: '1rem 2.5rem',
                                background: 'var(--color-text-primary)',
                                color: 'var(--color-surface)',
                                borderRadius: '100px', // Pill shape
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Get Started
                            <FiArrowRight />
                        </button>

                        <button
                            onClick={() => navigate('/try-on')}
                            style={{
                                padding: '1rem 2.5rem',
                                background: 'var(--color-surface)',
                                color: 'var(--color-text-primary)',
                                borderRadius: '100px',
                                border: '1px solid var(--color-border)',
                                fontSize: '1rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            Try with sample
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', opacity: 0.6 }}>
                        <div><strong style={{ color: 'var(--color-text-primary)' }}>100%</strong> <span style={{ fontSize: '0.875rem' }}>Private</span></div>
                        <div><strong style={{ color: 'var(--color-text-primary)' }}>HD</strong> <span style={{ fontSize: '0.875rem' }}>Realism</span></div>
                    </div>

                </motion.div>


                {/* RIGHT COLUMN: Editorial Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: 'relative' }}
                >
                    {/* Image Card */}
                    <div style={{
                        position: 'relative',
                        borderRadius: 'var(--radius-2xl)', // 32px
                        overflow: 'hidden',
                        aspectRatio: '3/4',
                        background: '#EAEAEA',
                        border: '1px solid var(--color-border-light)'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                            alt="Fashion Model Editorial"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.6s ease'
                            }}
                        />

                        {/* Floating Labels (Commerce style) */}
                        <div style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '2rem',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            padding: '1rem 1.5rem',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
                        }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>Oversized Blazer</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>98% Match</p>
                        </div>
                    </div>

                    {/* Decorative Circle Behind */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120%',
                        height: '120%',
                        background: 'radial-gradient(circle, rgba(201, 212, 193, 0.3) 0%, rgba(255,255,255,0) 70%)',
                        zIndex: -1,
                        pointerEvents: 'none'
                    }} />

                </motion.div>

            </div>
        </section>
    );
}
