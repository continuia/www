import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp";
import type { Variants } from "framer-motion";

// Animation variants
const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 18 },
  },
};
const fadeImage: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      type: "spring",
      stiffness: 52,
      damping: 22,
      delay: 0.1,
    },
  },
};

const features = ["Board-certified specialists", "50+ Specialties", "72-hour response"];

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const HeroSection = () => (
  <Box
    sx={{
      minHeight: { xs: "80vh", md: "70vh" },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      m: { xs: 1, md: 2 },
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 3, md: 10 },
      background: {
        xs: "none",
        md: "linear-gradient(150deg, var(--primary-50) 40%, var(--primary-300) 100%)",
      },
      borderRadius: { xs: "1rem", md: "2rem" },
      boxShadow: "0 4px 32px 0 var(--neutral-300)",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" spacing={6} sx={{ width: "100%" }}>
      {/* Left: Text Content */}
      <MotionBox initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={fadeLeft} sx={{ flex: 1, maxWidth: 650 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.8rem" },
            mb: 2,
            lineHeight: 1.08,
            letterSpacing: "-1px",
            background: "linear-gradient(90deg, var(--neutral-800), var(--primary-800))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          }}
        >
          World-Class Specialists at Your Fingertips
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "var(--neutral-600)",
            fontWeight: 500,
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            maxWidth: 600,
          }}
        >
          When facing complex medical decisions, access matters. Our global network of board-certified specialists brings decades of expertise directly to your case, ensuring you receive the highest caliber of medical guidance across every specialty.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
          <Button
            variant="contained"
            size="large"
            startIcon={<LocalHospitalIcon />}
            sx={{
              background: "var(--primary-600)",
              color: "var(--text-inverse)",
              fontWeight: 700,
              px: 3,
              py: 1.7,
              fontSize: "1.15rem",
              borderRadius: "14px",
              boxShadow: "0 2px 12px 0 var(--primary-200)",
              textTransform: "none",
              "&:hover": {
                background: "var(--primary-700)",
              },
            }}
          >
            Find Your Specialist
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "var(--primary-700)",
              borderColor: "var(--primary-300)",
              fontWeight: 700,
              px: 3,
              py: 1.7,
              fontSize: "1.15rem",
              borderRadius: "14px",
              background: "var(--bg-primary)",
              textTransform: "none",
              "&:hover": {
                borderColor: "var(--primary-500)",
                background: "var(--primary-50)",
              },
            }}
          >
            How Matching Works
          </Button>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} gap={3} mt={2} flexWrap="wrap">
          {features.map((feature) => (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              key={feature}
              sx={{
                borderRadius: "10px",
                px: 1.1,
                py: 0.7,
                bgcolor: "var(--primary-50)",
                mb: { xs: 1, sm: 0 },
                boxShadow: "0 1px 4px 0 var(--primary-100)",
              }}
            >
              <CheckCircleIcon sx={{ color: "var(--success)", fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{
                  color: "var(--neutral-700)",
                  fontWeight: 500,
                  fontSize: { xs: "0.98rem", sm: "1.05rem" },
                  whiteSpace: "nowrap",
                }}
              >
                {feature}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </MotionBox>
      {/* Right: Illustration */}
      <MotionPaper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={fadeImage}
        elevation={4}
        sx={{
          borderRadius: "2rem",
          p: 1,
          background: "var(--bg-primary)",
          boxShadow: "0 8px 32px 0 var(--primary-200)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: { xs: "100%", md: 500, lg: 650 },
          width: "100%",
          height: "100%",
          minWidth: { xs: 0, md: 320 },
        }}
      >
        <Box
          component="img"
          src={heroIllustration}
          alt="Medical consultation"
          sx={{
            width: "100%",
            maxWidth: { xs: "100%" },
            borderRadius: "1.5rem",
            objectFit: "cover",
            minHeight: { xs: 180, md: 320 },
          }}
        />
      </MotionPaper>
    </Stack>
  </Box>
);

export default HeroSection;
