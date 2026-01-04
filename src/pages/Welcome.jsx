import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShield, FiZap, FiLock, FiUpload, FiImage, FiDownload, FiCheck, FiArrowRight, FiEye, FiHeart, FiTrendingUp } from 'react-icons/fi';
import '../styles/variables.css';

export default function Welcome() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <FiZap size={24} />,
            title: 'AI-Powered Precision',
            desc: 'Advanced machine learning algorithms ensure realistic fit and drape simulation for any garment.',
            color: '#FF6B6B'
        },
        {
            icon: <FiLock size={24} />,
            title: 'Privacy-First Design',
            desc: 'All processing happens on your device. Your photos never leave your browser or touch our servers.',
            color: '#4ECDC4'
        },
        {
            icon: <FiShield size={24} />,
            title: 'Age-Safe Platform',
            desc: 'Strictly 18+ only. Built with robust safeguards for responsible and respectful use.',
            color: '#95E1D3'
        }
    ];

    const howItWorksSteps = [
        {
            icon: <FiUpload size={32} />,
            title: 'Upload Your Photo',
            desc: 'Start with a clear, full-body photo. Our AI works best with well-lit images against simple backgrounds.',
            details: ['JPG, PNG, or WebP', 'Minimum 1000px width', 'Full body visible']
        },
        {
            icon: <FiImage size={32} />,
            title: 'Choose Your Outfit',
            desc: 'Browse our catalog or upload garment images. Our AI analyzes fit, style, and drape patterns.',
            details: ['Thousands of styles', 'Upload your own', 'Mix and match pieces']
        },
        {
            icon: <FiDownload size={32} />,
            title: 'See & Save Results',
            desc: 'Get photorealistic results in seconds. Download, share, or try another look instantly.',
            details: ['HD quality output', 'Instant preview', 'Unlimited tries']
        }
    ];

    const benefits = [
        { icon: <FiEye size={20} />, text: 'See before you buy' },
        { icon: <FiHeart size={20} />, text: 'Discover your style' },
        { icon: <FiTrendingUp size={20} />, text: 'Shop with confidence' },
        { icon: <FiCheck size={20} />, text: 'Save time & money' }
    ];



    return (
        <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
            {/* Navigation */}
            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.98)',
                    backdropFilter: 'blur(18px)',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                }}
            >
                <div
                    style={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        padding: '0.9rem clamp(1rem, 5vw, 2rem)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Logo */}
                    <div
                        onClick={() => navigate('/')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.7rem',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src="/images/stylora-icon.png"
                            alt="Stylora"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                            }}
                        />
                        <span
                            style={{
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: '#111',
                            }}
                        >
                            Stylora
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div
                        className="nav-links"
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            gap: '2.75rem',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                        }}
                    >
                        {[
                            { label: 'Home', id: 'home' },
                            { label: 'Features', id: 'features' },
                            { label: 'How it works', id: 'how-it-works' },
                            { label: 'Safety', id: 'safety' },
                        ].map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: '#57534E',
                                    position: 'relative',
                                    paddingBottom: '4px',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#111')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#57534E')}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <button
                        className="nav-cta"
                        onClick={() => navigate('/auth')}
                        style={{
                            display: 'none',
                            padding: '0.75rem 1.6rem',
                            background: '#111',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Get Started
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            fontSize: '1.7rem',
                            cursor: 'pointer',
                            color: '#111',
                        }}
                        className="nav-mobile-toggle"
                    >
                        {mobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        style={{
                            background: '#fff',
                            borderTop: '1px solid rgba(0,0,0,0.06)',
                            padding: '1.5rem',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                            }}
                        >
                            {[
                                { label: 'Home', id: 'home' },
                                { label: 'Features', id: 'features' },
                                { label: 'How it works', id: 'how-it-works' },
                                { label: 'Safety', id: 'safety' },
                            ].map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '14px',
                                        textDecoration: 'none',
                                        color: '#111',
                                        fontWeight: 500,
                                        background: '#FAFAF9',
                                    }}
                                >
                                    {item.label}
                                </a>
                            ))}

                            <button
                                onClick={() => {
                                    navigate('/auth');
                                    setMobileMenuOpen(false);
                                }}
                                style={{
                                    marginTop: '0.5rem',
                                    padding: '1rem',
                                    borderRadius: '14px',
                                    background: '#111',
                                    color: '#fff',
                                    border: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </nav>


            {/* Hero Section */}
            <section className="section-mobile" id="home" style={{
                paddingTop: 'clamp(6rem, 15vh, 10rem)',
                paddingBottom: 'clamp(3rem, 10vh, 6rem)',
                background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
            }}>
                <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
                    <div className="hero-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: 'clamp(2rem, 5vw, 4rem)',
                        alignItems: 'center'
                    }}>
                        {/* Text */}
                        <div className="animate-slide-up" style={{ textAlign: 'center' }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                background: 'rgba(0, 0, 0, 0.05)',
                                borderRadius: '50px',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#666',
                                marginBottom: '1.5rem',
                                letterSpacing: '0.02em'
                            }}>
                                ✨ AI-POWERED VIRTUAL TRY-ON
                            </div>

                            <h1 className="heading-primary" style={{
                                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                                fontWeight: '800',
                                color: '#000',
                                marginBottom: '1.5rem',
                                lineHeight: '1.1',
                                letterSpacing: '-0.03em'
                            }}>
                                Experience Fashion,
                                <br />
                                <span style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    Reimagined
                                </span>
                            </h1>

                            <p className="text-body" style={{
                                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                color: '#666',
                                marginBottom: '2.5rem',
                                maxWidth: '600px',
                                margin: '0 auto 2.5rem',
                                lineHeight: '1.7'
                            }}>
                                Try on outfits virtually with AI precision, complete privacy, and photorealistic results. See how clothes look before you buy.
                            </p>

                            {/* Benefits Row */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem',
                                justifyContent: 'center',
                                marginBottom: '2.5rem'
                            }}>
                                {benefits.map((benefit, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 1rem',
                                        background: 'white',
                                        borderRadius: '50px',
                                        fontSize: '0.9rem',
                                        color: '#666',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                                    }}>
                                        {benefit.icon}
                                        {benefit.text}
                                    </div>
                                ))}
                            </div>

                            <div className="stack-mobile" style={{
                                display: 'flex',
                                gap: '1rem',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}>
                                <button
                                    onClick={() => navigate('/auth')}
                                    className="btn-primary"
                                    style={{
                                        padding: '1.125rem 2.5rem',
                                        background: 'linear-gradient(135deg, #000 0%, #2d2d2d 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '14px',
                                        fontSize: '1.05rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        minHeight: '52px',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-3px)';
                                        e.target.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                                    }}
                                >
                                    Try it Free
                                    <FiArrowRight size={18} />
                                </button>

                                <button
                                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                                    style={{
                                        padding: '1.125rem 2.5rem',
                                        background: 'white',
                                        color: '#333',
                                        border: '2px solid #e5e5e5',
                                        borderRadius: '14px',
                                        fontSize: '1.05rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        minHeight: '52px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.borderColor = '#000';
                                        e.target.style.color = '#000';
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.borderColor = '#e5e5e5';
                                        e.target.style.color = '#333';
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                                    }}
                                >
                                    Watch Demo
                                </button>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="animate-fade-in" style={{
                            animationDelay: '200ms',
                            marginTop: 'clamp(2rem, 5vh, 3rem)'
                        }}>
                            <div style={{
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.2)',
                                position: 'relative',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                <div style={{
                                    position: 'relative',
                                    paddingBottom: '60%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
                                        alt="Fashion editorial showcasing virtual try-on technology"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)'
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Features Section */}
            <section id="features" className="section-mobile" style={{
                background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
                padding: 'clamp(4rem, 10vh, 8rem) 0'
            }}>
                <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vh, 5rem)' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            background: 'rgba(102, 126, 234, 0.1)',
                            borderRadius: '50px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#667eea',
                            marginBottom: '1rem',
                            letterSpacing: '0.02em'
                        }}>
                            WHY CHOOSE STYLORA
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: '800',
                            color: '#000',
                            marginBottom: '1rem',
                            letterSpacing: '-0.02em'
                        }}>
                            Powerful Features
                        </h2>
                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                            color: '#666',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.7'
                        }}>
                            Experience the future of online shopping with technology that puts you first
                        </p>
                    </div>

                    <div className="features-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'clamp(1.5rem, 3vw, 2.5rem)'
                    }}>
                        {features.map((feature, idx) => (
                            <div key={idx} className="feature-card animate-slide-up" style={{
                                animationDelay: `${idx * 150}ms`,
                                background: 'white',
                                padding: 'clamp(2rem, 5vw, 3rem)',
                                borderRadius: '24px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'default',
                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: '150px',
                                    height: '150px',
                                    background: `radial-gradient(circle, ${feature.color}20 0%, transparent 70%)`,
                                    borderRadius: '50%',
                                    transform: 'translate(30%, -30%)',
                                    transition: 'transform 0.4s'
                                }} />

                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    background: `${feature.color}15`,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: feature.color,
                                    marginBottom: '1.5rem',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    {feature.icon}
                                </div>

                                <h3 style={{
                                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                                    fontWeight: '700',
                                    color: '#000',
                                    marginBottom: '1rem',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    {feature.title}
                                </h3>

                                <p style={{
                                    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                                    color: '#666',
                                    lineHeight: '1.7',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section
                id="how-it-works"
                style={{
                    background: '#FFFFFF',
                    padding: 'clamp(4rem, 10vh, 8rem) 0',
                }}
            >
                <div
                    style={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        padding: '0 clamp(1rem, 5vw, 2rem)',
                    }}
                >
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vh, 5rem)' }}>
                        <div
                            style={{
                                display: 'inline-block',
                                padding: '0.45rem 1rem',
                                background: '#F5EFE9',
                                borderRadius: '999px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: '#7C5C3B',
                                marginBottom: '1rem',
                                letterSpacing: '0.08em',
                            }}
                        >
                            SIMPLE · 3 STEPS
                        </div>

                        <h2
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                                fontWeight: 800,
                                color: '#1C1917',
                                marginBottom: '1rem',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            How it works
                        </h2>

                        <p
                            style={{
                                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                                color: '#78716C',
                                maxWidth: '600px',
                                margin: '0 auto',
                                lineHeight: 1.7,
                            }}
                        >
                            A simple, transparent process designed for realistic virtual try-on.
                        </p>
                    </div>

                    {/* Steps */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 'clamp(2rem, 4vw, 3rem)',
                        }}
                    >
                        {howItWorksSteps.map((step, idx) => {
                            const isActive = activeStep === idx;

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setActiveStep(idx)}
                                    style={{
                                        padding: 'clamp(2rem, 5vw, 3rem)',
                                        borderRadius: '28px',
                                        cursor: 'pointer',
                                        background: isActive ? '#F5EFE9' : '#FAFAF9',
                                        border: '1.5px solid #E7E5E4',
                                        boxShadow: isActive
                                            ? '0 20px 45px rgba(0,0,0,0.12)'
                                            : '0 8px 20px rgba(0,0,0,0.05)',
                                        transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
                                        transition: 'all 0.35s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    {/* Top content */}
                                    <div>
                                        <div
                                            style={{
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '18px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: '#FFFFFF',
                                                color: '#7C5C3B',
                                                marginBottom: '1.5rem',
                                            }}
                                        >
                                            {step.icon}
                                        </div>

                                        <h3
                                            style={{
                                                fontSize: '1.35rem',
                                                fontWeight: 700,
                                                marginBottom: '0.75rem',
                                                color: '#1C1917',
                                            }}
                                        >
                                            {step.title}
                                        </h3>

                                        <p
                                            style={{
                                                fontSize: '1rem',
                                                lineHeight: 1.7,
                                                marginBottom: '1.25rem',
                                                color: '#78716C',
                                            }}
                                        >
                                            {step.desc}
                                        </p>

                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {step.details.map((detail, dIdx) => (
                                                <li
                                                    key={dIdx}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.6rem',
                                                        fontSize: '0.9rem',
                                                        color: '#A8A29E',
                                                        marginBottom: '0.6rem',
                                                    }}
                                                >
                                                    <FiCheck size={16} />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bottom step number */}
                                    <div
                                        style={{
                                            marginTop: '2rem',
                                            fontSize: '2.5rem',
                                            fontWeight: 800,
                                            color: '#D6CCC2',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {idx + 1}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Step Indicators */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            marginTop: '3rem',
                        }}
                    >
                        {[0, 1, 2].map((idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveStep(idx)}
                                style={{
                                    width: activeStep === idx ? '34px' : '10px',
                                    height: '10px',
                                    borderRadius: '999px',
                                    border: 'none',
                                    background: activeStep === idx ? '#7C5C3B' : '#E7E5E4',
                                    transition: 'all 0.25s ease',
                                    cursor: 'pointer',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>


            {/* Trust Badges */}
            <section style={{
                background: 'white',
                padding: 'clamp(2rem, 5vh, 3rem) 0',
                borderTop: '1px solid #f0f0f0',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
                    <div className="trust-badges" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'clamp(1rem, 3vw, 2rem)',
                        textAlign: 'center'
                    }}>
                        {[
                            '🔞 18+ Only Platform',
                            '🔒 No Face Data Stored',
                            '🛡️ GDPR-Inspired Privacy',
                            '🤖 AI-Assisted, Human-Controlled',
                            '🌐 Browser-Based Security'
                        ].map((item, idx) => (
                            <div key={idx} className="animate-fade-in" style={{
                                animationDelay: `${idx * 100}ms`,
                                padding: '1rem',
                                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                color: '#666',
                                fontWeight: '500',
                                background: '#fafafa',
                                borderRadius: '12px',
                                transition: 'all 0.3s'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#f0f0f0';
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#fafafa';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: 'clamp(4rem, 10vh, 6rem) 0',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }} />
                <div className="container" style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    padding: '0 clamp(1rem, 5vw, 2rem)',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Ready to Transform Your Shopping?
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        marginBottom: '2.5rem',
                        opacity: 0.95,
                        lineHeight: '1.7'
                    }}>
                        Join thousands of users who are experiencing fashion in a whole new way. Try it free today.
                    </p>
                    <button
                        onClick={() => navigate('/auth')}
                        style={{
                            padding: '1.25rem 3rem',
                            background: 'white',
                            color: '#667eea',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05) translateY(-2px)';
                            e.target.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1) translateY(0)';
                            e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        Get Started Free
                        <FiArrowRight size={20} />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                background: '#fafafa',
                padding: 'clamp(3rem, 8vh, 5rem) 0 2rem',
                borderTop: '1px solid #f0f0f0'
            }}>
                <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
                    <div className="footer-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: 'clamp(2rem, 5vw, 3rem)',
                        marginBottom: '3rem'
                    }}>
                        {/* Brand Column */}
                        <div>
                            <div style={{
                                fontWeight: '700',
                                marginBottom: '1rem',
                                fontSize: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <img
                                    src="/images/stylora-icon.png"
                                    alt="Stylora"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px'
                                    }}
                                />
                                Stylora
                            </div>
                            <p style={{
                                fontSize: '0.95rem',
                                color: '#666',
                                lineHeight: '1.7',
                                marginBottom: '1.5rem'
                            }}>
                                Experience fashion, reimagined with AI-powered virtual try-on technology. Safe, private, and realistic.
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: '1rem'
                            }}>
                                {/* Social media icons could go here */}
                            </div>
                        </div>

                        {/* Product Column */}
                        <div>
                            <div style={{
                                fontWeight: '600',
                                marginBottom: '1rem',
                                fontSize: '1rem',
                                color: '#000'
                            }}>
                                Product
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                                <a href="#features" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Features
                                </a>
                                <a href="#how-it-works" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    How it Works
                                </a>
                                <a href="#safety" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Safety
                                </a>
                                <a href="/pricing" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Pricing
                                </a>
                            </div>
                        </div>

                        {/* Legal Column */}
                        <div>
                            <div style={{
                                fontWeight: '600',
                                marginBottom: '1rem',
                                fontSize: '1rem',
                                color: '#000'
                            }}>
                                Legal
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                                <a href="/terms" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Terms of Service
                                </a>
                                <a href="/privacy" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Privacy Policy
                                </a>
                                <a href="/responsible-ai" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Responsible AI
                                </a>
                                <a href="/cookies" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Cookie Policy
                                </a>
                            </div>
                        </div>

                        {/* Support Column */}
                        <div>
                            <div style={{
                                fontWeight: '600',
                                marginBottom: '1rem',
                                fontSize: '1rem',
                                color: '#000'
                            }}>
                                Support
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}>
                                <a href="/help" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Help Center
                                </a>
                                <a href="/contact" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Contact Us
                                </a>
                                <a href="/faq" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    FAQ
                                </a>
                                <a href="/feedback" style={{
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    color: '#666',
                                    transition: 'color 0.2s'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#000'}
                                    onMouseLeave={(e) => e.target.style.color = '#666'}
                                >
                                    Send Feedback
                                </a>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        paddingTop: '2rem',
                        borderTop: '1px solid #e5e5e5',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#999',
                            margin: 0
                        }}>
                            © 2026 Stylora. Built with responsibility and respect. All rights reserved.
                        </p>
                        <p style={{
                            fontSize: '0.8rem',
                            color: '#bbb',
                            margin: 0,
                            maxWidth: '600px'
                        }}>
                            Stylora uses AI technology for virtual try-on. Results are simulations and may not perfectly represent actual fit.
                        </p>
                    </div>
                </div>
            </footer>

            <style>{`
                * {
                    box-sizing: border-box;
                }

                html {
                    scroll-behavior: smooth;
                }

                body {
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                
                /* Mobile First - Base Styles */
                .hide-mobile {
                    display: flex;
                }
                
                .show-mobile {
                    display: none;
                }

                /* Mobile Styles (up to 767px) */
                @media (max-width: 767px) {
                    .hide-mobile {
                        display: none !important;
                    }
                    
                    .show-mobile {
                        display: block !important;
                    }
                    
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 1.5rem !important;
                    }
                    
                    .features-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .steps-container {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .footer-grid {
                        grid-template-columns: 1fr !important;
                    }

                    .trust-badges {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 0.75rem !important;
                    }
                }

                /* Tablet Styles (768px - 1023px) */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        gap: 3rem !important;
                    }
                    
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    
                    .features-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    
                    .steps-container {
                        grid-template-columns: 1fr !important;
                    }

                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }

                /* Desktop Styles (1024px and up) */
                @media (min-width: 1024px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .stats-grid {
                        grid-template-columns: repeat(4, 1fr) !important;
                    }
                    
                    .features-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                    
                    .steps-container {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                }

                /* Large Desktop (1440px and up) */
                @media (min-width: 1440px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                
                /* Animations */
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { 
                        opacity: 0; 
                    }
                    to { 
                        opacity: 1; 
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .animate-slide-up {
                    animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
                }
                
                .animate-fade-in {
                    animation: fadeIn 1s ease-out both;
                }

                .animate-scale-in {
                    animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
                }

                /* Mobile menu animation */
                .mobile-menu {
                    animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Smooth transitions for interactive elements */
                button, a {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Prevent layout shift on hover */
                .feature-card,
                .step-card {
                    will-change: transform;
                }

                /* Optimized for touch devices */
                @media (hover: none) and (pointer: coarse) {
                    button:active {
                        transform: scale(0.98);
                    }
                }

                /* Print styles */
                @media print {
                    nav,
                    footer,
                    .cta-section {
                        display: none;
                    }
                }

                /* Accessibility - Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
}