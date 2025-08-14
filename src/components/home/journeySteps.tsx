import React from "react";
import { Box, Typography, Stack, Chip, useMediaQuery, useTheme, Paper } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import InsightsIcon from "@mui/icons-material/Insights";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image1 from "../../assets/home/img1.webp";
import Image2 from "../../assets/home/img2.webp";
import Image3 from "../../assets/home/img3.webp";

const MotionBox = motion.create(Box);

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 0.3,
    },
  },
};

const steps = [
  {
    num: "01",
    icon: <VerifiedUserIcon sx={{ fontSize: "var(--text-5xl)", color: "var(--primary-600)" }} />,
    title: "Share Your Story",
    subtitle: "Secure, confidential, comprehensive",
    desc: <>Begin by sharing your medical journey with us. Our secure, HIPAA-compliant platform makes it easy to upload your medical records, test results, and current diagnosis. Our AI system intelligently organizes your information, ensuring nothing important is overlooked.</>,
    chips: [
      { label: "HIPAA Secure", sx: { bgcolor: "var(--primary-100)", color: "var(--primary-700)" } },
      { label: "AI Organized", sx: { bgcolor: "var(--primary-50)", color: "var(--primary-600)" } },
    ],
    img: Image1,
    imgAlt: "Share your story",
  },
  {
    num: "02",
    icon: <MedicalServicesIcon sx={{ fontSize: "var(--text-5xl)", color: "var(--primary-600)" }} />,
    title: "Expert Analysis",
    subtitle: "Board-certified specialists review your case",
    desc: (
      <>
        Your case is carefully matched with board-certified specialists who have deep expertise in your specific condition. They conduct a thorough review, analyzing your medical history, current symptoms, and treatment options with fresh perspective and cutting-edge knowledge.
        <ul
          style={{
            margin: "var(--space-2) 0 0 var(--space-6)",
            color: "var(--text-secondary)",
            fontSize: "var(--text-lg)",
            lineHeight: "var(--leading-normal)",
            padding: 0,
          }}
        >
          <li>Board-certified specialists in your condition area</li>
          <li>Comprehensive analysis of all available data</li>
          <li>Fresh perspective on treatment alternatives</li>
        </ul>
      </>
    ),
    img: Image2,
    imgAlt: "expert Analysis",
  },
  {
    num: "03",
    icon: <InsightsIcon sx={{ fontSize: "var(--text-5xl)", color: "var(--primary-600)" }} />,
    title: "Continuia Insights",
    subtitle: "Actionable recommendations you can understand",
    desc: (
      <>
        Receive a comprehensive report written in clear, understandable language. We translate complex medical terminology into actionable insights, giving you the confidence to discuss options with your primary care team and make informed decisions about your health.
        <Box
          sx={{
            bgcolor: "var(--bg-tertiary)",
            borderRadius: "var(--radius-lg)",
            p: "var(--space-2)",
            mt: "var(--space-2)",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <ul
            style={{
              margin: 0,
              paddingLeft: "var(--space-6)",
              color: "var(--text-secondary)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-normal)",
              padding: 0,
            }}
          >
            <li>Clear explanation of your condition and diagnosis</li>
            <li>Alternative treatment options and their benefits</li>
            <li>Questions to discuss with your primary doctor</li>
            <li>Next steps and recommended timeline</li>
          </ul>
        </Box>
        <Stack direction="row" spacing={"var(--space-1)"} alignItems="center" mt={"var(--space-2)"}>
          <QueryBuilderIcon sx={{ color: "var(--primary-500)", fontSize: "var(--text-xl)" }} />
          <Typography
            variant="subtitle2"
            sx={{
              color: "var(--primary-700)",
              fontWeight: 700,
              px: "var(--space-2)",
              fontSize: "var(--text-xl)",
              borderRadius: "var(--radius-lg)",
              bgcolor: "var(--primary-100)",
              boxShadow: "var(--shadow-xs)",
            }}
          >
            72hrs
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "var(--text-md)",
              color: "var(--text-secondary)",
              fontWeight: 500,
              ml: "var(--space-1)",
            }}
          >
            Average delivery
          </Typography>
        </Stack>
      </>
    ),
    img: Image3,
    imgAlt: "Continuia Insights laptop",
  },
];

const JourneySteps: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        background: "linear-gradient(110deg, var(--primary-50) 0%, var(--bg-secondary) 100%)",
        py: { xs: "var(--space-10)", md: "var(--space-24)" },
        px: { xs: "var(--space-2)", md: "var(--space-8)" },
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          mx: "auto",
          textAlign: "center",
          mb: { xs: "var(--space-10)", md: "var(--space-16)" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "var(--primary-700)",
            fontWeight: 900,
            mb: "var(--space-2)",
            background: "linear-gradient(90deg, var(--primary-400) 0%, var(--primary-700) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: ".04em",
            userSelect: "none",
            fontSize: { xs: "var(--text-3xl)", sm: "var(--text-4xl)", md: "var(--text-5xl)" },
          }}
        >
          Your Journey to Expert Medical Guidance
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "var(--text-secondary)",
            mb: "var(--space-4)",
            fontWeight: 500,
            maxWidth: 500,
            mx: "auto",
            fontSize: { xs: "var(--text-base)", sm: "var(--text-lg)", md: "var(--text-xl)" },
          }}
        >
          Each step is designed for <b>clarity, comfort, and confidence</b> no medical jargon or confusion.
        </Typography>
      </Box>

      <Stack spacing={isMobile ? "var(--space-10)" : "var(--space-20)"}>
        {steps.map((step, idx) => {
          const reverse = idx === 1 && !isMobile;
          return (
            <MotionBox
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInVariants}
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : reverse ? "row-reverse" : "row",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: "var(--space-4)", sm: "var(--space-8)" },
                mb: isMobile ? "var(--space-4)" : 0,
                width: "100%",
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  flex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: "var(--space-6)", md: "var(--space-12)" },
                  borderRadius: "var(--radius-2xl)",
                  bgcolor: "var(--bg-primary)",
                  boxShadow: "var(--shadow-lg)",
                  mx: isMobile ? "auto" : 0,
                  mb: isMobile ? "var(--space-6)" : 0,
                  minWidth: 0,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={"var(--space-4)"} mb={"var(--space-5)"}>
                  <Box
                    sx={{
                      width: "calc(var(--space-12) + var(--space-4))",
                      height: "calc(var(--space-12) + var(--space-4))",
                      borderRadius: "var(--radius-full)",
                      bgcolor: "var(--primary-100)",
                      border: "3px solid var(--primary-200)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 3px 14px 0 var(--primary-200)",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    {step.icon}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-1.5rem",
                        left: "-1.2rem",
                        bgcolor: "var(--primary-500)",
                        color: "var(--text-inverse)",
                        borderRadius: "var(--radius-full)",
                        px: "var(--space-2)",
                        py: "var(--space-px)",
                        fontWeight: 700,
                        fontSize: "var(--text-base)",
                        boxShadow: "0 2px 8px 0 rgba(140,93,247,0.11)",
                        minWidth: "var(--space-8)",
                        textAlign: "center",
                        userSelect: "none",
                        zIndex: 1,
                      }}
                    >
                      {step.num}
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "var(--primary-900)",
                        fontWeight: 800,
                        lineHeight: "var(--leading-tight)",
                        fontSize: { xs: "var(--text-lg)", md: "var(--text-2xl)" },
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--text-secondary)",
                        fontWeight: 500,
                        opacity: 0.92,
                        mt: "var(--space-px)",
                        fontSize: "var(--text-lg)",
                      }}
                    >
                      {step.subtitle}
                    </Typography>
                  </Box>
                </Stack>
                <Box
                  sx={{
                    color: "var(--text-primary)",
                    fontSize: "var(--text-lg)",
                    mb: "var(--space-3)",
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  {step.desc}
                </Box>
                {step.chips && (
                  <Stack direction="row" spacing={"var(--space-2)"} mt={"var(--space-2)"} flexWrap="wrap">
                    {step.chips.map((chip) => (
                      <Chip key={chip.label} size="medium" label={chip.label} sx={chip.sx} />
                    ))}
                  </Stack>
                )}
              </Paper>
              <MotionBox
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 24px -8px var(--primary-400)",
                }}
                sx={{
                  flex: 1,
                  width: { xs: "40%" },
                  height: { xs: "50%" },
                  bgcolor: "var(--primary-50)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  border: "3px solid var(--primary-200)",
                  boxShadow: idx % 2 === 1 ? "14px 6px 32px 0 rgba(168,139,250,0.08)" : "-14px 6px 32px 0 rgba(168,139,250,0.08)",
                  mx: "auto",
                  mt: isMobile ? "var(--space-2)" : 0,
                  maxWidth: { xs: "100%", md: 500, lg: 650 },
                }}
              >
                <img
                  src={step.img}
                  alt={step.imgAlt}
                  style={{
                    aspectRatio: "3/2",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </MotionBox>
            </MotionBox>
          );
        })}
      </Stack>
    </Box>
  );
};

export default JourneySteps;
