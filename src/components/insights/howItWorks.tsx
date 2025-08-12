import { Box, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import { useEffect } from "react";

const cardData = [
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: "var(--primary-600)" }} />,
    title: "100% Confidential",
    description: "Your privacy is protected with the highest security standards",
    bg: "var(--primary-100)",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 40, color: "var(--info)" }} />,
    title: "72-hour Response",
    description: "Get expert opinions quickly when time matters most",
    bg: "var(--primary-50)",
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "var(--success)" }} />,
    title: "Board-certified Specialists",
    description: "Only verified experts in your specific condition",
    bg: "var(--neutral-100)",
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 40, color: "var(--primary-400)" }} />,
    title: "Compassionate Care",
    description: "Understanding consultation focused on your needs",
    bg: "var(--primary-100)",
  },
];

export default function HowItWorks() {
  useEffect(() => {
    // Scroll to section if hash exists in URL
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <Box
      id="howItWorks"
      sx={{
        width: "100%",
        bgcolor: "var(--bg-primary)",
        py: "var(--space-16)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "var(--text-primary)",
          mb: "var(--space-12)",
          fontSize: "var(--text-3xl)",
        }}
      >
        How It Works
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "var(--space-8)",
          maxWidth: 1100,
          mx: "auto",
        }}
      >
        {cardData.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.09, type: "spring" }}
            viewport={{ once: true, amount: 0.45 }}
            style={{
              flex: "1 1 220px",
              maxWidth: 250,
              minWidth: 200,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "var(--space-6)",
                bgcolor: "var(--bg-primary)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Box
                sx={{
                  bgcolor: card.bg,
                  borderRadius: "var(--radius-full)",
                  width: 64,
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: "var(--space-3)",
                }}
              >
                {card.icon}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: "var(--space-2)",
                  color: "var(--text-primary)",
                  fontSize: "var(--text-lg)",
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-sm)",
                  mt: "-2px",
                }}
              >
                {card.description}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
