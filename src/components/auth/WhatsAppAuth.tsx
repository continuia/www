import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  CircularProgress,
  InputAdornment,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { Phone, Message } from '@mui/icons-material';
import { useAuth } from './AuthContext';
import axiosInstance from '../../api/axiosConfig';

interface WhatsAppAuthProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
}

const WhatsAppAuth: React.FC<WhatsAppAuthProps> = ({ onSuccess, onError }) => {
  const { login } = useAuth();
  const [step, setStep] = useState(0); // 0: phone input, 1: OTP input
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const steps = ['Enter Phone Number', 'Verify OTP'];

  // Format phone number with country code
  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // Add + prefix if not present
    if (!digits.startsWith('+')) {
      // Assume US number if no country code
      if (digits.length === 10) {
        return `+1${digits}`;
      }
      return `+${digits}`;
    }
    return `+${digits}`;
  };

  const requestOTP = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      await axiosInstance.post('/api/social-auth/whatsapp/request-otp', {
        phoneNumber: formattedPhone,
      });

      setStep(1);
      startCountdown();
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      const result = await axiosInstance.post('/api/social-auth/whatsapp/verify-otp', {
        phoneNumber: formattedPhone,
        otp: otp.trim(),
      });

      if (result.data.user && result.data.token) {
        login(result.data.token, result.data.user);
        onSuccess?.(result.data.user);
      }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resendOTP = () => {
    if (countdown === 0) {
      requestOTP();
    }
  };

  const goBack = () => {
    setStep(0);
    setOtp('');
    setError('');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: 'var(--primary-800)' }}>
        WhatsApp Authentication
      </Typography>

      <Stepper activeStep={step} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {step === 0 && (
        <Box>
          <TextField
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
            disabled={isLoading}
          />
          
          <Button
            fullWidth
            variant="contained"
            onClick={requestOTP}
            disabled={isLoading || !phoneNumber.trim()}
            sx={{
              bgcolor: 'var(--success-600)',
              '&:hover': { bgcolor: 'var(--success-700)' },
              py: 1.5,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Send OTP via WhatsApp'
            )}
          </Button>
        </Box>
      )}

      {step === 1 && (
        <Box>
          <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: 'var(--text-secondary)' }}>
            We've sent a 6-digit code to your WhatsApp
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
            {formatPhoneNumber(phoneNumber)}
          </Typography>

          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="123456"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Message />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
            disabled={isLoading}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={verifyOTP}
            disabled={isLoading || otp.length !== 6}
            sx={{
              bgcolor: 'var(--success-600)',
              '&:hover': { bgcolor: 'var(--success-700)' },
              py: 1.5,
              mb: 2,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Verify OTP'
            )}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="text"
              onClick={goBack}
              disabled={isLoading}
              sx={{ color: 'var(--text-secondary)' }}
            >
              Change Number
            </Button>

            <Button
              variant="text"
              onClick={resendOTP}
              disabled={isLoading || countdown > 0}
              sx={{ color: countdown > 0 ? 'var(--text-muted)' : 'var(--primary-600)' }}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WhatsAppAuth;