import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import InsightsIcon from "@mui/icons-material/Insights";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { motion } from "framer-motion";
import heroDoctorImage from "../../assets/continuia_clinical_governance.webp";
import continuia_doctor_team from "../../assets/continuia_doctor_team.webp";

// import { useTheme, useMediaQuery } from "@mui/material";

// Animation variant for fade-in
const fadeIn = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.14,
      type: "spring" as const,
      stiffness: 70,
      damping: 18,
    },
  }),
};

const MotionBox = motion(Box);

const HeroSplitSection: React.FC = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        background:
          "linear-gradient(110deg, var(--primary-50) 0%, var(--bg-secondary) 100%)",
        p: { xs: 2, sm: 4, md: 7 },
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={{ xs: 4 }}
        alignItems="stretch"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        {/* LEFT: Clarity in Care */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
          custom={1}
          sx={{
            flex: 1,
            bgcolor: "var(--bg-primary)",
            borderRadius: "1.7rem",
            boxShadow: "var(--shadow-xl)",
            p: { xs: 3, md: 6 },
            width: { xs: "100%", md: "auto" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "var(--primary-700)",
              fontSize: { xs: "1.5rem", md: "2.15rem" },
              mb: 1.7,
              lineHeight: 1.18,
              letterSpacing: 0.2,
            }}
          >
            When You Need Clarity in Your Care
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              mb: 2.4,
              fontSize: { xs: "1.04rem", md: "1.13rem" },
              maxWidth: 570,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Facing a complex diagnosis or treatment decision can feel
            overwhelming. Our platform connects you with world-renowned
            specialists who provide comprehensive second opinions, giving you
            the confidence to move forward with your care.
          </Typography>

          {/* Feature List */}
          <List
            disablePadding
            dense
            sx={{ mb: 2, width: "100%", maxWidth: 480 }}
          >
            <ListItem sx={{ mb: 0.8, px: 0 }}>
              <ListItemIcon>
                <VerifiedUserIcon
                  sx={{ color: "var(--primary-600)", fontSize: 29 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <b>Expert Specialist Review</b>
                    <Box
                      component="span"
                      sx={{ color: "var(--text-secondary)", fontWeight: 400 }}
                    >
                      {
                        " — Board-certified physicians provide detailed insights and care alternatives."
                      }
                    </Box>
                  </>
                }
              />
            </ListItem>
            <ListItem sx={{ mb: 0.8, px: 0 }}>
              <ListItemIcon>
                <InsightsIcon
                  sx={{ color: "var(--primary-600)", fontSize: 27 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <b>AI-Enhanced Analysis</b>
                    <Box
                      component="span"
                      sx={{ color: "var(--text-secondary)", fontWeight: 400 }}
                    >
                      {" — Advanced AI analyzes your records for key details."}
                    </Box>
                  </>
                }
              />
            </ListItem>
            <ListItem sx={{ mb: 1.2, px: 0 }}>
              <ListItemIcon>
                <MedicalServicesIcon
                  sx={{ color: "var(--primary-600)", fontSize: 27 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <b>Personalized Care Plan</b>
                    <Box
                      component="span"
                      sx={{ color: "var(--text-secondary)", fontWeight: 400 }}
                    >
                      {
                        " — Clear explanations, options, and next steps tailored to you."
                      }
                    </Box>
                  </>
                }
              />
            </ListItem>
          </List>

          {/* CTA buttons */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            mt={1}
            mb={2}
            sx={{ width: "100%", maxWidth: 460 }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "var(--primary-600)",
                color: "var(--text-inverse)",
                fontWeight: 800,
                px: 2,
                py: 1.2,
                borderRadius: 2.3,
                textTransform: "none",
                fontSize: { xs: "1rem", md: "1.13rem" },
                boxShadow: "0 4px 30px 0 var(--primary-200)",
                width: { xs: "100%", md: "auto" },
                mb: { xs: 1.5, md: 0 },
                "&:hover": { bgcolor: "var(--primary-700)" },
              }}
            >
              Start Your Consultation
            </Button>
            <Button
              variant="text"
              sx={{
                color: "var(--primary-700)",
                fontWeight: 700,
                fontSize: { xs: "1rem", md: "1.11rem" },
                textTransform: "none",
                width: { xs: "100%", md: "auto" },
              }}
            >
              View Success Stories
            </Button>
          </Stack>

          {/* Doctor + patient image */}
          <Box
            sx={{
              width: { xs: "100%" },
              height: { md: "auto" },
              borderRadius: 2.8,
              overflow: "hidden",
              boxShadow: "0 9px 28px 0 var(--primary-200)",
              mt: 2.5,
              mx: { xs: "auto", md: 0 },
              /* Add this line: */
              alignSelf: { xs: "center", md: "stretch" },
              // MOST IMPORTANT for sticking at bottom:
              marginTop: "auto", // or mt: "auto" in sx shorthand
            }}
          >
            <img
              src={continuia_doctor_team}
              alt="Doctor with patient"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        </MotionBox>

        {/* RIGHT: Clinical Excellence */}
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
          custom={2}
          sx={{
            flex: 1,
            bgcolor: "var(--bg-primary)",
            borderRadius: "1.6rem",
            boxShadow: "var(--shadow-lg)",
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            width: { xs: "100%", md: "auto" },
            mt: { xs: 4, md: 0 },
          }}
        >
          <Chip
            label="Clinical Governance Active"
            size="small"
            sx={{
              bgcolor: "var(--primary-50)",
              color: "var(--primary-900)",
              fontWeight: 600,
              mb: 1.7,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "var(--primary-700)",
              mb: 1.2,
              fontSize: { xs: "1.24rem", md: "1.41rem" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Elevate Your Clinical Excellence
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              mb: 2.5,
              fontSize: { xs: "1rem", sm: "1.09rem", md: "1.12rem" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Transform your healthcare delivery with our AI-powered clinical
            governance platform. Reduce medical errors, improve patient
            outcomes, and ensure the highest standards of care across your
            institution.
          </Typography>

          <List
            disablePadding
            dense
            sx={{ width: "100%", maxWidth: 480, mb: 1.5 }}
          >
            <ListItem sx={{ px: 0, mb: 0.7 }}>
              <ListItemIcon>
                <QueryBuilderIcon
                  sx={{ color: "var(--primary-600)", fontSize: 23 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <span>
                    <b>Real-Time Quality Monitoring</b>
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontWeight: 400,
                      }}
                    >
                      {" — Alerts for risk, quality improvement, and oversight"}
                    </span>
                  </span>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0, mb: 0.7 }}>
              <ListItemIcon>
                <SupervisorAccountIcon
                  sx={{ color: "var(--primary-600)", fontSize: 24 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <span>
                    <b>Expert Network Access</b>
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontWeight: 400,
                      }}
                    >
                      {" — Consult with leading specialists on complex cases"}
                    </span>
                  </span>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0, mb: 0.8 }}>
              <ListItemIcon>
                <SettingsInputComponentIcon
                  sx={{ color: "var(--primary-600)", fontSize: 23 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <span>
                    <b>Seamless Integration</b>
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontWeight: 400,
                      }}
                    >
                      {" — Syncs with EHRs and clinical workflows"}
                    </span>
                  </span>
                }
              />
            </ListItem>
          </List>
          {/* Call-to-action buttons */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            mt={3}
            sx={{ width: "100%", maxWidth: 460 }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "var(--primary-700)",
                color: "var(--text-inverse)",
                fontWeight: 800,
                px: 2,
                py: 1.12,
                borderRadius: 2,
                textTransform: "none",
                fontSize: { xs: "0.98rem", md: "1.09rem" },
                boxShadow: "0 4px 30px 0 var(--primary-200)",
                width: { xs: "100%", md: "auto" },
                mb: { xs: 1.5, md: 0 },
                "&:hover": { bgcolor: "var(--primary-800)" },
              }}
            >
              Explore Solutions
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "var(--primary-700)",
                borderColor: "var(--primary-300)",
                fontWeight: 700,
                px: 2,
                textTransform: "none",
                fontSize: { xs: "0.98rem", md: "1.09rem" },
                width: { xs: "100%", md: "auto" },
              }}
            >
              Schedule Demo
            </Button>
          </Stack>

          {/* Dashboard image */}
          <Box
            sx={{
              width: { xs: "100%" },
              height: { xs: "auto" },
              borderRadius: 2.2,
              overflow: "hidden",
              boxShadow: "0 7px 24px 0 var(--primary-200)",
              mx: { xs: "auto", md: 0 },
              mt: 3,
              /* Add this line: */
              alignSelf: { xs: "center", md: "stretch" },
              // MOST IMPORTANT for sticking at bottom:
              marginTop: "auto", // or mt: "auto" in sx shorthand
            }}
          >
            <img
              src={heroDoctorImage}
              alt="Clinical Dashboard"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        </MotionBox>
      </Stack>
    </Box>
  );
};

export default HeroSplitSection;
