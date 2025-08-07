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

const ForCliniciansSection: React.FC = () => {
  return (
    <>
      {/* For Clinicians */}
      <Box id="for-clinicians" sx={sectionStyle}>
        <Typography component="h2" id="for-clinicians" sx={headingStyle}>
          For Clinicians
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          Licensed physicians who provide second opinions through Continuia are bound by professional standards, contractual obligations, and regulatory laws.
          <br />
          <br />
          You are expected to provide detailed, thoughtful, and medically sound assessments based on the materials submitted. You must deliver these within the timeframe outlined in your agreement with Continuia, typically 24 to 72 hours. You are also responsible for disclosing any actual or perceived conflicts of interest, and for acknowledging limitations in your clinical expertise as they relate to the specific case.
          <br />
          <br />
          You may not treat patients, write prescriptions, or engage in follow-up interactions outside of the Continuia platform. Soliciting patients, attempting to build a private client base, or contacting them outside the platform constitutes a breach of this agreement and will result in immediate termination.
          <br />
          <br />
          All clinician responses are subject to periodic quality audits and documentation review to ensure compliance with Continuia’s internal governance policies.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default ForCliniciansSection;
