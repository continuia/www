import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp"; // Replace with your actual doctor-page hero image if different
import type { Variants } from "framer-motion";

const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 38 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, type: "spring", stiffness: 60, damping: 16 },
  },
};
const fadeImage: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85,
      type: "spring",
      stiffness: 38,
      damping: 18,
      delay: 0.14,
    },
  },
};

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const HeroSection = () => (
  <Box
    sx={{
      minHeight: { xs: "77vh", md: "90vh" },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 3.2, md: 9 },
      background: {
        xs: "none",
        md: "linear-gradient(145deg, var(--primary-50) 30%, var(--primary-300) 100%)",
      },
      borderRadius: { xs: "1.1rem", md: "2.1rem" },
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
      spacing={{ xs: 5.5, md: 8 }}
      width="100%"
      maxWidth={1240}
      mx="auto"
      position="relative"
      zIndex={2}
    >
      {/* Left: Main Content */}
      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={fadeLeft}
        sx={{ flex: 1.12, maxWidth: 570, zIndex: 2 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", sm: "2.35rem", md: "2.5rem" },
            mb: 2.05,
            color: "var(--primary-800)",
            lineHeight: 1.13,
            letterSpacing: "-1.2px",
          }}
        >
          Elevate Clinical Excellence Across Your Institution
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            fontSize: { xs: "1.09rem", md: "1.16rem" },
            mb: 2.14,
            lineHeight: 1.55,
          }}
        >
          Healthcare leaders choose Continuia to transform their clinical
          governance, reduce medical errors, and ensure the highest standards of
          patient care. Our AI-powered platform integrates seamlessly with your
          existing workflows while providing real-time oversight and expert
          guidance.{" "}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 1.6, mb: 2.1 }}
        >
          <Button
            variant="contained"
            sx={{
              background: "var(--primary-600)",
              color: "var(--text-inverse)",
              fontWeight: 700,
              px: 3.2,
              py: 1.18,
              borderRadius: "14px",
              fontSize: { xs: "1.06rem", md: "1.12rem" },
              boxShadow: "0 2px 12px 0 var(--primary-200)",
              textTransform: "none",
              "&:hover": { background: "var(--primary-700)" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Become a Specialist
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "var(--primary-800)",
              borderColor: "var(--primary-300)",
              fontWeight: 700,
              px: 3.2,
              py: 1.18,
              fontSize: { xs: "1.06rem", md: "1.12rem" },
              borderRadius: "14px",
              background: "var(--bg-primary)",
              textTransform: "none",
              "&:hover": {
                borderColor: "var(--primary-500)",
                background: "var(--primary-50)",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            How It Works
          </Button>
        </Stack>
        <Stack direction="row" spacing={2.3} mt={2} flexWrap="wrap">
          <Box
            sx={{
              bgcolor: "var(--primary-50)",
              color: "var(--primary-800)",
              fontWeight: 600,
              fontSize: { xs: "0.97rem", md: "1.01rem" },
              px: 2.0,
              py: "6px",
              borderRadius: 999,
              boxShadow: "0 1px 4px 0 var(--primary-100)",
              mb: { xs: 0.7, sm: 0 },
            }}
          >
            Case reviews from anywhere
          </Box>
          <Box
            sx={{
              bgcolor: "var(--secondary-50)",
              color: "var(--secondary-800)",
              fontWeight: 600,
              fontSize: { xs: "0.97rem", md: "1.01rem" },
              px: 2.0,
              py: "6px",
              borderRadius: 999,
              boxShadow: "0 1px 4px 0 var(--secondary-100)",
              mb: { xs: 0.7, sm: 0 },
            }}
          >
            Flexible scheduling & compensation
          </Box>
        </Stack>
      </MotionBox>

      {/* Right: Image Card */}
      <MotionPaper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
        variants={fadeImage}
        elevation={7}
        sx={{
          borderRadius: "2rem",
          p: { xs: 1.1, sm: 1.9 },
          background: "var(--bg-primary)",
          boxShadow: "0 10px 38px 0 var(--primary-100)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: { xs: "100%", md: 420 },
          width: "100%",
          minHeight: { xs: 210, md: 310 },
          ml: { md: 1.7 },
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 180, sm: 220, md: 265 },
            display: "flex",
          }}
        >
          <Box
            component="img"
            src={heroIllustration}
            alt="Doctor video consult illustration"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1.5rem",
              boxShadow: "0 4px 22px 0 var(--primary-50)",
              display: "block",
              position: "relative",
              zIndex: 1,
            }}
          />

          {/* Overlay: Start Reviewing Cases tag */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: 10, sm: 15, md: 22 },
              left: { xs: 10, sm: 15, md: 22 },
              bgcolor: "var(--primary-600)",
              color: "var(--text-inverse)",
              borderRadius: "999px",
              px: { xs: 1.29, sm: 1.7 },
              py: "4px",
              fontWeight: 700,
              fontSize: { xs: "0.96rem", md: "1rem" },
              letterSpacing: 0.06,
              boxShadow: "0 2px 10px 0 var(--primary-100)",
              zIndex: 2,
              userSelect: "none",
            }}
          >
            Start reviewing cases
          </Box>
          {/* Overlay: Peer insights tag */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 10, sm: 15, md: 22 },
              left: { xs: 10, sm: 15, md: 22 },
              bgcolor: "var(--primary-800)",
              color: "var(--text-inverse)",
              borderRadius: "999px",
              px: { xs: 1.15, sm: 1.49 },
              py: "4px",
              fontWeight: 700,
              fontSize: { xs: "0.92rem", md: "0.98rem" },
              letterSpacing: 0.05,
              boxShadow: "0 2px 11px 0 var(--primary-200)",
              opacity: 0.92,
              zIndex: 2,
              userSelect: "none",
            }}
          >
            Collaborate with peers
          </Box>
        </Box>
      </MotionPaper>
    </Stack>
  </Box>
);

export default HeroSection;
