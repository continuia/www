import React from "react";
import { Box, Typography, Card, Avatar, useMediaQuery } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { FavoriteOutlined, LocalHospitalOutlined, MonetizationOnOutlined, AppShortcutOutlined } from "@mui/icons-material";

const useCases = [
  {
    icon: <FavoriteOutlined fontSize="inherit" sx={{ color: "var(--text-inverse)" }} />,
    title: "Caregiver Support",
    description: "A caregiver needs a second opinion on a parent's care plan",
  },
  {
    icon: <LocalHospitalOutlined fontSize="inherit" sx={{ color: "var(--text-inverse)" }} />,
    title: "Specialist Clarification",
    description: "An employee is confused after a specialist visit or diagnostic test",
  },
  {
    icon: <MonetizationOnOutlined fontSize="inherit" sx={{ color: "var(--text-inverse)" }} />,
    title: "High-Cost Decisions",
    description: "A high-cost medical decision is looming, and the employee wants reassurance",
  },
  {
    icon: <AppShortcutOutlined fontSize="inherit" sx={{ color: "var(--text-inverse)" }} />,
    title: "Platform Enhancement",
    description: "A wellness platform wants to add a clinically credible option to its navigation layer",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.56, type: "spring" },
  }),
};

export const ExampleUseCases: React.FC = () => {
  const isSm = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--bg-secondary)",
        py: "var(--space-20)",
        px: "clamp(var(--space-2), 4vw, var(--space-40))",
        boxSizing: "border-box",
      }}
    >
      <Typography
        component="h3"
        sx={{
          textAlign: "center",
          fontSize: "var(--text-3xl)",
          fontWeight: 900,
          color: "var(--primary-900)",
          letterSpacing: 0.25,
          mb: "var(--space-2)",
        }}
      >
        Example Use Cases
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          mb: "var(--space-12)",
          fontSize: "var(--text-base)",
          color: "var(--text-secondary)",
        }}
      >
        Continuia fits cleanly into any benefits mix — as a navigator complement or standalone perk
      </Typography>
      <Box
        sx={{
          display: "grid",
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
          gridTemplateColumns: isSm ? "1fr" : "1fr 1fr",
          gridGap: "var(--space-8)",
        }}
      >
        {useCases.map((uc, i) => (
          <motion.div key={uc.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={cardVariants} style={{ width: "100%" }}>
            <Card
              elevation={0}
              sx={{
                width: "100%",
                minHeight: 135,
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-lg)",
                p: "var(--space-6) var(--space-6) var(--space-5)",
                background: "var(--primary-50)",
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-5)",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "var(--primary-500)",
                  color: "var(--text-inverse)",
                  width: 48,
                  height: 48,
                  fontSize: 24,
                  mr: "var(--space-4)",
                  boxShadow: "var(--shadow-md)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                {uc.icon}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "var(--text-base)",
                    color: "var(--primary-900)",
                    mb: "var(--space-1)",
                  }}
                >
                  {uc.title}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  {uc.description}
                </Typography>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
