import { Box, Typography } from "@mui/material";

export default function AboutContinua() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--bg-primary)",
        py: { xs: "var(--space-16)", md: "var(--space-24)" },
        px: { xs: "var(--space-4)", md: "var(--space-16)" },
        minHeight: 240,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "var(--primary-900)",
          mb: "var(--space-3)",
        }}
      >
        About Continui​a
      </Typography>
      <Typography
        sx={{
          color: "var(--primary-700)",
          fontWeight: 500,
          fontSize: "var(--text-lg)",
          mb: "var(--space-5)",
        }}
      >
        Your care, continued.
      </Typography>
      <Typography
        sx={{
          color: "var(--primary-900)",
          fontSize: "var(--text-base)",
        }}
      >
        Our vision, mission, and unwavering commitment to ethical AI in healthcare
      </Typography>
    </Box>
  );
}
