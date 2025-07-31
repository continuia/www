import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp"; // <-- Import your image

const features = [
  "Board-certified specialists",
  "AI-enhanced analysis",
  "Global expertise",
];

const HeroSection = () => (
  <Box
    sx={{
      minHeight: { xs: "80vh", md: "70vh" },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      m: { xs: 1, md: 2 },
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 6, md: 10 },
      background: `linear-gradient(360deg, var(--primary-300) 0%, var(--primary-50) 100%)`,
      borderRadius: { xs: 0, md: "2rem" },
      boxShadow: "0 4px 32px 0 var(--shadow-md, var(--primary-800))",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={6}
      sx={{ width: "100%" }}
    >
      {/* Left: Text Content */}
      <Box flex={1} sx={{ maxWidth: 650 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 1,
            mb: 1,
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            color: "var(--neutral-700, #334155)",
            display: "flex",
            alignItems: "center",
          }}
        >
          🎉 15,000+ Happy Customers
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.8rem" }, // Bigger
            mb: 2,
            lineHeight: 1.08,
            letterSpacing: "-1px",
            // Gradient text styles using neutral and primary
            background:
              "linear-gradient(90deg, var(--neutral-800), var(--primary-800))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          }}
        >
          When Medical Decisions
          <br />
          Matter Most
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "var(--primary-800, #4c1d95)",
            fontWeight: 400,
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Bigger
            maxWidth: 600,
          }}
        >
          Every patient deserves confidence in their care. Our AI-powered
          platform connects you with world-class specialists who provide expert
          second opinions, ensuring you make informed decisions about your
          health journey.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
          <Button
            variant="contained"
            size="large"
            startIcon={<LocalHospitalIcon />}
            sx={{
              background: "var(--primary-600, #6d28d9)",
              color: "var(--text-inverse, #fff)",
              fontWeight: 700,
              px: 3,
              py: 1.7,
              fontSize: "1.15rem", // Bigger
              borderRadius: "14px",
              boxShadow: "0 2px 12px 0 rgba(124,58,237,0.10)",
              textTransform: "none",
              "&:hover": {
                background: "var(--primary-700, #5b21b6)",
              },
            }}
          >
            Get Expert Opinion
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "var(--primary-700, #7c3aed)",
              borderColor: "var(--primary-300, #d8b4fe)",
              fontWeight: 700,
              px: 3,
              py: 1.7,
              fontSize: "1.15rem", // Bigger
              borderRadius: "14px",
              background: "#fff",
              textTransform: "none",
              "&:hover": {
                borderColor: "var(--primary-500, #a78bfa)",
                background: "var(--primary-50, #f5f3ff)",
              },
            }}
          >
            Learn How It Works
          </Button>
        </Stack>
        <Stack direction="row" spacing={3} mt={2} flexWrap="wrap">
          {features.map((feature) => (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              key={feature}
            >
              <CheckCircleIcon
                sx={{ color: "var(--neutral-800, #64748b)", fontSize: 20 }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "var(--primary-800, #4c1d95)",
                  fontWeight: 500,
                  fontSize: { xs: "0.98rem", sm: "1.05rem" },
                  whiteSpace: "nowrap",
                }}
              >
                {feature}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
      {/* Right: Illustration */}
      <Box flex={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: "2rem",
            p: 2,
            background: "var(--bg-primary, #fff)",
            boxShadow: "0 8px 32px 0 rgba(124,58,237,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 500, // Bigger
            width: "100%",
          }}
        >
          <Box
            component="img"
            src={heroIllustration}
            alt="Medical consultation"
            sx={{
              width: "100%",
              maxWidth: 440, // Bigger
              borderRadius: "1.5rem",
              objectFit: "cover",
            }}
          />
        </Paper>
      </Box>
    </Stack>
  </Box>
);

export default HeroSection;
