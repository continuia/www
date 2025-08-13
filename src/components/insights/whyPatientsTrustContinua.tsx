// WhyPatientsTrustContinua.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";

const items = [
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "var(--primary-600)" }} />,
    title: "Verified Specialists",
    desc: "All doctors are board-certified with verified credentials and years of clinical experience",
    bg: "var(--primary-100)",
  },
  {
    icon: <LockIcon sx={{ fontSize: 40, color: "white" }} />,
    title: "Secure & Private",
    desc: "Your medical information is protected with bank-level security and strict privacy protocols",
    bg: "var(--success)",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40, color: "var(--primary-900)" }} />,
    title: "Collaborative Care",
    desc: "We work with your existing doctors, not against them, to give you the best possible care",
    bg: "var(--primary-400)",
  },
  {
    icon: <PublicIcon sx={{ fontSize: 40, color: "white" }} />,
    title: "Global Standards",
    desc: "Compliant with medical standards in India, US, EU, and other major healthcare systems",
    bg: "var(--warning)",
  },
];

export default function WhyPatientsTrustContinua() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--bg-primary)",
        py: "var(--space-16)",
        px: { xs: "var(--space-2)", md: 0 },
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "var(--text-primary)",
          mb: "var(--space-12)",
          fontSize: "var(--text-3xl)",
        }}
      >
        Why Patients Trust Continuia
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-8)",
          justifyContent: "center",
          alignItems: "stretch",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.09, type: "spring" }}
            viewport={{ once: true, amount: 0.35 }}
            style={{
              flex: "1 1 210px",
              maxWidth: 260,
              minWidth: 200,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "var(--space-6)",
                bgcolor: "var(--bg-primary)",
                boxShadow: "var(--shadow-xs)",
                borderRadius: "var(--radius-xl)",
              }}
            >
              <Box
                sx={{
                  bgcolor: item.bg,
                  borderRadius: "var(--radius-full)",
                  width: 64,
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: "var(--space-3)",
                }}
              >
                {item.icon}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: "var(--space-2)",
                  color: "var(--text-primary)",
                  fontSize: "var(--text-lg)",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-sm)",
                  mt: "-2px",
                }}
              >
                {item.desc}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
