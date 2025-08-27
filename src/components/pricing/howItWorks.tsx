import React from "react";
import { Box, Typography, Container, Chip } from "@mui/material";
import { Description as DescriptionIcon, Psychology as PsychologyIcon, AttachMoney as AttachMoneyIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  timeline: string;
}

const HowItWorks: React.FC = () => {
  const processSteps: ProcessStep[] = [
    {
      id: "story",
      title: "Share Your Medical Story",
      description: "Upload your medical records and describe your concerns in our secure, HIPAA-compliant platform. Our AI pre-screens for completeness.",
      icon: <DescriptionIcon sx={{ fontSize: 36 }} />,
      color: "#8b5cf6",
      bgColor: "#f3f4f6",
      timeline: "5 minutes",
    },
    {
      id: "matched",
      title: "Get Expert Matched",
      description: "Our proprietary matching algorithm connects you with board-certified specialists who have specific expertise in your condition.",
      icon: <PsychologyIcon sx={{ fontSize: 36 }} />,
      color: "#10b981",
      bgColor: "#f0fdf4",
      timeline: "Within 24 hours",
    },
    {
      id: "quote",
      title: "Transparent Pricing",
      description: "See exactly what you'll pay upfront. No hidden fees, no surprises. Compare options and choose what works for your budget.",
      icon: <AttachMoneyIcon sx={{ fontSize: 36 }} />,
      color: "#f59e0b",
      bgColor: "#fffbeb",
      timeline: "Instant quote",
    },
    {
      id: "opinion",
      title: "Receive Expert Opinion",
      description: "Get a comprehensive, plain-language report with actionable recommendations. Follow-up questions included at no extra cost.",
      icon: <CheckCircleIcon sx={{ fontSize: 36 }} />,
      color: "#3b82f6",
      bgColor: "#eff6ff",
      timeline: "2-7 business days",
    },
  ];

  return (
    <Box
      sx={{
        py: "var(--space-20)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: "var(--space-16)" }}>
          <Box
            sx={{
              width: "60px",
              height: "4px",
              background: "linear-gradient(90deg, var(--primary-500), var(--primary-700))",
              margin: "0 auto var(--space-4)",
              borderRadius: "2px",
            }}
          />

          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "var(--text-3xl)", md: "var(--text-5xl)" },
              fontWeight: 800,
              mb: "var(--space-4)",
              color: "var(--text-primary)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            How It Works
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "var(--text-secondary)",
              fontWeight: 400,
              fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            Get your expert second opinion in 4 seamless steps
          </Typography>
        </Box>

        {/* Process Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: "var(--space-8)", lg: "var(--space-6)" },
            position: "relative",
          }}
        >
          {processSteps.map((step) => (
            <Box
              key={step.id}
              sx={{
                position: "relative",
                background: "var(--bg-primary)",
                borderRadius: "var(--radius-3xl)",
                p: "var(--space-8)",
                textAlign: "center",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
                cursor: "pointer",
                transition: "var(--transition-normal)",
                "&:hover": {
                  boxShadow: "var(--shadow-lg)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {/* Timeline Badge */}
              <Chip
                label={step.timeline}
                size="small"
                sx={{
                  position: "absolute",
                  top: "var(--space-4)",
                  right: "var(--space-4)",
                  backgroundColor: step.color,
                  color: "white",
                  fontWeight: 600,
                  fontSize: "var(--text-xs)",
                }}
              />

              {/* Icon */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: step.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  margin: "0 auto var(--space-6)",
                  boxShadow: `0 8px 24px ${step.color}40`,
                }}
              >
                {step.icon}
              </Box>

              {/* Content */}
              <Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    color: "var(--text-primary)",
                    fontWeight: 700,
                    mb: "var(--space-4)",
                    fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                    lineHeight: "var(--leading-tight)",
                  }}
                >
                  {step.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "var(--text-secondary)",
                    lineHeight: "var(--leading-relaxed)",
                    fontSize: "var(--text-base)",
                    maxWidth: "280px",
                    margin: "0 auto",
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
