import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function TrustBadges() {
    const navigate = useNavigate();

    return (
        <section style={{
            padding: '8rem 2rem',
            background: '#FFFFFF',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                        fontWeight: '300',
                        color: '#2C2825',
                        marginBottom: '1.5rem',
                        lineHeight: '1.3'
                    }}>
                        Ready to Transform
                        <br />
                        Your Shopping Experience?
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        color: '#6B6560',
                        marginBottom: '3rem',
                        fontWeight: '300'
                    }}>
                        Join the future of fashion with AI-powered virtual try-on
                    </p>

                    <button
                        onClick={() => navigate('/auth')}
                        style={{
                            padding: '1.25rem 3rem',
                            fontSize: '1.125rem',
                            fontWeight: '400',
                            background: '#2C2825',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#8B7355';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = '#2C2825';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Get Started — It's Free
                    </button>

                    <p style={{
                        marginTop: '1.5rem',
                        fontSize: '0.875rem',
                        color: '#9C9691',
                        fontWeight: '300'
                    }}>
                        No credit card required • Complete privacy • Always free
                    </p>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '4rem',
                        marginTop: '5rem',
                        flexWrap: 'wrap',
                        paddingTop: '4rem',
                        borderTop: '1px solid rgba(44,40,37,0.1)'
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    {[
                        { label: 'Privacy Committed', value: '100%' },
                        { label: 'Powered by Google AI', value: 'Gemini' },
                        { label: 'Processing', value: 'On-Device' }
                    ].map((item, idx) => (
                        <div key={idx}>
                            <div style={{
                                fontSize: '1.75rem',
                                fontWeight: '400',
                                color: '#8B7355',
                                marginBottom: '0.5rem'
                            }}>
                                {item.value}
                            </div>
                            <div style={{
                                fontSize: '0.875rem',
                                color: '#6B6560',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
