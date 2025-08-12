import { Box, Typography, Paper, Stack, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import type { Variants } from "framer-motion";

// Preload the image
import Bosses from "../../assets/shreeAndUnni.webp";

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

const VisionSection = () => {
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
    if (Bosses) {
      const img = new Image();

      // Set loading attributes for better performance
      img.loading = "eager";
      img.fetchPriority = "high";

      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = Bosses;

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
      <Stack direction={{ xs: "column", md: "row" }} alignItems="center" gap={0}>
        {/* Left: Content */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeft}
          sx={{
            flex: 1.25,
            minWidth: 0,
            width: { xs: "100%", md: "50%" },
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
            Continuia envisions a world where every patient has access to trustworthy, expert-reviewed medical guidance—independent of where they live or which doctor they saw first. We believe healthcare should be a bridge, not a barrier.
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
              We don't replace doctors. We empower decisions.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--text-secondary)",
                fontWeight: 500,
                fontSize: "0.99rem",
              }}
            >
              With AI-augmented tools that are designed to work with clinicians, not around them, Continuia bridges patients, providers, and medical institutions with layered insight, safety, and transparency.
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
            We aim to bring ethical, AI-enabled second clinical insight and governance into the global standard of care.
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
            src={Bosses}
            alt="Company vision leadership"
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

export default VisionSection;
