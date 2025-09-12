import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { Handshake as TrustIcon } from "@mui/icons-material";
import ChatWithTabs from "../common/formAndChat";
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
          </Box>
          <ChatWithTabs />
        </motion.div>
      </Container>
    </Box>
  );
};

export default FinalCTA;
