import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { motion, type Variants } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Identify Key Points",
    description: "We start by identifying key care points where second opinions add value",
  },
  {
    number: "2",
    title: "Pilot Programs",
    description: "We offer pilot programs to demonstrate impact and value",
  },
  {
    number: "3",
    title: "Tailored Rollout",
    description: "Followed by tailored rollout plans that align with hospital protocols",
  },
  {
    number: "4",
    title: "Full Support",
    description: "All engagements backed by BAAs, clinical governance standards, and agreed-upon SLAs",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.11, duration: 0.58, type: "spring" },
  }),
};

export const HowWeEngage: React.FC = () => {
  const isSm = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--primary-900)",
        py: "var(--space-16)",
        px: "clamp(var(--space-2), 3vw, var(--space-32))",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", textAlign: "center", mb: "var(--space-12)" }}>
        <Typography
          component="h3"
          sx={{
            fontSize: "var(--text-3xl)",
            fontWeight: 900,
            color: "var(--text-inverse)",
            mb: "var(--space-1)",
          }}
        >
          How We Engage With This Partner
        </Typography>
        <Typography
          sx={{
            fontSize: "var(--text-base)",
            color: "var(--primary-100)",
            fontWeight: 400,
            opacity: 0.91,
          }}
        >
          What the partnership looks like in practice
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSm ? "column" : "row",
          gap: "var(--space-8)",
          justifyContent: "center",
          alignItems: isSm ? "stretch" : "flex-start",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
            style={{
              flex: isSm ? undefined : "1 1 23%",
              minWidth: 220,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                bgcolor: "var(--primary-500)",
                color: "var(--text-inverse)",
                width: 50,
                height: 50,
                borderRadius: "50%",
                fontSize: 28,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: "var(--space-4)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {step.number}
            </Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "var(--text-base)",
                color: "var(--text-inverse)",
                mb: "var(--space-1)",
              }}
            >
              {step.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "var(--text-sm)",
                color: "var(--primary-100)",
                opacity: 0.96,
                fontWeight: 400,
              }}
            >
              {step.description}
            </Typography>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
