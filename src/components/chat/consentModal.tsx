import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Divider,
  Stack,
  Alert,
  Link,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface ConsentModalProps {
  open: boolean;
  onConsent: () => void;
  onDecline: () => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({ open, onConsent, onDecline }) => {
  const [consentChecked, setConsentChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [dataProcessingChecked, setDataProcessingChecked] = useState(false);

  const allConsentsGiven = consentChecked && privacyChecked && dataProcessingChecked;

  const handleProceed = () => {
    if (allConsentsGiven) {
      onConsent();
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 'var(--radius-2xl)',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          pb: 2,
          borderBottom: '1px solid var(--primary-100)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
          <SecurityIcon sx={{ fontSize: 'var(--text-3xl)', color: 'var(--primary-600)' }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--primary-700), var(--primary-900))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: { xs: 'var(--text-xl)', md: 'var(--text-2xl)' },
            }}
          >
            Healthcare Information Consent
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'var(--text-secondary)',
            fontWeight: 500,
            fontSize: 'var(--text-base)',
          }}
        >
          Your privacy and data security are our highest priorities
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ py: 4 }}>
        <Alert
          severity="info"
          icon={<VerifiedUserIcon />}
          sx={{
            mb: 4,
            borderRadius: 'var(--radius-lg)',
            bgcolor: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--primary-800)' }}>
            This consent is required to provide you with personalized healthcare consultation services.
          </Typography>
        </Alert>

        <Stack spacing={4}>
          {/* Main Consent Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'var(--primary-800)',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <LocalHospitalIcon sx={{ fontSize: 'var(--text-lg)' }} />
              Healthcare Information Sharing Authorization
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                mb: 3,
              }}
            >
              By providing your consent, you authorize Continuia and its affiliated healthcare network to:
            </Typography>

            <Box sx={{ pl: 2, mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 2, color: 'var(--text-primary)' }}>
                <strong>• Medical Information Processing:</strong> Utilize artificial intelligence systems and clinical decision support tools to analyze your health information, symptoms, and medical history for the purpose of clinical triage and care coordination.
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'var(--text-primary)' }}>
                <strong>• Healthcare Provider Access:</strong> Share your health information with licensed healthcare professionals, including physicians, specialists, and clinical staff who are credentialed within their respective jurisdictions and bound by professional medical ethics and confidentiality obligations.
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'var(--text-primary)' }}>
                <strong>• Care Coordination:</strong> Facilitate communication between healthcare providers for the purpose of scheduling consultations, coordinating care plans, and ensuring continuity of medical services.
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                <strong>• Clinical Documentation:</strong> Create, maintain, and share medical records and clinical documentation necessary for providing comprehensive healthcare services and maintaining care quality standards.
              </Typography>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  sx={{ color: 'var(--primary-600)' }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  I authorize the sharing of my health information as described above for healthcare purposes.
                </Typography>
              }
            />
          </Box>

          <Divider />

          {/* Privacy and Security Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'var(--primary-800)',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <SecurityIcon sx={{ fontSize: 'var(--text-lg)' }} />
              Privacy and Security Acknowledgment
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                mb: 3,
              }}
            >
              Your health information is protected by industry-standard security measures and regulatory compliance frameworks including HIPAA, GDPR, and applicable international healthcare privacy regulations. All healthcare providers accessing your information are licensed professionals operating within their authorized jurisdictions.
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  sx={{ color: 'var(--primary-600)' }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  I acknowledge that I have read and understand the privacy and security measures in place to protect my health information.
                </Typography>
              }
            />
          </Box>

          <Divider />

          {/* Data Processing Rights */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'var(--primary-800)',
                mb: 2,
              }}
            >
              Your Rights and Data Processing
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                mb: 3,
              }}
            >
              You retain the right to access, modify, or request deletion of your health information at any time. You may withdraw this consent at any point, though this may limit our ability to provide certain healthcare services. For questions about your data rights, please contact our Privacy Officer through our{' '}
              <Link href="/privacy" sx={{ color: 'var(--primary-600)', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
              .
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={dataProcessingChecked}
                  onChange={(e) => setDataProcessingChecked(e.target.checked)}
                  sx={{ color: 'var(--primary-600)' }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  I understand my rights regarding my health information and consent to the processing of my data for healthcare purposes.
                </Typography>
              }
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          p: 4,
          borderTop: '1px solid var(--primary-100)',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={onDecline}
          variant="outlined"
          sx={{
            color: 'var(--text-secondary)',
            borderColor: 'var(--border-light)',
            '&:hover': {
              borderColor: 'var(--text-secondary)',
            },
          }}
        >
          Decline
        </Button>
        <Button
          onClick={handleProceed}
          variant="contained"
          disabled={!allConsentsGiven}
          sx={{
            background: allConsentsGiven
              ? 'linear-gradient(90deg, var(--primary-600), var(--primary-800))'
              : 'var(--neutral-300)',
            color: 'var(--text-inverse)',
            fontWeight: 600,
            px: 4,
            '&:hover': {
              background: allConsentsGiven
                ? 'linear-gradient(90deg, var(--primary-700), var(--primary-900))'
                : 'var(--neutral-300)',
            },
          }}
        >
          Proceed with Consultation
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsentModal;