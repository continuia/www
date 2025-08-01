import React from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import InsightsIcon from "@mui/icons-material/Insights";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp";
import ShareYOurStory from "../../assets/share_your_story.webp"
const MotionBox = motion(Box);

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 20,
      duration: 0.7,
      // delay will be overridden dynamically
    },
  },
};
const JourneySteps: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        background:
          "linear-gradient(110deg, var(--primary-50) 0%, var(--bg-secondary) 100%)",
        py: { xs: 5, md: 10 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          mx: "auto",
          textAlign: "center",
          mb: { xs: 5, md: 7 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "var(--primary-700)",
            fontWeight: 900,
            mb: 2,
            background:
              "linear-gradient(90deg, var(--primary-400) 0%, var(--primary-700) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: 1.2,
            userSelect: "none",
            fontSize: { xs: "2rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          Your Journey to Expert Medical Guidance
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "var(--text-secondary)",
            mb: 1.5,
            fontWeight: 500,
            maxWidth: 500,
            mx: "auto",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.15rem" },
          }}
        >
          Each step is designed for <b>clarity, comfort, and confidence</b>—no
          medical jargon or confusion.
        </Typography>
      </Box>

      <Stack spacing={isMobile ? 5 : 10}>
        {/* Step 1 */}
        <MotionBox
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeInVariants}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "stretch",
            gap: { xs: 2, sm: 4 },
            mb: isMobile ? 2.5 : 0,
          }}
        >
          {/* Content Card */}
          <Paper
            elevation={4}
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",

              p: { xs: 3, md: 5 },
              borderRadius: "var(--radius-2xl)",
              bgcolor: "var(--bg-primary)",
              boxShadow: "var(--shadow-lg)",
              mx: isMobile ? "auto" : 0,
              mb: isMobile ? 3 : 0,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} mb={2.5}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "var(--primary-100)",
                  border: "3px solid var(--primary-200)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 14px 0 var(--primary-200)",
                  position: "relative",
                }}
              >
                <VerifiedUserIcon
                  sx={{ fontSize: 44, color: "var(--primary-600)" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: -12,
                    left: -10,
                    bgcolor: "var(--primary-500)",
                    color: "var(--text-inverse)",
                    borderRadius: "var(--radius-full)",
                    px: 1,
                    py: "1px",
                    fontWeight: 700,
                    fontSize: 13,
                    boxShadow: "0 2px 8px 0 rgba(140,93,247,0.11)",
                    minWidth: 24,
                    textAlign: "center",
                    userSelect: "none",
                  }}
                >
                  01
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--primary-900)",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    fontSize: { xs: "1.15rem", md: "1.28rem" },
                  }}
                >
                  Share Your Story
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                    opacity: 0.92,
                    mt: 0.5,
                    fontSize: "1.08rem",
                  }}
                >
                  Secure, confidential, comprehensive
                </Typography>
              </Box>
            </Stack>
            <Box
              sx={{
                color: "var(--text-primary)",
                fontSize: "1.05rem",
                mb: 1.5,
                lineHeight: 1.7,
              }}
            >
              Begin by sharing your medical journey with us. Our secure,
              HIPAA-compliant platform makes it easy to upload your medical
              records, test results, and current diagnosis. Our AI system
              intelligently organizes your information, ensuring nothing
              important is overlooked.
            </Box>
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              <Chip
                key="hipaa"
                size="medium"
                label="HIPAA Secure"
                sx={{
                  bgcolor: "var(--primary-100)",
                  color: "var(--primary-700)",
                }}
              />
              <Chip
                key="ai"
                size="medium"
                label="AI Organized"
                sx={{
                  bgcolor: "var(--primary-50)",
                  color: "var(--primary-600)",
                  ml: 1,
                }}
              />
            </Stack>
          </Paper>
          {/* Illustration */}
          <MotionBox
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 24px -8px var(--primary-400)",
            }}
            sx={{
              flex: 1,
              minWidth: { xs: "40%" },
              maxWidth: 260,
              height: { xs: "50%" },
              bgcolor: "var(--primary-50)",
              borderRadius: 3.5,
              overflow: "hidden",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid var(--primary-200)",
              boxShadow: "-14px 6px 32px 0 rgba(168,139,250,0.08)",
              mx: "auto",
              mt: isMobile ? 1 : 0,
            }}
          >
            <img
              src={ShareYOurStory}
              alt="Step illustration"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </MotionBox>
        </MotionBox>

        {/* Step 2 */}
        <MotionBox
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeInVariants}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row-reverse",
            alignItems: "stretch",
            width: "100%",
            gap: { xs: 2, sm: 4 },
            mb: isMobile ? 2.5 : 0,
          }}
        >
          {/* Content Card */}
          <Paper
            elevation={4}
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 3, md: 5 },
              borderRadius: "var(--radius-2xl)",
              bgcolor: "var(--bg-primary)",
              boxShadow: "var(--shadow-lg)",
              mx: isMobile ? "auto" : 0,
              mb: isMobile ? 3 : 0,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} mb={2.5}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "var(--primary-100)",
                  border: "3px solid var(--primary-200)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 14px 0 var(--primary-200)",
                  position: "relative",
                }}
              >
                <MedicalServicesIcon
                  sx={{ fontSize: 44, color: "var(--primary-600)" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: -12,
                    left: -10,
                    bgcolor: "var(--primary-500)",
                    color: "var(--text-inverse)",
                    borderRadius: "var(--radius-full)",
                    px: 1,
                    py: "1px",
                    fontWeight: 700,
                    fontSize: 13,
                    boxShadow: "0 2px 8px 0 rgba(140,93,247,0.11)",
                    minWidth: 24,
                    textAlign: "center",
                    userSelect: "none",
                  }}
                >
                  02
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--primary-900)",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    fontSize: { xs: "1.15rem", md: "1.28rem" },
                  }}
                >
                  Expert Analysis
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                    opacity: 0.92,
                    mt: 0.5,
                    fontSize: "1.08rem",
                  }}
                >
                  Board-certified specialists review your case
                </Typography>
              </Box>
            </Stack>
            <Box
              sx={{
                color: "var(--text-primary)",
                fontSize: "1.05rem",
                mb: 1.5,
                lineHeight: 1.7,
              }}
            >
              Your case is carefully matched with board-certified specialists
              who have deep expertise in your specific condition. They conduct a
              thorough review, analyzing your medical history, current symptoms,
              and treatment options with fresh perspective and cutting-edge
              knowledge.
              <ul
                style={{
                  margin: "0.5rem 0 0 1.25rem",
                  color: "var(--text-secondary)",
                  fontSize: "0.97rem",
                  lineHeight: 1.6,
                }}
              >
                <li>Board-certified specialists in your condition area</li>
                <li>Comprehensive analysis of all available data</li>
                <li>Fresh perspective on treatment alternatives</li>
              </ul>
            </Box>
          </Paper>
          {/* Illustration */}
          <MotionBox
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 24px -8px var(--primary-400)",
            }}
            sx={{
              flex: 1,
              minWidth: { xs: "40%" },
              maxWidth: 260,
              height: { xs: "50%" },
              bgcolor: "var(--primary-50)",
              borderRadius: 3.5,
              overflow: "hidden",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid var(--primary-200)",
              boxShadow: "14px 6px 32px 0 rgba(168,139,250,0.08)",
              mx: "auto",
              mt: isMobile ? 1 : 0,
            }}
          >
            <img
              src={heroIllustration}
              alt="Step illustration"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </MotionBox>
        </MotionBox>

        {/* Step 3 (with custom highlight on 72hrs) */}
        <MotionBox
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeInVariants}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "stretch",
            width: "100%",
            gap: { xs: 2, sm: 4 },
          }}
        >
          {/* Content Card */}
          <Paper
            elevation={4}
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: 0,
              p: { xs: 3, md: 5 },
              borderRadius: "var(--radius-2xl)",
              bgcolor: "var(--bg-primary)",
              boxShadow: "var(--shadow-lg)",
              mx: isMobile ? "auto" : 0,
              mb: isMobile ? 3 : 0,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} mb={2.5}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "var(--primary-100)",
                  border: "3px solid var(--primary-200)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 14px 0 var(--primary-200)",
                  position: "relative",
                }}
              >
                <InsightsIcon
                  sx={{ fontSize: 44, color: "var(--primary-600)" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: -12,
                    left: -10,
                    bgcolor: "var(--primary-500)",
                    color: "var(--text-inverse)",
                    borderRadius: "var(--radius-full)",
                    px: 1,
                    py: "1px",
                    fontWeight: 700,
                    fontSize: 13,
                    boxShadow: "0 2px 8px 0 rgba(140,93,247,0.11)",
                    minWidth: 24,
                    textAlign: "center",
                    userSelect: "none",
                  }}
                >
                  03
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--primary-900)",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    fontSize: { xs: "1.15rem", md: "1.28rem" },
                  }}
                >
                  Continuia Insights
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                    opacity: 0.92,
                    mt: 0.5,
                    fontSize: "1.08rem",
                  }}
                >
                  Actionable recommendations you can understand
                </Typography>
              </Box>
            </Stack>
            <Box
              sx={{
                color: "var(--text-primary)",
                fontSize: "1.05rem",
                mb: 1.5,
                lineHeight: 1.7,
              }}
            >
              Receive a comprehensive report written in clear, understandable
              language. We translate complex medical terminology into actionable
              insights, giving you the confidence to discuss options with your
              primary care team and make informed decisions about your health.
              <Box
                sx={{
                  bgcolor: "var(--bg-tertiary)",
                  borderRadius: "var(--radius-lg)",
                  p: 1.5,
                  mt: 2,
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.25rem",
                    color: "var(--text-secondary)",
                    fontSize: "0.97rem",
                    lineHeight: 1.6,
                  }}
                >
                  <li>Clear explanation of your condition and diagnosis</li>
                  <li>Alternative treatment options and their benefits</li>
                  <li>Questions to discuss with your primary doctor</li>
                  <li>Next steps and recommended timeline</li>
                </ul>
              </Box>
              <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                <QueryBuilderIcon
                  sx={{ color: "var(--primary-500)", fontSize: 23 }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "var(--primary-700)",
                    fontWeight: 700,
                    px: 1.1,
                    fontSize: "1.15rem",
                    borderRadius: 1.5,
                    bgcolor: "var(--primary-100)",
                    boxShadow: "0 1px 7px 0 var(--primary-200)",
                  }}
                >
                  {/* Custom highlight for 72hrs */}
                  72hrs
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  Average delivery
                </Typography>
              </Stack>
            </Box>
          </Paper>
          {/* Illustration */}
          <MotionBox
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 24px -8px var(--primary-400)",
            }}
            sx={{
              flex: 1,
              minWidth: { xs: "40%" },
              maxWidth: 260,
              height: { xs: "50%" },
              bgcolor: "var(--primary-50)",
              borderRadius: 3.5,
              overflow: "hidden",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid var(--primary-200)",
              boxShadow: "-14px 6px 32px 0 rgba(168,139,250,0.08)",
              mx: "auto",
              mt: isMobile ? 1 : 0,
            }}
          >
            <img
              src={heroIllustration}
              alt="Step illustration"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </MotionBox>
        </MotionBox>
      </Stack>
    </Box>
  );
};

export default JourneySteps;
