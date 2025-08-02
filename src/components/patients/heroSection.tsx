import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp";
import type { Variants } from "framer-motion";

// Animation variants
const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 38 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, type: "spring", stiffness: 62, damping: 16 },
  },
};
const fadeImage: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 44,
      damping: 24,
      delay: 0.12,
    },
  },
};
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);


const HeroSection = () => (
  <Box
    sx={{
      minHeight: { xs: "80vh", md: "90vh" },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: { xs: 2, sm: 4, md: 7 },
      py: { xs: 3, md: 10 },
      background: {
        xs: "none",
        md: "linear-gradient(150deg, var(--primary-50) 40%, var(--primary-300) 100%)",
      },
      borderRadius: { xs: "1rem", md: "2rem" },
      boxShadow: "0 4px 32px 0 var(--neutral-300)",
      overflow: "hidden",
      position: "relative",
      width: "100%",
      m: "auto",
    }}
  >
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      spacing={7}
      width="100%"
      maxWidth={1250}
      mx="auto"
      position="relative"
      zIndex={1}
    >
      {/* Left: Text Content */}
      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={fadeLeft}
        sx={{ flex: 1.2, maxWidth: 555 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.05rem", sm: "2.5rem", md: "2.75rem" },
            mb: 2.3,
            letterSpacing: "-1px",
            color: "var(--primary-800)",
            lineHeight: 1.16,
          }}
        >
          When Uncertainty Meets Expertise
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            fontSize: { xs: "1.06rem", md: "1.15rem" },
            mb: 2.5,
            lineHeight: 1.54,
          }}
        >
          Facing a serious diagnosis or complex medical decision? You deserve
          clarity, confidence, and peace of mind. Our global network of
          board-certified specialists provides expert second opinions that help
          you understand your options and make informed decisions about your
          health.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.2}
          sx={{ mt: 2, mb: 2.7 }}
        >
          <Button
            variant="contained"
            sx={{
              background: "var(--primary-600)",
              color: "var(--text-inverse)",
              fontWeight: 700,
              px: 3.3,
              py: 1.3,
              borderRadius: "14px",
              fontSize: { xs: "1rem", md: "1.07rem" },
              boxShadow: "0 2px 12px 0 var(--primary-200)",
              textTransform: "none",
              "&:hover": { background: "var(--primary-700)" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Get Expert Opinion
          </Button>
        </Stack>
      </MotionBox>

      {/* Right: Image Card with animated overlays */}
      <MotionPaper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeImage}
        elevation={7}
        sx={{
          borderRadius: "2rem",
          p: { xs: 1.3, sm: 2.0 },
          background: "var(--bg-primary)",
          boxShadow: "0 10px 38px 0 var(--primary-200)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: { xs: "100%", md: 435 },
          width: "100%",
          minHeight: { xs: 260, md: 390 },
          ml: { md: 1.5 },
          position: "relative", // anchor overlays
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={heroIllustration}
          alt="Patient and doctor consultation"
          sx={{
            width: "100%",
            height: { xs: 240, sm: 320, md: 370 },
            objectFit: "cover",
            borderRadius: "1.6rem",
            boxShadow: "0 4px 22px 0 var(--primary-50)",
            display: "block",
          }}
        />

        {/* Overlay tags use position: absolute; responsive adjustments */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 12, sm: 24 },
            left: { xs: 12, sm: 30 },
            bgcolor: "var(--primary-600)",
            color: "var(--text-inverse)",
            borderRadius: "999px",
            px: { xs: 1.1, sm: 1.6 },
            py: "2.5px",
            fontWeight: 700,
            fontSize: { xs: "0.82rem", sm: "0.97rem" },
            letterSpacing: 0.05,
            boxShadow: "0 2px 10px 0 var(--primary-100)",
            userSelect: "none",
            zIndex: 2,
          }}
        >
          48-hour response
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 12, sm: 24 },
            left: { xs: 12, sm: 28 },
            bgcolor: "var(--primary-800)",
            color: "var(--text-inverse)",
            borderRadius: "999px",
            px: { xs: 1.0, sm: 1.35 },
            py: "2.5px",
            fontWeight: 700,
            fontSize: { xs: "0.80rem", sm: "0.94rem" },
            letterSpacing: 0.03,
            boxShadow: "0 2px 12px 0 var(--primary-200)",
            opacity: 0.93,
            userSelect: "none",
            zIndex: 2,
          }}
        >
          100% Confidential
        </Box>
      </MotionPaper>
    </Stack>
  </Box>
);

export default HeroSection;
