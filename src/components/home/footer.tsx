import { Box, Container, Stack, Typography, IconButton, Tooltip, Link as MuiLink } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const socialLinks = [
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/continuia",
  },
  // { icon: <XIcon />, label: "X", href: "https://x.com" },
  {
    icon: <FacebookIcon />,
    label: "Facebook",
    href: "https://www.facebook.com/continuia",
  },
  {
    icon: <InstagramIcon />,
    label: "Instagram",
    href: "https://www.instagram.com/continuia/",
  },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "var(--bg-secondary)",
        color: "var(--text-secondary)",
        borderTop: "1px solid var(--border-light)",
        py: 4,
        width: "100%", // Not 100vw
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={{ xs: 2, sm: 3 }}
        >
          {/* Logo and Brand */}
          <Stack order={0} direction="row" alignItems="center" spacing={1.5} mb={{ xs: 1, sm: 0 }}>
            <Box
              component="img"
              src="/continuia.webp"
              alt="Continuia Logo"
              sx={{ height: { xs: 28, sm: 32 }, width: { xs: 28, sm: 32 } }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "var(--primary-700)",
                letterSpacing: 1,
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              Continuia
            </Typography>
          </Stack>

          {/* Terms and Copyright (center) */}
          <Stack
            order={{ xs: 2, sm: 1 }}
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{
              width: { xs: "100%", sm: "auto" },
              textAlign: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "var(--text-muted)",
                fontSize: { xs: "0.75rem", sm: "0.9rem" },
              }}
            >
              © {new Date().getFullYear()} Continuia. All rights reserved.
            </Typography>
            <MuiLink
              href="/terms-of-serivce"
              underline="hover"
              sx={{
                color: "var(--primary-600)",
                fontWeight: 500,
                fontSize: { xs: "0.75rem", sm: "0.9rem" },
                ml: { xs: 0, sm: 2 },
                mt: { xs: 0.5, sm: 0 },
                transition: "color var(--transition-normal)",
                "&:hover": {
                  color: "var(--primary-700)"
                },
              }}
            >
              Terms Of Service
            </MuiLink>
          </Stack>

          {/* Social icons */}
          <Stack order={{ xs: 1, sm: 2 }} spacing={1} alignItems={{ xs: "flex-start", sm: "flex-end" }}>
            <Stack direction="row" spacing={1} mb={0.5}>
              {socialLinks.map((social) => (
                <Tooltip title={social.label} key={social.label}>
                  <IconButton
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "var(--text-tertiary)",
                      transition: "color var(--transition-normal), background var(--transition-normal)",
                      "&:hover": {
                        color: "var(--primary-600)",
                        background: "var(--primary-50)",
                      },
                      p: { xs: 0.5, sm: 1 },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
