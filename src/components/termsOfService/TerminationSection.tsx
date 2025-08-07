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

const TerminationSection: React.FC = () => {
  return (
    <>
      {/* Termination of Access */}
      <Box id="termination" sx={sectionStyle}>
        <Typography component="h2" id="termination" sx={headingStyle}>
          Termination of Access
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          Continuia may suspend or permanently terminate access to any user who violates these Terms, misuses our platform, submits fraudulent information, or engages in behavior that compromises the safety or privacy of others.
          <br />
          <br />
          Users may close their accounts at any time by contacting our support team. Data associated with the account will be retained or deleted in accordance with our privacy policy and applicable law.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default TerminationSection;
