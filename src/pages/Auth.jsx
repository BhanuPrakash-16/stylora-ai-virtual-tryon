import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import '../styles/variables.css';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login, register, signInWithGoogle } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                await login({ email, password });
            } else {
                await register({ email, password, name });
            }
            navigate('/age-verification');
        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            await signInWithGoogle();
            navigate('/age-verification');
        } catch (err) {
            setError(err.message || 'Google sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-background)',
            padding: 'var(--space-xl)'
        }}>
            {/* Glass Card */}
            <div className="animate-slide-up" style={{
                maxWidth: '440px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-3xl)',
                boxShadow: 'var(--shadow-xl)'
            }}>
                {/* Logo */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: 'var(--space-lg)',
                    fontSize: '18px',
                    fontWeight: 'var(--font-medium)',
                    color: 'var(--color-text-primary)'
                }}>
                    Stylora
                </div>

                {/* Title */}
                <h2 className="text-section" style={{
                    textAlign: 'center',
                    marginBottom: 'var(--space-md)',
                    fontSize: '28px'
                }}>
                    {isLogin ? 'Welcome back' : 'Create account'}
                </h2>

                <p className="text-caption" style={{
                    textAlign: 'center',
                    marginBottom: 'var(--space-2xl)',
                    color: 'var(--color-text-secondary)'
                }}>
                    {isLogin ? 'Sign in to continue your fashion journey' : 'Join Stylora to try outfits virtually'}
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
                        fontSize: 'var(--text-caption)'
                    }}>
                        {error}
                    </div>
                )}

                {/* Google Sign-In (Primary) */}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: 'var(--space-md)',
                        marginBottom: 'var(--space-lg)',
                        background: 'white',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-body)',
                        fontWeight: 'var(--font-medium)',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'all var(--transition-base)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-sm)',
                        opacity: loading ? 0.6 : 1
                    }}
                    onMouseEnter={(e) => !loading && (e.target.style.borderColor = 'var(--color-text-primary)')}
                    onMouseLeave={(e) => !loading && (e.target.style.borderColor = 'var(--color-border)')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {loading ? <LoadingSpinner color="#4285F4" /> : 'Continue with Google'}
                </button>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: 'var(--space-xl) 0',
                    color: 'var(--color-text-tertiary)',
                    fontSize: 'var(--text-small)'
                }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--color-divider)' }} />
                    <span style={{ padding: '0 var(--space-md)' }}>or</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--color-divider)' }} />
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div style={{ marginBottom: 'var(--space-md)' }}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                                style={{
                                    width: '100%',
                                    padding: 'var(--space-md)',
                                    background: 'white',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--text-body)',
                                    transition: 'border var(--transition-base)',
                                    fontFamily: 'var(--font-primary)'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: 'var(--space-md)' }}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: 'var(--space-md)',
                                background: 'white',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: 'var(--text-body)',
                                transition: 'border var(--transition-base)',
                                fontFamily: 'var(--font-primary)'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </div>

                    <div style={{ marginBottom: 'var(--space-md)' }}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: 'var(--space-md)',
                                background: 'white',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: 'var(--text-body)',
                                transition: 'border var(--transition-base)',
                                fontFamily: 'var(--font-primary)'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </div>

                    {!isLogin && (
                        <div style={{ marginBottom: 'var(--space-md)' }}>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required={!isLogin}
                                style={{
                                    width: '100%',
                                    padding: 'var(--space-md)',
                                    background: 'white',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--text-body)',
                                    transition: 'border var(--transition-base)',
                                    fontFamily: 'var(--font-primary)'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-text-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                            />
                        </div>
                    )}

                    {!isLogin && (
                        <p className="text-small" style={{
                            marginBottom: 'var(--space-md)',
                            color: 'var(--color-text-tertiary)',
                            lineHeight: 'var(--line-height-generous)'
                        }}>
                            By continuing, you agree to our <a href="/terms" style={{ color: 'var(--color-text-secondary)' }}>Terms</a> & <a href="/privacy" style={{ color: 'var(--color-text-secondary)' }}>Privacy Policy</a>.
                        </p>
                    )}

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
                            opacity: loading ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
                    >
                        {loading ? <LoadingSpinner color="white" /> : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                {/* Toggle */}
                <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            fontSize: 'var(--text-caption)',
                            transition: 'color var(--transition-base)'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                </div>

                {/* Back to Home */}
                <div style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-tertiary)',
                            cursor: 'pointer',
                            fontSize: 'var(--text-small)',
                            transition: 'color var(--transition-base)'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-tertiary)'}
                    >
                        ← Back to home
                    </button>
                </div>
            </div>
        </div>
    );
}
