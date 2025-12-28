import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { saveTryOnResult } from '../services/firestoreService';
import { betterTryOn } from '../services/tryOnService';
import { uploadToCloudinary } from '../services/cloudinaryService';
import { FiUpload, FiLayers, FiDownload, FiShare2, FiRefreshCcw, FiUser, FiShoppingBag, FiClock, FiSettings } from 'react-icons/fi';
import "../styles/styles.css";
import LoadingOverlay from '../components/Common/LoadingOverlay';

// Sample Garments
const SAMPLES = [
    { id: 1, url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80', name: 'Summer Dress' },
    { id: 2, url: 'https://images.unsplash.com/photo-1603252109303-2751440ee43d?w=400&q=80', name: 'Denim Jacket' },
    { id: 3, url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80', name: 'Orange Shirt' },
];

export default function TryOn() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // State
    const [userImage, setUserImage] = useState(null);
    const [garmentImage, setGarmentImage] = useState(null);
    const [result, setResult] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progressStep, setProgressStep] = useState(0); // 0-4 for loading status

    // Refs
    const userFileRef = useRef(null);
    const garmentFileRef = useRef(null);

    // Initial Status Messages for the Ring
    const LOADING_STEPS = [
        "Analyzing body pose...",
        "Mapping fabric geometry...",
        "adjusting lighting & shadows...",
        "Finalizing realistic fit...",
        "Almost ready..."
    ];

    useEffect(() => {
        let interval;
        if (isGenerating) {
            setProgressStep(0);
            interval = setInterval(() => {
                setProgressStep(prev => (prev + 1) % LOADING_STEPS.length);
            }, 1200);
        }
        return () => clearInterval(interval);
    }, [isGenerating]);

    // Handlers
    const handleFileUpload = (e, setter) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setter(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!userImage || !garmentImage) return;
        setIsGenerating(true);

        try {
            // Process
            const resUrl = await betterTryOn(userImage, garmentImage);
            setResult(resUrl);

            // Save Record (Fire-and-forget)
            if (user) {
                saveTryOnResult(user.uid, {
                    resultImage: "Local Render",
                    timestamp: new Date().toISOString()
                }).catch(console.warn);
            }
        } catch (e) {
            alert("Error generating try-on: " + e.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const resetTryOn = () => {
        setResult(null);
    };

    return (
        <div className="tryon-layout" style={{ background: 'var(--color-background)', color: 'var(--color-text-primary)' }}>

            <div className="tryon-sidebar">
                <div className="logo-container" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}>
                    <img src="/images/stylora-wordmark.png" alt="Logo" style={{ width: '80px', opacity: 0.9 }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
                    <NavIcon active icon={<FiLayers />} label="Studio" />
                    <NavIcon icon={<FiClock />} label="History" onClick={() => navigate('/history')} />
                    <NavIcon icon={<FiShoppingBag />} label="Saved" />
                    <NavIcon icon={<FiSettings />} label="Settings" onClick={() => navigate('/profile')} />
                </div>

                <div className="profile-container">
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: '#ddd', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {user?.photoURL ? <img src={user.photoURL} alt="User" style={{ width: '100%' }} /> : <FiUser />}
                    </div>
                </div>
            </div>


            {/* MAIN WORKSPACE */}
            <div className="tryon-content" style={{ flex: 1, padding: '2.5rem', position: 'relative', overflowY: 'auto' }}>

                <header style={{ marginBottom: '2.5rem' }}>
                    <h1 className="text-section" style={{ color: 'var(--color-text-primary)', margin: 0, fontSize: '2.2rem' }}>Studio</h1>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Create your virtual look with AI precision.</p>
                </header>

                {/* Main Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: 'calc(100% - 100px)' }}>

                    <div className="flex-responsive-row" style={{ display: 'flex', gap: '2.5rem', flex: 1, minHeight: 0 }}>

                        {/* INPUTS COLUMN */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>


                            {/* Person Upload */}
                            <div className="card-minimal" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>1. Your Photo</h3>
                                    {userImage && <button className="text-small" onClick={() => setUserImage(null)} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Remove</button>}
                                </div>

                                <div
                                    onClick={() => !userImage && userFileRef.current.click()}
                                    style={{
                                        flex: 1,
                                        background: userImage ? `url(${userImage}) center/contain no-repeat, var(--color-surface)` : '#F8F9FA',
                                        borderRadius: 'var(--radius-lg)',
                                        border: !userImage ? '2px dashed var(--color-border)' : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        minHeight: '400px',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: userImage ? '0 10px 30px rgba(0,0,0,0.1)' : 'none'
                                    }}
                                >
                                    {userImage && (
                                        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                            <div className="glass-card" style={{ padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--color-text-primary)', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.8)' }}>
                                                ORIGINAL
                                            </div>
                                        </div>
                                    )}
                                    {!userImage && (
                                        <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
                                            <FiUser size={32} />
                                            <p style={{ marginTop: '0.5rem' }}>Upload Photo</p>
                                        </div>
                                    )}
                                    <input ref={userFileRef} type="file" accept="image/*" hidden onChange={(e) => handleFileUpload(e, setUserImage)} />
                                </div>
                            </div>

                            {/* Garment Upload */}
                            <div className="card-minimal" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>2. Garment</h3>
                                    {garmentImage && <button className="text-small" onClick={() => setGarmentImage(null)} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Change</button>}
                                </div>

                                {!garmentImage ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div
                                            onClick={() => garmentFileRef.current.click()}
                                            style={{
                                                padding: '2rem',
                                                border: '2px dashed var(--color-border)',
                                                borderRadius: 'var(--radius-lg)',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                color: 'var(--color-text-secondary)'
                                            }}
                                        >
                                            <FiUpload size={24} style={{ marginBottom: '0.5rem' }} />
                                            <p>Upload Product Image</p>
                                        </div>

                                        <div>
                                            <p className="text-small" style={{ marginBottom: '0.5rem' }}>Or choose sample:</p>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {SAMPLES.map(s => (
                                                    <img
                                                        key={s.id}
                                                        src={s.url}
                                                        alt={s.name}
                                                        onClick={() => setGarmentImage(s.url)}
                                                        style={{
                                                            width: '60px', height: '60px',
                                                            borderRadius: '8px', objectFit: 'cover',
                                                            cursor: 'pointer', border: '1px solid var(--color-border)'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <input ref={garmentFileRef} type="file" accept="image/*" hidden onChange={(e) => handleFileUpload(e, setGarmentImage)} />
                                    </div>
                                ) : (
                                    <div style={{
                                        flex: 1,
                                        background: garmentImage ? `url(${garmentImage}) center/contain no-repeat, white` : '#F8F9FA',
                                        borderRadius: 'var(--radius-lg)',
                                        minHeight: '200px',
                                        border: '1px solid var(--color-border)'
                                    }} />
                                )}
                            </div>
                        </div>


                        {/* Right Panel: Result / Preview */}
                        <div style={{ flex: '1.5', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="card-minimal" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Result Preview</h3>
                                    {result && <button className="text-small" onClick={() => setResult(null)} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Clear</button>}
                                </div>

                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9FA', position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', minHeight: '400px' }}>
                                    {result ? (
                                        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {/* Final Result Image */}
                                            <img
                                                src={result}
                                                alt="Try-On Result"
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            />

                                            {/* Badges */}
                                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}>
                                                <div className="glass-card" style={{ padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--color-text-primary)', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.8)' }}>
                                                    RESULT
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', maxWidth: '300px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <p style={{ marginBottom: '1rem', fontSize: '4rem' }}>✨</p>
                                            <p style={{ fontSize: '0.9rem' }}>Final result will appear here.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Results Action Bar */}
                                {result && (
                                    <div style={{
                                        padding: '1.25rem',
                                        borderTop: '1px solid var(--color-border)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                        background: 'rgba(255,255,255,0.5)'
                                    }}>
                                        <button className="icon-btn" title="Download" style={{ background: '#F3F4F6' }}>
                                            <FiDownload size={20} />
                                        </button>
                                        <button className="icon-btn" title="Refine" style={{ background: '#F3F4F6' }}>
                                            <FiRefreshCcw size={20} />
                                        </button>
                                        <button
                                            onClick={resetTryOn}
                                            style={{
                                                background: 'var(--color-text-primary)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0 2rem',
                                                borderRadius: '100px',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            Try Another
                                        </button>
                                    </div>
                                )}
                            </div>

                            {!result && (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={!userImage || !garmentImage || isGenerating}
                                        style={{
                                            padding: '1rem 3rem',
                                            background: 'var(--color-text-primary)',
                                            color: 'white',
                                            borderRadius: '100px',
                                            border: 'none',
                                            fontSize: '1rem',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            opacity: (!userImage || !garmentImage) ? 0.3 : 1,
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        Generate Try-On
                                    </button>
                                </div>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text-tertiary)', fontSize: '0.75rem', textAlign: 'center', width: '100%', marginBottom: '1rem' }}>
                                <span style={{ fontWeight: '700', color: 'var(--color-text-secondary)' }}>BETA:</span>
                                AI generation is in development and may produce inaccurate results.
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* GENERATION OVERLAY (Premium Style) */}
            <AnimatePresence>
                {isGenerating && (
                    <LoadingOverlay
                        message={LOADING_STEPS[progressStep]}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}

// Subcomponent: Nav Icon
function NavIcon({ icon, label, active, onClick }) {
    return (
        <div onClick={onClick} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: active ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            opacity: active ? 1 : 0.6
        }}>
            <div style={{
                fontSize: '1.6rem',
                transform: active ? 'scale(1.1)' : 'scale(1)',
            }}>{icon}</div>
            <span style={{
                fontSize: '0.75rem',
                fontWeight: active ? '700' : '500',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginTop: '2px'
            }}>{label}</span>
        </div>
    );
}
