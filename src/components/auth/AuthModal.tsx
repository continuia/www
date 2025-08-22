import { useState } from "react";
import { Dialog, DialogContent, Box, Typography, IconButton, Button } from "@mui/material";
import { Close, Email, WhatsApp } from "@mui/icons-material";
import GoogleOneTap from "./GoogleOneTap";
import WhatsAppAuth from "./WhatsAppAuth";
import UsernamePasswordAuth from "./UsernamePasswordAuth";
import { useAuthStore } from "../../store/useAuthStore";

const AuthModal = () => {
  const setShowAuthModal = useAuthStore((s) => s.setShowAuthModal);
  const open = useAuthStore((s) => s.showAuthModal);
  const [tab, setTab] = useState<"whatsapp" | "email">("whatsapp");

  const handleClose = () => {
    setTab("whatsapp");
    setShowAuthModal(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "var(--radius-2xl)",
            maxWidth: 430,
            boxShadow: "var(--shadow-2xl)",
            bgcolor: "var(--bg-primary)",
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--space-4) var(--space-6)",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--text-xl)",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Sign in to Continue
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "var(--neutral-500)" }}>
            <Close />
          </IconButton>
        </Box>

        {/* Google area */}
        <Box display="flex" flexDirection="column" gap={2} sx={{ m: "var(--space-6)" }}>
          <GoogleOneTap />
        </Box>

        {/* Tabs */}
        <Box display="flex" mx="var(--space-6)" mb="var(--space-3)">
          <Button
            fullWidth
            onClick={() => setTab("whatsapp")}
            startIcon={
              <WhatsApp
                sx={{
                  fontSize: 18,
                  color: tab === "whatsapp" ? "var(--text-inverse)" : "var(--neutral-700)",
                }}
              />
            }
            sx={{
              background: tab === "whatsapp" ? "var(--primary-600)" : "var(--neutral-100)",
              color: tab === "whatsapp" ? "var(--text-inverse)" : "var(--neutral-700)",
              fontWeight: 600,
              borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
              py: "var(--space-2)",
              gap: "var(--space-2)",
              textTransform: "none",
              "&:hover": {
                background: tab === "whatsapp" ? "var(--primary-700)" : "var(--neutral-200)",
              },
            }}
          >
            WhatsApp
          </Button>

          <Button
            fullWidth
            onClick={() => setTab("email")}
            startIcon={
              <Email
                sx={{
                  fontSize: 18,
                  color: tab === "email" ? "var(--text-inverse)" : "var(--neutral-700)",
                }}
              />
            }
            sx={{
              background: tab === "email" ? "var(--primary-600)" : "var(--neutral-100)",
              color: tab === "email" ? "var(--text-inverse)" : "var(--neutral-700)",
              fontWeight: 600,
              borderRadius: "0 var(--radius-md) var(--radius-md) 0",
              py: "var(--space-2)",
              gap: "var(--space-2)",
              textTransform: "none",
              "&:hover": {
                background: tab === "email" ? "var(--primary-700)" : "var(--neutral-200)",
              },
            }}
          >
            Email
          </Button>
        </Box>

        {/* Form content */}
        <Box px="var(--space-6)" pb="var(--space-6)">
          {tab === "whatsapp" ? <WhatsAppAuth /> : <UsernamePasswordAuth />}
          <Typography
            sx={{
              fontSize: "var(--text-xs)",
              textAlign: "center",
              color: "var(--text-tertiary)",
              mt: "var(--space-4)",
            }}
          >
            By signing in, you agree to{" "}
            <a href="#" style={{ color: "var(--primary-600)" }}>
              Terms
            </a>{" "}
            and{" "}
            <a href="#" style={{ color: "var(--primary-600)" }}>
              Privacy Policy
            </a>
            .
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
