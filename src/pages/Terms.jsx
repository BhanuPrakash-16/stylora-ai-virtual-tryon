import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/variables.css';

export default function Terms() {
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
                        Terms & Conditions
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
                            1. Eligibility
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            You must be <strong style={{ color: 'var(--color-text-primary)' }}>18 years or older</strong> to use Stylora. By creating an account, you confirm that you meet this age requirement.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            2. User Responsibilities
                        </h2>
                        <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                            You agree to:
                        </p>
                        <ul style={{ marginBottom: 'var(--space-xl)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Provide accurate information</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Maintain account security</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Use the service respectfully and legally</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Not upload explicit or inappropriate content</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Not attempt to reverse-engineer or abuse the system</li>
                        </ul>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            3. AI Usage Disclaimer
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            Stylora uses AI for virtual try-on. Results are <strong style={{ color: 'var(--color-text-primary)' }}>approximate and for visualization only</strong>. Actual garment fit may vary. AI is assistive, not authoritative.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            4. Image Processing Rules
                        </h2>
                        <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                            You may only upload images for which you have rights. Prohibited content includes:
                        </p>
                        <ul style={{ marginBottom: 'var(--space-xl)', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Images of minors</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Explicit or adult content</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Images of other people without consent</li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>Copyrighted material without permission</li>
                        </ul>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            5. Account Termination
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            We reserve the right to suspend or terminate accounts that violate these terms, without notice.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            6. Limitation of Liability
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            Stylora is provided "as is" without warranties. We are not liable for inaccurate try-on results, purchasing decisions, or any damages arising from service use.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            7. Changes to Terms
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            We may update these terms. Continued use after changes constitutes acceptance.
                        </p>

                        <h2 style={{ fontSize: '24px', fontWeight: 'var(--font-medium)', marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-lg)' }}>
                            8. Contact
                        </h2>
                        <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                            For questions about these terms, contact:
                            <br />
                            <strong style={{ color: 'var(--color-text-primary)' }}>legal@stylora.com</strong>
                        </p>

                    </div>
                </div>
            </article>
        </div>
    );
}
