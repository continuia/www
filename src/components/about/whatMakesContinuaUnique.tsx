// WhatMakesContinuaUnique.tsx
import { Box, Typography, Link } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
const MotionBox = motion.create(Box);

const cards = [
  {
    title: "Clinical Guardrails",
    description: "We never replace your doctor; we supplement your options with additional clinical insight. Our AI works alongside healthcare professionals, not instead of them.",
    linkText: "Learn more",
  },
  {
    title: "Built-in Governance",
    description: "Our platform includes comprehensive governance frameworks for consent, escalation, and compliance across multiple healthcare jurisdictions.",
    linkText: "For institutions",
  },
  {
    title: "Agentic System",
    description: "Our architecture is powered by a network of AI agents, each with a specific role in patient safety, intake, escalation, formatting, and translation.",
    linkText: "Our technology",
  },
  {
    title: "Cross-Border Infrastructure",
    description: "Operating across India, the U.S., and the UAE, with expansion to SE Asia, Africa, EU, and LATAM.",
  },
  {
    title: "Institutional Deployment",
    description: "Built for integration into hospitals and public health systems, not just individual patients.",
  },
  {
    title: "Clinician-Reviewed",
    description: "Every AI-generated insight is reviewed by qualified medical professionals for accuracy and safety.",
  },
  {
    title: "Empathetic Design",
    description: "Built with compassion for anxious patients seeking clarity in complex medical situations.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, type: "spring", stiffness: 80 },
  }),
};

export default function WhatMakesContinuaUnique() {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        mx: "auto",
        py: "var(--space-20)",
        px: { xs: "var(--space-6)", md: "var(--space-20)" },
        backgroundColor: "var(--bg-primary)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "var(--primary-700)",
          fontWeight: 700,
          mb: "var(--space-2)",
          fontSize: "var(--text-xl)",
        }}
      >
        What Makes Continuia Unique
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "var(--text-secondary)",
          mb: "var(--space-10)",
          fontSize: "var(--text-base)",
        }}
      >
        Our approach to healthcare is built on these core principles
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-6)",
          justifyContent: "space-between",
          textAlign: "left",
        }}
      >
        {cards.map((card, index) => (
          <MotionBox
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            sx={{
              flex: "1 1 calc(33% - var(--space-6))",
              bgcolor: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              p: "var(--space-4)",
              boxShadow: "var(--shadow-sm)",
              minWidth: 300,
              mb: { xs: "var(--space-6)", md: 0 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "var(--primary-600)",
                  fontWeight: 700,
                  mb: "var(--space-1)",
                  fontSize: "var(--text-base)",
                }}
              >
                {card.title}
              </Typography>
              <Typography sx={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", mb: 1 }}>{card.description}</Typography>
            </Box>
            {card.linkText && (
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: "var(--primary-600)",
                  fontWeight: 600,
                  fontSize: "var(--text-sm)",
                  alignSelf: "flex-start",
                }}
              >
                {card.linkText} &rarr;
              </Link>
            )}
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
}
