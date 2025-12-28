import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './styles/styles.css';

// Pages
// Splash page removed
// import Splash from './pages/Splash';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ResponsibleAI from './pages/ResponsibleAI';
import Auth from './pages/Auth';
import AgeVerification from './pages/AgeVerification';
import Permissions from './pages/Permissions';
import Dashboard from './pages/Dashboard';
import TryOn from './pages/TryOn';
import History from './pages/History';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
    // Splash screen removed per user request

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Welcome />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/how-it-works" element={<About />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/responsible-ai" element={<ResponsibleAI />} />
                    <Route path="/auth" element={<Auth />} />

                    {/* TEST ROUTE - Remove in production */}
                    <Route path="/test-tryon" element={<TryOn />} />

                    {/* Onboarding Routes */}
                    <Route path="/age-verification" element={<ProtectedRoute><AgeVerification /></ProtectedRoute>} />
                    {/* Permissions page removed for web */}
                    {/* <Route path="/permissions" element={<ProtectedRoute><Permissions /></ProtectedRoute>} /> */}

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/try-on" element={<ProtectedRoute><TryOn /></ProtectedRoute>} />
                    <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
                    <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
