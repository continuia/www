import { Box, Typography,  Stack, Paper } from "@mui/material";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/partnersMain/img1.webp";
import type { Variants } from "framer-motion";

// Animation variants
const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, type: "spring", stiffness: 60, damping: 18 },
  },
};
const fadeImage: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const HeroSection = () => (
  <Box
    sx={{
      minHeight: { xs: "80vh", md: "90vh" },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 3, md: 10 },
      background: {
        xs: "none",
        md: "linear-gradient(150deg, var(--primary-50) 40%, var(--primary-300) 100%)",
      },
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
          Strategic Healthcare Partnership Network
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
          Our comprehensive partnership network connects healthcare organizations, medical professionals, and innovative technology providers to create a collaborative ecosystem that enhances patient care delivery and operational excellence. Through strategic alliances, we foster an environment where medical expertise meets cutting-edge innovation. <br />
          <br />
          We believe that the future of healthcare lies in meaningful collaborations that bridge the gap between clinical practice and technological advancement. Our partnership program is designed to support healthcare providers at every level, from individual practitioners to large health systems, enabling them to leverage shared resources, knowledge, and best practices.
          <br />
          <br />
          Join a community of forward-thinking healthcare professionals who are committed to transforming the delivery of medical care through strategic partnerships, shared expertise, and collaborative innovation. Together, we're building the future of healthcare, one partnership at a time.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
          {/* <Button
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
            Explore Partnerships
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
            Learn More
          </Button> */}
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
