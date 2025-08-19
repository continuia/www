import { useLocation, useNavigate } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { mainSections } from "../../constants/sections";

export default function SidebarNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeId = mainSections.find((s) => location.pathname.startsWith(s.path))?.id ?? mainSections[0].id;

  return (
    <Box
      sx={{
        minWidth: 220,
        maxWidth: 300,
        bgcolor: "var(--bg-secondary)",
        height: "100%",
        boxShadow: "var(--shadow-md)",
        position: { md: "sticky" },
        top: { md: "var(--space-20)", xs: 0 },
        display: { xs: "none", sm: "none", md: "block" }, // Hide on xs and sm screens
      }}
    >
      <List>
        {mainSections.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={activeId === item.id}
              onClick={() => navigate(item.path)}
              sx={{
                mx: "var(--space-2)",
                my: "var(--space-1)",
                borderRadius: "var(--radius-md)",
                color: activeId === item.id ? "var(--primary-700)" : "var(--text-secondary)",
                fontWeight: activeId === item.id ? 700 : 600,
                background: activeId === item.id ? "var(--primary-50)" : undefined,
                "&:hover": { background: "var(--primary-100)" },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
