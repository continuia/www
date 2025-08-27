import React, { useState } from "react";
import { Box, Typography, Button, Avatar, Container, Card, CardContent } from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";
import { motion, type Variants } from "framer-motion";

const ConciergeSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Card animation variants
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Avatar animation variants
  const avatarVariants: Variants = {
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
        stiffness: 300,
        damping: 20,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Text animation variants
  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.4,
      },
    },
  };

  // Button animation variants
  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  // Icon animation variants
  const iconVariants: Variants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Floating animation for background elements
  const floatingVariants: Variants = {
    animate: {
      y: [-3, 3, -3],
      rotate: [-1, 1, -1],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--primary-50)",
        py: "var(--space-20)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary-200), var(--primary-300))",
          opacity: 0.4,
          zIndex: 0,
        }}
        component={motion.div}
        variants={floatingVariants}
        animate="animate"
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          right: "15%",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary-300), var(--primary-400))",
          opacity: 0.3,
          zIndex: 0,
        }}
        component={motion.div}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1.5 }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={cardVariants} whileHover="hover" onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
            <Card
              sx={{
                borderRadius: "var(--radius-3xl)",
                backgroundColor: "var(--bg-primary)",
                boxShadow: isHovered ? "var(--shadow-2xl)" : "var(--shadow-xl)",
                border: `1px solid var(--border-light)`,
                transition: "var(--transition-normal)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle gradient overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "100%",
                  background: `linear-gradient(135deg, var(--primary-25) 0%, transparent 50%)`,
                  opacity: isHovered ? 0.5 : 0.3,
                  transition: "var(--transition-normal)",
                  pointerEvents: "none",
                }}
              />

              <CardContent
                sx={{
                  textAlign: "center",
                  p: { xs: "var(--space-8)", md: "var(--space-12)" },
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Avatar with Pulse Effect */}
                <Box sx={{ position: "relative", display: "inline-block", mb: "var(--space-8)" }}>
                  <motion.div variants={avatarVariants} whileHover="hover" style={{ position: "relative", zIndex: 1 }}>
                    <Avatar
                      src="/api/placeholder/80/80"
                      alt="Aarika Reddy"
                      sx={{
                        width: 80,
                        height: 80,
                        border: `3px solid var(--primary-200)`,
                        boxShadow: "var(--shadow-lg)",
                        cursor: "pointer",
                      }}
                    />
                  </motion.div>

                  {/* Floating wave emoji */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      fontSize: "24px",
                      zIndex: 2,
                    }}
                    animate={{
                      rotate: [0, 20, -10, 20, 0],
                      scale: [1, 1.1, 1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    👋
                  </motion.div>
                </Box>

                {/* Heading */}
                <motion.div variants={textVariants}>
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      color: "var(--text-primary)",
                      fontWeight: 700,
                      mb: "var(--space-6)",
                      fontSize: { xs: "var(--text-2xl)", md: "var(--text-3xl)" },
                      lineHeight: "var(--leading-tight)",
                    }}
                  >
                    Not Sure Which Plan Fits Your Case?
                  </Typography>
                </motion.div>

                {/* Description */}
                <motion.div variants={textVariants}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--text-secondary)",
                      mb: "var(--space-8)",
                      fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
                      lineHeight: "var(--leading-relaxed)",
                      maxWidth: "500px",
                      margin: "0 auto var(--space-8)",
                    }}
                  >
                    Don't worry—our concierge agent,{" "}
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      Aarika Reddy
                    </Typography>
                    , will guide you through the process and help you choose the perfect option for your specific needs.
                  </Typography>
                </motion.div>

                {/* CTA Button */}
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={
                      <motion.div variants={iconVariants}>
                        <ChatIcon />
                      </motion.div>
                    }
                    sx={{
                      backgroundColor: "var(--primary-500)",
                      color: "var(--text-inverse)",
                      borderRadius: "var(--radius-full)",
                      px: "var(--space-8)",
                      py: "var(--space-4)",
                      fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "var(--shadow-lg)",
                      minWidth: "200px",
                      "&:hover": {
                        backgroundColor: "var(--primary-600)",
                        boxShadow: "var(--shadow-xl)",
                        filter: "brightness(0.95)",
                      },
                    }}
                  >
                    Chat with Aarika
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ConciergeSection;
