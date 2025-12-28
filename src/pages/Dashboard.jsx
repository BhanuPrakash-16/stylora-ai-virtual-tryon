import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiArrowRight, FiSearch, FiShoppingBag, FiMenu } from 'react-icons/fi';
import '../styles/styles.css';

const CATEGORIES = [
    { id: 1, title: 'Summer Collection', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80' },
    { id: 2, title: 'Editorial Blazers', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80' },
    { id: 3, title: 'Accessories', image: 'https://images.unsplash.com/photo-1509319117193-518fa6144a86?w=600&q=80' }
];

const FEATURED_STYLES = [
    { id: 1, name: 'Linen Aesthetics', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80' },
    { id: 2, name: 'Structured Form', image: 'https://images.unsplash.com/photo-1484328861629-2ec5be6dd6bf?w=400&q=80' },
    { id: 3, name: 'Soft Drape', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80' },
    { id: 4, name: 'Summer Light', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' }
];

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-background)', color: 'var(--color-text-primary)' }}>

            {/* 1. Header (Minimal - No Commerce) */}
            <nav className="nav-responsive" style={{
                height: '60px',
                margin: '0 20px',
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(247, 248, 246, 0.9)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--color-divider)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
                <div style={{ fontWeight: '600', fontSize: '1.25rem', letterSpacing: '-0.03em' }}>Stylora</div>

                <div className="nav-links" style={{ display: 'flex', gap: '2.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                    <span style={{ cursor: 'pointer', borderBottom: '1px solid currentColor' }}>Studio</span>
                    <span style={{ cursor: 'pointer', color: 'var(--color-text-secondary)' }} onClick={() => navigate('/history')}>History</span>
                    <span style={{ cursor: 'pointer', color: 'var(--color-text-secondary)' }} onClick={() => navigate('/profile')}>Profile</span>
                </div>

                <div
                    onClick={() => navigate('/profile')}
                    style={{
                        width: '32px', height: '32px', borderRadius: '50%', background: '#D1D5DB',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.9rem', color: '#555', fontWeight: '600'
                    }}
                >
                    {user?.displayName?.[0] || 'U'}
                </div>
            </nav>

            {/* 2. Hero Section (Action Focused) */}
            <section style={{ padding: '2rem' }}>
                <div className="hero-responsive" style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#000'
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2500&auto=format&fit=crop"
                        alt="Style Inspiration"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />

                    <div style={{ position: 'relative', zIndex: 2, color: 'white', maxWidth: '800px' }}>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1.5rem', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Virtual Try-On Studio</p>
                        <h1 className="hero-title" style={{ fontSize: '4.5rem', fontWeight: '600', letterSpacing: '-0.02em', lineHeight: '1', marginBottom: '2.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                            See it on you,<br /> instantly.
                        </h1>
                        <button
                            onClick={() => navigate('/try-on')}
                            className="glass-button"
                            style={{
                                background: 'white', color: 'black', border: 'none',
                                padding: '1.25rem 3rem', fontWeight: '500',
                                fontSize: '1.1rem', borderRadius: '50px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                            }}
                        >
                            Start New Try-On
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. Browse by Category */}
            <section style={{ padding: '4rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '500' }}>Curated for you</h2>
                    <span style={{ fontSize: '0.9rem', borderBottom: '1px solid currentColor', cursor: 'pointer' }}>View all categories</span>
                </div>

                <div className="grid-responsive cols-3">
                    {CATEGORIES.map(cat => (
                        <motion.div
                            key={cat.id}
                            whileHover={{ y: -5 }}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/try-on')}
                        >
                            <div style={{
                                aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', marginBottom: '1.5rem',
                                position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                            }}>
                                <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' }} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '500' }}>{cat.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. Style Inspiration (No Prices) */}
            <section style={{ padding: '2rem 2rem 6rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '500', marginBottom: '2rem' }}>Try These Styles</h2>
                <div className="grid-responsive cols-4">
                    {FEATURED_STYLES.map(item => (
                        <div key={item.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/try-on')}>
                            <div style={{
                                aspectRatio: '3/4', borderRadius: '24px', background: '#f5f5f5',
                                marginBottom: '1.5rem', overflow: 'hidden', position: 'relative',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
                            }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="glass-card" style={{
                                    position: 'absolute', bottom: '1.25rem', right: '1.25rem',
                                    padding: '0.6rem 1.2rem', borderRadius: '100px',
                                    fontSize: '0.85rem', fontWeight: '600',
                                    background: 'rgba(255,255,255,0.8)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255,255,255,0.4)'
                                }}>
                                    Try This
                                </div>
                            </div>
                            <div style={{ fontWeight: '500', fontSize: '1.1rem' }}>{item.name}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. History Teaser */}
            <section style={{ padding: '0 2rem 4rem' }}>
                <div
                    onClick={() => navigate('/history')}
                    style={{
                        background: 'white', borderRadius: '24px', padding: '3rem',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        cursor: 'pointer', border: '1px solid var(--color-border)'
                    }}
                >
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Collection</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>View your past generated looks</p>
                    </div>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-background)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <FiArrowRight />
                    </div>
                </div>
            </section>

            <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--color-divider)', marginTop: '4rem', color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>© 2024 Stylora</div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Support</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}
