import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiAlertTriangle, FiCheckCircle, FiXCircle, FiArrowLeft } from 'react-icons/fi';
import '../styles/styles.css';

export default function Safety() {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-background)',
            padding: '2rem',
            paddingTop: '4rem'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        marginBottom: '2rem'
                    }}
                >
                    <FiArrowLeft /> Back
                </motion.button>

                {/* Header */}
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <FiShield size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                        Safety Policy
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Stylora&apos;s commitment to safe and responsible AI
                    </p>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Age Requirement */}
                    <Section
                        icon={<FiAlertTriangle />}
                        title="Age Requirement"
                        iconColor="#F59E0B"
                    >
                        <p>• Stylora is exclusively for users <strong>18 years of age and older</strong>.</p>
                        <p>• Age verification is mandatory on first use.</p>
                        <p>• Users found to be under 18 will be <strong>permanently blocked</strong> from the platform.</p>
                        <p>• This policy exists to comply with legal requirements and ensure responsible use of AI technology.</p>
                    </Section>

                    {/* Allowed Content */}
                    <Section
                        icon={<FiCheckCircle />}
                        title="Allowed Content"
                        iconColor="#22C55E"
                    >
                        <p><strong>Person Images (Allowed):</strong></p>
                        <ul>
                            <li>Adults (18+) in modest, appropriate clothing</li>
                            <li>Clear, natural standing poses</li>
                            <li>Full torso visible in frame</li>
                            <li>One person per image</li>
                        </ul>
                        <p><strong>Garment Images (Allowed):</strong></p>
                        <ul>
                            <li>Shirts, T-shirts, Blouses</li>
                            <li>Pants, Jeans, Trousers</li>
                            <li>Dresses, Sarees, Kurtas</li>
                            <li>Jackets, Blazers, Sweaters</li>
                            <li>Skirts, Modest formal wear</li>
                        </ul>
                    </Section>

                    {/* Prohibited Content */}
                    <Section
                        icon={<FiXCircle />}
                        title="Prohibited Content"
                        iconColor="#EF4444"
                    >
                        <p><strong>Person Images (NOT Allowed):</strong></p>
                        <ul>
                            <li>Anyone appearing under 18 years old</li>
                            <li>Nudity or partial nudity</li>
                            <li>Revealing, transparent, or see-through clothing</li>
                            <li>Deep cleavage or exposing attire</li>
                            <li>Suggestive or inappropriate poses</li>
                            <li>Shirtless or braless images</li>
                            <li>Person too close (face/chest crop) or too far</li>
                        </ul>
                        <p><strong>Garment Images (NOT Allowed):</strong></p>
                        <ul>
                            <li>Bikini, Swimwear</li>
                            <li>Lingerie, Innerwear, Underwear</li>
                            <li>Transparent or see-through fabric</li>
                            <li>Revealing or provocative clothing</li>
                        </ul>
                    </Section>

                    {/* Enforcement */}
                    <Section
                        icon={<FiShield />}
                        title="Enforcement"
                        iconColor="#3B82F6"
                    >
                        <p>• All images are automatically screened by AI moderation before processing.</p>
                        <p>• Images that violate our safety policy are <strong>immediately rejected</strong>.</p>
                        <p>• Repeated violations may result in <strong>permanent account restriction</strong>.</p>
                        <p>• Our system operates on a &quot;fail-closed&quot; principle: if uncertain, content is treated as unsafe.</p>
                        <p>• This enforcement occurs on our servers (backend) and <strong>cannot be bypassed</strong>.</p>
                    </Section>

                    {/* Contact */}
                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        textAlign: 'center',
                        marginTop: '1rem'
                    }}>
                        <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                            Questions about our safety policy? Contact us at{' '}
                            <a href="mailto:safety@stylora.ai" style={{ color: 'var(--color-primary)' }}>
                                safety@stylora.ai
                            </a>
                        </p>
                    </div>

                </div>

                <p style={{
                    textAlign: 'center',
                    color: 'var(--color-text-tertiary)',
                    fontSize: '0.85rem',
                    marginTop: '3rem'
                }}>
                    Last updated: December 2024
                </p>
            </div>
        </div>
    );
}

function Section({ icon, title, children, iconColor }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ color: iconColor }}>{icon}</span>
                <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-text-primary)' }}>{title}</h2>
            </div>
            <div style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.7
            }}>
                {children}
            </div>
        </motion.div>
    );
}
