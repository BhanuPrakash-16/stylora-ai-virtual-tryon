// Forgot Password Component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to send reset email');
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-logo">Stylora</h1>
                    <p className="auth-tagline">AI Virtual Try-On</p>
                </div>

                <h2 className="auth-title">Reset Password</h2>
                <p className="auth-subtitle">
                    Enter your email and we'll send you a reset link
                </p>

                {error && <div className="auth-error">{error}</div>}

                {success ? (
                    <div className="auth-success">
                        <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p>Password reset email sent! Check your inbox.</p>
                        <Link to="/login" className="btn-primary btn-full">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary btn-full"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                <p className="auth-footer">
                    Remember your password? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
