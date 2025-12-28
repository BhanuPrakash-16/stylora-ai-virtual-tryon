import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getTryOnHistory } from '../services/firestoreService';
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import '../styles/styles.css';

export default function History() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tryOns, setTryOns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) loadHistory();
        else setLoading(false);
    }, [user]);

    const loadHistory = async () => {
        const { data } = await getTryOnHistory(user.uid, 50); // Fetch more for gallery feel
        setTryOns(data || []);
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-background)', color: 'var(--color-text-primary)' }}>

            {/* Header */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(247, 248, 246, 0.9)', backdropFilter: 'blur(10px)',
                padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-border)'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
                        <FiArrowLeft size={24} />
                    </button>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Your Collection</h1>
                </div>
            </div>

            <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem' }}>
                        <LoadingSpinner size="lg" />
                    </div>
                ) : tryOns.length > 0 ? (
                    <div className="grid-responsive cols-4">
                        {tryOns.map((tryOn) => (
                            <div key={tryOn.id} style={{
                                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                                opacity: 0, animation: 'fadeIn 0.6s forwards'
                            }}>
                                <div style={{
                                    borderRadius: '24px', overflow: 'hidden',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                    aspectRatio: '3/4', position: 'relative',
                                    background: 'white'
                                }}>
                                    {tryOn.resultImage ? (
                                        <img
                                            src={tryOn.resultImage}
                                            alt="Try-On"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                            onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                                            onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                        />
                                    ) : (
                                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                                            <span style={{ color: '#999' }}>Image Missing</span>
                                        </div>
                                    )}
                                </div>

                                <div style={{ padding: '0 0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <FiCalendar size={14} />
                                            {tryOn.createdAt ? new Date(tryOn.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown Date'}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <FiClock size={14} />
                                            {tryOn.createdAt ? new Date(tryOn.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', minHeight: '60vh', textAlign: 'center'
                    }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%', background: '#E5E7EB',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem',
                            fontSize: '2rem'
                        }}>
                            🧥
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '500', marginBottom: '1rem' }}>Collection Empty</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: '400px' }}>
                            Your generated outfits will appear here. Start your personal style journey today.
                        </p>
                        <button
                            onClick={() => navigate('/try-on')}
                            style={{
                                background: 'var(--color-text-primary)', color: 'white',
                                padding: '1rem 2.5rem', borderRadius: '50px', border: 'none',
                                fontSize: '1rem', cursor: 'pointer'
                            }}
                        >
                            Create First Look
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
