'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('tour_dibo_auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default initial state for new visitors is Logged Out (GUEST)
        const guestUser = {
          isLoggedIn: false,
          role: 'GUEST',
          name: '',
          email: '',
          avatar: '',
        };
        setUser(guestUser);
        localStorage.setItem('tour_dibo_auth_user', JSON.stringify(guestUser));
      }
    } catch (err) {
      console.error('Failed to load auth from localStorage:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function (Email & Password authentication)
  const login = (role = 'USER', email = 'user@deshit-bd.com', name = '') => {
    const displayName = name || (email ? email.split('@')[0] : 'User');
    const updatedUser = {
      isLoggedIn: true,
      role,
      name: displayName,
      email,
      avatar: displayName.substring(0, 2).toUpperCase(),
    };
    setUser(updatedUser);
    localStorage.setItem('tour_dibo_auth_user', JSON.stringify(updatedUser));
  };

  // Switch Role function (USER <-> PLANNER)
  const switchRole = (newRole) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      role: newRole,
    };
    setUser(updatedUser);
    localStorage.setItem('tour_dibo_auth_user', JSON.stringify(updatedUser));
  };

  // Logout function
  const logout = () => {
    const loggedOutUser = {
      isLoggedIn: false,
      role: 'GUEST',
      name: '',
      email: '',
      avatar: '',
    };
    setUser(loggedOutUser);
    localStorage.setItem('tour_dibo_auth_user', JSON.stringify(loggedOutUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
