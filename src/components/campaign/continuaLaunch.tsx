import { Box, Typography, Paper } from "@mui/material";

export default function ContinuaLaunch() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "var(--primary-600)",
        background:
          "linear-gradient(120deg, var(--primary-800), var(--primary-400) 80%)",
        color: "var(--text-inverse)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: "var(--space-2)", md: "var(--space-16)" },
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          w: "100%",
          py: "var(--space-16)",
          mb: "var(--space-10)",
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
          This is Continia's global launch
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

      <Paper
        elevation={3}
        sx={{
          minWidth: 320,
          maxWidth: 420,
          width: "100%",
          px: { xs: "var(--space-4)", md: "var(--space-10)" },
          py: { xs: "var(--space-8)", md: "var(--space-12)" },
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "var(--text-primary)",
            mb: "var(--space-4)",
            textAlign: "center",
          }}
        >
          Join the Initiative
        </Typography>
        {/* TODO: Add your form here */}
        <Box sx={{ minHeight: 220, width: "100%" }} />
      </Paper>
    </Box>
  );
}
