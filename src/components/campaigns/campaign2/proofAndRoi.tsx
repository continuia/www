import React from "react";
import { Box, Typography, Container, Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, type Variants } from "framer-motion";
import {Star as StarIcon } from "@mui/icons-material";

interface OutcomesROIProps {
  className?: string;
}

const OutcomesROI: React.FC<OutcomesROIProps> = ({ className }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <Box
      component="section"
      className={className}
      sx={{
        py: { xs: "var(--space-20)", md: "var(--space-24)" },
        background: `
          linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%),
          radial-gradient(circle at 25% 25%, var(--primary-100) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, var(--success)20 0%, transparent 50%)
        `,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {/* Dynamic Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: { xs: "var(--space-16)", md: "var(--space-20)" } }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "clamp(2.5rem, 8vw, 3.5rem)", md: "clamp(3rem, 6vw, 5rem)" },
                  fontWeight: 900,
                  mb: "var(--space-6)",
                  background: "linear-gradient(135deg, var(--primary-600) 0%, var(--success) 50%, var(--warning) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                Proven Results & ROI
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
                  fontWeight: 500,
                  maxWidth: "700px",
                  mx: "auto",
                  mb: "var(--space-6)",
                }}
              >
                Real data from actual implementations
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                  mb: "var(--space-4)",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} sx={{ fontSize: "1.5rem", color: "#FFD700" }} />
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Main Results Cards - EQUAL HEIGHT GUARANTEED */}
          <Grid container spacing={{ xs: 6, md: 10 }} sx={{ mb: "var(--space-20)" }}>
            {/* Cost Savings Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    background: "white",
                    borderRadius: "var(--radius-3xl)",
                    p: { xs: "var(--space-10)", md: "var(--space-12)" },
                    height: "100%", // FORCE EQUAL HEIGHT
                    display: "flex",
                    flexDirection: "column",
                    border: "3px solid transparent",
                    backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, var(--success)30, var(--success)60)`,
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                    boxShadow: "0 30px 80px rgba(16, 185, 129, 0.15)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all var(--transition-normal)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 40px 100px rgba(16, 185, 129, 0.25)",
                    },
                  }}
                >
                  {/* Background decoration */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-50px",
                      right: "-50px",
                      width: "200px",
                      height: "200px",
                      background: "radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent 70%)",
                      borderRadius: "50%",
                    }}
                  />

                  <Stack spacing="var(--space-6)" sx={{ position: "relative", zIndex: 1, height: "100%" }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--success) 0%, #059669 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "3rem",
                        boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4)",
                        alignSelf: "center",
                      }}
                    >
                      💰
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "var(--text-2xl)", md: "var(--text-3xl)" },
                        color: "var(--text-primary)",
                        textAlign: "center",
                        mb: "var(--space-4)",
                      }}
                    >
                      Massive Cost Savings
                    </Typography>

                    {/* Main stat */}
                    <Box sx={{ textAlign: "center", mb: "var(--space-6)" }}>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: { xs: "var(--text-4xl)", md: "var(--text-5xl)" },
                          fontWeight: 900,
                          color: "var(--success)",
                          lineHeight: "var(--leading-none)",
                          mb: "var(--space-2)",
                        }}
                      >
                        $20K-100K+
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "var(--text-tertiary)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                          fontSize: "var(--text-sm)",
                        }}
                      >
                        Per Avoided Procedure
                      </Typography>
                    </Box>

                    {/* Quote - FLEXIBLE SPACE */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        background: "rgba(16, 185, 129, 0.05)",
                        borderRadius: "var(--radius-2xl)",
                        p: "var(--space-6)",
                        border: "2px solid rgba(16, 185, 129, 0.1)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                          fontStyle: "italic",
                          color: "var(--text-primary)",
                          textAlign: "center",
                          lineHeight: "var(--leading-relaxed)",
                          fontWeight: 500,
                        }}
                      >
                        "Each second opinion that prevents an unnecessary procedure saves massive healthcare costs"
                      </Typography>
                    </Box>

                    {/* Attribution - BOTTOM ALIGNED */}
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--text-tertiary)",
                        textAlign: "center",
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        mt: "auto",
                      }}
                    >
                      — Healthcare Cost Analysis Report
                    </Typography>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>

            {/* Pilot Results Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    background: "white",
                    borderRadius: "var(--radius-3xl)",
                    p: { xs: "var(--space-10)", md: "var(--space-12)" },
                    height: "100%", // FORCE EQUAL HEIGHT
                    display: "flex",
                    flexDirection: "column",
                    border: "3px solid transparent",
                    backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, var(--primary-500)30, var(--primary-600)60)`,
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                    boxShadow: "0 30px 80px rgba(139, 92, 246, 0.15)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all var(--transition-normal)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 40px 100px rgba(139, 92, 246, 0.25)",
                    },
                  }}
                >
                  {/* Background decoration */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-50px",
                      right: "-50px",
                      width: "200px",
                      height: "200px",
                      background: "radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%)",
                      borderRadius: "50%",
                    }}
                  />

                  <Stack spacing="var(--space-6)" sx={{ position: "relative", zIndex: 1, height: "100%" }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "3rem",
                        boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)",
                        alignSelf: "center",
                      }}
                    >
                      🚀
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "var(--text-2xl)", md: "var(--text-3xl)" },
                        color: "var(--text-primary)",
                        textAlign: "center",
                        mb: "var(--space-4)",
                      }}
                    >
                      Outstanding Performance
                    </Typography>

                    {/* Main stats */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "var(--space-4)",
                        mb: "var(--space-6)",
                      }}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h2"
                          sx={{
                            fontSize: { xs: "var(--text-3xl)", md: "var(--text-4xl)" },
                            fontWeight: 900,
                            color: "var(--primary-600)",
                            lineHeight: "var(--leading-none)",
                          }}
                        >
                          95%
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "var(--text-tertiary)",
                            fontWeight: 600,
                            fontSize: "var(--text-xs)",
                            textTransform: "uppercase",
                          }}
                        >
                          Satisfaction
                        </Typography>
                      </Box>

                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h2"
                          sx={{
                            fontSize: { xs: "var(--text-3xl)", md: "var(--text-4xl)" },
                            fontWeight: 900,
                            color: "var(--primary-600)",
                            lineHeight: "var(--leading-none)",
                          }}
                        >
                          40%
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "var(--text-tertiary)",
                            fontWeight: 600,
                            fontSize: "var(--text-xs)",
                            textTransform: "uppercase",
                          }}
                        >
                          Reduction
                        </Typography>
                      </Box>
                    </Box>

                    {/* Quote - FLEXIBLE SPACE */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        background: "rgba(139, 92, 246, 0.05)",
                        borderRadius: "var(--radius-2xl)",
                        p: "var(--space-6)",
                        border: "2px solid rgba(139, 92, 246, 0.1)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                          fontStyle: "italic",
                          color: "var(--text-primary)",
                          textAlign: "center",
                          lineHeight: "var(--leading-relaxed)",
                          fontWeight: 500,
                        }}
                      >
                        "95% employee satisfaction with 40% faster decision making in pilot programs"
                      </Typography>
                    </Box>

                    {/* Attribution - BOTTOM ALIGNED */}
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--text-tertiary)",
                        textAlign: "center",
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        mt: "auto",
                      }}
                    >
                      — Q3 2024 Pilot Program Analysis
                    </Typography>
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* Summary Stats Bar */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
                borderRadius: "var(--radius-3xl)",
                p: { xs: "var(--space-10)", md: "var(--space-16)" },
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background pattern */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
                  `,
                  opacity: 0.6,
                }}
              />

              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "var(--text-3xl)", md: "var(--text-4xl)" },
                    fontWeight: 800,
                    textAlign: "center",
                    mb: "var(--space-8)",
                    color: "white",
                  }}
                >
                  ⚡ Ready to Transform Your Healthcare Decisions?
                </Typography>

                <Grid container spacing={6}>
                  {[
                    { icon: "💰", value: "$20K-100K+", label: "Savings Per Case" },
                    { icon: "⭐", value: "95%", label: "Satisfaction Rate" },
                    { icon: "🚀", value: "40%", label: "Faster Decisions" },
                    { icon: "🏢", value: "500+", label: "Companies Trust Us" },
                  ].map((stat, index) => (
                    <Grid key={index} size={{ xs: 6, md: 3 }}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ fontSize: "3rem", mb: "var(--space-2)" }}>{stat.icon}</Typography>
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: { xs: "var(--text-2xl)", md: "var(--text-3xl)" },
                            fontWeight: 900,
                            color: "white",
                            mb: "var(--space-1)",
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.8)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 500,
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default OutcomesROI;
