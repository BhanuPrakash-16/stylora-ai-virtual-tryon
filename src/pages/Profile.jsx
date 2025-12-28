import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiArrowLeft, FiUser, FiSettings, FiShield, FiLogOut, FiChevronRight, FiBell, FiMoon } from 'react-icons/fi';
import '../styles/styles.css';

export default function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-background)', color: 'var(--color-text-primary)' }}>

            {/* Header */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(247, 248, 246, 0.9)', backdropFilter: 'blur(10px)',
                padding: '1.5rem 2rem', borderBottom: '1px solid var(--color-border)'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
                        <FiArrowLeft size={24} />
                    </button>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Settings</h1>
                </div>
            </div>

            <div style={{ padding: '2rem', maxWidth: '840px', margin: '0 auto' }}>

                {/* Profile Card */}
                <div style={{
                    background: 'white', borderRadius: '24px', padding: '2rem',
                    display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', background: '#E5E7EB',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem'
                    }}>
                        {user?.photoURL ? <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : '👤'}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.25rem' }}>{user?.displayName || 'Stylist'}</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>{user?.email}</p>
                    </div>
                    <button style={{ marginLeft: 'auto', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid var(--color-border)', background: 'transparent', cursor: 'pointer' }}>
                        Edit
                    </button>
                </div>

                {/* Section: Preferences */}
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '1rem', marginLeft: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferences</h3>
                <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <SettingItem icon={<FiUser />} label="Account Details" arrow />
                </div>

                {/* Section: Privacy & Support */}
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '1rem', marginLeft: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Support</h3>
                <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <SettingItem
                        icon={<FiShield />}
                        label="Privacy Policy"
                        arrow
                        onClick={() => navigate('/privacy')}
                    />
                    <Divider />
                    <SettingItem
                        icon={<FiSettings />}
                        label="Terms of Service"
                        arrow
                        onClick={() => navigate('/terms')}
                    />
                </div>

                {/* Log Out */}
                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%', background: 'white', padding: '1.25rem', borderRadius: '24px',
                        color: '#EF4444', fontWeight: '500', fontSize: '1rem', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        marginTop: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                    }}
                >
                    <FiLogOut /> Log Out
                </button>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: '#9CA3AF', fontSize: '0.8rem' }}>
                    Stylora v1.0.0
                </p>

            </div>
        </div>
    );
}

function SettingItem({ icon, label, arrow, toggle, onClick }) {
    return (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', padding: '1.25rem 1.5rem', cursor: 'pointer' }}>
            <div style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)', marginRight: '1rem' }}>{icon}</div>
            <div style={{ flex: 1, fontWeight: '500' }}>{label}</div>

            {arrow && <FiChevronRight style={{ color: '#9CA3AF' }} />}

            {toggle && (
                <div style={{
                    width: '48px', height: '28px', background: '#E5E7EB', borderRadius: '50px',
                    position: 'relative', transition: 'background 0.2s'
                }}>
                    <div style={{
                        width: '24px', height: '24px', background: 'white', borderRadius: '50%',
                        position: 'absolute', top: '2px', left: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }} />
                </div>
            )}
        </div>
    );
}

function Divider() {
    return <div style={{ height: '1px', background: 'var(--color-border)', marginLeft: '3.75rem' }} />;
}
