import { useEffect, useState, useRef } from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import { useChat } from "../components/chat/hooks/useChat";
import ChatContainer from "../components/chat/chatContainer";
import AuthModal from "../components/auth/AuthModal";
import Image1 from "../assets/home/img1.webp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatHeader from "../components/chat/chatHeader";

const ChatPage: React.FC = () => {
  const { currentConversation, isConnecting, isRestoringSession, isAgentTyping, connectionError, createNewConversation, sendMessage, forceCreateNewConversation } = useChat();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const hasTriedConnection = useRef(false);

  // Handle conversation creation after consent
  useEffect(() => {
    if (!currentConversation && !isConnecting && !isRestoringSession && !hasTriedConnection.current) {
      hasTriedConnection.current = true;
      createNewConversation();
    }
  }, [currentConversation, isConnecting, isRestoringSession, createNewConversation]);

  useEffect(() => {
    if (currentConversation) {
      hasTriedConnection.current = false;
    }
  }, [currentConversation]);

  useEffect(() => {
    if (connectionError) {
      hasTriedConnection.current = false;
      console.error(connectionError);
    }
  }, [connectionError]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const LeftPanel = () => (
    <Box
      sx={{
        width: "38%",
        bgcolor: "var(--bg-primary)",
        p: "var(--space-4)",
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-4)",
        borderRight: "1px solid var(--border-light)",
        overflow: "auto",
        /* Local scrollbar style overrides */
        "&::-webkit-scrollbar": {
          width: 6,
          backgroundColor: "var(--bg-primary)", // white background track
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: 8,
          transition: "background-color 0.3s ease",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "var(--bg-primary)", // white track
        },

        /* Firefox scrollbar styles */
        scrollbarWidth: "thin",
        scrollbarColor: "#ffffff var(--bg-primary)",
        "&:hover": {
          scrollbarColor: "var(--primary-400)",
        },
      }}
    >
      {/* Share Your Story */}
      <Box flex={1} gap="var(--space-4)"  display={"flex"} flexDirection={"column"} justifyContent={"space-around"}>
        {/* Share Your Story */}
        <Box sx={{ display: "flex", alignItems: "center", mb: "var(--space-3)" }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "var(--text-xl)",
                color: "var(--text-primary)",
                fontWeight: 700,
                mb: "var(--space-1)",
              }}
            >
              Share Your Story
            </Typography>
            <Typography
              sx={{
                fontSize: "var(--text-base)",
                color: "var(--primary-600)",
                fontWeight: 500,
                mb: "var(--space-2)",
              }}
            >
              Secure, confidential, comprehensive
            </Typography>
            <Typography
              sx={{
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
                mb: "var(--space-3)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              Start by securely sharing your medical history with ease. Our HIPAA-compliant platform organizes your records intelligently, ensuring nothing is missed.
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label="HIPAA Secure"
                icon={<CheckCircleIcon sx={{ color: "var(--success)" }} />}
                sx={{
                  color: "var(--primary-700)",
                  fontWeight: 500,
                  borderRadius: "var(--radius-lg)",
                  fontSize: "var(--text-xs)",
                  px: 1.2,
                  height: 28,
                }}
                size="small"
              />
              <Chip
                label="AI Organized"
                icon={<CheckCircleIcon sx={{ color: "var(--success)" }} />}
                sx={{
                  bgcolor: "var(--neutral-100)",
                  color: "var(--primary-700)",
                  fontWeight: 500,
                  borderRadius: "var(--radius-lg)",
                  fontSize: "var(--text-xs)",
                  px: 1.2,
                  height: 28,
                }}
                size="small"
              />
            </Stack>
          </Box>
          <Box
            sx={{
              flex: 1,
              ml: "var(--space-3)",
              minWidth: 64,
              minHeight: 64,
              aspectRatio: "3/2",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              bgcolor: "var(--primary-50)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Image1}
              alt="Share your story"
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        {/* What Happens Next */}
        <Box sx={{ mb: "var(--space-4)" }}>
          <Typography
            sx={{
              fontSize: "var(--text-lg)",
              color: "var(--text-primary)",
              fontWeight: 700,
              mb: "var(--space-3)",
            }}
          >
            What Happens Next
          </Typography>
          <Stack spacing={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FiberManualRecordIcon sx={{ color: "var(--info)", fontSize: 16 }} />
              <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                <strong>Within 24 hours:</strong> Your case is matched with board-certified specialists in your condition area
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <FiberManualRecordIcon sx={{ color: "var(--success)", fontSize: 16 }} />
              <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                <strong>Within 72 hours:</strong> You receive a comprehensive, easy-to-understand second opinion report
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <FiberManualRecordIcon sx={{ color: "var(--warning)", fontSize: 16 }} />
              <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>
                <strong>Always available:</strong> Follow-up questions and ongoing support from our care team
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Remember Box */}
        <Box
          sx={{
            bgcolor: "var(--warning-50)",
            borderRadius: "var(--radius-lg)",
            p: "var(--space-3)",
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-2)",
            border: "1px solid var(--border-light)",
          }}
        >
          <EmojiEmotionsIcon sx={{ color: "var(--warning)", fontSize: 26 }} />
          <Box>
            <Typography
              sx={{
                color: "var(--warning-800)",
                fontWeight: 700,
                fontSize: "var(--text-sm)",
                mb: "var(--space-1)",
              }}
            >
              Remember
            </Typography>
            <Typography
              sx={{
                color: "var(--warning-700)",
                fontSize: "var(--text-sm)",
                fontStyle: "italic",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              "There are no silly questions when it comes to your health. Share as much or as little as you're comfortable with."
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* We're Here to Help */}
      <Box
        sx={{
          mt: "auto",
        }}
      >
        <Typography
          sx={{
            color: "var(--primary-700)",
            fontWeight: 700,
            fontSize: "var(--text-base)",
            textAlign: "center",
            mb: "var(--space-2)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            justifyContent: "center",
          }}
        >
          <span role="img" aria-label="Handshake">
            🤝
          </span>
          We're Here to Help
        </Typography>
        <Stack direction="row" justifyContent="center" gap={3}>
          <Box display="flex" alignItems="center" gap={0.7}>
            <FiberManualRecordIcon sx={{ color: "var(--info)", fontSize: 12 }} />
            <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>15+ languages</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.7}>
            <FiberManualRecordIcon sx={{ color: "var(--warning)", fontSize: 12 }} />
            <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>24/7 support</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.7}>
            <FiberManualRecordIcon sx={{ color: "var(--success)", fontSize: 12 }} />
            <Typography sx={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>Secure & confidential </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  const RightPanel = () => {
    return (
      <Box sx={{ width: { xs: "100%", lg: "62%" }, display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
        <ChatHeader setShowAuthModal={setShowAuthModal} isConnecting={isConnecting} newConversation={forceCreateNewConversation} />
        <ChatContainer agent="Arika_Reddy" conversation={currentConversation} isLoading={isConnecting} isAgentTyping={isAgentTyping} onSendMessage={sendMessage} />
      </Box>
    );
  };

  return (
    <>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />
      <Box sx={{ flex: 1, backgroundColor: "var(--bg-primary)", display: "flex", minHeight: 0 }}>
        <LeftPanel />
        <RightPanel />
      </Box>
    </>
  );
};

export default ChatPage;
