import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/campaign/campaign-1-1.webp"; // Your image
import type { Variants } from "framer-motion";

// Animation variants
const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, type: "spring" },
  },
};

export default function AdaptiveTech2025() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeSlide}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          bgcolor: "var(--bg-primary)",
          color: "var(--text-primary)",
          px: { xs: "var(--space-6)", md: "var(--space-16)" }, // less horizontal padding
          py: { xs: "var(--space-8)", md: "var(--space-16)" }, // less vertical padding
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: "var(--space-4)", md: "var(--space-8)" }, // less gap
          width: "100%",
        }}
      >
        {/* Illustration/Dashboard Visual */}
        <motion.div
          variants={fadeSlide}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={heroIllustration}
            alt="Medical dashboard interface"
            sx={{
              width: "100%",
              maxWidth: 520, // larger image
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-lg)",
              objectFit: "cover",
            }}
          />
        </motion.div>

        {/* Right Section: Textual Content */}
        <Box sx={{ flex: 1, minWidth: 320, maxWidth: 720 }}>
          <Typography
            variant="h4" // bigger heading
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.8rem", md: "2.6rem" }, // larger font sizes
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}
          >
            For Minds. <br />
            <span style={{ color: "var(--primary-600)" }}>
              That Value Clarity.
            </span>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" }, // bigger font
              color: "var(--text-secondary)",
              mt: "var(--space-3)", // tighter margin-top
              mb: "var(--space-1)", // tighter margin-bottom
            }}
          >
            Continia was built for medical minds that still believe clarity
            matters.
          </Typography>
          <List sx={{ p: 0, mb: 0 }}>
            {["You review.", "You decide.", "You lead."].map((feature, idx) => {
              const secondaryTexts = [
                "Full access to comprehensive case data with intuitive navigation.",
                "Your clinical judgment remains the highest authority.",
                "Set the standard for ethical, technology-enhanced medicine.",
              ];
              return (
                <ListItem
                  disableGutters
                  sx={{ alignItems: "flex-start", py: "var(--space-1)" }} // reduce vertical padding
                  key={feature}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon
                      sx={{ color: "var(--primary-500)", fontSize: 28 }} // bigger icon
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <span style={{ fontWeight: 700, fontSize: "1.125rem" }}>
                        {feature}
                      </span>
                    }
                    secondary={
                      <span
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "1rem",
                        }}
                      >
                        {secondaryTexts[idx]}
                      </span>
                    }
                    primaryTypographyProps={{
                      fontSize: "1.125rem",
                      color: "var(--text-primary)",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
          <Typography
            sx={{
              color: "var(--text-tertiary)",
              mt: "var(--space-3)", // less margin-top
              fontSize: { xs: "0.9rem", md: "1rem" }, // slightly larger
            }}
          >
            No bots in the loop. No filters on your insight.
            <br />
            This is the system doctors always asked for — now live.
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
