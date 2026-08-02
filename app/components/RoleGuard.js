'use client';

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function RoleGuard({ allowedRoles = ['PLANNER'], children }) {
  const { user, loading } = useAuth();

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
    // Case A: Trying to access Admin Dashboard without ADMIN role (e.g. Tourist or Planner)
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

    // Case B: Tourist trying to access Seller Business Center
    return (
      <div className="figma-main-content" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', padding: '40px 20px' }}>
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
            <Link
              href="/business-center/profile"
              className="btn-seller-primary"
              style={{ textDecoration: 'none', justifyContent: 'center' }}
            >
              📝 Complete Seller Registration &amp; KYC Particulars
            </Link>
            <Link href="/account/profile" style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'none', fontWeight: '700' }}>
              ← Return to Tourist Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User is fully authorized!
  return children;
}
