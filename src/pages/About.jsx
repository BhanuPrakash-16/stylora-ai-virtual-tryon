import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

export default function About() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Simple Nav */}
            <nav className="glass-navbar" style={{ padding: '1rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>Stylora</h2>
                    <button onClick={() => navigate('/')} className="glass-button">← Back</button>
                </div>
            </nav>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About Stylora</h1>

                    <h2>Our Vision</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                        Stylora is revolutionizing online fashion shopping with AI-powered virtual try-on technology.
                        We believe everyone deserves to shop with confidence, knowing exactly how clothes will look before making a purchase.
                    </p>

                    <h2>The Problem We Solve</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                        Online fashion shopping is broken. High return rates, sizing uncertainty, and environmental waste plague the industry.
                        Customers can't visualize how garments will actually look on them, leading to disappointment and unnecessary returns.
                    </p>

                    <h2>Our Solution</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                        Using cutting-edge AI and computer vision technology powered by Google's Gemini, we provide instant, realistic virtual try-on experiences.
                        Our privacy-first approach ensures your images never leave your device while delivering professional-grade results.
                    </p>

                    <h2>Technology</h2>
                    <ul style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
                        <li>Browser-based pose detection for accurate garment placement</li>
                        <li>Google Gemini AI for intelligent garment analysis</li>
                        <li>On-device processing for complete privacy</li>
                        <li>Cloud-optional storage for sharing and history</li>
                    </ul>

                    <h2>Our Commitment</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                        We're committed to responsible AI, user privacy, and sustainable fashion. Every feature is designed with these principles at its core.
                    </p>

                    <button
                        onClick={() => navigate('/auth')}
                        className="glass-button"
                        style={{ padding: '1rem 2rem', background: 'var(--gradient-primary)', border: 'none' }}
                    >
                        Try Stylora Now
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
