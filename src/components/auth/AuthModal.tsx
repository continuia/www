import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  IconButton,
  Alert,
  Divider
} from '@mui/material';
import { Close, Google, WhatsApp, Email } from '@mui/icons-material';
import GoogleOneTap from './GoogleOneTap';
import WhatsAppAuth from './WhatsAppAuth';
import UsernamePasswordAuth from './UsernamePasswordAuth';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onSuccess }) => {
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
  };

  const handleAuthSuccess = (user: any) => {
    setSuccess(`Welcome, ${user.firstName}!`);
    setTimeout(() => {
      onSuccess?.(user);
      onClose();
    }, 1500);
  };

  const handleAuthError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleClose = () => {
    setError('');
    setSuccess('');
    setTabValue(0);
    onClose();
  };

  return (
    <>
      {/* Google One-Tap (invisible component) */}
      {open && (
        <GoogleOneTap
          onSuccess={handleAuthSuccess}
          onError={handleAuthError}
        />
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 'var(--radius-2xl)',
            maxWidth: 500,
          }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* Header */}
          <Box sx={{ 
            p: 3, 
            pb: 0, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Typography variant="h5" sx={{ 
              color: 'var(--primary-800)', 
              fontWeight: 700 
            }}>
              Sign in to Continue
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Success/Error Messages */}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Google One-Tap Notice */}
            <Box sx={{ 
              mb: 3, 
              p: 2, 
              bgcolor: 'var(--primary-50)', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--primary-200)'
            }}>
              <Typography variant="body2" sx={{ 
                color: 'var(--primary-800)', 
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}>
                <Google sx={{ fontSize: 20 }} />
                Look for the Google One-Tap prompt above, or choose an option below
              </Typography>
            </Box>

            {/* Authentication Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    minHeight: 48,
                    textTransform: 'none',
                    fontWeight: 600,
                  }
                }}
              >
                <Tab 
                  icon={<WhatsApp />} 
                  label="WhatsApp" 
                  iconPosition="start"
                  sx={{ color: 'var(--success-600)' }}
                />
                <Tab 
                  icon={<Email />} 
                  label="Email" 
                  iconPosition="start"
                  sx={{ color: 'var(--primary-600)' }}
                />
              </Tabs>
            </Box>

            {/* Tab Panels */}
            <TabPanel value={tabValue} index={0}>
              <WhatsAppAuth
                onSuccess={handleAuthSuccess}
                onError={handleAuthError}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <UsernamePasswordAuth
                onSuccess={handleAuthSuccess}
                onError={handleAuthError}
              />
            </TabPanel>

            {/* Footer */}
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="caption" sx={{ 
              display: 'block', 
              textAlign: 'center', 
              color: 'var(--text-muted)',
              lineHeight: 1.4
            }}>
              By signing in, you agree to our Terms of Service and Privacy Policy.
              Your data is protected with HIPAA-compliant security.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModal;