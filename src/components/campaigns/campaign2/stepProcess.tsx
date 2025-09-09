import React from "react";
import { Box, Button, Stack, Typography, useTheme, useMediaQuery, Paper } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { AssignmentTurnedIn, Search, DocumentScanner } from "@mui/icons-material";

const steps = [
  {
    label: "Serene Submission",
    icon: <DocumentScanner />,
    description: "Employees securely upload medical records via our intuitive portal.",
  },
  {
    label: "Expert Review",
    icon: <Search />,
    description: "A board-certified physician spends approximately 1 hour reviewing the case, supported by our AI-assisted clinical workflow.",
  },
  {
    label: "Insight Delivered",
    icon: <AssignmentTurnedIn />,
    description: "Clear, easy-to-understand report delivered within 48–72 hours, guiding care decisions.",
  },
];

const stepVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.18,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const HowItWorks: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="section"
      sx={{
        background: "var(--bg-accent)",
        py: { xs: "var(--space-12)", md: "var(--space-20)" },
        px: { xs: "var(--space-2)", md: 0 },
        borderRadius: { xs: "var(--radius-xl)", md: "var(--radius-2xl)" },
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "var(--text-3xl)", md: "var(--text-5xl)" },
          mb: "var(--space-8)",
          color: "var(--primary-700)",
          textAlign: "center",
          letterSpacing: "-0.02em",
        }}
      >
        How It Works
      </Typography>
      <Stack
        direction={isSm ? "column" : "row"}
        spacing={isSm ? "var(--space-8)" : "var(--space-16)"}
        sx={{
          width: "100%",
          maxWidth: "1100px",
          alignItems: "center",
          justifyContent: "center",
          mb: "var(--space-12)",
        }}
      >
        {steps.map((step, i) => (
          <motion.div key={step.label} custom={i} variants={stepVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} style={{ flex: 1, width: isSm ? "100%" : "unset" }}>
            <Paper
              elevation={0}
              sx={{
                background: "var(--bg-primary)",
                borderRadius: "var(--radius-2xl)",
                py: "var(--space-8)",
                px: { xs: "var(--space-4)", md: "var(--space-4)" },
                boxShadow: "var(--shadow-xl)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                minHeight: "340px",
                transition: "box-shadow var(--transition-fast)",
                "&:hover": {
                  boxShadow: "var(--shadow-2xl)",
                },
              }}
            >
              <Box
                sx={{
                  width: "72px",
                  height: "72px",
                  mb: "var(--space-4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-full)",
                  background: `linear-gradient(135deg, var(--primary-100) 0%, var(--primary-300) 90%)`,
                  boxShadow: "var(--shadow-md)",
                  fontSize: "2.25rem",
                  color: "var(--primary-700)",
                }}
                aria-hidden="true"
              >
                {step.icon}
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "var(--text-xl)", md: "var(--text-xl)" },
                  color: "var(--primary-700)",
                  mb: "var(--space-2)",
                  letterSpacing: "-0.01em",
                }}
              >
                {`Step ${i + 1} – ${step.label}`}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
                  textAlign: "center",
                }}
              >
                {step.description}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Stack>

      <Button
        variant="contained"
        size="large"
        sx={{
          background: "linear-gradient(90deg, var(--primary-600), var(--primary-500))",
          color: "var(--text-inverse)",
          px: "var(--space-8)",
          py: "var(--space-4)",
          fontWeight: 700,
          fontSize: "var(--text-lg)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)",
          textTransform: "none",
          letterSpacing: "0.01em",
          transition: "background var(--transition-fast), box-shadow var(--transition-fast)",
          "&:hover": {
            background: "linear-gradient(90deg, var(--primary-700), var(--primary-500))",
            boxShadow: "var(--shadow-xl)",
          },
        }}
        aria-label="See Sample Report"
      >
        See Sample Report
      </Button>
    </Box>
  );
};

export default HowItWorks;
