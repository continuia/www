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

const ConsentSection: React.FC = () => {
  return (
    <>
      {/* Consent and Privacy */}
      <Box id="consent" sx={sectionStyle}>
        <Typography component="h2" id="consent" sx={headingStyle}>
          Consent and Privacy
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          By using Continuia, you give informed consent to the collection, processing, and use of your personal and health-related information for the purpose of obtaining a second opinion.
          <br />
          <br />
          This includes:
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>The review of submitted medical records by licensed healthcare professionals.</li>
            <li>The processing of your data by Continuia’s AI triage and summarization engines, which are designed to match you to an appropriate specialist and organize your information into a clinical narrative.</li>
            <li>The optional sharing of your medical file and opinion with your treating physician or care team, which can only occur with your explicit approval.</li>
          </ul>
          You may withdraw this consent at any time. However, if consent is withdrawn before a case is completed, we may not be able to provide you with a second opinion. If consent is withdrawn after the case has been closed, we will retain your data only to the extent required by applicable laws or for compliance with audit requirements.
          <br />
          <br />
          Continuia’s privacy infrastructure follows the highest standards for data localization, encryption, and access management. Full details are available in our Privacy Policy.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default ConsentSection;
