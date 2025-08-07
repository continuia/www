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

const UpdatesSection: React.FC = () => {
  return (
    <>
      {/* Updates to These Terms */}
      <Box id="updates" sx={sectionStyle}>
        <Typography component="h2" id="updates" sx={headingStyle}>
          Updates to These Terms
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          Continuia may modify or update these Terms of Service from time to time. If changes are material, we will provide at least fifteen (15) days’ notice via email and through notifications within the application. The updated terms will take effect on the specified effective date.
          <br />
          <br />
          By continuing to use our services after the effective date, you agree to be bound by the revised Terms. If you do not accept the changes, you may discontinue use of the service at any time.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default UpdatesSection;
