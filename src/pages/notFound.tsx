import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { HomeRounded, HelpOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

// Number animation
const numberVariants: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.86 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.26 + custom * 0.13,
      duration: 0.8,
      type: "spring",
    },
  }),
};
// Floating question mark
const questionVariants: Variants = {
  hidden: { y: -15, opacity: 0, rotate: -13 },
  visible: {
    y: [0, -16, 0],
    opacity: 1,
    rotate: [0, 18, -8, 0],
    transition: { repeat: Infinity, duration: 2.1, ease: "easeInOut" },
  },
};

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        minHeight: 600,
        bgcolor: "var(--bg-accent)",
        overflowX: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: "var(--space-2)", sm: "var(--space-12)" },
        border: "1px solid red",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 540,
          mx: "auto",
          zIndex: 1,
        }}
      >
        {/* Glowing border gradient accent */}
        <Box
          sx={{
            content: '""',
            position: "absolute",
            inset: "-16px",
            borderRadius: "var(--radius-2xl)",
            background: "linear-gradient(120deg, var(--primary-400) 15%, var(--primary-200) 90%)",
            filter: "blur(18px)",
            zIndex: 0,
            opacity: 0.44,
            pointerEvents: "none",
          }}
        />

        {/* Main card */}
        <Box
          component={motion.section}
          initial={{ opacity: 0, y: 54 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          sx={{
            width: "100%",
            bgcolor: "var(--bg-primary)",
            boxShadow: "var(--shadow-2xl)",
            borderRadius: "var(--radius-2xl)",
            px: { xs: "var(--space-6)", sm: "var(--space-14)" },
            py: { xs: "var(--space-16)", sm: "var(--space-20)" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* 404 Big Visual */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "var(--space-7)",
              width: "100%",
              justifyContent: "center",
              gap: { xs: "var(--space-3)", sm: "var(--space-4)" },
              userSelect: "none",
            }}
          >
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={numberVariants}
              style={{
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "clamp(4.6rem, 13vw, 7.4rem)",
                color: "var(--primary-500)",
                textShadow: "0 0 36px var(--primary-200)",
                letterSpacing: "-0.17em",
              }}
            >
              4
            </motion.span>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={questionVariants}
              style={{
                fontSize: "clamp(4.6rem, 11vw, 6.6rem)",
                color: "var(--primary-700)",
                filter: "drop-shadow(0 4px 16px var(--primary-100))",
                margin: "0 0.1em",
                display: "inline-flex",
                alignItems: "center",
                position: "relative",
                top: "-0.15em",
              }}
            >
              <HelpOutline fontSize="inherit" />
            </motion.span>
            <motion.span
              custom={1}
              initial="hidden"
              animate="visible"
              variants={numberVariants}
              style={{
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "clamp(4.6rem, 13vw, 7.4rem)",
                color: "var(--primary-500)",
                textShadow: "0 0 36px var(--primary-200)",
                letterSpacing: "-0.17em",
              }}
            >
              4
            </motion.span>
          </Box>

          <Typography
            sx={{
              fontSize: "var(--text-3xl)",
              fontWeight: 900,
              color: "var(--primary-700)",
              textAlign: "center",
              mt: "var(--space-0)",
              mb: "var(--space-3)",
              letterSpacing: 0.2,
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              fontSize: "var(--text-lg)",
              textAlign: "center",
              mb: "var(--space-10)",
              maxWidth: 360,
            }}
          >
            Sorry, we can’t find the page you’re looking for.
            <br />
            Let’s help you get back home!
          </Typography>

          {/* Custom Button */}
          <Button
            variant="contained"
            startIcon={<HomeRounded />}
            onClick={() => navigate("/")}
            sx={{
              px: "var(--space-10)",
              py: "var(--space-3)",
              fontSize: "var(--text-base)",
              fontWeight: 700,
              borderRadius: "var(--radius-full)",
              textTransform: "none",
              transition: "all var(--transition-fast)",
              background: "linear-gradient(90deg, var(--primary-500), var(--primary-700) 85%)",
              color: "var(--text-inverse)",
              boxShadow: "0 2px 12px 0 var(--primary-100)",
              letterSpacing: "0.02em",
              outline: "none",
              "&:hover": {
                background: "linear-gradient(90deg, var(--primary-700), var(--primary-600) 85%)",
                boxShadow: "var(--shadow-lg)",
                transform: "translateY(-2px) scale(1.045)",
              },
              "&:focus-visible": {
                boxShadow: "0 0 0 3px var(--primary-200)",
              },
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-1)",
            }}
            component={motion.button}
            whileHover={{ scale: 1.065 }}
            whileTap={{ scale: 0.97 }}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
