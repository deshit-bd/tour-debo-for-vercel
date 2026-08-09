'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';

export default function SellerLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [authRole, setAuthRole] = useState('PLANNER'); // 'USER' (Tourist) | 'PLANNER'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('planner@deshit-bd.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Green Bengal Tours & Travels');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login('PLANNER', email, name || 'Green Bengal Tours & Travels');
      router.push('/business-center');
    }, 600);
  };

  return (
    <div className="figma-page-shell" style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />

      {/* Dark Blurred Backdrop Layer matching Image 2 */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'grid',
          placeItems: 'center',
          padding: '20px',
        }}
      >
        {/* Modal Popup Card (Matching Screenshot Image 2 Exactly) */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            width: '100%',
            maxWidth: '430px',
            padding: '36px 32px 32px 32px',
            position: 'relative',
            animation: 'modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Close Icon Button (✕) */}
          <Link
            href="/business-center"
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
              textDecoration: 'none',
              lineHeight: 1,
            }}
          >
            ✕
          </Link>

          {/* Title & Subtitle */}
          <h3 style={{ fontSize: '1.45rem', fontWeight: '800', margin: '0 0 6px 0', textAlign: 'center', color: '#0F172A' }}>
            {authMode === 'login' ? '💼 Tour Planner Portal' : '✨ Join as Tour Planner'}
          </h3>
          <p style={{ fontSize: '0.86rem', color: '#64748B', textAlign: 'center', margin: '0 0 24px 0', lineHeight: 1.45 }}>
            {authMode === 'login'
              ? 'Welcome back! Sign in to manage your tours, visas & business dashboard'
              : 'Create your agency account to list packages, manage bookings & reach tourists'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {authMode === 'register' && (
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Agency / Tour Planner Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Green Bengal Tours & Travels"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    outline: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#0F172A',
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="planner@example.com"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#0F172A',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#0F172A',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#2563EB',
                color: '#ffffff',
                padding: '13px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '800',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '6px',
                boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
              }}
            >
              {loading
                ? 'Authenticating...'
                : authMode === 'login'
                ? 'Login to Planner Portal'
                : 'Register as Tour Planner'}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.82rem', color: '#64748B', marginTop: '6px' }}>
              {authMode === 'login' ? "Don't have a planner account? " : 'Already registered? '}
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

      <Footer />
    </div>
  );
}
