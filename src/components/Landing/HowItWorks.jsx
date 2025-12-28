import React from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiImage, FiZap } from 'react-icons/fi';

export default function HowItWorks() {
    const steps = [
        {
            icon: <FiUpload size={32} />,
            title: 'Upload Photo',
            description: 'Capture or upload your photo. All processing happens on your device for complete privacy.'
        },
        {
            icon: <FiImage size={32} />,
            title: 'Choose Garment',
            description: 'Select from curated styles or upload your own. See how it looks before you buy.'
        },
        {
            icon: <FiZap size={32} />,
            title: 'AI Magic',
            description: 'Our AI creates an instant, realistic preview. Save, share, or try another style!'
        }
    ];

    return (
        <section id="how-it-works" style={{
            padding: '8rem 2rem',
            background: '#FFFFFF',
            position: 'relative'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p style={{
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#9C9691',
                        marginBottom: '1rem'
                    }}>
                        Three Simple Steps
                    </p>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 3vw, 3rem)',
                        fontWeight: '300',
                        color: '#2C2825'
                    }}>
                        How It Works
                    </h2>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem'
                }}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            style={{
                                padding: '2.5rem 2rem',
                                textAlign: 'center',
                                background: '#FAFAF8',
                                borderRadius: '16px',
                                border: '1px solid rgba(44,40,37,0.1)'
                            }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(44,40,37,0.08)' }}
                        >
                            <div style={{
                                width: '72px',
                                height: '72px',
                                margin: '0 auto 2rem',
                                background: 'linear-gradient(135deg, #8B7355 0%, #A68968 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                {step.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.375rem',
                                fontWeight: '400',
                                marginBottom: '1rem',
                                color: '#2C2825'
                            }}>
                                {step.title}
                            </h3>
                            <p style={{
                                color: '#6B6560',
                                lineHeight: '1.6',
                                fontWeight: '300'
                            }}>
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
