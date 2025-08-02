import { Box, Typography } from "@mui/material";
import ContactForm from "./form";

export default function ContinuaLaunch() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--primary-600)",
        background:
          "linear-gradient(120deg, var(--primary-800), var(--primary-400) 80%)",
        color: "var(--text-inverse)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: "var(--space-2)", md: "var(--space-16)" },
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          w: "100%",
          py: "var(--space-16)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.3rem" },
            mb: "var(--space-4)",
            color: "var(--text-inverse)",
          }}
        >
          This is Continuia's global launch
        </Typography>
        <Typography
          sx={{
            color: "var(--text-inverse)",
            fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
            mb: "var(--space-6)",
          }}
        >
          And you're being invited at the very start.
        </Typography>
        <Typography sx={{ color: "var(--text-inverse)", mb: "var(--space-1)" }}>
          This isn't per-click medicine.
          <br />
          This isn't triage by template.
          <br />
          This is the future of second opinions.
        </Typography>
        <Typography
          sx={{
            color: "var(--text-inverse)",
            mt: "var(--space-4)",
            fontWeight: 500,
          }}
        >
          Your voice doesn't just fill a role.
          <br />
          It helps define what the role should be.
        </Typography>
      </Box>
      <ContactForm />
    </Box>
  );
}
