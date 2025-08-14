import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import heroIllustration from "../../assets/campaign/campaign-1-2.webp";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const animationVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: "spring" } },
};

export default function PlatformPromo() {
  return (
    <motion.div variants={animationVariants} initial="hidden" animate="visible" style={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          bgcolor: "var(--bg-primary)",
          color: "var(--text-primary)",
          px: { xs: "var(--space-6)", md: "var(--space-10)" }, // Reduced horizontal padding
          py: { xs: "var(--space-8)", md: "var(--space-12)" }, // Reduced vertical padding
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: "var(--space-4)", md: "var(--space-8)" }, // Reduced gap
        }}
      >
        <Box order={{ xs: 1, md: 0 }} sx={{ flex: 1, minWidth: 320, maxWidth: 700 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 700,
              color: "var(--text-primary)",
              fontSize: { xs: "2.1rem", md: "2.6rem" }, // Larger font sizes
              lineHeight: 1.18,
              mb: "var(--space-2)",
            }}
          >
            The future isn't coming.
            <br />
            <span style={{ color: "var(--primary-600)" }}>It's already live.</span>
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              mt: "var(--space-2)",
              fontSize: { xs: "1.07rem", md: "1.16rem" },
            }}
          >
            We’re launching a next-generation platform where second opinions are delivered the way modern medicine demands:
          </Typography>
          <List sx={{ py: 0, my: 0 }}>
            {["Doctor-led", "Consent-verified", "AI-assisted"].map((feature) => (
              <ListItem sx={{ py: 0.5, alignItems: "flex-start" }} key={feature} disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon sx={{ color: "var(--primary-500)", fontSize: 28 }} />
                </ListItemIcon>
                <ListItemText
                  primary={<span style={{ fontWeight: 700, fontSize: "1.08rem" }}>{feature}</span>}
                  primaryTypographyProps={{
                    fontSize: "1.08rem",
                    color: "var(--text-primary)",
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Typography
            sx={{
              color: "var(--text-tertiary)",
              mt: "var(--space-3)",
              fontSize: { xs: "1rem", md: "1.07rem" },
            }}
          >
            This isn’t a gig. This is your invitation to practice medicine the way it should work in 2025 globally, ethically, and on your terms.
          </Typography>
        </Box>
        <motion.div
          variants={animationVariants}
          style={{
            flex: 1,
            minWidth: 340,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            order: 0,
          }}
        >
          <Box
            component="img"
            src={heroIllustration}
            alt="AI-assisted doctor illustration"
            sx={{
              width: "100%",
              maxWidth: 520, // Larger illustration
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-lg)",
              objectFit: "cover",
            }}
          />
        </motion.div>
      </Box>
    </motion.div>
  );
}
