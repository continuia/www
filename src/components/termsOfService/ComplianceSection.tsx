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

const ComplianceSection: React.FC = () => {
  return (
    <>
      {/* Global Compliance and Jurisdiction */}
      <Box id="compliance" sx={sectionStyle}>
        <Typography component="h2" id="compliance" sx={headingStyle}>
          Global Compliance and Jurisdiction
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          Continuia serves users in multiple countries and is committed to complying with local laws and standards related to patient privacy, data sovereignty, and telemedicine.
          <br />
          <br />
          <b>In India,</b> our services adhere to the Digital Personal Data Protection Act (DPDP) and the Telemedicine Practice Guidelines (2020). Physicians providing second opinions do so in accordance with National Medical Council standards and are prohibited from prescribing treatment unless they have previously seen the patient in person.
          <br />
          <br />
          <b>In the United States,</b> Continuia operates in compliance with the Health Insurance Portability and Accountability Act (HIPAA). We are not a covered entity unless specifically contracted under a Business Associate Agreement (BAA). All patient records are handled with end-to-end encryption, secure data storage, and access controls.
          <br />
          <br />
          <b>In the United Arab Emirates (Dubai),</b> we conform to the Dubai Health Authority (DHA) Telehealth regulations. Our platform ensures that second opinions offered to Dubai residents are rendered by qualified professionals who either hold DHA credentials or operate under approved cross-border frameworks.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default ComplianceSection;
