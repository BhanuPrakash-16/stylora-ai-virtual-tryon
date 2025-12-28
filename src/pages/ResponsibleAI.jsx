import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/variables.css';

export default function ResponsibleAI() {
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
                        Responsible AI & Safety
                    </h1>
                    <p className="text-caption">
                        Our commitment to ethical AI usage
                    </p>
                </div>
            </header>

            {/* Content */}
            <article className="section" style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-4xl)' }}>
                <div className="container-narrow">
                    <div style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--line-height-generous)', color: 'var(--color-text-primary)' }}>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Safety Restrictions
                        </h2>
                        <ul style={{ marginBottom: 'var(--space-xl)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>No Minors:</strong> Platform restricted to 18+ users only</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>No Explicit Content:</strong> Inappropriate or adult material strictly prohibited</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>No Impersonation:</strong> Upload only images you have rights to use</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>No Misuse:</strong> Respect privacy and consent</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}><strong style={{ color: 'var(--color-text-primary)' }}>No Scraping:</strong> Automated data collection prohibited</li>
                        </ul>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            AI as Assistant, Not Authority
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            Our AI-powered try-on is a visualization tool. It does not:
                        </p>
                        <ul style={{ marginBottom: 'var(--space-xl)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Make purchasing decisions for you</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Guarantee exact fit or appearance</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Replace professional fitting services</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Store biometric facial data</li>
                        </ul>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Privacy-First Design
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            All try-on processing happens locally in your browser. Images are not uploaded to servers unless you explicitly save them.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Transparent Limitations
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            We acknowledge that AI try-on technology has limitations. Results may not perfectly match real-life appearance due to lighting, fabric texture, and body shape variations.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            Contact for Safety Concerns
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            If you encounter content that violates these guidelines, please report it:
                            <br />
                            <strong style={{ color: 'var(--color-text-primary)' }}>safety@stylora.com</strong>
                        </p>

                    </div>
                </div>
            </article>
        </div>
    );
}
