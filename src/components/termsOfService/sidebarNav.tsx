import { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, IconButton, useMediaQuery, useTheme, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const navItems = [
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

// Framer Motion animation for drawer
const drawerVariants: Variants = {
  closed: { x: -300, opacity: 0 },
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

export default function SidebarNav() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(navItems[0].id);
  const [pendingActiveId, setPendingActiveId] = useState<string | null>(null);

  // Active detection
  useEffect(() => {
    // Only needed for desktop (content scroll tracking). On mobile, scroll is body-level.
    if (!isDesktop) return;
    const contentBox = document.getElementById("terms-content-scroll");
    if (!contentBox) return;
    const sectionEls = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const handleScroll = () => {
      let current = navItems[0].id;
      for (const section of sectionEls) {
        const scrollPos = contentBox.scrollTop;
        if (scrollPos + 80 >= section.offsetTop) {
          current = section.id;
        } else {
          break;
        }
      }
      setActiveId(current);
      setPendingActiveId(null);
    };
    contentBox.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => contentBox.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  // Render nav list (used in both drawer and sidebar)
  const navList = (
    <Box
      className="sidebarNavScroll"
      sx={{
        overflowY: "auto",
        pr: "var(--space-1)",
        minWidth: 220,
      }}
      // For mobile, let Drawer size handle height; for desktop, let flex-stretch fill
      height={{ xs: "auto", md: "100%" }}
    >
      <List>
        {navItems.map((item) => {
          const isItemActive = item.id === (pendingActiveId || activeId);
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                component="a"
                href={`#${item.id}`}
                onClick={(e) => {
                  // On mobile: just close the drawer, no scroll trap
                  if (!isDesktop) setDrawerOpen(false);

                  const contentBox = document.getElementById("terms-content-scroll");
                  const section = document.getElementById(item.id);

                  if (contentBox && section) {
                    e.preventDefault();
                    const offset = section.offsetTop - contentBox.offsetTop;
                    setPendingActiveId(item.id);
                    contentBox.scrollTo({ top: offset, behavior: "smooth" });
                  }
                }}
                sx={{
                  px: "var(--space-4)",
                  py: "var(--space-1)",
                  my: "var(--space-1)",
                  mx: "var(--space-2)",
                  color: isItemActive ? "var(--primary-700)" : "var(--text-secondary)",
                  fontWeight: isItemActive ? 700 : 600,
                  background: isItemActive ? "var(--primary-50)" : undefined,
                  borderRadius: "var(--radius-md)",
                  "&:hover": {
                    background: isItemActive ? "var(--primary-200)" : "var(--primary-100)",
                    color: "var(--primary-700)",
                  },
                  transition: "background var(--transition-fast), color var(--transition-fast)",
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  // ======= DESKTOP MODE: sticky sidebar =======
  if (isDesktop) {
    return (
      <motion.div
        initial={false}
        animate="open"
        variants={drawerVariants}
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 240,
          maxWidth: 300,
          height: "100%",
          position: "sticky",
          top: "var(--space-20)",
          background: "var(--bg-secondary)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {navList}
      </motion.div>
    );
  }

  // ======= MOBILE MODE: renders nothing by default, but triggers Drawer via header hamburger =======
  // In mobile mode, show only a hamburger button. You’ll want to render this in your header.
  // The Drawer itself is handled here.
  // For header hamburger integration, you can export setDrawerOpen or use context, or render this button here for demo.

  return (
    <>
      {/* Hamburger in sidebar position if you want it shown here (or move to your AppBar/header) */}
      <IconButton
        size="large"
        aria-label="Open navigation"
        onClick={() => setDrawerOpen(true)}
        sx={{
          color: "var(--primary-700)",
          position: "fixed",
          top: "var(--space-4)",
          left: "var(--space-4)",
          zIndex: "var(--z-40)",
          background: "var(--bg-accent)",
          "&:hover": { background: "var(--primary-100)" },
        }}
      >
        <MenuIcon />
      </IconButton>
      <AnimatePresence>
        {drawerOpen && (
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            variant="temporary"
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 260,
                background: "var(--bg-secondary)",
              },
              display: { xs: "block", md: "none" },
            }}
            // Animate the paper with framer-motion
            PaperProps={
              {
                component: motion.div,
                variants: drawerVariants,
                initial: "closed",
                animate: drawerOpen ? "open" : "closed",
                exit: "closed",
              } as any
            }
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            {navList}
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
}
