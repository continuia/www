import React from "react";
import { Box, Typography, Link } from "@mui/material";

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

const ContactSection: React.FC = () => {
  return (
    <>
      {/* Contact and Support */}
      <Box id="contact" sx={sectionStyle}>
        <Typography component="h2" id="contact" sx={headingStyle}>
          Contact and Support
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          Continuia Health Technologies
          <br />
          <Link href="mailto:support@continuia.ai" sx={{ color: "var(--primary-600)", fontWeight: 500 }}>
            support@continuia.ai
          </Link>
          <br />
          <Link href="https://continuia.ai" target="_blank" rel="noopener" sx={{ color: "var(--primary-600)", fontWeight: 500 }}>
            https://continuia.ai
          </Link>
          <br />
          Compliance & Data Protection Officer: dpo@continuia.ai
          <br />
          <br />
          This document is version-controlled and subject to legal audit and jurisdictional review. A printed or notarized copy is available upon request. For inquiries, contact{" "}
          <Link href="mailto:compliance@continuia.ai" sx={{ color: "var(--primary-600)", fontWeight: 500 }}>
            compliance@continuia.ai
          </Link>
          .
        </Typography>
      </Box>
    </>
  );
};
export default ContactSection;
