import React from 'react';
import '../styles/styles.css';

export default function Splash() {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            animation: 'fadeIn 0.5s ease-in-out'
        }}>
            <div style={{
                textAlign: 'center',
                animation: 'scaleIn 0.8s ease-out'
            }}>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-primary)',
                    letterSpacing: '-2px'
                }}>
                    Stylora
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500'
                }}>
                    AI-Powered Virtual Try-On
                </p>
                <div className="spinner" style={{
                    margin: '2rem auto 0',
                    borderTopColor: 'white'
                }}></div>
            </div>
        </div>
    );
}
