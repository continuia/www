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

const DisclaimersSection: React.FC = () => {
  return (
    <>
      {/* Important Disclaimers */}
      <Box id="disclaimers" sx={sectionStyle}>
        <Typography component="h2" id="disclaimers" sx={headingStyle}>
          Important Disclaimers
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          Continuia does not provide urgent or emergency care under any circumstances. Our services are not designed for acute symptom evaluation, and we are not an appropriate channel for crises or life-threatening situations. If you or someone you know is experiencing chest pain, difficulty breathing, sudden loss of consciousness, or any other medical emergency, you should immediately contact local emergency services or go to the nearest hospital.
          <br />
          <br />
          The medical opinions provided through Continuia are based solely on the information you provide. They are second opinions and are not to be construed as primary diagnoses or treatment plans. Continuia does not assume liability for outcomes based on incomplete or inaccurate information submitted by users.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default DisclaimersSection;
