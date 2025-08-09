import { Box, Typography, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Framer-motion animated Paper
const MotionPaper = motion.create(Paper);

const stats = [
  { label: "Expert Specialists", value: "50+", color: "var(--primary-600)" },
  // { label: "Medical Specialties", value: "50+", color: "var(--primary-700)" },
  // { label: "Cases Reviewed", value: "15K+", color: "var(--primary-800)" },
  { label: "Patient Satisfaction", value: "98%", color: "var(--success)" },
];

// Animation variants
const statVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.14,
      type: "spring" as const,
      stiffness: 60,
      damping: 13,
    },
  }),
};

const StatsHighlight = () => (
  <Box
    sx={{
      background: "linear-gradient(110deg, var(--primary-50) 0%, var(--bg-secondary) 100%)",
      py: { xs: 6, md: 10 },
      px: { xs: 1, md: 4 },
      textAlign: "center",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: 800,
        color: "var(--primary-700)",
        letterSpacing: 1.1,
        mb: 1.5,
        fontSize: { xs: "1.7rem", md: "2.3rem" },
        background: "linear-gradient(90deg, var(--primary-400), var(--primary-700))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        userSelect: "none",
      }}
    >
      Ready to Begin Your Journey?
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: "var(--text-secondary)",
        fontSize: { xs: "1.1rem", md: "1.25rem" },
        maxWidth: 580,
        mx: "auto",
        mb: { xs: 4, md: 6 },
        fontWeight: 500,
      }}
    >
      Join thousands of patients who have gained clarity and confidence in their medical decisions.
    </Typography>

    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 3, sm: 2.5, md: 3 }}
      justifyContent="center"
      alignItems="center"
      sx={{
        mx: "auto",
        flexWrap: "wrap", // <-- add this line!
      }}
    >
      {stats.map((stat, i) => (
        <MotionPaper
          key={stat.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={statVariant}
          custom={i}
          elevation={6}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 8px 24px 2px var(--primary-400)",
            transition: { duration: 0.2 },
          }}
          sx={{
            bgcolor: "var(--bg-primary)",
            px: { xs: 2.5, md: 4 },
            py: { xs: 2, sm: 2, md: 3.4 },
            borderRadius: "1.25rem",
            boxShadow: "var(--shadow-lg)",
            minWidth: 250,
            maxwidth: 250,
            minHeight: 150,
            height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "box-shadow 0.2s, transform 0.2s",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: stat.color,
              fontWeight: 900,
              fontSize: {
                xs: "2.02rem",
                sm: "2.2rem",
                md: "2.45rem",
                lg: "2.65rem",
              },
              letterSpacing: "2px",
              lineHeight: 1.1,
              mb: 0.4,
              userSelect: "none",
            }}
          >
            {stat.value}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "var(--text-secondary)",
              fontWeight: 700,
              fontSize: { xs: "1.04rem", md: "1.09rem" },
              letterSpacing: 0.6,
              textTransform: "uppercase",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {stat.label}
          </Typography>
        </MotionPaper>
      ))}
    </Stack>
  </Box>
);

export default StatsHighlight;
