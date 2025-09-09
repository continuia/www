import React from "react";
import { Box, Typography, Button, Container, Stack, Chip } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { LocalHospital as MedicalIcon, Schedule as ClockIcon, VerifiedUser as ShieldIcon, TrendingUp as TrendingIcon, People as PeopleIcon, Star as StarIcon } from "@mui/icons-material";

// Import your image
import posterImage from "../../../assets/poster.webp";

interface ContinuiaHeroProps {
  onStartPilot?: () => void;
}

const ContinuiaHero: React.FC<ContinuiaHeroProps> = ({ onStartPilot }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
        minHeight: { xs: "80vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        py: { xs: "var(--space-8)", md: "var(--space-16)" },
        position: "relative",
        overflow: "hidden",
        // Animated background elements
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60%",
          height: "120%",
          background: `
            radial-gradient(circle at 30% 40%, var(--primary-100) 0%, transparent 50%),
            radial-gradient(circle at 80% 10%, var(--primary-200) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, var(--primary-50) 0%, transparent 50%)
          `,
          borderRadius: "50%",
          transform: "rotate(-15deg)",
          zIndex: 0,
          animation: "float 20s ease-in-out infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "40%",
          height: "60%",
          background: "linear-gradient(45deg, var(--primary-50) 0%, var(--primary-100) 100%)",
          borderRadius: "50%",
          opacity: 0.5,
          zIndex: 0,
          animation: "pulse 15s ease-in-out infinite",
        },
        "@keyframes float": {
          "0%, 100%": { transform: "rotate(-15deg) translateY(0px)" },
          "50%": { transform: "rotate(-15deg) translateY(-20px)" },
        },
        "@keyframes pulse": {
          "0%, 100%": { opacity: 0.3, transform: "scale(1)" },
          "50%": { opacity: 0.6, transform: "scale(1.05)" },
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.2fr 1fr" },
              gap: { xs: "var(--space-8)", lg: "var(--space-16)" },
              alignItems: "center",
            }}
          >
            {/* Left Content - Enhanced */}
            <motion.div variants={itemVariants}>
              <Stack spacing={{ xs: "var(--space-4)", md: "var(--space-6)" }}>
                {/* Animated Badge */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <Chip
                    icon={<TrendingIcon />}
                    label="Trusted by 500+ Employers"
                    sx={{
                      background: "linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)",
                      color: "var(--text-inverse)",
                      fontWeight: 600,
                      fontSize: "var(--text-sm)",
                      height: "36px",
                      borderRadius: "var(--radius-full)",
                      boxShadow: "var(--shadow-lg)",
                      alignSelf: "flex-start",
                      "& .MuiChip-icon": {
                        color: "var(--text-inverse)",
                      },
                    }}
                  />
                </motion.div>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: "clamp(2rem, 8vw, 3rem)",
                      md: "clamp(3rem, 6vw, 4rem)",
                      lg: "clamp(3.5rem, 5vw, 5rem)",
                    },
                    fontWeight: 800,
                    lineHeight: "var(--leading-tight)",
                    color: "var(--text-primary)",
                    mb: "var(--space-2)",
                    "& .highlight": {
                      background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-400) 50%, var(--primary-500) 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "4px",
                        background: "linear-gradient(90deg, var(--primary-400) 0%, var(--primary-600) 100%)",
                        borderRadius: "var(--radius-full)",
                        opacity: 0.3,
                      },
                    },
                  }}
                >
                  Continuia: Physician-Reviewed <span className="highlight">Second Opinions</span> for Self-Insured Employers
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                    color: "var(--text-secondary)",
                    lineHeight: "var(--leading-relaxed)",
                    maxWidth: { xs: "100%", lg: "90%" },
                    fontWeight: 400,
                  }}
                >
                  Offer your employees and their families <strong style={{ color: "var(--primary-600)" }}>instant access</strong> to expert medical insight — with <strong style={{ color: "var(--primary-600)" }}>zero upfront cost</strong> to your business.
                </Typography>

                {/* Enhanced CTA Buttons */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing="var(--space-4)" sx={{ pt: "var(--space-6)" }}>
                  <Box sx={{ flex: { xs: 1, sm: "auto" } }}>
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={onStartPilot}
                        startIcon={<MedicalIcon />}
                        sx={{
                          background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)",
                          color: "var(--text-inverse)",
                          px: { xs: "var(--space-6)", md: "var(--space-10)" },
                          py: { xs: "var(--space-3)", md: "var(--space-4)" },
                          borderRadius: "var(--radius-2xl)",
                          fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
                          fontWeight: 700,
                          textTransform: "none",
                          boxShadow: "var(--shadow-xl)",
                          border: "none",
                          width: { xs: "100%", sm: "auto" },
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
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
                            background: "linear-gradient(135deg, var(--primary-700) 0%, var(--primary-600) 100%)",
                            boxShadow: "var(--shadow-2xl)",
                            transform: "translateY(-2px)",
                            "&::before": {
                              left: "100%",
                            },
                          },
                        }}
                      >
                        Start a Pilot with Continuia
                      </Button>
                    </motion.div>
                  </Box>
                </Stack>

                {/* Enhanced Trust Indicators */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: "var(--space-3)", sm: "var(--space-8)" }} sx={{ pt: "var(--space-6)" }}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-3)",
                        padding: "var(--space-3)",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--bg-glass)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <Box
                        sx={{
                          background: "var(--primary-100)",
                          borderRadius: "var(--radius-full)",
                          p: "var(--space-2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ShieldIcon sx={{ color: "var(--primary-600)", fontSize: "var(--text-xl)" }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "var(--text-primary)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 600,
                          }}
                        >
                          HIPAA Compliant
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "var(--text-tertiary)",
                            fontSize: "var(--text-xs)",
                          }}
                        >
                          100% Secure
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-3)",
                        padding: "var(--space-3)",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--bg-glass)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <Box
                        sx={{
                          background: "var(--primary-100)",
                          borderRadius: "var(--radius-full)",
                          p: "var(--space-2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ClockIcon sx={{ color: "var(--primary-600)", fontSize: "var(--text-xl)" }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "var(--text-primary)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 600,
                          }}
                        >
                          24-72 Hours
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "var(--text-tertiary)",
                            fontSize: "var(--text-xs)",
                          }}
                        >
                          Fast Turnaround
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Stack>
              </Stack>
            </motion.div>

            {/* Right Content - Real Image */}
            <motion.div variants={itemVariants}>
              <Box sx={{ position: "relative", height: { xs: "400px", md: "500px" } }}>
                {/* Main Image Container with Real Image */}
                <motion.div variants={floatingVariants} animate="animate">
                  <Box
                    sx={{
                      width: "100%",
                      height: "85%",
                      borderRadius: "var(--radius-3xl)",
                      overflow: "hidden",
                      boxShadow: "var(--shadow-2xl)",
                      position: "relative",
                      border: "3px solid var(--primary-200)",
                    }}
                  >
                    {/* Real Image */}
                    <Box
                      component="img"
                      src={posterImage}
                      alt="Professional medical consultation - doctors discussing patient care"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />

                    {/* Subtle Overlay for Better Card Visibility */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>
                </motion.div>

                {/* Floating Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  <Box
                    sx={{
                      background: "var(--bg-glass)",
                      backdropFilter: "blur(20px)",
                      border: "2px solid var(--primary-200)",
                      borderRadius: "var(--radius-2xl)",
                      p: { xs: "var(--space-3)", md: "var(--space-4)" },
                      boxShadow: "var(--shadow-xl)",
                      textAlign: "center",
                      minWidth: { xs: "100px", md: "130px" },
                    }}
                  >
                    <Stack direction="row" spacing="var(--space-1)" alignItems="center" justifyContent="center" mb="var(--space-1)">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} sx={{ fontSize: "var(--text-sm)", color: "#FFD700" }} />
                      ))}
                    </Stack>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: "var(--text-2xl)", md: "var(--text-3xl)" },
                        fontWeight: 800,
                        color: "var(--primary-600)",
                        lineHeight: 1,
                      }}
                    >
                      95%
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "var(--text-xs)",
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                        mt: "var(--space-1)",
                      }}
                    >
                      Satisfaction Rate
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                  }}
                >
                  <Box
                    sx={{
                      background: "var(--bg-glass)",
                      backdropFilter: "blur(20px)",
                      border: "2px solid var(--success)",
                      borderRadius: "var(--radius-2xl)",
                      p: { xs: "var(--space-3)", md: "var(--space-4)" },
                      boxShadow: "var(--shadow-xl)",
                      textAlign: "center",
                      minWidth: { xs: "100px", md: "130px" },
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: "var(--text-xl)", color: "var(--success)", mb: "var(--space-1)" }} />
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
                        fontWeight: 800,
                        color: "var(--success)",
                        lineHeight: 1,
                      }}
                    >
                      10K+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "var(--text-xs)",
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                        mt: "var(--space-1)",
                      }}
                    >
                      Lives Covered
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContinuiaHero;
