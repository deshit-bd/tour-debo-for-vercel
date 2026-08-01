'use client';

import RoleGuard from '../components/RoleGuard';

export default function BusinessCenterLayout({ children }) {
  return (
    <RoleGuard allowedRoles={['PLANNER']}>
      {children}
    </RoleGuard>
  );
}
