import { Box, Typography, Stack, Paper } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const principles = [
  {
    icon: "🤝",
    title: "Consent is non-negotiable",
    description:
      "Patient consent and data privacy form the foundation of our platform’s ethics.",
  },
  {
    icon: "🔗",
    title: "Traceability is built in",
    description:
      "Every decision is documented and traceable, ensuring accountability and transparency.",
  },
  {
    icon: "🏥",
    title: "Clinical integrity",
    description:
      "You’re building a system grounded in clinical integrity, not just reviewing cases.",
  },
];

// Framer Motion variants for card animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, type: "spring", delay: 0.1 * i },
  }),
};

export default function GuidingPrinciples() {
  return (
    <Box
      sx={{
        bgcolor: "var(--bg-primary)",
        color: "var(--text-primary)",
        width: "100%",
        py: { xs: "var(--space-16)", md: "var(--space-24)" },
        px: { xs: "var(--space-4)", md: "var(--space-16)" },
        minHeight: 360,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "var(--text-primary)",
          fontWeight: 700,
          mb: "var(--space-2)",
          fontSize: { xs: "var(--text-2xl)", md: "var(--text-3xl)" },
        }}
      >
        Our Guiding Principles
      </Typography>
      <Typography
        sx={{
          color: "var(--text-secondary)",
          mb: "var(--space-12)",
          fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
          textAlign: "center",
          maxWidth: 600,
        }}
      >
        In a time where speed often trumps thought, we stand for something else:
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 4, md: 6 }}
        sx={{
          width: "100%",
          maxWidth: 980,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            style={{ width: 320, height: 320, display: "flex" }}
          >
            <Paper
              elevation={2}
              sx={{
                bgcolor: "var(--bg-secondary)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-md)",
                minWidth: 320,
                maxWidth: 320,
                minHeight: 320,
                maxHeight: 320,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                px: "var(--space-4)",
                py: "var(--space-6)",
              }}
            >
              <Box
                sx={{
                  fontSize: "2.1rem",
                  mb: "var(--space-4)",
                }}
              >
                {p.icon}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "var(--text-primary)",
                  fontWeight: 700,
                  mb: "var(--space-2)",
                  fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                }}
              >
                {p.title}
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-base)",
                }}
              >
                {p.description}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}
