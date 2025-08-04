import { Box, Typography, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp"; // Substitute your actual image if needed
import type { Variants } from "framer-motion";

const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.96, type: "spring", stiffness: 60, damping: 18 },
  },
};
const fadeImage: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 41,
      damping: 24,
      delay: 0.13,
    },
  },
};

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const VisionSection = () => (
  <Box
    sx={{
      background: {
        xs: "none",
        md: "linear-gradient(120deg, var(--primary-50) 0%, var(--primary-100) 100%)",
      },
      boxShadow: { md: "0 4px 32px 0 var(--primary-100)" },
    }}
  >
    <Stack direction={{ xs: "column", md: "row" }} alignItems="stretch" gap={0}>
      {/* Left: Content */}
      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
        variants={fadeLeft}
        sx={{
          flex: 1.25,
          minWidth: 0,
          width: { xs: "100%", md: "50%" },
          p: { xs: 3, sm: 6, md: 8, lg: 10 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "center",
          maxWidth: { md: "56vw" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "1.7rem", sm: "2.08rem", md: "2.47rem" },
            mb: 2,
            color: "var(--primary-800)",
            letterSpacing: "-0.7px",
          }}
        >
          Our Vision
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "var(--primary-700)",
            fontWeight: 700,
            fontSize: { xs: "1.15rem", md: "1.23rem" },
            mb: 2.4,
          }}
        >
          Democratizing access to expert medical guidance
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            fontSize: { xs: "1.04rem", md: "1.12rem" },
            mb: 2.4,
            lineHeight: 1.7,
            maxWidth: 560,
          }}
        >
          Continuia envisions a world where every patient has access to
          trustworthy, expert-reviewed medical guidance—independent of where
          they live or which doctor they saw first. We believe healthcare should
          be a bridge, not a barrier.
        </Typography>

        {/* Soft card: "We don't replace doctors..." */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 2.3 },
            borderRadius: "1.5rem",
            background: "var(--bg-primary)",
            boxShadow: "0 2px 14px 0 var(--primary-100)",
            mb: 2,
            maxWidth: 450,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              color: "var(--primary-800)",
              mb: 0.7,
              fontSize: "1.04rem",
            }}
          >
            We don’t replace doctors. We empower decisions.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--text-secondary)",
              fontWeight: 500,
              fontSize: "0.99rem",
            }}
          >
            With AI-augmented tools that are designed to work with clinicians,
            not around them, Continuia bridges patients, providers, and medical
            institutions with layered insight, safety, and transparency.
          </Typography>
        </Paper>
        <Typography
          variant="body2"
          sx={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            fontSize: "0.98rem",
          }}
        >
          We aim to bring ethical, AI-enabled second clinical insight and
          governance into the global standard of care.
        </Typography>
      </MotionBox>

      {/* Right: Large image card */}
      <MotionPaper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.13 }}
        variants={fadeImage}
        elevation={5}
        sx={{
          flex: 1,
          minHeight: { xs: 220, md: "100%" },
          py: { xs: 2 },
          px: { xs: 2 },
          background: "var(--bg-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: { xs: 0, md: "2rem" },
          boxShadow: { md: "0 10px 38px 0 var(--primary-100)" },
        }}
      >
        <Box
          component="img"
          src={heroIllustration}
          alt="Doctor reviews patient consultation"
          sx={{
            width: "100%",
            height: { xs: 220, sm: 295, md: "100%" },
            minHeight: { xs: 180, sm: 220, md: "100%" },
            maxHeight: { md: "calc(76vh - 3rem)" },
            objectFit: "cover",
            borderRadius: { xs: "1.5rem", md: "1.7rem" },
            boxShadow: "0 4px 22px 0 var(--primary-50)",
            display: "block",
            position: "relative",
          }}
        />
      </MotionPaper>
    </Stack>
  </Box>
);

export default VisionSection;
