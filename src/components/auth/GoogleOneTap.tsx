import React, { useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import axiosInstance from '../../api/axiosConfig';

interface GoogleOneTapProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    google: any;
    handleCredentialResponse: (response: any) => void;
  }
}

const GoogleOneTap: React.FC<GoogleOneTapProps> = ({ onSuccess, onError }) => {
  const { login } = useAuth();
  const isInitialized = useRef(false);
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''; // You'll need to set this

  useEffect(() => {
    if (isInitialized.current || !GOOGLE_CLIENT_ID) return;
    
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      initializeGoogleOneTap();
    };
    
    document.head.appendChild(script);
    isInitialized.current = true;

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [GOOGLE_CLIENT_ID]);

  const initializeGoogleOneTap = () => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    // Define the callback function globally
    window.handleCredentialResponse = async (response: any) => {
      try {
        console.log('Google One-Tap response received:', response);
        
        // Send the credential to our backend
        const result = await axiosInstance.post('/api/social-auth/google-one-tap', {
          credential: response.credential,
          clientId: GOOGLE_CLIENT_ID,
        });

        if (result.data.user && result.data.token) {
          // Login successful
          login(result.data.token, result.data.user);
          onSuccess?.(result.data.user);
          console.log('Google One-Tap login successful:', result.data.user);
        }
      } catch (error: any) {
        console.error('Google One-Tap login failed:', error);
        const errorMessage = error.response?.data?.message || 'Google authentication failed';
        onError?.(errorMessage);
      }
    };

    // Initialize Google One-Tap
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: window.handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // Display the One-Tap prompt
    window.google.accounts.id.prompt((notification: any) => {
      console.log('Google One-Tap notification:', notification);
      
      if (notification.isNotDisplayed()) {
        console.log('Google One-Tap was not displayed:', notification.getNotDisplayedReason());
      } else if (notification.isSkippedMoment()) {
        console.log('Google One-Tap was skipped:', notification.getSkippedReason());
      } else if (notification.isDismissedMoment()) {
        console.log('Google One-Tap was dismissed:', notification.getDismissedReason());
      }
    });
  };

  // This component doesn't render anything visible
  // The Google One-Tap prompt appears as an overlay
  return null;
};

export default GoogleOneTap;