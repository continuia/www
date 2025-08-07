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

const PaymentRefundsSection: React.FC = () => {
  return (
    <>
      {/* Payment and Refunds */}
      <Box id="payment-refunds" sx={sectionStyle}>
        <Typography component="h2" id="payment-refunds" sx={headingStyle}>
          Payment and Refunds
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          Continuia offers transparent pricing, which is communicated to the user before any case is submitted. Payment is typically collected at the time of submission, unless otherwise agreed through a partner institution or enterprise contract.
          <br />
          <br />A refund may be issued under the following circumstances:
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>If no qualified clinician is available within 72 hours of submission</li>
            <li>If the submitted case is outside the scope of our service (e.g., emergency, pediatric, or non-supported specialties)</li>
            <li>If a regulatory restriction prevents us from legally rendering an opinion</li>
          </ul>
          Please note that Continuia does not currently process insurance claims. However, patients may request a detailed invoice to pursue potential reimbursement from their insurer.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default PaymentRefundsSection;
