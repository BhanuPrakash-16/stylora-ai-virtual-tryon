import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Favorites() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, [user]);

    const loadFavorites = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            const snapshot = await getDocs(favoritesRef);
            const favs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFavorites(favs);
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <nav className="glass-navbar" style={{ padding: '1rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Stylora</h2>
                    <button onClick={() => navigate('/dashboard')} className="glass-button">← Back</button>
                </div>
            </nav>

            <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '2rem' }}>Favorites</h1>

                {loading ? (
                    <div className="spinner" style={{ margin: '3rem auto' }}></div>
                ) : favorites.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {favorites.map((fav) => (
                            <div key={fav.id} className="glass-card glass-card-hover" style={{ padding: '1rem' }}>
                                {fav.resultImage && (
                                    <img
                                        src={fav.resultImage}
                                        alt="Favorite"
                                        style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: '0.5rem' }}
                                    />
                                )}
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>
                                    Saved {fav.createdAt && new Date(fav.createdAt.seconds * 1000).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⭐</div>
                        <h3 style={{ marginBottom: '1rem' }}>No Favorites Yet</h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                            Star your best try-ons to see them here
                        </p>
                        <button
                            onClick={() => navigate('/try-on')}
                            className="glass-button"
                            style={{ background: 'var(--gradient-primary)', border: 'none' }}
                        >
                            Create Try-On
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
