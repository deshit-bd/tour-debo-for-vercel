'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function RoleGuard({ allowedRoles = ['PLANNER'], children }) {
  const { user, loading, login, switchRole } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Modal Auth State matching Image 1 & Image 2
  const [authRole, setAuthRole] = useState('PLANNER'); // 'USER' | 'PLANNER'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authEmail, setAuthEmail] = useState('planner@deshit-bd.com');
  const [authPassword, setAuthPassword] = useState('••••••••');
  const [authName, setAuthName] = useState('DeshIT-BD');
  const [authMobile, setAuthMobile] = useState('+880 17 0000 0000');
  const [authNid, setAuthNid] = useState('1995269182348123');
  const [tradeLicense, setTradeLicense] = useState('TRAD/DNCC/019481/2024');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', fontWeight: 'bold', color: '#64748B', fontSize: '1.1rem' }}>
        🔒 Verifying Enterprise Authorization Permissions...
      </div>
    );
  }

  // 1. Authorization Check: Is user logged out?
  if (!user || user.isLoggedIn === false) {
    return (
      <div className="figma-main-content" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', padding: '40px 20px' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #CBD5E1',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '500px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🔒</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
            Authentication Required
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>
            You need to be logged in to access this portal. Please sign in to proceed.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Link href="/admin/login" className="btn-seller-primary" style={{ textDecoration: 'none', background: '#EF4444' }}>
              🛡️ Super Admin Login
            </Link>
            <Link href="/" className="btn-seller-primary" style={{ textDecoration: 'none' }}>
              🏠 Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authorization Check: Role mismatch
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Case A: Trying to access Admin Dashboard without ADMIN role
    if (allowedRoles.includes('ADMIN')) {
      return (
        <div className="figma-main-content" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', padding: '40px 20px' }}>
          <div
            style={{
              background: '#0F172A',
              color: '#F8FAFC',
              border: '1.5px solid #EF4444',
              borderRadius: '24px',
              padding: '40px',
              maxWidth: '540px',
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ fontSize: '3.2rem', marginBottom: '12px' }}>🛑</div>
            <span style={{ background: '#7F1D1D', color: '#FCA5A5', padding: '4px 14px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase' }}>
              Super Admin Authorization Required
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF', margin: '14px 0 8px' }}>
              Access Denied for Non-Admin Account
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '24px', lineHeight: '1.5' }}>
              Your account role is <strong>{user.role}</strong>. Only the platform Super Admin can manage executive analytics, payment releases, and broadcast notifications. Planners and Tourists cannot view this portal.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link
                href="/admin/login"
                style={{
                  background: '#EF4444',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                🔐 Sign In to Super Admin Portal
              </Link>
              <Link
                href={user.role === 'PLANNER' ? '/business-center' : '/account/profile'}
                style={{
                  background: '#334155',
                  color: '#CBD5E1',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                ← Return to {user.role === 'PLANNER' ? 'Business Center' : 'User Account'}
              </Link>
            </div>
          </div>
        </div>
      );
    }

    const handleRoleTabChange = (role) => {
      setAuthRole(role);
      if (role === 'PLANNER') {
        setAuthEmail('planner@deshit-bd.com');
        setAuthName('DeshIT-BD');
      } else {
        setAuthEmail('user@deshit-bd.com');
        setAuthName('Sanjid Ibrahim');
      }
    };

    const handleAuthSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true);
      setTimeout(() => {
        login(authRole, authEmail, authName);
        setShowModal(false);
        setSubmitting(false);
      }, 500);
    };

    // Case B: Tourist trying to access Seller Business Center
    return (
      <div className="figma-main-content" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', padding: '40px 20px', position: 'relative' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #FEF3C7',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '540px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🛡️</div>
          <span style={{ background: '#FEF3C7', color: '#D97706', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>
            Enterprise Access Restricted
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', margin: '12px 0 8px' }}>
            Verified Planner / Seller Account Required
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>
            Your account is currently registered as <strong>Tourist / Customer</strong>. To access the Business Center portal, complete your business particulars &amp; KYC registration (NID, Trade License, Bank Info).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Button 1: Triggers Welcome Back Login Modal (Image 2) */}
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setAuthRole('PLANNER');
                setShowModal(true);
              }}
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '13px 20px',
                borderRadius: '12px',
                fontSize: '0.92rem',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37,99,235,0.25)',
              }}
            >
              🔐 Log In to Seller Account
            </button>

            {/* Button 2 (Image 3): Triggers Create Account Modal (Image 1) */}
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setAuthRole('PLANNER');
                setShowModal(true);
              }}
              style={{
                background: '#F1F5F9',
                color: '#334155',
                border: '1px solid #CBD5E1',
                padding: '12px 20px',
                borderRadius: '12px',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              📝 Complete Seller Registration &amp; KYC Particulars
            </button>

            <Link href="/account/profile" style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'none', fontWeight: '700', marginTop: '4px' }}>
              ← Return to Tourist Profile
            </Link>
          </div>
        </div>

        {/* 🌟 Interactive Auth Modal Popup matching Image 1 & Image 2 exactly */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(5px)',
              zIndex: 99999,
              display: 'grid',
              placeItems: 'center',
              padding: '20px',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                width: '100%',
                maxWidth: '440px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '36px 32px 32px 32px',
                position: 'relative',
              }}
            >
              {/* Close Button ✕ */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  border: 'none',
                  background: 'none',
                  fontSize: '1.4rem',
                  color: '#0F172A',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  lineHeight: 1,
                  zIndex: 10,
                }}
              >
                ✕
              </button>

              {/* Header Title & Subtitle */}
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 6px 0', textAlign: 'center', color: '#0F172A' }}>
                {authMode === 'login' ? '🔑 Welcome Back' : '✨ Create Account'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', textAlign: 'center', margin: '0 0 22px 0' }}>
                {authMode === 'login' ? 'Select your role and login to Tour Dibo' : 'Register a new account on Tour Dibo'}
              </p>

              {/* Role Choice Segment */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px',
                  marginBottom: '22px',
                  background: '#F1F5F9',
                  padding: '4px',
                  borderRadius: '14px',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleRoleTabChange('USER')}
                  style={{
                    padding: '11px 12px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '0.84rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    background: authRole === 'USER' ? '#2563EB' : 'transparent',
                    color: authRole === 'USER' ? '#ffffff' : '#475569',
                  }}
                >
                  👤 Tourist Mode
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleTabChange('PLANNER')}
                  style={{
                    padding: '11px 12px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '0.84rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    background: authRole === 'PLANNER' ? '#2563EB' : 'transparent',
                    color: authRole === 'PLANNER' ? '#ffffff' : '#475569',
                  }}
                >
                  ⚡ Planner Mode
                </button>
              </div>

              {/* Form matching Image 1 (Create Account) or Image 2 (Welcome Back) */}
              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {authMode === 'register' && (
                  <>
                    {/* Agency / Company / Planner Name */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                        {authRole === 'PLANNER' ? 'Agency / Company / Planner Name *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                        required
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                        Mobile Number *
                      </label>
                      <input
                        type="text"
                        value={authMobile}
                        onChange={(e) => setAuthMobile(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                        required
                      />
                    </div>

                    {/* National ID (NID) Number */}
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                        National ID (NID) Number *
                      </label>
                      <input
                        type="text"
                        value={authNid}
                        onChange={(e) => setAuthNid(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                        required
                      />
                    </div>

                    {/* NID Image Uploads */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                          NID Front Part Image *
                        </label>
                        <input type="file" accept="image/*,.pdf" style={{ fontSize: '0.75rem', width: '100%' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                          NID Back Part Image *
                        </label>
                        <input type="file" accept="image/*,.pdf" style={{ fontSize: '0.75rem', width: '100%' }} />
                      </div>
                    </div>

                    {/* Trade License Fields (Planner Mode) */}
                    {authRole === 'PLANNER' && (
                      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#1E40AF', display: 'block', marginBottom: '4px' }}>
                            Trade License Number *
                          </label>
                          <input
                            type="text"
                            value={tradeLicense}
                            onChange={(e) => setTradeLicense(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#1E40AF', display: 'block', marginBottom: '4px' }}>
                            Trade License Document Image Upload *
                          </label>
                          <input type="file" accept="image/*,.pdf" style={{ fontSize: '0.75rem', width: '100%' }} />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Email Address */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Password */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: '#2563EB',
                    color: '#ffffff',
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    marginTop: '8px',
                    boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                  }}
                >
                  {submitting
                    ? 'Processing...'
                    : authMode === 'login'
                    ? `Login as ${authRole === 'PLANNER' ? 'Planner' : 'Tourist'}`
                    : 'Register Account'}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748B', marginTop: '6px' }}>
                  {authMode === 'login' ? "Don't have an account? " : 'Already registered? '}
                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    style={{ color: '#2563EB', fontWeight: '800', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    {authMode === 'login' ? 'Register Now' : 'Login Here'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // User is fully authorized!
  return children;
}
