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
        flexDirection: "column",
        background: "var(--bg-secondary)",
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          background: "linear-gradient(135deg, var(--primary-50) 0%, var(--bg-secondary) 50%, var(--primary-25) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "30%",
            height: "120%",
            background: "radial-gradient(circle, var(--primary-100) 0%, transparent 70%)",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            right: "-5%",
            width: "25%",
            height: "80%",
            background: "radial-gradient(circle, var(--primary-200) 0%, transparent 70%)",
            opacity: 0.2,
            pointerEvents: "none",
          }}
        />

        {/* Left Side - Full Height Guidance Panel */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          sx={{
            width: "38%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Single Full-Height Card */}
          <MotionPaper
            elevation={6}
            sx={{
              height: "100%",
              borderRadius: 0,
              bgcolor: "var(--bg-primary)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              border: "1px solid var(--primary-100)",
              borderLeft: "none",
              display: "flex",
              flexDirection: "column",
              p: "var(--space-8)",
            }}
          >
            {/* Welcome Header */}
            <Box sx={{ textAlign: "center", mb: "var(--space-6)" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "var(--primary-900)",
                  fontWeight: 800,
                  fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
                  mb: "var(--space-3)",
                  background: "linear-gradient(135deg, var(--primary-700), var(--primary-900))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
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
                  mb: "var(--space-4)",
                }}
              >
                Take your time sharing your health concerns. Our AI assistant is here to listen and help guide you toward expert care.
              </Typography>

              {/* Trust Indicators */}
              <Stack direction="row" spacing="var(--space-1)" justifyContent="center" flexWrap="wrap" gap="var(--space-1)">
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
                  label="⚡ 72hr Response"
                  size="small"
                  sx={{ bgcolor: "var(--warning-100)", color: "var(--warning-800)", fontWeight: 600 }}
                />
              </Stack>
            </Box>

            {/* Process Steps - Flex Content */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {/* What's Happening Now */}
              <Box sx={{ mb: "var(--space-6)" }}>
              <Typography
                variant="h6"
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
              <Stack spacing="var(--space-2)">
                <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--success-700)", lineHeight: "var(--leading-relaxed)" }}>
                  • Share your symptoms, concerns, or questions freely
                </Typography>
                <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--success-700)", lineHeight: "var(--leading-relaxed)" }}>
                  • Our AI is analyzing and organizing your information
                </Typography>
                <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--success-700)", lineHeight: "var(--leading-relaxed)" }}>
                  • Everything is completely confidential and HIPAA-secure
                </Typography>
              </Stack>
            </Box>

            {/* What Happens Next */}
            <Box sx={{ mb: "var(--space-6)" }}>
              <Typography
                variant="h6"
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
              <Stack spacing="var(--space-3)">
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}>
                  <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "var(--primary-600)",
                    mt: "var(--space-1)",
                    flexShrink: 0
                  }} />
                  <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--primary-700)", lineHeight: "var(--leading-relaxed)" }}>
                    <strong>Within 24 hours:</strong> Your case is matched with board-certified specialists in your condition area
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}>
                  <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "var(--primary-600)",
                    mt: "var(--space-1)",
                    flexShrink: 0
                  }} />
                  <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--primary-700)", lineHeight: "var(--leading-relaxed)" }}>
                    <strong>Within 72 hours:</strong> You receive a comprehensive, easy-to-understand second opinion report
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}>
                  <Box sx={{
                    width: 8,
                    height: 8,
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

            {/* Reassurance Quote */}
            <Box
              sx={{
                bgcolor: "var(--warning-50)",
                borderRadius: "var(--radius-lg)",
                p: "var(--space-4)",
                border: "1px solid var(--warning-200)",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "var(--warning-800)",
                  fontWeight: 700,
                  mb: "var(--space-2)",
                  fontSize: "var(--text-sm)",
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
                  fontSize: "var(--text-xs)",
                  lineHeight: "var(--leading-relaxed)",
                  fontStyle: "italic",
                }}
              >
                "There are no silly questions when it comes to your health. Share as much or as little as you're comfortable with."
              </Typography>
              </Box>
            </Box>

            {/* Additional Support Section */}
            <Box
              sx={{
                mt: "auto",
                pt: "var(--space-6)",
                borderTop: "1px solid var(--primary-100)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "var(--primary-800)",
                  fontWeight: 700,
                  mb: "var(--space-3)",
                  fontSize: "var(--text-base)",
                  textAlign: "center",
                }}
              >
                🤝 We're Here to Help
              </Typography>
              <Stack spacing="var(--space-2)">
                <Box sx={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "var(--primary-600)" }} />
                  <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                    Available in 15+ languages
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "var(--primary-600)" }} />
                  <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                    24/7 technical support
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "var(--primary-600)" }} />
                  <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                    Secure & confidential platform
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </MotionPaper>
        </MotionBox>

        {/* Right Side - Enhanced Chat Interface */}
        <Box
          sx={{
            width: "62%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 2,
          }}
        >
          <ChatContainer conversation={currentConversation} isLoading={isLoading} onSendMessage={sendMessage} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
