// SeamlessImplementation.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const STEPS = [
  {
    step: 1,
    title: "Week 1: Discovery & Planning",
    desc: "Comprehensive assessment of your current workflows, systems, and clinical governance needs.",
    bullets: ["Stakeholder interviews and workflow mapping", "Technical integration assessment", "Customization requirements gathering"],
  },
  {
    step: 2,
    title: "Weeks 2-3: Configuration & Integration",
    desc: "Platform setup, EMR integration, and customization based on your specific requirements.",
    bullets: ["EMR system integration and data mapping", "Clinical workflow configuration", "User access controls and security setup"],
  },
  {
    step: 3,
    title: "Week 4: Training & Go-Live",
    desc: "Comprehensive training for your clinical teams and smooth transition to live operations.",
    bullets: ["Clinical staff training and certification", "Pilot testing with select departments", "Full system activation and monitoring"],
  },
];

export default function SeamlessImplementation() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--bg-primary)",
        py: "var(--space-16)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "var(--text-primary)",
          mb: "var(--space-3)",
          fontSize: "var(--text-3xl)",
        }}
      >
        Seamless Implementation in 30 Days
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "var(--text-secondary)",
          fontSize: "var(--text-lg)",
          mb: "var(--space-10)",
        }}
      >
        Our proven implementation methodology ensures minimal disruption to your operations while maximizing clinical impact from day one.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "var(--space-8)",
          maxWidth: 1200,
          mx: "auto",
          mb: "var(--space-16)",
        }}
      >
        {STEPS.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1, type: "spring" }}
            viewport={{ once: true, amount: 0.45 }}
            style={{
              flex: "1 1 300px",
              maxWidth: 380,
              minWidth: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Step circle */}
            <Box
              sx={{
                bgcolor: "var(--primary-100)",
                width: 56,
                height: 56,
                borderRadius: "var(--radius-full)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary-500)",
                fontWeight: 700,
                fontSize: "var(--text-2xl)",
                mb: "var(--space-4)",
                userSelect: "none",
                fontFamily: "inherit",
              }}
            >
              {step.step}
            </Box>
            {/* Main Title */}
            <Typography
              sx={{
                fontWeight: 700,
                color: "var(--text-primary)",
                mb: "var(--space-2)",
                fontSize: "var(--text-lg)",
              }}
            >
              {step.title}
            </Typography>
            {/* Description */}
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-base)",
                mb: "var(--space-3)",
              }}
            >
              {step.desc}
            </Typography>
            {/* Bulleted List */}
            <Box component="ul" sx={{ textAlign: "left", pl: "var(--space-5)", m: 0 }}>
              {step.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-sm)",
                    marginBottom: 4,
                  }}
                >
                  {b}
                </li>
              ))}
            </Box>
          </motion.div>
        ))}
      </Box>

    </Box>
  );
}
