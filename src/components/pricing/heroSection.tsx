import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Chip } from "@mui/material";
import { 
  Chat as ChatIcon, 
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Verified as VerifiedIcon
} from "@mui/icons-material";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";

const TrustedSecondOpinions: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Floating orbs animation
  const orbVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, -10, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };


  // Stats counter animation
  const statsVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1,
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Enhanced button variants
  const enhancedButtonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // Trust indicators
  const trustIndicators = [
    { icon: <StarIcon />, text: "4.9/5 Rating", count: "2,500+ Reviews" },
    { icon: <SecurityIcon />, text: "HIPAA Certified", count: "Bank-Level Security" },
    { icon: <SpeedIcon />, text: "2-7 Days", count: "Average Turnaround" },
    { icon: <VerifiedIcon />, text: "Board Certified", count: "100+ Specialists" }
  ];

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: `
          radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
          var(--bg-secondary)
        `,
        py: "var(--space-20)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated Background Elements */}
      <Box
        component={motion.div}
        variants={orbVariants}
        animate="animate"
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary-400), var(--primary-600))",
          opacity: 0.6,
          filter: "blur(40px)",
          zIndex: 0
        }}
      />
      
      <Box
        component={motion.div}
        variants={orbVariants}
        animate="animate"
        transition={{ delay: 2 }}
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--success), var(--info))",
          opacity: 0.5,
          filter: "blur(30px)",
          zIndex: 0
        }}
      />

      {/* Cursor follower effect */}
      <Box
        component={motion.div}
        animate={{
          x: mousePosition.x - window.innerWidth / 2,
          y: mousePosition.y - window.innerHeight / 2,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.03), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
        >
          <Box sx={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
            
            {/* Trust Indicators Row */}
            <motion.div
              variants={statsVariants}
              style={{ marginBottom: "var(--space-8)" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "var(--space-4)",
                  mb: "var(--space-8)"
                }}
              >
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Chip
                      icon={indicator.icon}
                      label={
                        <Box sx={{ display: "flex", flexDirection: "column", py: "var(--space-1)" }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "10px" }}>
                            {indicator.text}
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: "9px", opacity: 0.7 }}>
                            {indicator.count}
                          </Typography>
                        </Box>
                      }
                      sx={{
                        backgroundColor: "var(--bg-primary)",
                        border: "1px solid var(--border-light)",
                        boxShadow: "var(--shadow-sm)",
                        "& .MuiChip-icon": {
                          color: "var(--primary-500)",
                          fontSize: "16px"
                        },
                        height: "auto",
                        borderRadius: "var(--radius-xl)"
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>

            {/* Main Heading with enhanced animation */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.8
                  }
                }
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: "var(--text-4xl)", md: "var(--text-7xl)" },
                  fontWeight: 900,
                  lineHeight: "var(--leading-tight)",
                  mb: "var(--space-2)",
                  background: `
                    linear-gradient(
                      45deg,
                      var(--text-primary) 25%,
                      var(--primary-600) 50%,
                      var(--text-primary) 75%
                    )
                  `,
                  backgroundSize: "200% 100%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradientShift 3s ease-in-out infinite",
                  "@keyframes gradientShift": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" }
                  }
                }}
              >
                Trusted Second Opinions
              </Typography>
            </motion.div>

            {/* Animated subtitle */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    delay: 0.3
                  }
                }
              }}
            >
              <Typography
                variant="h1"
                component="h2"
                sx={{
                  fontSize: { xs: "var(--text-4xl)", md: "var(--text-7xl)" },
                  fontWeight: 900,
                  lineHeight: "var(--leading-tight)",
                  background: `
                    linear-gradient(
                      135deg,
                      var(--primary-500),
                      var(--primary-700),
                      var(--primary-900)
                    )
                  `,
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: "var(--space-8)",
                  animation: "shimmer 4s ease-in-out infinite",
                  "@keyframes shimmer": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" }
                  }
                }}
              >
                Made Simple
              </Typography>
            </motion.div>

            {/* Enhanced description */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.5 }
                }
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "var(--text-secondary)",
                  fontWeight: 400,
                  fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
                  lineHeight: "var(--leading-relaxed)",
                  maxWidth: "700px",
                  margin: "0 auto var(--space-12)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60px",
                    height: "3px",
                    background: "linear-gradient(90deg, var(--primary-500), var(--primary-700))",
                    borderRadius: "2px"
                  }
                }}
              >
                Every case is unique—but getting clarity shouldn't be confusing.
              </Typography>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.7,
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "var(--space-4)",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  alignItems: "center",
                  mb: "var(--space-8)"
                }}
              >
                {/* Primary CTA - Enhanced */}
                <motion.div
                  variants={enhancedButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setHoveredButton("services")}
                  onHoverEnd={() => setHoveredButton(null)}
                >
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={
                      <motion.div
                        animate={hoveredButton === "services" ? { x: 4, scale: 1.1 } : { x: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowForwardIcon />
                      </motion.div>
                    }
                    sx={{
                      background: "linear-gradient(135deg, var(--primary-500), var(--primary-700))",
                      color: "var(--text-inverse)",
                      borderRadius: "var(--radius-full)",
                      px: "var(--space-8)",
                      py: "var(--space-4)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 700,
                      textTransform: "none",
                      boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                      minWidth: "220px",
                      position: "relative",
                      overflow: "hidden",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s",
                      },
                      "&:hover": {
                        background: "linear-gradient(135deg, var(--primary-600), var(--primary-800))",
                        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
                        "&:before": {
                          left: "100%",
                        }
                      }
                    }}
                  >
                    Explore Services
                  </Button>
                </motion.div>

                {/* Secondary CTA - Enhanced */}
                <motion.div
                  variants={enhancedButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setHoveredButton("chat")}
                  onHoverEnd={() => setHoveredButton(null)}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={
                      <motion.div
                        animate={hoveredButton === "chat" ? { rotate: 10, scale: 1.2 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChatIcon />
                      </motion.div>
                    }
                    sx={{
                      borderColor: "var(--primary-500)",
                      color: "var(--primary-600)",
                      borderRadius: "var(--radius-full)",
                      px: "var(--space-8)",
                      py: "var(--space-4)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 600,
                      textTransform: "none",
                      borderWidth: "2px",
                      minWidth: "220px",
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                      backdropFilter: "blur(10px)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        borderColor: "var(--primary-600)",
                        backgroundColor: "var(--primary-50)",
                        borderWidth: "2px",
                        transform: "translateY(-2px)",
                        boxShadow: "0 15px 35px rgba(139, 92, 246, 0.2)"
                      }
                    }}
                  >
                    View Memberships
                  </Button>
                </motion.div>
              </Box>

              {/* Enhanced Bottom Links */}
              <Box
                sx={{
                  display: "flex",
                  gap: "var(--space-6)",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  alignItems: "center"
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="text"
                    sx={{
                      color: "var(--primary-600)",
                      fontSize: "var(--text-base)",
                      fontWeight: 600,
                      textTransform: "none",
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        background: "var(--primary-600)",
                        transition: "width 0.3s ease"
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                        "&:after": {
                          width: "100%"
                        }
                      }
                    }}
                  >
                    Browse Add-On Services
                  </Button>
                </motion.div>

                <Box
                  sx={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "var(--text-muted)"
                  }}
                />

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="text"
                    sx={{
                      color: "var(--primary-600)",
                      fontSize: "var(--text-base)",
                      fontWeight: 600,
                      textTransform: "none",
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        background: "var(--primary-600)",
                        transition: "width 0.3s ease"
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                        "&:after": {
                          width: "100%"
                        }
                      }
                    }}
                  >
                    Learn How It Works
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TrustedSecondOpinions;
