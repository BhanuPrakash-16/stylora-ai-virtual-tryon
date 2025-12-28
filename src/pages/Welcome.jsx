import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/variables.css';

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
            {/* Navigation - Sticky, Minimal */}
            <nav style={{
                position: 'sticky',
                top: 0,
                zIndex: 'var(--z-sticky)',
                background: 'var(--color-surface-secondary)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--color-border-light)',
                padding: 'var(--space-md) 0'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {/* Logo */}
                    <div style={{
                        fontSize: '20px',
                        fontWeight: 'var(--font-medium)',
                        color: 'var(--color-text-primary)',
                        letterSpacing: 'var(--letter-spacing-tight)'
                    }}>
                        Stylora
                    </div>

                    {/* Center Links */}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--space-2xl)',
                        fontSize: 'var(--text-caption)',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <a href="#home" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--transition-base)' }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>
                            Home
                        </a>
                        <a href="#how-it-works" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--transition-base)' }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>
                            How it Works
                        </a>
                        <a href="/privacy" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--transition-base)' }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>
                            Privacy
                        </a>
                        <a href="/responsible-ai" style={{ textDecoration: 'none', color: 'inherit', transition: 'color var(--transition-base)' }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>
                            Safety
                        </a>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => navigate('/auth')}
                        style={{
                            padding: '10px 24px',
                            background: 'var(--color-text-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-caption)',
                            fontWeight: 'var(--font-medium)',
                            cursor: 'pointer',
                            transition: 'transform var(--transition-base)',
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section - Editorial */}
            <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: 'var(--space-4xl)',
                        alignItems: 'center'
                    }}>
                        {/* Left - Text */}
                        <div className="animate-slide-up">
                            <h1 className="text-hero" style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-primary)' }}>
                                Experience fashion,
                                <br />
                                reimagined.
                            </h1>

                            <p className="text-body-lg" style={{
                                color: 'var(--color-text-secondary)',
                                marginBottom: 'var(--space-2xl)',
                                maxWidth: '540px'
                            }}>
                                Try outfits virtually with precision, privacy, and realism.
                            </p>

                            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                                <button
                                    onClick={() => navigate('/auth')}
                                    style={{
                                        padding: '14px 32px',
                                        background: 'var(--color-text-primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: 'var(--text-body)',
                                        fontWeight: 'var(--font-medium)',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-base)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = 'var(--shadow-lg)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    Get Started
                                </button>

                                <button
                                    onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                                    style={{
                                        padding: '14px 32px',
                                        background: 'transparent',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: 'var(--text-body)',
                                        fontWeight: 'var(--font-medium)',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-base)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.borderColor = 'var(--color-text-primary)';
                                        e.target.style.color = 'var(--color-text-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.borderColor = 'var(--color-border)';
                                        e.target.style.color = 'var(--color-text-secondary)';
                                    }}
                                >
                                    Learn more
                                </button>
                            </div>
                        </div>

                        {/* Right - Image Card */}
                        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <div style={{
                                borderRadius: 'var(--radius-2xl)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-xl)',
                                position: 'relative',
                                aspectRatio: '4/5'
                            }}>
                                <img
                                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                                    alt="Fashion editorial"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                {/* Soft gradient overlay */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%)'
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section id="how-it-works" className="section" style={{ background: 'var(--color-surface)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 'var(--space-2xl)'
                    }}>
                        {[
                            { title: 'Virtual Try-On', desc: 'See how clothes look before buying with AI-powered precision.' },
                            { title: 'Privacy-First Design', desc: 'On-device processing. Your photos never leave your browser.' },
                            { title: 'Age-Safe Platform', desc: '18+ only. Designed for responsible, respectful use.' }
                        ].map((feature, idx) => (
                            <div key={idx} className="card-minimal" style={{
                                transition: 'transform var(--transition-base)',
                                cursor: 'default'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <h3 className="text-section" style={{ marginBottom: 'var(--space-sm)', fontSize: '20px' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-caption" style={{ lineHeight: 'var(--line-height-generous)' }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Safety Strip */}
            <section style={{
                background: 'var(--color-surface-secondary)',
                padding: 'var(--space-2xl) 0'
            }}>
                <div className="container">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        gap: 'var(--space-xl)',
                        textAlign: 'center'
                    }}>
                        {['18+ Only', 'No Face Data Stored', 'GDPR-Inspired Privacy', 'AI-Assisted, Human-Controlled'].map((item, idx) => (
                            <div key={idx} className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                background: 'var(--color-surface)',
                padding: 'var(--space-3xl) 0',
                borderTop: '1px solid var(--color-border-light)'
            }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--space-2xl)',
                        marginBottom: 'var(--space-2xl)'
                    }}>
                        <div>
                            <div style={{ fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-md)' }}>Stylora</div>
                            <p className="text-small" style={{ lineHeight: 'var(--line-height-generous)' }}>
                                Experience fashion, reimagined with AI-powered virtual try-on.
                            </p>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-md)', fontSize: 'var(--text-caption)' }}>Legal</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                <a href="/terms" className="text-small" style={{ textDecoration: 'none', color: 'var(--color-text-tertiary)' }}>Terms</a>
                                <a href="/privacy" className="text-small" style={{ textDecoration: 'none', color: 'var(--color-text-tertiary)' }}>Privacy</a>
                                <a href="/responsible-ai" className="text-small" style={{ textDecoration: 'none', color: 'var(--color-text-tertiary)' }}>Responsible AI</a>
                            </div>
                        </div>
                    </div>
                    <div className="text-small" style={{ textAlign: 'center', paddingTop: 'var(--space-xl)', borderTop: '1px solid var(--color-border-light)' }}>
                        © 2024 Stylora. Built with responsibility and respect.
                    </div>
                </div>
            </footer>
        </div>
    );
}
