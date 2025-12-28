import React from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiZap, FiHeart, FiTrendingUp } from 'react-icons/fi';

export default function Features() {
    const features = [
        {
            icon: <FiLock size={28} />,
            title: 'Privacy First',
            description: 'On-device processing means your photos never leave your browser. Complete privacy, always.',
            color: '#7C9473'
        },
        {
            icon: <FiZap size={28} />,
            title: 'Instant Results',
            description: 'AI-powered try-on in seconds. No waiting, no hassle. Just upload and see.',
            color: '#D4A574'
        },
        {
            icon: <FiHeart size={28} />,
            title: 'Shop Confident',
            description: 'See exactly how clothes look before buying. Less returns, more happiness.',
            color: '#B85C50'
        },
        {
            icon: <FiTrendingUp size={28} />,
            title: 'Sustainable',
            description: 'Make informed decisions, reduce waste. Better for you, better for the planet.',
            color: '#7D8FA3'
        }
    ];

    return (
        <section style={{
            padding: '8rem 2rem',
            background: '#F5F3F0'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p style={{
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#9C9691',
                        marginBottom: '1rem'
                    }}>
                        Why Choose Us
                    </p>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 3vw, 3rem)',
                        fontWeight: '300',
                        color: '#2C2825'
                    }}>
                        Built for Modern Fashion
                    </h2>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '2rem'
                }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            style={{
                                padding: '2.5rem 2rem',
                                background: 'white',
                                borderRadius: '12px',
                                border: '1px solid rgba(44,40,37,0.08)'
                            }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(44,40,37,0.08)' }}
                        >
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '12px',
                                background: `${feature.color}15`,
                                color: feature.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '400',
                                marginBottom: '0.75rem',
                                color: '#2C2825'
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                color: '#6B6560',
                                lineHeight: '1.6',
                                fontWeight: '300',
                                fontSize: '0.9375rem'
                            }}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
