import React from "react";
import { Box, Typography, Container, Button, Stack, Paper, Link, IconButton } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { RocketLaunch as PilotIcon, RequestPage as ProposalIcon, Email as EmailIcon, Launch as LinkIcon, ArrowForward as ArrowIcon, Handshake as TrustIcon } from "@mui/icons-material";

interface FinalCTAProps {
  className?: string;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ className }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      component="section"
      className={className}
      sx={{
        py: { xs: "var(--space-20)", md: "var(--space-24)" },
        background: `
          linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%),
          radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)
        `,
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%)",
          filter: "blur(80px)",
          animation: "pulse 8s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.3, transform: "scale(1)" },
            "50%": { opacity: 0.6, transform: "scale(1.2)" },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)",
          filter: "blur(60px)",
          animation: "pulse 6s ease-in-out infinite reverse",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {/* Main CTA Section */}
          <Box sx={{ textAlign: "center", mb: { xs: "var(--space-16)", md: "var(--space-20)" } }}>
            <motion.div variants={itemVariants}>
              <motion.div variants={floatingVariants} animate="animate">
                <TrustIcon
                  sx={{
                    fontSize: { xs: "4rem", md: "6rem" },
                    color: "var(--primary-400)",
                    mb: "var(--space-6)",
                    filter: "drop-shadow(0 8px 32px rgba(139, 92, 246, 0.4))",
                  }}
                />
              </motion.div>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "clamp(2.5rem, 8vw, 3.5rem)", md: "clamp(3rem, 6vw, 5rem)" },
                  fontWeight: 900,
                  mb: "var(--space-6)",
                  background: "linear-gradient(135deg, white 0%, var(--primary-200) 50%, white 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                Ready to elevate your benefits with medical trust?
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                sx={{
                  display: "inline-block",
                  px: { xs: "var(--space-8)", md: "var(--space-12)" },
                  py: "var(--space-4)",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  mb: { xs: "var(--space-10)", md: "var(--space-12)" },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  "Let's explore a pilot — no obligations."
                </Typography>
              </Paper>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing="var(--space-4)" justifyContent="center" sx={{ mb: { xs: "var(--space-12)", md: "var(--space-16)" } }}>
                <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PilotIcon />}
                    endIcon={<ArrowIcon />}
                    sx={{
                      background: "linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)",
                      color: "white",
                      px: { xs: "var(--space-8)", md: "var(--space-12)" },
                      py: "var(--space-4)",
                      borderRadius: "var(--radius-full)",
                      fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                      fontWeight: 800,
                      textTransform: "none",
                      boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)",
                      border: "2px solid transparent",
                      minWidth: { xs: "100%", sm: "220px" },
                      "&:hover": {
                        background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)",
                        boxShadow: "0 25px 80px rgba(139, 92, 246, 0.6)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  >
                    Start a Pilot
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ProposalIcon />}
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      color: "white",
                      px: { xs: "var(--space-8)", md: "var(--space-12)" },
                      py: "var(--space-4)",
                      borderRadius: "var(--radius-full)",
                      fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                      fontWeight: 700,
                      textTransform: "none",
                      borderWidth: "2px",
                      minWidth: { xs: "100%", sm: "280px" },
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        borderColor: "white",
                        background: "rgba(255, 255, 255, 0.15)",
                        borderWidth: "2px",
                        boxShadow: "0 20px 60px rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Request Pricing Proposal
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>
          </Box>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                borderRadius: "var(--radius-3xl)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                p: { xs: "var(--space-10)", md: "var(--space-12)" },
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "white",
                  textAlign: "center",
                  mb: "var(--space-8)",
                  fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
                }}
              >
                Get Started Today
              </Typography>

              <Stack spacing="var(--space-6)">
                {/* Email Contact */}
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-4)",
                      p: "var(--space-4)",
                      borderRadius: "var(--radius-xl)",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all var(--transition-normal)",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  >
                    <IconButton
                      sx={{
                        background: "linear-gradient(135deg, var(--primary-500), var(--primary-600))",
                        color: "white",
                        width: "50px",
                        height: "50px",
                        "&:hover": {
                          background: "linear-gradient(135deg, var(--primary-600), var(--primary-700))",
                        },
                      }}
                    >
                      <EmailIcon />
                    </IconButton>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontSize: "var(--text-sm)",
                          fontWeight: 500,
                          mb: "var(--space-1)",
                        }}
                      >
                        Email us directly
                      </Typography>
                      <Link
                        href="mailto:partnerships@continuia.ai"
                        sx={{
                          color: "white",
                          fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
                          fontWeight: 600,
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        partnerships@continuia.ai
                      </Link>
                    </Box>
                  </Box>
                </motion.div>

                {/* Website Link */}
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-4)",
                      p: "var(--space-4)",
                      borderRadius: "var(--radius-xl)",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all var(--transition-normal)",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  >
                    <IconButton
                      sx={{
                        background: "linear-gradient(135deg, var(--success), #059669)",
                        color: "white",
                        width: "50px",
                        height: "50px",
                        "&:hover": {
                          background: "linear-gradient(135deg, #059669, #047857)",
                        },
                      }}
                    >
                      <LinkIcon />
                    </IconButton>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontSize: "var(--text-sm)",
                          fontWeight: 500,
                          mb: "var(--space-1)",
                        }}
                      >
                        Request a pilot online
                      </Typography>
                      <Link
                        href="https://www.continuia.ai/request-pilot"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "white",
                          fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
                          fontWeight: 600,
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        www.continuia.ai/request-pilot
                      </Link>
                    </Box>
                  </Box>
                </motion.div>
              </Stack>

              {/* Trust Indicator */}
              <Box
                sx={{
                  mt: "var(--space-8)",
                  pt: "var(--space-6)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                  }}
                >
                  🔒 Trusted by 500+ employers • HIPAA compliant • No obligations
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FinalCTA;
