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

const ScopeOfServicesSection: React.FC = () => {
  return (
    <>
      {/* Scope of Services */}
      <Box id="scope" sx={sectionStyle}>
        <Typography component="h2" id="scope" sx={headingStyle}>
          Scope of Services
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)", mb: "var(--space-2)" }}>
          Continuia offers access to remote, asynchronous second opinions from licensed physicians across various specialties. These opinions are purely educational and designed to provide you with an additional expert perspective to support—not replace—your ongoing care.
          <br />
          <br />
          When a case is submitted, it undergoes a triage process that uses secure AI agents to match your submission with the most relevant and appropriately licensed clinician. That physician then reviews your case, analyzes the clinical data, and provides a written second opinion. The turnaround time for most opinions ranges from 24 to 72 hours, although this may vary based on the complexity of the case and availability of the clinician.
          <br />
          <br />
          For institutions and care teams, Continuia integrates tools for internal governance reviews, cross-specialty collaboration, and audit-safe documentation. We serve as both an independent voice and an infrastructure layer supporting ethical decision-making.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default ScopeOfServicesSection;
