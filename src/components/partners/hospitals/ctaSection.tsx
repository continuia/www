import { Box, Typography, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Framer-motion animated Box
const MotionBox = motion.create(Box);

const ctaFade: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, type: "spring", stiffness: 65, damping: 15 },
  },
};

const CTASection = () => (
  <MotionBox
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.7 }}
    variants={ctaFade}
    sx={{
      color: "var(--text-inverse)",
      py: { xs: 7, md: 10 },
      px: { xs: 2.5, sm: 5 },
      textAlign: "center",
      maxWidth: "100vw",
      background: `linear-gradient(150deg, var(--primary-300) 0%, var(--primary-600) 100%)`,
      borderRadius: { xs: "1rem", md: "2rem" },
      m: { xs: 1, md: 2 },
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: 900,
        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
        mb: 2.2,
        letterSpacing: 0.8,
      }}
    >
      Ready to Transform Your Hosiptal's Discharge Process?
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        color: "rgba(255,255,255,0.98)",
        fontWeight: 500,
        fontSize: { xs: "1.07rem", sm: "1.18rem" },
        maxWidth: 560,
        mx: "auto",
        mb: 3.5,
        lineHeight: 1.44,
      }}
    >
      Join leading hosiptals who trust Continuia for safer, more confident patient discharges.
    </Typography>

    <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
      <Button
        variant="contained"
        sx={{
          bgcolor: "white",
          color: "var(--primary-600)",
          fontWeight: 800,
          px: 3.6,
          py: 1.5,
          borderRadius: 1.8,
          fontSize: { xs: "1rem", md: "1.11rem" },
          boxShadow: "0 10px 22px -4px var(--primary-300)",
          "&:hover": { bgcolor: "var(--primary-100)" },
        }}
      >
        Schedule a Partnership Call
      </Button>
      {/* <Button
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "white",
          px: 3.2,
          py: 1.2,
          borderRadius: 1.5,
          fontWeight: 700,
          fontSize: { xs: "1rem", md: "1.07rem" },
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.12)",
            borderColor: "var(--primary-100)",
          },
        }}
      >
        Download Partnership Guide
      </Button> */}
    </Stack>
  </MotionBox>
);

export default CTASection;
