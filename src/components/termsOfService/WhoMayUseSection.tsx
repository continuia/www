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

const WhoMayUseSection: React.FC = () => {
  return (
    <>
      {/* Who May Use Continuia */}
      <Box id="who" sx={sectionStyle}>
        <Typography component="h2" id="who" sx={headingStyle}>
          Who May Use Continuia
        </Typography>
        <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
          <b>Patients and Families:</b> You must be of legal age in your jurisdiction (typically 18 years or older), or a legal guardian authorized to act on behalf of a minor or dependent. You must be capable of providing informed consent and responsible for ensuring the accuracy of the medical information submitted. This includes details about your symptoms, history, test results, and the questions you wish to explore.
          <br />
          <br />
          <b>Clinicians:</b> If you are engaging with Continuia as a physician or specialist, you must hold a valid and current license in your jurisdiction and be in good standing with your local medical board. You agree to provide second opinions within Continuia’s ethical framework, without directly treating or prescribing, and to follow documentation, consent validation, and turnaround guidelines.
          <br />
          <br />
          <b>Institutions and Partners:</b> Organizations working with Continuia to provide clinical oversight, medical review, or patient access must be formally authorized to represent their patient base. Institutional users are responsible for ensuring compliance with local regulatory bodies and for protecting patient data submitted through our platform.
        </Typography>
      </Box>
      <Divider sx={{ mb: "var(--space-8)" }} />
    </>
  );
};
export default WhoMayUseSection;
