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

const AccountSecuritySection: React.FC = () => {
  return (
    <>
      {/* Accounts and Security */}
      <Box id="account-securitys" sx={sectionStyle}>
        <Typography component="h2" id="account-security" sx={headingStyle}>
          Accounts and Security
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          When you create a Continuia account, you agree to be responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must not share your password or allow others to access your account.
          <br />
          <br />
          We protect user information through advanced security measures, including encryption at rest and in transit, two-factor authentication, login alerts, and continuous access monitoring. If we detect unusual behavior or potential compromise of your account, we may temporarily suspend access until identity verification is completed.
          <br />
          <br />
          Users are encouraged to use strong, unique passwords and to change them regularly.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default AccountSecuritySection;
