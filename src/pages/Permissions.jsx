import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile } from '../services/firestoreService';
import { FiCamera, FiImage, FiCpu, FiFileText } from 'react-icons/fi';

export default function Permissions() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [consents, setConsents] = useState({
        camera: false,
        upload: false,
        aiProcessing: false,
        terms: false
    });
    const [loading, setLoading] = useState(false);

    const allAgreed = Object.values(consents).every(v => v);

    const handleContinue = async () => {
        if (!allAgreed) return;

        setLoading(true);
        try {
            await updateUserProfile(user.uid, {
                consents,
                onboardingCompleted: true
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to save permissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const permissions = [
        {
            id: 'camera',
            icon: <FiCamera size={24} />,
            title: 'Camera Access',
            description: 'Allow camera access to capture photos for virtual try-on'
        },
        {
            id: 'upload',
            icon: <FiImage size={24} />,
            title: 'Media Upload',
            description: 'Permission to upload and process your photos locally'
        },
        {
            id: 'aiProcessing',
            icon: <FiCpu size={24} />,
            title: 'AI Processing',
            description: 'Use AI to analyze garments and create try-on previews'
        },
        {
            id: 'terms',
            icon: <FiFileText size={24} />,
            title: 'Terms & Privacy',
            description: 'Agree to Terms of Service and Privacy Policy'
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <motion.div
                className="glass-card"
                style={{ maxWidth: '600px', width: '100%', padding: '3rem' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Permissions & Consent</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '3rem', textAlign: 'center' }}>
                    We need your permission to provide the best experience
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                    {permissions.map((permission) => (
                        <div key={permission.id} className="glass-card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'var(--gradient-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    flexShrink: 0
                                }}>
                                    {permission.icon}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{permission.title}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                                        {permission.description}
                                    </p>

                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={consents[permission.id]}
                                            onChange={(e) => setConsents({ ...consents, [permission.id]: e.target.checked })}
                                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                        />
                                        <span style={{ fontSize: '0.875rem' }}>I agree</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!allAgreed || loading}
                    className="glass-button"
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: allAgreed ? 'var(--gradient-primary)' : undefined,
                        border: 'none',
                        opacity: allAgreed ? 1 : 0.5
                    }}
                >
                    {loading ? 'Setting up...' : 'Continue to Stylora'}
                </button>

                <p style={{
                    marginTop: '1.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-tertiary)',
                    textAlign: 'center'
                }}>
                    You can change these permissions anytime in Settings.
                    All processing happens locally for your privacy.
                </p>
            </motion.div>
        </div>
    );
}
