import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axiosInstance from '../../api/axiosConfig';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profilePictureUrl?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check for existing authentication on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if there's a token in localStorage or cookie
      const token = localStorage.getItem('auth_token');
      if (token) {
        // Verify token with backend
        const response = await axiosInstance.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.data.data) {
          setUser(response.data.data);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid token
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, userData: User) => {
    localStorage.setItem('auth_token', token);
    setUser(userData);
    
    // Set default authorization header for future requests
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = async () => {
    try {
      // Call logout endpoint to clean up server-side session
      await axiosInstance.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of server response
      localStorage.removeItem('auth_token');
      delete axiosInstance.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};