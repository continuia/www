import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Fade,
  Paper,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

// Navigation links config
const navLinks = [
  { label: "Home", href: "/" },
  { label: "For Patients", href: "/patients" },
  { label: "For Doctors", href: "/hospitals" },
  { label: "Specialists", href: "/specialists" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const [show, setShow] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  // lg === 1200px by default
  const isBelowLg = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    setShow(true);
  }, []);

  // Closing menu on navigation link
  const handleDrawerNav = () => setDrawerOpen(false);

  return (
    <Fade in={show} timeout={700}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          borderBottom: "1px solid var(--border-light)",
          py: 1,
          zIndex: 100,
          boxShadow: "0 2px 12px 0 var(--primary-50)",
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
                color: "var(--primary-700)",
                letterSpacing: 1,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Continuia
            </Typography>
          </Box>

          {/* Desktop Navigation Links (lg and up only) */}
          <Paper
            elevation={2}
            sx={{
              display: { xs: "none", lg: "flex" }, // show only on lg+
              borderRadius: "999px",
              background: "var(--bg-primary)",
              px: 1,
              py: 0.5,
              boxShadow: "0 2px 12px 0 var(--primary-100)",
              gap: 1,
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                end
                style={{ textDecoration: "none" }}
              >
                {({ isActive }) => (
                  <Button
                    disableRipple
                    sx={{
                      textTransform: "none",
                      color: isActive
                        ? "var(--text-inverse)"
                        : "var(--neutral-600)",
                      background: isActive
                        ? "linear-gradient(90deg, var(--primary-500), var(--primary-700))"
                        : "transparent",
                      fontWeight: 600,
                      fontSize: "1rem",
                      borderRadius: "999px",
                      px: 2.5,
                      py: 1,
                      minWidth: 0,
                      boxShadow: isActive
                        ? "0 5px 15px 0 var(--primary-200)"
                        : "none",
                      transition: "background 0.2s, color 0.2s",
                      "&:hover": {
                        background: isActive
                          ? "linear-gradient(90deg, var(--primary-400), var(--primary-600))"
                          : "var(--primary-50)",
                        color: isActive
                          ? "var(--text-inverse)"
                          : "var(--primary-800)",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                )}
              </NavLink>
            ))}
          </Paper>

          {/* Hamburger menu (only on md and below; i.e., if isBelowLg) */}
          {isBelowLg && (
            <>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                edge="end"
                sx={{
                  ml: 1,
                  color: "var(--primary-700)",
                  display: { xs: "inline-flex", lg: "none" },
                }}
                aria-label="Open navigation menu"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                slotProps={{
                  paper: {
                    sx: {
                      bgcolor: "var(--bg-primary)",
                      boxShadow: "0 12px 40px 0 var(--primary-100)",
                      minWidth: 240,
                    },
                  },
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px={2}
                  py={1}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "var(--primary-700)",
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      letterSpacing: 1,
                    }}
                  >
                    Menu
                  </Typography>
                  <IconButton
                    onClick={() => setDrawerOpen(false)}
                    sx={{ color: "var(--primary-700)" }}
                    aria-label="Close navigation menu"
                  >
                    <CloseIcon fontSize="medium" />
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 1, bgcolor: "var(--border-light)" }} />
                <List>
                  {navLinks.map((link) => (
                    <ListItem key={link.label} disablePadding>
                      <ListItemButton
                        component={NavLink}
                        to={link.href}
                        onClick={handleDrawerNav}
                        sx={{
                          mx: 1,
                          px: 3,
                          py: 1.3,
                          color: "var(--primary-700)",
                          borderRadius: 2.2,
                          fontWeight: 700,
                          fontSize: "1.09rem",
                          letterSpacing: 0.6,
                          mb: 0.7,
                          "&.active, &:hover": {
                            bgcolor: "var(--primary-50)",
                            color: "var(--primary-800)",
                          },
                        }}
                        end
                      >
                        <ListItemText primary={link.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <Divider sx={{ my: 2, bgcolor: "var(--primary-100)" }} />
                  {/* Mobile version of CTA button */}
                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      href="#get-started"
                      onClick={() => setDrawerOpen(false)}
                      sx={{
                        background: "var(--primary-700)",
                        color: "var(--text-inverse)",
                        fontWeight: 700,
                        borderRadius: 2,
                        px: 2,
                        py: 1.2,
                        fontSize: "1.09rem",
                        boxShadow: "0 2px 8px 0 var(--primary-200)",
                        textTransform: "none",
                        "&:hover": {
                          background: "var(--primary-800)",
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </ListItem>
                </List>
              </Drawer>
            </>
          )}

          {/* Desktop CTA (lg and up only) */}
          <Button
            variant="contained"
            href="#get-started"
            sx={{
              background: "var(--primary-900)",
              color: "var(--text-inverse)",
              fontWeight: 700,
              borderRadius: "999px",
              px: 3,
              py: 1.2,
              fontSize: "1rem",
              boxShadow: "0 2px 8px 0 var(--primary-300)",
              textTransform: "none",
              display: { xs: "none", lg: "inline-flex" },
              "&:hover": {
                background: "var(--primary-800)",
              },
            }}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

export default Header;
