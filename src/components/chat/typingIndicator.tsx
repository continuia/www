import { Box, Avatar, Typography } from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import { keyframes } from "@mui/system";

const typingAnimation = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-8px);
    opacity: 1;
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

interface TypingIndicatorProps {
  agentName: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ agentName }) => {
  return (
    <Box display="flex" justifyContent="flex-start" sx={{ mb: "var(--space-3)" }}>
      <Box display="flex" alignItems="flex-start" gap="var(--space-3)" maxWidth="75%">
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: "var(--neutral-200)",
            color: "var(--text-primary)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <SmartToy fontSize="small" />
        </Avatar>

        <Box
          sx={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)",
            borderRadius: "var(--radius-2xl) var(--radius-2xl) var(--radius-2xl) var(--radius-md)",
            padding: "var(--space-4) var(--space-5)",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--border-light)",
            minWidth: 140,
          }}
        >
          <Box display="flex" alignItems="center" gap="var(--space-2)">
            <Typography
              variant="body2"
              sx={{
                fontSize: "var(--text-sm)",
                color: "var(--text-tertiary)",
                fontStyle: "italic",
                animation: `${pulseAnimation} 2s infinite`,
              }}
            >
              {agentName} is typing
            </Typography>

            <Box display="flex" gap="var(--space-1)" alignItems="center">
              {[0, 1, 2].map((dot) => (
                <Box
                  key={dot}
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "var(--primary-500)",
                    animation: `${typingAnimation} 1.4s infinite`,
                    animationDelay: `${dot * 0.2}s`,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TypingIndicator;
