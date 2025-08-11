import { useState } from "react";
import { AppBar, Box, Toolbar, Button, Typography, Fade, Paper, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Collapse, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

type NavScreen = "all" | "small" | "medium" | "large";
interface NavLinkBase {
  label: string;
  href?: string;
  showOn?: NavScreen | NavScreen[];
  children?: NavLinkBase[];
  id?: string;
}

// ToS sidebar nav (for Drawer only, not in desktop nav)
const tosSidebarNav: NavLinkBase[] = [
  { id: "welcome", label: "Welcome" },
  { id: "scope", label: "Scope of Services" },
  { id: "who", label: "Who May Use Continuia" },
  { id: "disclaimers", label: "Important Disclaimers" },
  { id: "compliance", label: "Global Compliance" },
  { id: "consent", label: "Consent & Privacy" },
  { id: "account-security", label: "Accounts & Security" },
  { id: "for-clinicians", label: "For Clinicians" },
  { id: "payment-refunds", label: "Payment & Refunds" },
  { id: "data-ownership", label: "Data Ownership" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "termination", label: "Termination" },
  { id: "disputes", label: "Disputes & Jurisdiction" },
  { id: "updates", label: "Updates" },
  { id: "contact", label: "Contact & Support" },
];

// NavLink config
const navLinks: NavLinkBase[] = [
  { label: "Home", href: "/", showOn: "all" },
  { label: "Insights", href: "/insights" },
  { label: "Governance", href: "/governance" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about", showOn: ["large", "medium"] }, // example: hide on mobile
  {
    label: "Terms of Service",
    href: "/privacy",
    children: tosSidebarNav,
    showOn: "small", // <-- only show in Drawer/mobile, not in desktop
  },
];

/** Utility to determine what screen we're on ("small", "medium", "large") */
function useNavScreen() {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg")); // ≥1200px
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900–1199
  if (isLarge) return "large";
  if (isMedium) return "medium";
  return "small";
}

function linkVisibleOn(link: NavLinkBase, screen: NavScreen): boolean {
  const showOn = link.showOn;
  if (!showOn || showOn === "all") return true; // handles both undefined and "all"
  if (Array.isArray(showOn)) return showOn.includes(screen) || showOn.includes("all");
  return showOn === screen;
}

function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tosOpen, setTosOpen] = useState(false);
  const screen = useNavScreen();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTosSectionClick = (sectionId: string) => {
    onClose();
    if (window.location.pathname === "/privacy") {
      // Already on ToS page? Scroll now:
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          if (screen === "large") {
            const contentBox = document.getElementById("terms-content-scroll");
            if (contentBox) {
              const offset = section.offsetTop - contentBox.offsetTop;
              contentBox.scrollTo({ top: offset, behavior: "smooth" });
            }
          } else {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 80);
    } else {
      // NOT on ToS page: navigate (the ToS page will auto-scroll via its own code)
      navigate(`/privacy#${sectionId}`);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { bgcolor: "var(--bg-primary)", minWidth: 250 },
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1}>
        <Typography variant="h6" sx={{ color: "var(--primary-700)", fontWeight: 700 }}>
          Menu
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "var(--primary-700)" }}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List>
        {navLinks
          .filter((link) => linkVisibleOn(link, screen))
          .map((link) =>
            !link.children ? (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={link.href ?? "#"}
                  onClick={onClose}
                  sx={{
                    px: 3,
                    fontWeight: 600,
                    letterSpacing: 0.6,
                    // Use "isActive" style by comparing `location.pathname`
                    bgcolor: location.pathname === link.href ? "var(--primary-50)" : "transparent",
                    color: location.pathname === link.href ? "var(--primary-800)" : "var(--primary-700)",
                    "&.active, &:hover": { bgcolor: "var(--primary-50)" },
                  }}
                  end
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ) : (
              <Box key={link.label}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setTosOpen((open) => !open)} sx={{ px: 3, fontWeight: 700, color: "var(--primary-700)" }}>
                    <ListItemText primary={link.label} />
                    {tosOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={tosOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {link.children
                      ?.filter((child) => linkVisibleOn(child, screen))
                      .map((section) => (
                        <ListItem key={section.id || section.label} disablePadding>
                          <ListItemButton
                            sx={{
                              pl: 5.5,
                              py: 1,
                              fontSize: "0.98rem",
                              fontWeight: 500,
                              "&:hover": { bgcolor: "var(--primary-50)" },
                              // HIGHLIGHT if matches current hash
                              bgcolor: location.hash === `#${section.id}` && location.pathname === "/privacy" ? "var(--primary-100)" : "transparent",
                              color: location.hash === `#${section.id}` && location.pathname === "/privacy" ? "var(--primary-900)" : "var(--primary-700)",
                            }}
                            onClick={() => section.id && handleTosSectionClick(section.id)}
                          >
                            <ListItemText primary={section.label} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </Box>
            )
          )}
      </List>
      <Divider sx={{ my: 2 }} />
      <ListItem>
        <Button
          fullWidth
          variant="contained"
          href="#get-started"
          onClick={onClose}
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
            "&:hover": { background: "var(--primary-800)" },
          }}
        >
          Get Started
        </Button>
      </ListItem>
    </Drawer>
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isBelowLg = !isLarge;

  return (
    <Fade in timeout={700}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          borderBottom: "1px solid var(--border-light)",
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
          <Box display="flex" alignItems="center">
            <Box component="img" src="/continuia.png" alt="Continuia Logo" height={{ xs: 36, md: 50 }} />
            {/* <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "var(--primary-700)",
                letterSpacing: 1,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Continuia
            </Typography> */}
          </Box>
          {/* Desktop nav – only items with showOn: 'all' or 'large'/'medium' */}
          <Paper
            elevation={2}
            sx={{
              display: { xs: "none", lg: "flex" },
              borderRadius: "999px",
              background: "var(--bg-primary)",
              px: 1,
              py: 0.5,
              boxShadow: "0 2px 12px 0 var(--primary-100)",
              gap: 1,
              alignItems: "center",
            }}
          >
            {navLinks
              .filter((link) => linkVisibleOn(link, "large") && !link.children) // hide ToS on big if children
              .map((link) => (
                <NavLink key={link.label} to={link.href ?? "#"} end style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <Button
                      disableRipple
                      sx={{
                        textTransform: "none",
                        color: isActive ? "var(--text-inverse)" : "var(--neutral-600)",
                        background: isActive ? "linear-gradient(90deg, var(--primary-500), var(--primary-700))" : "transparent",
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderRadius: "999px",
                        px: 2.5,
                        py: 1,
                        minWidth: 0,
                        boxShadow: isActive ? "0 5px 15px 0 var(--primary-200)" : "none",
                        transition: "background 0.2s, color 0.2s",
                        "&:hover": {
                          background: isActive ? "linear-gradient(90deg, var(--primary-400), var(--primary-600))" : "var(--primary-50)",
                          color: isActive ? "var(--text-inverse)" : "var(--primary-800)",
                        },
                      }}
                    >
                      {link.label}
                    </Button>
                  )}
                </NavLink>
              ))}
          </Paper>
          {/* Hamburger + Drawer only on mobile */}
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
              <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
            </>
          )}
          {/* Desktop CTA */}
          <Button
            variant="contained"
            onClick={() => navigate("/getInTouch")}
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
}
