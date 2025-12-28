import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/variables.css';

export default function Privacy() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
            {/* Simple Header */}
            <header style={{
                padding: 'var(--space-xl) 0',
                background: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-border-light)'
            }}>
                <div className="container-narrow">
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            fontSize: 'var(--text-caption)',
                            marginBottom: 'var(--space-md)',
                            transition: 'color var(--transition-base)',
                            fontFamily: 'var(--font-primary)'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                    >
                        ← Back to home
                    </button>
                    <h1 className="text-section" style={{ fontSize: '36px', marginBottom: 'var(--space-sm)' }}>
                        Privacy Policy
                    </h1>
                    <p className="text-caption">
                        Last updated: December 28, 2024
                    </p>
                </div>
            </header>

            {/* Content */}
            <article className="section" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-4xl)' }}>
                <div className="container-narrow">
                    <div style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--line-height-generous)', color: 'var(--color-text-primary)' }}>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Our Commitment
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            <strong style={{ color: 'var(--color-text-primary)' }}>We do not sell personal data. Period.</strong>
                            <br /><br />
                            Stylora is built on principles of transparency, privacy, and respect. This policy explains how we collect, use, and protect your information.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            What Data We Collect
                        </h2>
                        <ul style={{ marginBottom: 'var(--space-xl)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>Account Information:</strong> Email, name, date of birth (for age verification)</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>Authentication Data:</strong> OAuth tokens if you sign in via Google</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>Try-On History:</strong> Images you choose to save (optional)</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>Technical Data:</strong> Browser type, IP address (anonymized)</li>
                        </ul>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            What We Do NOT Store
                        </h2>
                        <ul style={{ marginBottom: 'var(--space-xl)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Face biometric data</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Body measurements beyond what pose detection estimates</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Images you use for try-on unless you explicitly save them</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Location data</li>
                        </ul>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            How We Process Images
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            Virtual try-on processing happens <strong style={{ color: 'var(--color-text-primary)' }}>in your browser</strong> using client-side JavaScript. Your photos:
                        </p>
                        <ul style={{ marginBottom: 'var(--space-xl)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Are processed locally on your device</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Are not uploaded to our servers during try-on</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Are only saved if you choose "Save to History"</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Can be deleted at any time from your history</li>
                        </ul>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Third-Party Services
                        </h2>
                        <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                            We use the following trusted services:
                        </p>
                        <ul style={{ marginBottom: 'var(--space-xl)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>Firebase:</strong> Authentication and database (Google Cloud)</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>Google Gemini:</strong> Garment analysis (image sent to Google AI)</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>Cloudinary (Optional):</strong> Image hosting for sharing</li>
                        </ul>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Your Rights
                        </h2>
                        <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                            You have the right to:
                        </p>
                        <ul style={{ marginBottom: 'var(--space-xl)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Access your data</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Delete your account and all associated data</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Opt out of data collection</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Download your data</li>
                        </ul>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Data Retention
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            We retain your data only as long as your account is active. When you delete your account, all personal data is permanently removed within 30 days.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Security Measures
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            We implement industry-standard security measures including encryption, secure authentication, and regular security audits.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Contact Us
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            For privacy concerns or data requests, contact us at:
                            <br />
                            <strong style={{ color: 'var(--color-text-primary)' }}>privacy@stylora.com</strong>
                        </p>

                    </div>
                </div>
            </article>
        </div>
    );
}
