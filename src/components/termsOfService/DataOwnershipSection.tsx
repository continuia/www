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

const DataOwnershipSection: React.FC = () => {
  return (
    <>
      {/* Data Ownership and Usage */}
      <Box id="data-ownership" sx={sectionStyle}>
        <Typography component="h2" id="data-ownership" sx={headingStyle}>
          Data Ownership and Usage
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          You retain ownership of any health records, documents, or media you upload to Continuia. We do not sell or rent user data. All identifiable information remains confidential and is stored securely.
          <br />
          <br />
          With your consent, we may use anonymized case data to train machine learning models, improve our triage systems, or support research in partnership with licensed academic or clinical bodies. These uses will never include personal identifiers unless you explicitly authorize such participation.
          <br />
          <br />
          You have the right to request a copy of all data stored about you, and you may also request that we delete your records in accordance with local data retention laws. In some jurisdictions, we may be required to retain records for a legally mandated period (e.g., seven years for clinical documentation).
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default DataOwnershipSection;
