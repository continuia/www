import { AppBar, Box, Toolbar, Button, Typography, Fade, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "For Patients", href: "/#patients" },
  { label: "For Hospitals", href: "/#hospitals" },
  { label: "Specialists", href: "/#specialists" },
  { label: "About", href: "/#about" },
];

const Header = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  // For demo, "Home" is active. In a real app, use router location.
  const activeLink = "Home";

  return (
    <Fade in={show} timeout={700}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "var(--bg-primary, #f8fafc)",
          color: "var(--text-primary, #22223b)",
          boxShadow: "none",
          borderBottom: "none",
          py: 1,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: "56px", sm: "72px" },
            px: { xs: 2, sm: 6 },
            background: "transparent",
          }}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              component="img"
              src="/continuia.webp"
              alt="Continuia Logo"
              sx={{ height: 36, width: 36, mr: 1 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "var(--primary-700, #7c3aed)",
                letterSpacing: 1,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Continuia
            </Typography>
          </Box>

          {/* Navigation Links in pill-shaped Paper */}
          <Paper
            elevation={2}
            sx={{
              display: { xs: "none", sm: "flex" },
              borderRadius: "999px",
              background: "#fff",
              px: 1,
              py: 0.5,
              boxShadow: "0 2px 12px 0 rgba(124,58,237,0.06)",
              gap: 1,
            }}
          >
            {navLinks.map((link) => {
              const isActive = link.label === activeLink;
              return (
                <Button
                  key={link.label}
                  href={link.href}
                  disableRipple
                  sx={{
                    textTransform: "none",
                    color: isActive
                      ? "#fff"
                      : "var(--neutral-500)",
                    background: isActive
                      ? "linear-gradient(90deg, var(--primary-600, #a78bfa), var(--primary-400, #7c3aed))"
                      : "transparent",
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: "999px",
                    px: 2.5,
                    py: 1,
                    minWidth: 0,
                    boxShadow: isActive
                      ? "0 5px 15px 0 rgba(124,58,237,0.10)"
                      : "none",
                    transition: "background 0.2s, color 0.2s",
                    "&:hover": {
                      background: isActive
                        ? "linear-gradient(90deg, var(--primary-400, #c7d2fe), var(--primary-500, #a78bfa))"
                        : "rgba(124,58,237,0.08)",
                    },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Paper>

          {/* Contact Us Button */}
          <Button
            variant="contained"
            href="#get-started"
            sx={{
              background: "#18181b",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "999px",
              px: 3,
              py: 1.2,
              fontSize: "1rem",
              boxShadow: "0 2px 8px 0 rgba(24,24,27,0.10)",
              textTransform: "none",
              "&:hover": {
                background: "#27272a",
              },
              display: { xs: "none", sm: "inline-flex" },
            }}
            endIcon={
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  ml: 0.5,
                  fontSize: "1.2em",
                  lineHeight: 1,
                }}
              >
                &rarr;
              </Box>
            }
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

export default Header;
