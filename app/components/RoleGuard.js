'use client';

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function RoleGuard({ allowedRoles = ['PLANNER'], children }) {
  const { user, loading, switchRole } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', fontWeight: 'bold', color: '#64748B' }}>
        Checking authorization permissions...
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
            You need to be logged in to access the Seller Business Center. Please log in with your account to proceed.
          </p>
          <Link href="/" className="btn-seller-primary" style={{ textDecoration: 'none', justifyContent: 'center' }}>
            🏠 Return to Homepage & Login
          </Link>
        </div>
      </div>
    );
  }

  // 2. Authorization Check: Role mismatch (e.g. Tourist accessing Seller Center)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="figma-main-content" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', padding: '40px 20px' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #FEF3C7',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '520px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🛡️</div>
          <span style={{ background: '#FEF3C7', color: '#D97706', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>
            Authorization Restricted
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', margin: '12px 0 8px' }}>
            Planner / Seller Account Required
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>
            Your current active role is <strong>Tourist / Customer</strong>. The Seller Business Center is restricted to registered <strong>Planners & Sellers</strong>.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              className="btn-seller-primary"
              onClick={() => switchRole('PLANNER')}
              style={{ justifyContent: 'center', border: 'none', cursor: 'pointer' }}
            >
              ⚡ Switch to Planner Mode & Access Portal
            </button>
            <Link href="/account/profile" style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'none', fontWeight: '700' }}>
              ← Return to Tourist Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User is authorized!
  return children;
}
