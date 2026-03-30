import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'starter' | 'pro' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials - in production, this would be server-side
const ADMIN_EMAIL = 'admin@sparkam.com';
const ADMIN_PASSWORD = 'Sparkam2025!';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('sparkam_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.plan === 'admin');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: 'admin-001',
        email: ADMIN_EMAIL,
        name: 'Admin',
        plan: 'admin',
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('sparkam_user', JSON.stringify(adminUser));
      return true;
    }

    // Demo user for testing
    if (email === 'demo@sparkam.com' && password === 'demo123') {
      const demoUser: User = {
        id: 'demo-001',
        email: 'demo@sparkam.com',
        name: 'Demo User',
        plan: 'pro',
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      localStorage.setItem('sparkam_user', JSON.stringify(demoUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('sparkam_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
