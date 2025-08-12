import { Box, Typography, Stack, Paper, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import type { Variants } from "framer-motion";

// Preload the image
import heroIllustration from "../../../assets/partners/groupsAndNGOs.webp";

// Animation variants
const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, type: "spring", stiffness: 60, damping: 18 },
  },
};

const fadeImage: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: 0.1 },
  },
};

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Optimized image loading with useCallback
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Preload image immediately on component mount
  useEffect(() => {
    if (heroIllustration) {
      const img = new Image();

      // Set loading attributes for better performance
      img.loading = "eager";
      img.fetchPriority = "high";

      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = heroIllustration;

      // Cleanup function
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [handleImageLoad, handleImageError]);

  return (
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
        <MotionBox initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} sx={{ flex: 1, maxWidth: 650 }}>
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
            Empower Your Members with Expert Reviews—Delivered with Empathy
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
            Many patients in your community face medical complexity, delayed diagnoses, or emotional exhaustion. Continuia provides non-judgmental, structured second opinions to help them move forward.
            <br />
            <br />
            Our physicians listen through the chart. We summarize, clarify, and document—not dictate. And we do it in plain language your members can use with their own care teams.
            <br />
            <br />
            Ideal for rare disease groups, chronic illness orgs, or advocacy networks that want clarity without cost burden.
          </Typography>
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
            position: "relative",
          }}
        >
          {/* Optimized image rendering */}
          <Box
            component="img"
            src={heroIllustration}
            alt="Patient advocacy groups and NGO partnership"
            loading="eager"
            fetchPriority="high"
            onLoad={handleImageLoad}
            onError={handleImageError}
            sx={{
              aspectRatio: "3/2",
              width: "100%",
              maxWidth: { xs: "100%" },
              borderRadius: "1.5rem",
              objectFit: "cover",
              minHeight: { xs: 180, md: 320 },
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.2s ease-in-out",
              display: imageLoaded ? "block" : "none",
            }}
          />

          {/* Loading skeleton - only show when image is not loaded and no error */}
          {!imageLoaded && !imageError && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                aspectRatio: "3/2",
                width: "100%",
                borderRadius: "1.5rem",
                minHeight: { xs: 180, md: 320 },
                position: imageLoaded ? "absolute" : "static",
                top: 0,
                left: 0,
              }}
            />
          )}

          {/* Error fallback */}
          {imageError && (
            <Box
              sx={{
                aspectRatio: "3/2",
                width: "100%",
                borderRadius: "1.5rem",
                minHeight: { xs: 180, md: 320 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--neutral-100)",
                color: "var(--neutral-500)",
              }}
            >
              <Typography>Image unavailable</Typography>
            </Box>
          )}
        </MotionPaper>
      </Stack>
    </Box>
  );
};

export default HeroSection;
