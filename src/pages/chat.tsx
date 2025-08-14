import { useEffect } from "react";
import { Box, Paper, Typography, Stack, Chip, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useChat } from "../components/chat/hooks/useChat";
import ChatContainer from "../components/chat/chatContainer";

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const fadeInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 20,
      duration: 0.4,
    },
  },
};

const ChatPage: React.FC = () => {
  const { currentConversation, isLoading, createNewConversation, sendMessage } = useChat();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    // Create initial conversation if none exists
    if (!currentConversation) {
      createNewConversation();
    }
  }, [currentConversation, createNewConversation]);

  if (isMobile) {
    // Mobile: Full-screen chat
    return (
      <Box sx={{ height: "100vh", backgroundColor: "var(--bg-primary)" }}>
        <ChatContainer conversation={currentConversation} isLoading={isLoading} onSendMessage={sendMessage} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        background: "linear-gradient(110deg, var(--primary-50) 0%, var(--bg-secondary) 100%)",
      }}
    >
      {/* Left Side - Share Your Story Reminder */}
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        sx={{
          width: "35%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: "var(--space-6)",
        }}
      >
        <MotionPaper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 400,
            p: "var(--space-8)",
            borderRadius: "var(--radius-2xl)",
            bgcolor: "var(--bg-primary)",
            boxShadow: "var(--shadow-lg)",
            position: "relative",
          }}
        >
          {/* Warm Welcome Header */}
          <Box sx={{ textAlign: "center", mb: "var(--space-6)" }}>
            <Typography
              variant="h4"
              sx={{
                color: "var(--primary-900)",
                fontWeight: 800,
                fontSize: "var(--text-2xl)",
                mb: "var(--space-2)",
              }}
            >
              💬 You're in Safe Hands
            </Typography>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-base)",
                lineHeight: "var(--leading-relaxed)",
                fontWeight: 500,
              }}
            >
              Take your time sharing your health concerns. Our AI assistant is here to listen and help guide you toward expert care.
            </Typography>
          </Box>

          {/* What's Happening Now */}
          <Box
            sx={{
              bgcolor: "var(--success-50)",
              borderRadius: "var(--radius-lg)",
              p: "var(--space-4)",
              mb: "var(--space-6)",
              border: "1px solid var(--success-200)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "var(--success-800)",
                fontWeight: 700,
                mb: "var(--space-3)",
                fontSize: "var(--text-lg)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              🌟 Right Now
            </Typography>
            <Typography
              sx={{
                color: "var(--success-700)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-relaxed)",
                mb: "var(--space-2)",
              }}
            >
              • Share your symptoms, concerns, or questions freely
            </Typography>
            <Typography
              sx={{
                color: "var(--success-700)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-relaxed)",
                mb: "var(--space-2)",
              }}
            >
              • Our AI is analyzing and organizing your information
            </Typography>
            <Typography
              sx={{
                color: "var(--success-700)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              • Everything is completely confidential and HIPAA-secure
            </Typography>
          </Box>

          {/* What Happens Next */}
          <Box
            sx={{
              bgcolor: "var(--primary-50)",
              borderRadius: "var(--radius-lg)",
              p: "var(--space-4)",
              mb: "var(--space-6)",
              border: "1px solid var(--primary-200)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "var(--primary-800)",
                fontWeight: 700,
                mb: "var(--space-3)",
                fontSize: "var(--text-lg)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              🔮 What Happens Next
            </Typography>
            <Stack spacing="var(--space-2)">
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)" }}>
                <Box sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "var(--primary-600)",
                  mt: "var(--space-1)",
                  flexShrink: 0
                }} />
                <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--primary-700)", lineHeight: "var(--leading-relaxed)" }}>
                  <strong>Within 24 hours:</strong> Your case is matched with board-certified specialists in your condition area
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)" }}>
                <Box sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "var(--primary-600)",
                  mt: "var(--space-1)",
                  flexShrink: 0
                }} />
                <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--primary-700)", lineHeight: "var(--leading-relaxed)" }}>
                  <strong>Within 72 hours:</strong> You receive a comprehensive, easy-to-understand second opinion report
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)" }}>
                <Box sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "var(--primary-600)",
                  mt: "var(--space-1)",
                  flexShrink: 0
                }} />
                <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--primary-700)", lineHeight: "var(--leading-relaxed)" }}>
                  <strong>Always available:</strong> Follow-up questions and ongoing support from our care team
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Reassurance Section */}
          <Box
            sx={{
              bgcolor: "var(--warning-50)",
              borderRadius: "var(--radius-lg)",
              p: "var(--space-4)",
              mb: "var(--space-6)",
              border: "1px solid var(--warning-200)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "var(--warning-800)",
                fontWeight: 700,
                mb: "var(--space-3)",
                fontSize: "var(--text-base)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              🤗 Remember
            </Typography>
            <Typography
              sx={{
                color: "var(--warning-700)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-relaxed)",
                fontStyle: "italic",
              }}
            >
              "There are no silly questions when it comes to your health. Share as much or as little as you're comfortable with - every detail helps us provide better care."
            </Typography>
          </Box>

          {/* Trust Indicators */}
          <Stack direction="row" spacing="var(--space-2)" flexWrap="wrap" gap="var(--space-1)">
            <Chip
              label="🔒 HIPAA Secure"
              size="small"
              sx={{ bgcolor: "var(--success-100)", color: "var(--success-800)", fontWeight: 600 }}
            />
            <Chip
              label="🏥 Board Certified"
              size="small"
              sx={{ bgcolor: "var(--primary-100)", color: "var(--primary-800)", fontWeight: 600 }}
            />
            <Chip
              label="🌍 Global Experts"
              size="small"
              sx={{ bgcolor: "var(--info-100)", color: "var(--info-800)", fontWeight: 600 }}
            />
            <Chip
              label="⚡ 72hr Response"
              size="small"
              sx={{ bgcolor: "var(--warning-100)", color: "var(--warning-800)", fontWeight: 600 }}
            />
          </Stack>
        </MotionPaper>
      </MotionBox>

      {/* Right Side - Chat Interface */}
      <Box
        sx={{
          width: "65%",
          borderLeft: "1px solid var(--border-light)",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <ChatContainer conversation={currentConversation} isLoading={isLoading} onSendMessage={sendMessage} />
      </Box>
    </Box>
  );
};

export default ChatPage;
