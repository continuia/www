import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { VerifiedUser as VerifiedUserIcon, Shield as ShieldIcon, Lock as LockIcon } from "@mui/icons-material";
import { motion, type Variants } from "framer-motion";

interface TrustFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
}

const WhyTrustContinuia: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const trustFeatures: TrustFeature[] = [
    {
      id: "specialists",
      title: "Board-Certified Specialists Only",
      description: "Every physician on our platform is rigorously vetted and maintains active board certification in their specialty.",
      icon: <VerifiedUserIcon sx={{ fontSize: 32 }} />,
      color: "var(--success)",
      backgroundColor: "#f0fdf4",
    },
    {
      id: "independence",
      title: "No Pharma/Device Sponsorships",
      description: "Our physicians have no financial ties to pharmaceutical companies or medical device manufacturers.",
      icon: <ShieldIcon sx={{ fontSize: 32 }} />,
      color: "var(--info)",
      backgroundColor: "#eff6ff",
    },
    {
      id: "privacy",
      title: "Data Privacy & Consent-First",
      description: "HIPAA-compliant security with full control over who sees your information and when.",
      icon: <LockIcon sx={{ fontSize: 32 }} />,
      color: "var(--primary-500)",
      backgroundColor: "var(--primary-50)",
    },
  ];

  // Container animation variants
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  // Header animation variants
  const headerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Feature card animation variants
  const featureVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -12,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Icon animation variants
  const iconVariants: Variants = {
    hidden: {
      scale: 0,
      rotate: -90,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.15,
      rotate: 3,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Text content animation variants
  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.4,
      },
    },
  };

  // Floating background animation
  const floatingVariants: Variants = {
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--bg-secondary)",
        py: "var(--space-20)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary-100), var(--primary-200))",
          opacity: 0.3,
          zIndex: 0,
        }}
        component={motion.div}
        variants={floatingVariants}
        animate="animate"
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--success), var(--primary-300))",
          opacity: 0.2,
          zIndex: 0,
        }}
        component={motion.div}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Header Section */}
          <motion.div variants={headerVariants}>
            <Box sx={{ textAlign: "center", mb: "var(--space-16)" }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  color: "var(--text-primary)",
                  fontWeight: 700,
                  mb: "var(--space-4)",
                  fontSize: { xs: "var(--text-3xl)", md: "var(--text-5xl)" },
                }}
              >
                Why Trust Continuia
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--text-tertiary)",
                  fontWeight: 400,
                  fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Your health and privacy are our top priorities
              </Typography>
            </Box>
          </motion.div>

          {/* Trust Features */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: "var(--space-8)",
              alignItems: "stretch",
            }}
          >
            {trustFeatures.map((feature) => (
              <motion.div key={feature.id} variants={featureVariants} whileHover="hover" onHoverStart={() => setHoveredFeature(feature.id)} onHoverEnd={() => setHoveredFeature(null)} style={{ height: "100%" }}>
                <Box
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: "var(--space-8)",
                    borderRadius: "var(--radius-3xl)",
                    backgroundColor: "var(--bg-primary)",
                    border: `1px solid var(--border-light)`,
                    boxShadow: hoveredFeature === feature.id ? "var(--shadow-2xl)" : "var(--shadow-md)",
                    transition: "var(--transition-normal)",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`,
                      opacity: hoveredFeature === feature.id ? 1 : 0,
                      transition: "var(--transition-normal)",
                    },
                  }}
                >
                  {/* Icon */}
                  <motion.div variants={iconVariants} whileHover="hover">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: "var(--space-6)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          backgroundColor: feature.backgroundColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: feature.color,
                          boxShadow: hoveredFeature === feature.id ? "var(--shadow-lg)" : "var(--shadow-sm)",
                          transition: "var(--transition-normal)",
                          border: `2px solid ${feature.color}20`,
                        }}
                      >
                        {feature.icon}
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Content */}
                  <motion.div variants={textVariants}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        color: "var(--text-primary)",
                        fontWeight: 600,
                        mb: "var(--space-4)",
                        fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                        lineHeight: "var(--leading-tight)",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "var(--text-secondary)",
                        lineHeight: "var(--leading-relaxed)",
                        fontSize: "var(--text-base)",
                        maxWidth: "320px",
                        margin: "0 auto",
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </motion.div>

                  {/* Hover Accent */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: hoveredFeature === feature.id ? "60%" : "0%",
                      height: "2px",
                      backgroundColor: feature.color,
                      transition: "var(--transition-normal)",
                      borderRadius: "1px",
                    }}
                  />
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Bottom Trust Indicators */}
          <motion.div variants={headerVariants} transition={{ delay: 1.2 }}>
            <Box
              sx={{
                mt: "var(--space-16)",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "var(--space-8)",
                opacity: 0.8,
              }}
            >
              {["HIPAA Compliant", "SOC 2 Certified", "256-bit Encryption", "Zero-Trust Architecture"].map((badge, index) => (
                <motion.div key={badge} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}>
                  <Box
                    sx={{
                      px: "var(--space-4)",
                      py: "var(--space-2)",
                      backgroundColor: "var(--bg-primary)",
                      border: `1px solid var(--border-medium)`,
                      borderRadius: "var(--radius-full)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {badge}
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WhyTrustContinuia;
