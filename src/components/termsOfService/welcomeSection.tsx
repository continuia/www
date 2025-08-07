// /terms-and-conditions/components/WelcomeSection.tsx
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const sectionStyle = {
  mb: "var(--space-12)",
  "&:last-child": { mb: 0 },
};
const headingStyle = {
  mt: "var(--space-8)",
  mb: "var(--space-2)",
  fontWeight: 800,
  fontSize: "var(--text-xl)",
  color: "var(--primary-700)",
  scrollMarginTop: "var(--space-32)",
};

export default function WelcomeSection() {
  return (
    <Box sx={sectionStyle} id="welcome">
      <Typography component="h2" sx={headingStyle}>
        Welcome to Continuia
      </Typography>
      <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)", mb: "var(--space-2)" }}>
        We are honored to welcome you to Continuia, a service created to empower clarity in healthcare...
        {/* (Full content as per your main chunk...) */}
      </Typography>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </Box>
  );
}
