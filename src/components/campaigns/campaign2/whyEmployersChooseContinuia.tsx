import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { TrendingDown as CostIcon, Favorite as TrustIcon, Security as GovernanceIcon, EmojiEvents as BrandIcon } from "@mui/icons-material";

interface TrustBenefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface WhyEmployersTrustProps {
  className?: string;
}

const WhyEmployersTrust: React.FC<WhyEmployersTrustProps> = ({ className }) => {
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
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const trustBenefits: TrustBenefit[] = [
    {
      icon: <CostIcon sx={{ fontSize: "3rem" }} />,
      title: "Cost Containment",
      description: "Avoid unnecessary high-cost procedures—one avoided surgery can offset dozens of reviews.",
      color: "var(--success)",
    },
    {
      icon: <TrustIcon sx={{ fontSize: "3rem" }} />,
      title: "Employee Trust & Retention",
      description: "Demonstrates that you've invested in employees' well-being—building loyalty and satisfaction.",
      color: "var(--primary-500)",
    },
    {
      icon: <GovernanceIcon sx={{ fontSize: "3rem" }} />,
      title: "Built-In Governance",
      description: "Layered compliance (HIPAA, DPDP, GDPR), consent management, and audit visibility—without extra hiring.",
      color: "var(--info)",
    },
    {
      icon: <BrandIcon sx={{ fontSize: "3rem" }} />,
      title: "Brand Advantage",
      description: "Provide a second-opinion benefit at mid-market cost—matching Fortune 500 capabilities.",
      color: "var(--warning)",
    },
  ];

  return (
    <Box
      component="section"
      className={className}
      sx={{
        py: { xs: "var(--space-16)", md: "var(--space-24)" },
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
        // Subtle background pattern
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, var(--primary-50) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, var(--primary-100) 0%, transparent 50%),
            radial-gradient(circle at 60% 30%, var(--primary-50) 0%, transparent 40%)
          `,
          opacity: 0.3,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: { xs: "var(--space-12)", md: "var(--space-16)" } }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "clamp(2rem, 6vw, 2.5rem)",
                    md: "clamp(2.5rem, 4vw, 3.5rem)",
                    lg: "clamp(3rem, 4vw, 4rem)",
                  },
                  fontWeight: 800,
                  lineHeight: "var(--leading-tight)",
                  color: "var(--text-primary)",
                  mb: "var(--space-4)",
                  background: "linear-gradient(135deg, var(--primary-700) 0%, var(--primary-500) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Why Employers Trust Continuia
              </Typography>

              <Box
                sx={{
                  width: "80px",
                  height: "4px",
                  background: "linear-gradient(90deg, var(--primary-400) 0%, var(--primary-600) 100%)",
                  borderRadius: "var(--radius-full)",
                  mx: "auto",
                }}
              />
            </Box>
          </motion.div>

          {/* Trust Benefits Grid */}
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: { xs: "var(--space-6)", md: "var(--space-8)" },
            }}
          >
            {trustBenefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    background: "var(--bg-primary)",
                    border: "2px solid var(--border-light)",
                    borderRadius: "var(--radius-2xl)",
                    p: { xs: "var(--space-6)", md: "var(--space-8)" },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all var(--transition-normal)",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: benefit.color,
                      boxShadow: "var(--shadow-xl)",
                      transform: "translateY(-4px)",
                      "& .icon-container": {
                        transform: "scale(1.1) rotate(5deg)",
                        background: `linear-gradient(135deg, ${benefit.color}15 0%, ${benefit.color}25 100%)`,
                      },
                      "&::before": {
                        opacity: 1,
                        transform: "translateX(0)",
                      },
                    },
                    // Subtle hover effect background
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(90deg, transparent, ${benefit.color}08, transparent)`,
                      transition: "all var(--transition-normal)",
                      opacity: 0,
                      zIndex: 0,
                    },
                  }}
                >
                  {/* Icon Container */}
                  <Box
                    className="icon-container"
                    sx={{
                      width: { xs: "80px", md: "96px" },
                      height: { xs: "80px", md: "96px" },
                      borderRadius: "var(--radius-2xl)",
                      background: `linear-gradient(135deg, ${benefit.color}10 0%, ${benefit.color}20 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: { xs: "var(--space-4)", md: "var(--space-6)" },
                      color: benefit.color,
                      transition: "all var(--transition-normal)",
                      boxShadow: `0 8px 24px ${benefit.color}20`,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {benefit.icon}
                  </Box>

                  {/* Content */}
                  <Box sx={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        mb: "var(--space-3)",
                        lineHeight: "var(--leading-tight)",
                      }}
                    >
                      {benefit.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
                        color: "var(--text-secondary)",
                        lineHeight: "var(--leading-relaxed)",
                        flex: 1,
                      }}
                    >
                      {benefit.description}
                    </Typography>
                  </Box>

                  {/* Decorative Element */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${benefit.color} 0%, ${benefit.color}60 100%)`,
                      borderRadius: "var(--radius-full)",
                      opacity: 0,
                      transition: "opacity var(--transition-normal)",
                      ".MuiPaper-root:hover &": {
                        opacity: 1,
                      },
                    }}
                  />
                </Paper>
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WhyEmployersTrust;
