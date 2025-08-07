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

const DisputesSection: React.FC = () => {
  return (
    <>
      {/* Disputes and Jurisdiction */}
      <Box id="disputes" sx={sectionStyle}>
        <Typography component="h2" id="disputes" sx={headingStyle}>
          Disputes and Jurisdiction
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          Any disputes arising from the use of our platform will be handled based on the user’s region:
          <br />
          <br />
          <b>For users in India,</b> disputes will be resolved through arbitration under the Arbitration and Conciliation Act, 1996. The venue for such arbitration shall be Hyderabad, India.
          <br />
          <br />
          <b>For users in the United States,</b> disputes will be subject to binding arbitration in the state of Delaware, under the rules of the American Arbitration Association.
          <br />
          <br />
          <b>For users in Dubai,</b> disputes will be escalated through the Dubai Health Authority (DHA) grievance system and, if unresolved, referred to UAE civil courts.
          <br />
          <br />
          In all cases, users agree to waive any rights to participate in class action lawsuits or collective claims.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default DisputesSection;
