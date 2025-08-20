import { useAuth } from "../auth/AuthContext";
import { Person, Add, Login } from "@mui/icons-material";
import { Box, Typography, Chip, Button } from "@mui/material";

interface ChatHeaderProps {
  setShowAuthModal: (value: boolean) => void;
  isConnecting: boolean;
  newConversation: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ setShowAuthModal, isConnecting, newConversation }) => {
  const { user, isAuthenticated } = useAuth();

  const onShowAuthModal = () => setShowAuthModal(true);

  const handleStartNewSession = () => {
    setTimeout(() => {
      newConversation();
    }, 100);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-light)",
        px: "var(--space-6)",
        py: "var(--space-4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-4)",
      }}
    >
      {/* Left: Title and New Chat */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            color: "var(--text-primary)",
            fontSize: { xs: "var(--text-sm)", md: "var(--text-md)", lg: "var(--text-xl)" },
            letterSpacing: "0.01em",
          }}
        >
          Healthcare Consultation
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          disabled={isConnecting}
          onClick={handleStartNewSession}
          sx={{
            display: { xs: "none", lg: "flex" },
            background: "var(--primary-600)",
            color: "var(--text-inverse)",
            borderRadius: "var(--radius-lg)",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            fontSize: "var(--text-sm)",
            px: "var(--space-3)",
            py: "var(--space-1)",
            minWidth: 0,
            "&:hover": {
              background: "var(--primary-700)",
            },
          }}
        >
          New Chat
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          disabled={isConnecting}
          onClick={handleStartNewSession}
          sx={{
            display: { xs: "flex", lg: "none" },
            background: "var(--primary-600)",
            color: "var(--text-inverse)",
            borderRadius: "var(--radius-lg)",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            fontSize: "var(--text-sm)",
            px: "var(--space-4)",
            py: "var(--space-1)",
            minWidth: 0,
            "&:hover": {
              background: "var(--primary-700)",
            },
          }}
        >
          New
        </Button>
      </Box>

      {/* Right: Auth Status & Sign In */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        {isAuthenticated ? (
          <Chip
            icon={<Person sx={{ color: "var(--neutral-400)" }} />}
            label={`${user?.email}` || "User"}
            size="small"
            sx={{
              bgcolor: "var(--success-100)",
              color: "var(--success-900)",
              fontWeight: 500,
              fontSize: "var(--text-xs)",
              ".MuiChip-icon": { mr: "var(--space-1)" },
            }}
          />
        ) : (
          <>
            <Chip
              icon={<Person sx={{ color: "var(--neutral-400)" }} />}
              label="Anonymous"
              size="small"
              sx={{
                bgcolor: "var(--neutral-100)",
                color: "var(--neutral-700)",
                fontWeight: 500,
                fontSize: "var(--text-xs)",
                ".MuiChip-icon": { mr: "var(--space-1)" },
              }}
            />
            <Button
              endIcon={<Login />}
              variant="contained"
              size="small"
              onClick={onShowAuthModal}
              sx={{
                display: { xs: "none", lg: "flex" },
                ml: "var(--space-1)",
                backgroundColor: "var(--neutral-900)",
                color: "var(--text-inverse)",
                fontWeight: 600,
                fontSize: "var(--text-xs)",
                borderRadius: "var(--radius-lg)",
                textTransform: "none",
                px: "var(--space-3)",
                py: "var(--space-1)",
                minWidth: 0,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "var(--neutral-800)",
                },
              }}
            >
              Login
            </Button>

            <Button
              startIcon={<Login />}
              variant="contained"
              size="small"
              onClick={onShowAuthModal}
              sx={{
                display: { xs: "flex", lg: "none" },
                ml: "var(--space-1)",
                backgroundColor: "var(--neutral-900)",
                color: "var(--text-inverse)",
                fontWeight: 600,
                fontSize: "var(--text-xs)",
                borderRadius: "var(--radius-md)",
                textTransform: "none",
                px: "var(--space-1)",
                py: "var(--space-1)",
                minWidth: 0,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "var(--neutral-800)",
                },
                "& .MuiButton-startIcon": {
                  marginRight: { xs: 0, md: "var(--space-1)" },
                  marginLeft: 0,
                },
              }}
            ></Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChatHeader;
