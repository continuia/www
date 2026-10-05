import { useState, useEffect, useRef } from "react";
import { AppBar, Box, Toolbar, Button, Typography, Paper, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Collapse, Menu, MenuItem, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { mainSections } from "../../constants/sections";
import { LOGIN_REGIONS, REGION_FLAGS } from "../../constants/loginRegions";

type NavScreen = "all" | "small" | "medium" | "large";
interface NavLinkBase {
  label: string;
  href?: string;
  showOn?: NavScreen | NavScreen[];
  children?: NavLinkBase[];
  id?: string;
}

// Update tosSidebarNav to include correct paths under /privacy/
const tosSidebarNav: NavLinkBase[] = mainSections.map((section) => ({
  id: section.id,
  label: section.label,
  href: section.path, // Use full relative path here for routing
}));

const navLinks: NavLinkBase[] = [
  { label: "Home", href: "/", showOn: "all" },
  { label: "Insights", href: "/insights" },
  { label: "Governance", href: "/governance" },
  { label: "Partnership", href: "/partners" },
  { label: "About", href: "/about", showOn: ["large", "medium"] },
  {
    label: "Terms of Service",
    href: "/privacy/terms-of-service",
    children: tosSidebarNav,
    showOn: "small",
  },
];

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
  if (!showOn || showOn === "all") return true;
  if (Array.isArray(showOn)) return showOn.includes(screen) || showOn.includes("all");
  return showOn === screen;
}

// Decorative: the visible text label carries the meaning.
function FlagIcon({ countryCode }: { countryCode: string }) {
  const flag = REGION_FLAGS[countryCode.toLowerCase()];
  if (!flag) return null;
  return (
    <Box
      component="svg"
      viewBox="0 0 24 18"
      aria-hidden="true"
      focusable="false"
      sx={{ width: 24, height: 18, flexShrink: 0, borderRadius: "2px", boxShadow: "0 0 0 1px var(--border-light)" }}
    >
      {flag}
    </Box>
  );
}

function LoginMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        id="login-menu-button"
        disableRipple
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? "login-menu" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{
          textTransform: "none",
          color: open ? "var(--primary-800)" : "var(--neutral-600)",
          background: open ? "var(--primary-50)" : "transparent",
          fontWeight: 600,
          fontSize: "1rem",
          borderRadius: "999px",
          px: 2.5,
          py: 1,
          minWidth: 0,
          "&:hover": { background: "var(--primary-50)", color: "var(--primary-800)" },
        }}
      >
        Login
      </Button>
      <Menu
        id="login-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{ list: { "aria-labelledby": "login-menu-button" }, paper: { sx: { bgcolor: "var(--bg-primary)", mt: 1, minWidth: 180 } } }}
      >
        {LOGIN_REGIONS.map((region) => (
          <MenuItem
            key={region.countryCode}
            component="a"
            href={region.url}
            onClick={() => setAnchorEl(null)}
            sx={{ gap: 1.5, fontWeight: 600, color: "var(--primary-700)", "&:hover, &.Mui-focusVisible": { bgcolor: "var(--primary-50)" } }}
          >
            <FlagIcon countryCode={region.countryCode} />
            {region.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tosOpen, setTosOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const screen = useNavScreen();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTosSectionClick = (href?: string, sectionId?: string) => {
    onClose();
    if (!href) return;
    if (window.location.pathname.startsWith("/privacy") && href.startsWith("/privacy")) {
      // If already on /privacy, scroll to section if possible
      setTimeout(() => {
        if (sectionId) {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 80);
      // Also update URL without reload but force navigate for path
      navigate(href, { replace: true });
    } else {
      // Navigate to privacy route directly
      navigate(href);
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
                              bgcolor: location.pathname === section.href ? "var(--primary-100)" : "transparent",
                              color: location.pathname === section.href ? "var(--primary-900)" : "var(--primary-700)",
                            }}
                            onClick={() => handleTosSectionClick(section.href, section.id)}
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
        <Box>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setLoginOpen((o) => !o)}
              aria-expanded={loginOpen}
              aria-controls="mobile-login-list"
              sx={{ px: 3, fontWeight: 700, color: "var(--primary-700)" }}
            >
              <ListItemText primary="Login" />
              {loginOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={loginOpen} timeout="auto" unmountOnExit>
            <List id="mobile-login-list" component="div" disablePadding>
              {LOGIN_REGIONS.map((region) => (
                <ListItem key={region.countryCode} disablePadding>
                  <ListItemButton
                    component="a"
                    href={region.url}
                    sx={{ pl: 5.5, py: 1, gap: 1.5, fontWeight: 500, color: "var(--primary-700)", "&:hover": { bgcolor: "var(--primary-50)" } }}
                  >
                    <FlagIcon countryCode={region.countryCode} />
                    <ListItemText primary={region.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      </List>
      <Divider sx={{ my: 2 }} />
      <ListItem>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/getInTouch")}
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
          Get In Touch
        </Button>
      </ListItem>
    </Drawer>
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isBelowLg = !isLarge;
  const navigate = useNavigate();

  // Scroll direction detection without auto-hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      // Only trigger if scroll difference is significant (avoid micro-scrolls)
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show header
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide header (only after scrolling past 100px)
        setShowHeader(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Throttle scroll events for better performance
    let timeoutId: any = null;
    const throttledHandleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 10);
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        borderBottom: "1px solid var(--border-light)",
        zIndex: 1300,
        boxShadow: "0 2px 12px 0 var(--primary-50)",
        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
          <LoginMenu />
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
          Get In Touch
        </Button>
      </Toolbar>
    </AppBar>
  );
}
