import { Box, Typography, Button, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import heroVideo from "../../assets/heroVideo.mp4";

// Animation variants
const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 18 },
  },
};

const features = ["Board-certified specialists", "AI-enhanced analysis", "Global expertise"];

const MotionBox = motion.create(Box);

const HeroSection = () => (
  <Box
    sx={{
      position: "relative",
      minHeight: { xs: "80vh", md: "85vh" },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      m: { xs: 1, md: 2 },
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 3, md: 10 },
      borderRadius: { xs: "1rem", md: "1rem" },
      boxShadow: "0 4px 32px 0 var(--neutral-300)",
      overflow: "hidden",
      // no background gradient here as video is now the background
    }}
  >
    {/* Video as background */}
    <video
      src={heroVideo}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
        scale: 1.2,
        borderRadius: "inherit",
      }}
      aria-label="Medical consultation background video"
    />

    {/* Optional: Add an overlay for better readability */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(255,255,255,0.65)", // adjust for dark/light overlay as needed
        zIndex: 1,
        borderRadius: "inherit",
        pointerEvents: "none",
      }}
    />

    {/* Main Content */}
    <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" spacing={6} sx={{ width: "100%", position: "relative", zIndex: 2 }}>
      {/* Left: Text Content */}
      <MotionBox initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={fadeLeft} sx={{ flex: 1, maxWidth: 650 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 1,
            mb: 1,
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            color: "var(--neutral-700)",
            display: "flex",
            alignItems: "center",
          }}
        >
          🎉 15,000+ Happy Customers
        </Typography>
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
          When Medical Decisions Matter Most
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
          Every patient deserves confidence in their care. Our AI-powered platform connects you with world-class specialists who provide expert second opinions, ensuring you make informed decisions about your health journey.
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
            Get Expert Opinion
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
            Learn How It Works
          </Button>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} gap={1} mt={2} flexWrap="wrap">
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
      {/* Optionally remove right illustration, or include extra imagery if desired */}
    </Stack>
  </Box>
);

export default HeroSection;
