import { Box, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Animation variants
const heroVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 18,
      delay: 0.05,
    },
  },
};

const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.07, boxShadow: "0 4px 14px 0 var(--neutral-800)" },
};

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <motion.div initial="hidden" animate="visible" variants={heroVariants} style={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          minHeight: { xs: "45vh", md: "60vh" },
          bgcolor: "var(--neutral-900)",
          background: {
            xs: "radial-gradient(circle at 40% 35%, var(--neutral-800) 5%, var(--primary-600) 85%)",
            md: "radial-gradient(circle at 20% 40%, var(--neutral-800) 1%, var(--primary-600) 50%)",
          },
          color: "var(--text-inverse)",
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "flex-start", md: "flex-start" },
          justifyContent: "center",
          px: {
            xs: "var(--space-4)",
            sm: "var(--space-10)",
            md: "var(--space-16)",
          },
          py: { xs: "var(--space-10)", md: "var(--space-24)" },
          position: "relative",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Stack is now wrapped by motion.div */}
        <motion.div variants={heroVariants}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ flexWrap: "wrap" }}>
            <Box>
              <span
                style={{
                  fontSize: "2.8rem",
                  lineHeight: 1,
                  display: "inline-block",
                }}
              >
                🧠
              </span>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.3rem", md: "3rem" },
                lineHeight: "1.1",
                color: "var(--text-inverse)",
              }}
            >
              Practice Medicine Like
              <br />
              It's 2025
            </Typography>
          </Stack>
        </motion.div>

        <motion.div variants={heroVariants}>
          <Typography
            sx={{
              mt: "var(--space-4)",
              color: "var(--text-inverse)",
              fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
              maxWidth: 600,
            }}
          >
            Continua — a global medical initiative redefining second opinions.
          </Typography>
        </motion.div>

        <motion.div variants={heroVariants}>
          <Stack direction={{ md: "row" }} gap={2} sx={{ mt: "var(--space-6)", flexWrap: "wrap" }}>
            <Button
              onClick={() => {
                const form = document.getElementById("joinTheInitiativeForm");
                if (form) {
                  form.scrollIntoView({ behavior: "smooth" });
                }
              }}
              component={motion.button}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              variant="contained"
              sx={{
                background: "var(--primary-700)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-inverse)",
                fontWeight: 500,
                fontSize: "var(--text-base)",
                px: "var(--space-6)",
                py: "var(--space-3)",
                boxShadow: "var(--shadow-sm)",
                transition: "background 0.2s",
                "&:hover": { background: "var(--primary-700)" },
              }}
            >
              Join the Initiative
            </Button>
            <Button
              onClick={() => navigate("/")}
              component={motion.button}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              variant="outlined"
              sx={{
                borderColor: "var(--primary-300)",
                color: "var(--text-inverse)",
                fontWeight: 500,
                fontSize: "var(--text-base)",
                px: "var(--space-6)",
                py: "var(--space-3)",
                boxShadow: "var(--shadow-xs)",
                "&:hover": { borderColor: "var(--primary-700)" },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </motion.div>
      </Box>
    </motion.div>
  );
}
