import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff, Person } from '@mui/icons-material';
import { useAuth } from './AuthContext';
import axiosInstance from '../../api/axiosConfig';

interface UsernamePasswordAuthProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
}

const UsernamePasswordAuth: React.FC<UsernamePasswordAuthProps> = ({ onSuccess, onError }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }

    if (!isLogin) {
      if (!formData.firstName.trim()) {
        setError('First name is required');
        return false;
      }
      if (!formData.lastName.trim()) {
        setError('Last name is required');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      let result;
      
      if (isLogin) {
        // Login with existing auth endpoint
        result = await axiosInstance.post('/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Register with new social auth endpoint
        result = await axiosInstance.post('/api/social-auth/username-password/register', {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      }

      if (result.data.user && result.data.token) {
        login(result.data.token, result.data.user);
        onSuccess?.(result.data.user);
      }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
        (isLogin ? 'Login failed' : 'Registration failed');
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: 'var(--primary-800)' }}>
        {isLogin ? 'Sign In' : 'Create Account'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <TextField
              fullWidth
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
              disabled={isLoading}
              required
            />

            <TextField
              fullWidth
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
              disabled={isLoading}
              required
            />
          </>
        )}

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
          disabled={isLoading}
          required
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange('password')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  disabled={isLoading}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
          disabled={isLoading}
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            bgcolor: 'var(--primary-600)',
            '&:hover': { bgcolor: 'var(--primary-700)' },
            py: 1.5,
            mb: 2,
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            isLogin ? 'Sign In' : 'Create Account'
          )}
        </Button>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 1 }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Typography>
          
          <Button
            variant="text"
            onClick={toggleMode}
            disabled={isLoading}
            sx={{ color: 'var(--primary-600)' }}
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UsernamePasswordAuth;