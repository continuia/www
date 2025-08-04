import { Box, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
// import heroIllustration from "../../assets/ai_assisted_patient_intake.webp";
import type { Variants } from "framer-motion";

const fadeLeft: Variants = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.98, type: "spring", stiffness: 58, damping: 18 },
  },
};
// const fadeImage: Variants = {
//   hidden: { opacity: 0, scale: 0.965 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 1,
//       type: "spring",
//       stiffness: 42,
//       damping: 23,
//       delay: 0.14,
//     },
//   },
// };
const MotionBox = motion(Box);
// const MotionPaper = motion(Paper);

const HeroSection = () => (
  <Box
    sx={{
      width: "100vw",
      maxWidth: "100vw",
      minHeight: { xs: "80vh", md: "66vh" },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      background: {
        xs: "none",
        md: "linear-gradient(120deg, var(--primary-50) 20%, var(--primary-200) 100%)",
      },
      borderRadius: { sx: "2rem" },
      boxShadow: { md: "0 4px 32px 0 var(--neutral-300)" },
      overflow: "hidden",
      position: "relative",
    }}
  >
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="stretch"
      justifyContent="center"
      width="100vw"
      maxWidth="100vw"
      minHeight="inherit"
      spacing={0}
      p={2}
    >
      {/* Left: Main Content */}
      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.09 }}
        variants={fadeLeft}
        sx={{
          flex: 1,
          minWidth: 0,
          width: { xs: "100%", md: "50vw" },
          p: { xs: 3, md: 9 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: { md: "50vw" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: {
              xs: "1.95rem",
              sm: "2.3rem",
              md: "2.85rem",
              lg: "3.5rem",
            }, // Big!
            mb: 1.3,
            color: "var(--primary-800)",
            lineHeight: 1.13,
            letterSpacing: "-1.3px",
            textShadow: "0 2px 8px var(--primary-50)",
          }}
        >
          About Continuia
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "var(--primary-700)",
            fontWeight: 700,
            fontSize: {
              xs: "1.18rem",
              sm: "1.35rem",
              md: "1.55rem",
              lg: "2rem",
            },
            mb: 1.5,
            lineHeight: 1.22,
          }}
        >
          Your care, continued.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            fontSize: { xs: "1.12rem", sm: "1.2rem", md: "1.27rem" },
            mb: 3,
            maxWidth: { xs: 440, md: "unset" },
            lineHeight: 1.65,
          }}
        >
          Our vision, mission, and unwavering commitment&nbsp;to ethical AI in
          healthcare
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.3}
          sx={{ mb: 1.2 }}
        >
          <Button
            variant="contained"
            sx={{
              background: "var(--primary-600)",
              color: "var(--text-inverse)",
              fontWeight: 800,
              px: 3.2,
              py: 1.08,
              borderRadius: "15px",
              fontSize: { xs: "1.12rem", md: "1.21rem" },
              boxShadow: "0 2px 12px 0 var(--primary-200)",
              textTransform: "none",
              "&:hover": { background: "var(--primary-700)" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Learn More
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "var(--primary-700)",
              borderColor: "var(--primary-300)",
              fontWeight: 700,
              px: 3.2,
              py: 1.08,
              fontSize: { xs: "1.09rem", md: "1.17rem" },
              borderRadius: "15px",
              background: "var(--bg-primary)",
              textTransform: "none",
              "&:hover": {
                borderColor: "var(--primary-500)",
                background: "var(--primary-50)",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Our Services
          </Button>
        </Stack>
      </MotionBox>

      {/* Right: Illustration Card, perfectly 50% width and 100% height */}
      {/* <MotionPaper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.11 }}
        variants={fadeImage}
        elevation={7}
        sx={{
          flex: 1,
          width: { xs: "100%", md: "50vw" },
          maxWidth: { md: "50vw" },
          minHeight: { xs: 220, md: "100%" },
          p: 2,
          background: "var(--bg-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: { xs: 0, md: "2rem" },
          boxShadow: { md: "0 10px 38px 0 var(--primary-100)" },
        }}
      >
        <Box
          component="img"
          src={heroIllustration}
          alt="About Continuia"
          sx={{
            width: "100%",
            height: { xs: 220, sm: 295, md: "100%" },
            minHeight: { xs: 180, sm: 220, md: "100%" },
            maxHeight: { md: "calc(80vh - 4rem)" },
            objectFit: "cover",
            borderRadius: { xs: 0, md: "1.55rem" },
            boxShadow: "0 4px 22px 0 var(--primary-50)",
            display: "block",
            position: "relative",
          }}
        />
      </MotionPaper> */}
    </Stack>
  </Box>
);

export default HeroSection;
