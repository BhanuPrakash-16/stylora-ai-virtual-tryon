import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { performTryOn } from '../services/backendApi';
import {
    FiUpload,
    FiLayers,
    FiDownload,
    FiShare2,
    FiRefreshCcw,
    FiUser,
    FiShoppingBag,
    FiClock,
    FiSettings,
    FiAlertTriangle
} from 'react-icons/fi';
import "../styles/styles.css";
import LoadingOverlay from '../components/Common/LoadingOverlay';

// Sample Person Images for Testing
const PERSON_SAMPLES = [
    { id: 1, url: '/samples/sample-person.jpg', name: 'Sample Person' },
    { id: 2, url: '/samples/desired_output_image.jpg', name: 'Sample Person 2' },
    { id: 3, url: 'https://media.istockphoto.com/id/1183791202/photo/young-female-standing-in-front-of-camera-in-white-t-shirt-and-blue-jeans-isolated-on.jpg?s=612x612&w=0&k=20&c=I2bIqs4Vm3YJ1pJXc_rzFExfi0mdfM8S2GZn_mut610=', name: 'Sample Person 3' },
];

// Sample Garments
const GARMENT_SAMPLES = [
    { id: 1, url: '/samples/sample-garment.jpg', name: 'Striped Shirt' },
    { id: 2, url: 'https://cdn.shopify.com/s/files/1/0703/5011/0958/files/Wedding_Pattu_Saree_Blouse_Designs.jpg', name: 'Saree' },
    { id: 3, url: '/samples/sample-person.jpg', name: 'Sample Model' },
];

export default function TryOn() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const [userImage, setUserImage] = useState(null);
    const [garmentImage, setGarmentImage] = useState(null);
    const [result, setResult] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progressStep, setProgressStep] = useState(0);

    const [isDraggingPerson, setIsDraggingPerson] = useState(false);
    const [isDraggingGarment, setIsDraggingGarment] = useState(false);

    const [personFile, setPersonFile] = useState(null);
    const [garmentFile, setGarmentFile] = useState(null);

    const userFileRef = useRef(null);
    const garmentFileRef = useRef(null);

    const LOADING_STEPS = [
        "Analyzing body pose...",
        "Mapping fabric geometry...",
        "adjusting lighting & shadows...",
        "Finalizing realistic fit...",
        "Almost ready..."
    ];

    // Handle pre-selected garment from Dashboard
    useEffect(() => {
        if (location.state?.garmentUrl) {
            const url = location.state.garmentUrl;

            fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch garment');
                    return res.blob();
                })
                .then(blob => {
                    const file = new File([blob], 'garment-from-dashboard.jpg', { type: blob.type });
                    setGarmentFile(file);

                    const reader = new FileReader();
                    reader.onload = (e) => setGarmentImage(e.target.result);
                    reader.readAsDataURL(file);
                })
                .catch(err => {
                    console.error('Failed to load pre-selected garment:', err);
                    alert('Could not load the selected garment. Please try again.');
                });

            // CRITICAL: Force person photo to be empty
            setUserImage(null);
            setPersonFile(null);
            setResult(null);

            // Clear location state to prevent re-triggering on page refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Loading progress animation
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

    const handlePersonUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPersonFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setUserImage(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handlePersonDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingPerson(true);
    };

    const handlePersonDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingPerson(false);
    };

    const handlePersonDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingPerson(false);
        const file = e.dataTransfer.files[0];
        if (!file || !file.type.startsWith('image/')) return;
        setPersonFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setUserImage(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleGarmentUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setGarmentFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setGarmentImage(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleGarmentDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingGarment(true);
    };

    const handleGarmentDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingGarment(false);
    };

    const handleGarmentDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingGarment(false);
        const file = e.dataTransfer.files[0];
        if (!file || !file.type.startsWith('image/')) return;
        setGarmentFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setGarmentImage(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleSamplePerson = async (url) => {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const file = new File([blob], 'sample-person.jpg', { type: blob.type });
            setPersonFile(file);
            const reader = new FileReader();
            reader.onload = (ev) => setUserImage(ev.target.result);
            reader.readAsDataURL(file);
        } catch (err) {
            console.error('Failed to load sample person:', err);
        }
    };

    const handleSampleGarment = async (url) => {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const file = new File([blob], 'sample-garment.jpg', { type: blob.type });
            setGarmentFile(file);
            const reader = new FileReader();
            reader.onload = (ev) => setGarmentImage(ev.target.result);
            reader.readAsDataURL(file);
        } catch (err) {
            console.error('Failed to load sample garment:', err);
        }
    };

    const handleGenerate = async () => {
        if (!personFile || !garmentFile) {
            alert('Please upload or select both person and garment images');
            return;
        }

        setIsGenerating(true);

        try {
            const backendResult = await performTryOn(personFile, garmentFile);

            if (backendResult.status === 'success') {
                const resultUrl = backendResult.cloudinary_url || backendResult.result_url;
                setResult(resultUrl);
                console.log('Try-on successful:', {
                    saved_to_history: backendResult.saved_to_history,
                    cloudinary_url: backendResult.cloudinary_url
                });
            } else {
                alert(backendResult.message || 'Try-on failed');
            }
        } catch (e) {
            console.error('Try-on error:', e);
            alert(`Error: ${e.message}. Make sure the backend is running.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = async () => {
        if (!result) return;
        try {
            const response = await fetch(result);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'stylora-tryon-result.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
            alert('Could not download image');
        }
    };

    const handleShare = async () => {
        if (!result) return;
        try {
            const response = await fetch(result);
            const blob = await response.blob();
            const file = new File([blob], 'stylora-tryon-result.jpg', { type: 'image/jpeg' });
            await navigator.share({
                files: [file],
                title: 'My Try-On Result',
                text: 'Check out my virtual try-on!',
            });
        } catch (err) {
            console.error('Share failed:', err);
            alert('Sharing not supported or failed');
        }
    };

    const resetTryOn = () => {
        setResult(null);
        setUserImage(null);
        setGarmentImage(null);
        setPersonFile(null);
        setGarmentFile(null);
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

            <div className="tryon-content" style={{ flex: 1, padding: '2.5rem', position: 'relative', overflowY: 'auto' }}>

                <header style={{ marginBottom: '1.5rem' }}>
                    <h1 className="text-section" style={{ color: 'var(--color-text-primary)', margin: 0, fontSize: '2.2rem' }}>Studio</h1>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Create your virtual look with AI precision.</p>
                    <div style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'rgba(255,193,7,0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,193,7,0.2)', color: 'rgb(180,83,9)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiAlertTriangle size={16} />
                        <p style={{ fontSize: '0.85rem', margin: 0 }}>Beta version - Still in development. Don't expect perfectly accurate results.</p>
                    </div>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: 'calc(100% - 100px)' }}>

                    <div className="flex-responsive-row" style={{ display: 'flex', gap: '2.5rem', flex: 1, minHeight: 0 }}>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            {/* Person Upload */}
                            <div className="card-minimal" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>1. Your Photo</h3>
                                    {userImage && <button className="text-small" onClick={() => { setUserImage(null); setPersonFile(null); }} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Remove</button>}
                                </div>

                                <div
                                    onClick={() => !userImage && userFileRef.current.click()}
                                    onDragOver={handlePersonDragOver}
                                    onDragLeave={handlePersonDragLeave}
                                    onDrop={handlePersonDrop}
                                    style={{
                                        flex: 1,
                                        background: userImage ? `url(${userImage}) center/contain no-repeat, var(--color-surface)` : isDraggingPerson ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))' : '#F8F9FA',
                                        borderRadius: 'var(--radius-lg)',
                                        border: !userImage ? isDraggingPerson ? '2px solid var(--color-primary)' : '2px dashed var(--color-border)' : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        minHeight: '400px',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: userImage ? '0 10px 30px rgba(0,0,0,0.1)' : isDraggingPerson ? '0 8px 24px rgba(99, 102, 241, 0.2)' : 'none',
                                        transform: isDraggingPerson ? 'scale(1.02)' : 'scale(1)'
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
                                            <FiUpload size={32} />
                                            <p style={{ marginTop: '0.5rem' }}>Upload or Drag Photo</p>
                                            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Supported: JPG, PNG, WEBP</p>
                                        </div>
                                    )}
                                    <input ref={userFileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={handlePersonUpload} />
                                </div>

                                {!userImage && (
                                    <div style={{ marginTop: '1rem' }}>
                                        <p className="text-small" style={{ marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Or try with sample:</p>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {PERSON_SAMPLES.map(s => (
                                                <img
                                                    key={s.id}
                                                    src={s.url}
                                                    alt={s.name}
                                                    onClick={() => handleSamplePerson(s.url)}
                                                    style={{
                                                        width: '80px', height: '100px',
                                                        borderRadius: '8px', objectFit: 'cover',
                                                        cursor: 'pointer', border: '2px solid var(--color-border)',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                                    onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-border)'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Garment Upload */}
                            <div className="card-minimal" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>2. Garment</h3>
                                    {garmentImage && <button className="text-small" onClick={() => { setGarmentImage(null); setGarmentFile(null); }} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Change</button>}
                                </div>

                                {!garmentImage ? (
                                    <div
                                        onClick={() => garmentFileRef.current.click()}
                                        onDragOver={handleGarmentDragOver}
                                        onDragLeave={handleGarmentDragLeave}
                                        onDrop={handleGarmentDrop}
                                        style={{
                                            flex: 1,
                                            background: isDraggingGarment ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))' : '#F8F9FA',
                                            borderRadius: 'var(--radius-lg)',
                                            border: isDraggingGarment ? '2px solid var(--color-primary)' : '2px dashed var(--color-border)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            minHeight: '400px',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            boxShadow: isDraggingGarment ? '0 8px 24px rgba(99, 102, 241, 0.2)' : 'none',
                                            transform: isDraggingGarment ? 'scale(1.02)' : 'scale(1)'
                                        }}
                                    >
                                        <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
                                            <FiUpload size={32} />
                                            <p style={{ marginTop: '0.5rem' }}>Upload or Drag Product Image</p>
                                            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Supported: JPG, PNG, WEBP</p>
                                        </div>
                                        <input ref={garmentFileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={handleGarmentUpload} />
                                    </div>
                                ) : (
                                    <div style={{
                                        flex: 1,
                                        background: garmentImage ? `url(${garmentImage}) center/contain no-repeat, white` : '#F8F9FA',
                                        borderRadius: 'var(--radius-lg)',
                                        minHeight: '400px',
                                        border: '1px solid var(--color-border)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                    }} />
                                )}

                                {!garmentImage && (
                                    <div style={{ marginTop: '1rem' }}>
                                        <p className="text-small" style={{ marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Or choose sample:</p>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {GARMENT_SAMPLES.map(s => (
                                                <img
                                                    key={s.id}
                                                    src={s.url}
                                                    alt={s.name}
                                                    onClick={() => handleSampleGarment(s.url)}
                                                    style={{
                                                        width: '80px', height: '100px',
                                                        borderRadius: '8px', objectFit: 'cover',
                                                        cursor: 'pointer', border: '2px solid var(--color-border)',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                                    onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-border)'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Result Panel */}
                        <div style={{ flex: '1.5', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="card-minimal" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Result Preview</h3>
                                    {result && <button className="text-small" onClick={() => setResult(null)} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Clear</button>}
                                </div>

                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9FA', position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', minHeight: '400px' }}>
                                    {result ? (
                                        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <img
                                                src={result}
                                                alt="Try-On Result"
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            />
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

                                {result && (
                                    <div style={{
                                        padding: '1.25rem',
                                        borderTop: '1px solid var(--color-border)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                        background: 'rgba(255,255,255,0.55)',
                                    }}>
                                        <button className="icon-btn" title="Download" style={{ background: '#F3F4F6', borderRadius: '999px' }} onClick={handleDownload}>
                                            <FiDownload size={20} />
                                        </button>
                                        <button className="icon-btn" title="Share" style={{ background: '#F3F4F6', borderRadius: '999px' }} onClick={handleShare}>
                                            <FiShare2 size={20} />
                                        </button>
                                        <button className="icon-btn" title="Refine" style={{ background: '#F3F4F6', borderRadius: '999px' }}>
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
                        </div>
                    </div>
                </div>
            </div>

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