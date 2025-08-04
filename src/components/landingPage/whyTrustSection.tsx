import React from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language"; // For Global Expertise
import InsightsIcon from "@mui/icons-material/Insights"; // For AI-Enhanced
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"; // For Clinical Governance
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.14,
      duration: 0.66,
      type: "spring",
      stiffness: 65,
      damping: 22,
    },
  }),
};

const MotionPaper = motion(Paper);

const featureCards = [
  {
    icon: <LanguageIcon sx={{ fontSize: 38, color: "var(--primary-600)" }} />,
    title: "Global Expertise",
    body: "Access to world-renowned specialists across 50+ medical specialties, operating seamlessly across India, US, UAE, and expanding globally.",
  },
  {
    icon: <InsightsIcon sx={{ fontSize: 38, color: "var(--primary-600)" }} />,
    title: "AI-Enhanced Intelligence",
    body: "Advanced artificial intelligence that augments clinical decision-making, identifying patterns and insights that enhance diagnostic accuracy.",
  },
  {
    icon: (
      <VerifiedUserIcon sx={{ fontSize: 38, color: "var(--primary-600)" }} />
    ),
    title: "Clinical Governance",
    body: "Built-in governance frameworks that ensure quality, safety, and compliance across all medical consultations and institutional deployments.",
  },
];

const WhyTrustSection: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background:
          "linear-gradient(110deg, var(--primary-50) 0%, var(--bg-secondary) 100%)",
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      {/* Heading and Subtitle */}
      <Box sx={{ maxWidth: 830, mx: "auto", textAlign: "center", mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: "var(--primary-800)",
            mb: 1.5,
            fontSize: { xs: "1.55rem", sm: "2.04rem", md: "2.33rem" },
            background:
              "linear-gradient(90deg, var(--primary-400), var(--primary-700))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            userSelect: "none",
            letterSpacing: 1,
          }}
        >
          Why Healthcare Professionals Trust Continuia
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            fontSize: { xs: "1.05rem", md: "1.11rem" },
            maxWidth: 600,
            mx: "auto",
            mb: 0.5,
          }}
        >
          Our platform combines cutting-edge AI technology with human expertise
          to deliver unparalleled medical insights and clinical governance.
        </Typography>
      </Box>
      {/* Card Row */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3.5, md: 4 }}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
          flexWrap: "wrap",
        }}
      >
        {featureCards.map((card, i) => (
          <MotionPaper
            key={card.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            variants={cardVariants}
            custom={i}
            elevation={5}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 32px -3px var(--primary-400)",
              transition: { duration: 0.18 },
            }}
            sx={{
              width: { xs: "100%", sm: 420, md: 340 },
              maxWidth: 400,
              minHeight: { xs: 170, md: 220 },
              flex: 1,
              bgcolor: "var(--bg-primary)",
              borderRadius: 3.4,
              boxShadow: "var(--shadow-lg)",
              px: { xs: 3, sm: 4 },
              py: { xs: 3, sm: 4.2 },
              mb: { xs: 0, md: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              mx: "auto",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "var(--primary-50)",
                borderRadius: "50%",
                boxShadow: "0 2px 10px 0 var(--primary-200)",
                mb: 2,
              }}
            >
              {card.icon}
            </Box>
            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                color: "var(--primary-900)",
                fontWeight: 800,
                fontSize: { xs: "1.14rem", sm: "1.22rem", md: "1.25rem" },
                mb: 1.1,
                letterSpacing: 0.1,
                lineHeight: 1.22,
              }}
            >
              {card.title}
            </Typography>
            {/* Body */}
            <Typography
              variant="body2"
              sx={{
                color: "var(--text-secondary)",
                fontWeight: 500,
                fontSize: { xs: "1.024rem", sm: "1.08rem", md: "1.09rem" },
                lineHeight: 1.6,
              }}
            >
              {card.body}
            </Typography>
          </MotionPaper>
        ))}
      </Stack>
    </Box>
  );
};

export default WhyTrustSection;
