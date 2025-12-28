import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile } from '../services/firestoreService';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import '../styles/styles.css';
import '../styles/variables.css';

export default function AgeVerification() {
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUnderage, setIsUnderage] = useState(false);

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const calculateAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!birthDate) {
            setError('Please enter your date of birth');
            return;
        }

        const age = calculateAge(birthDate);

        if (age < 18) {
            setIsUnderage(true);
            return;
        }

        setLoading(true);

        try {
            // Save DOB to user profile
            await updateUserProfile(user.uid, {
                dateOfBirth: birthDate,
                ageVerified: true,
                ageVerifiedAt: new Date().toISOString()
            });

            // Proceed to dashboard (Permissions skipped for web)
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to save verification. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (isUnderage) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 'var(--z-modal)',
                padding: 'var(--space-xl)'
            }}>
                <div className="animate-slide-up" style={{
                    maxWidth: '500px',
                    width: '100%',
                    background: 'white',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-3xl)',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-xl)'
                }}>
                    <div style={{
                        fontSize: '48px',
                        marginBottom: 'var(--space-lg)'
                    }}>🔒</div>

                    <h2 className="text-section" style={{
                        marginBottom: 'var(--space-md)',
                        color: 'var(--color-text-primary)'
                    }}>
                        We're sorry
                    </h2>

                    <p className="text-body" style={{
                        color: 'var(--color-text-secondary)',
                        lineHeight: 'var(--line-height-generous)',
                        marginBottom: 'var(--space-2xl)'
                    }}>
                        Stylora is currently available only to users aged 18 and above.
                        <br /><br />
                        This decision is made to ensure safety, privacy, and responsible use of AI technology.
                    </p>

                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: 'var(--space-md)',
                            background: 'var(--color-text-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-body)',
                            fontWeight: 'var(--font-medium)',
                            cursor: 'pointer',
                            transition: 'transform var(--transition-base)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(247, 248, 246, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 'var(--z-modal)',
            padding: 'var(--space-xl)'
        }}>
            <div className="animate-slide-up" style={{
                maxWidth: '480px',
                width: '100%',
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-3xl)',
                boxShadow: 'var(--shadow-xl)'
            }}>
                {/* Icon */}
                <div style={{
                    textAlign: 'center',
                    fontSize: '40px',
                    marginBottom: 'var(--space-xl)'
                }}>
                    🎂
                </div>

                {/* Title */}
                <h2 className="text-section" style={{
                    textAlign: 'center',
                    marginBottom: 'var(--space-md)',
                    fontSize: '28px'
                }}>
                    Confirm your age
                </h2>

                {/* Description */}
                <p className="text-body" style={{
                    textAlign: 'center',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-2xl)',
                    lineHeight: 'var(--line-height-generous)'
                }}>
                    Stylora is designed for users aged 18 and above.
                    <br />
                    Please enter your date of birth to continue.
                </p>

                {/* Error Message */}
                {error && (
                    <div style={{
                        padding: 'var(--space-md)',
                        marginBottom: 'var(--space-lg)',
                        background: 'rgba(184, 92, 80, 0.08)',
                        border: '1px solid rgba(184, 92, 80, 0.2)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-error)',
                        fontSize: 'var(--text-caption)',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 'var(--space-xl)' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--space-sm)',
                            fontSize: 'var(--text-caption)',
                            fontWeight: 'var(--font-medium)',
                            color: 'var(--color-text-secondary)'
                        }}>
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => {
                                setBirthDate(e.target.value);
                                setError('');
                            }}
                            max={new Date().toISOString().split('T')[0]}
                            required
                            style={{
                                width: '100%',
                                padding: 'var(--space-md)',
                                background: 'white',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: 'var(--text-body)',
                                fontFamily: 'var(--font-primary)',
                                transition: 'border var(--transition-base)',
                                appearance: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: 'var(--space-md)',
                            background: 'var(--color-text-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--text-body)',
                            fontWeight: 'var(--font-medium)',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'transform var(--transition-base)',
                            opacity: loading ? 0.6 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
                    >
                        {loading ? <LoadingSpinner color="white" /> : 'Continue'}
                    </button>
                </form>

                {/* Privacy Note */}
                <p className="text-small" style={{
                    textAlign: 'center',
                    marginTop: 'var(--space-xl)',
                    color: 'var(--color-text-tertiary)',
                    lineHeight: 'var(--line-height-generous)'
                }}>
                    Your date of birth is stored securely and used only for age verification. We respect your privacy.
                </p>
            </div>
        </div>
    );
}
