import React from "react";
import { Box, Typography, Card, Avatar, useMediaQuery } from "@mui/material";
import {
  ShieldOutlined,
  MonetizationOnOutlined, // Avoidable Spend
  AutorenewOutlined, // Care Loops
  LogoutOutlined, // Disengagement
  HelpOutline, // Confusion
} from "@mui/icons-material";
import { motion, type Variants } from "framer-motion";

const coreIconStyle = {
  bgcolor: "var(--primary-500)",
  color: "var(--text-inverse)",
  width: 56,
  height: 56,
  mb: "var(--space-3)",
  boxShadow: "var(--shadow-md)",
};

const reasonCards = [
  {
    icon: <MonetizationOnOutlined fontSize="inherit" sx={{ color: "var(--primary-400)" }} />,
    title: "Avoidable Spend",
    description: "Unnecessary procedures and interventions",
  },
  {
    icon: <AutorenewOutlined fontSize="inherit" sx={{ color: "var(--primary-400)" }} />,
    title: "Care Loops",
    description: "Costly repetitive care cycles",
  },
  {
    icon: <LogoutOutlined fontSize="inherit" sx={{ color: "var(--primary-400)" }} />,
    title: "Disengagement",
    description: "Members avoiding necessary care",
  },
  {
    icon: <HelpOutline fontSize="inherit" sx={{ color: "var(--primary-400)" }} />,
    title: "Confusion",
    description: "Complex medical decisions",
  },
];

const fadeInMotion: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } },
};

export const WhyThisPartnerMatters: React.FC = () => {
  const isSm = useMediaQuery("(max-width:900px)");

  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeInMotion}
      sx={{
        width: "100%",
        bgcolor: "var(--bg-secondary)",
        py: "var(--space-20)",
        px: "clamp(var(--space-2), 5vw, var(--space-40))",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontSize: "var(--text-4xl)",
          fontWeight: 900,
          letterSpacing: 0.3,
          color: "var(--primary-900)",
          mb: "var(--space-2)",
        }}
      >
        Why This Partner Matters
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          mb: "var(--space-14)",
          fontSize: "var(--text-lg)",
          color: "var(--text-secondary)",
        }}
      >
        Health plans and TPAs face ongoing challenges balancing cost control with member satisfaction
      </Typography>

      <Box
        sx={{
          background: "var(--primary-50)",
          borderRadius: "var(--radius-2xl)",
          display: "flex",
          flexDirection: isSm ? "column" : "row",
          alignItems: "stretch",
          gap: "var(--space-12)",
          maxWidth: 1480,
          mx: "auto",
          p: isSm ? "var(--space-5)" : "var(--space-16)",
          boxShadow: "var(--shadow-md)",
          width: "100%",
        }}
      >
        {/* Left: main reason */}
        <Box
          sx={{
            flex: isSm ? "unset" : "1 1 41%",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isSm ? "center" : "flex-start",
            textAlign: isSm ? "center" : "left",
            gap: "var(--space-3)",
          }}
        >
          <Avatar
            sx={{
              ...coreIconStyle,
              bgcolor: "var(--primary-500)",
              mb: "var(--space-4)",
              fontSize: 32,
            }}
            variant="rounded"
          >
            <ShieldOutlined fontSize="inherit" />
          </Avatar>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: "var(--text-2xl)",
              color: "var(--primary-900)",
              mb: "var(--space-1)",
            }}
          >
            Members Feel Lost
          </Typography>
          <Typography sx={{ color: "var(--text-secondary)", fontSize: "var(--text-base)", maxWidth: 480 }}>
            Members often feel lost when facing major medical decisions — from elective surgeries to confusing imaging results. Without accessible clinical guidance, they may pursue unnecessary procedures, enter costly care loops, or disengage altogether.
            <br />
            <br />
            Continuia helps bridge that gap — providing neutral, physician-led second opinions that empower smarter decisions and reduce waste.
          </Typography>
        </Box>
        {/* Right: 2x2 grid for other reasons */}
        <Box
          sx={{
            flex: isSm ? "unset" : "1 1 59%",
            minWidth: 0,
            display: "grid",
            gridTemplateColumns: isSm ? "1fr" : "1fr 1fr",
            gridTemplateRows: isSm ? "unset" : "1fr 1fr",
            gap: "var(--space-6)",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          {reasonCards.map((c) => (
            <Card
              key={c.title}
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                height: "100%",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-lg)",
                p: "var(--space-6) var(--space-5)",
                background: "var(--bg-primary)",
                minWidth: 0,
                gap: "var(--space-2)",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "var(--primary-100)",
                  color: "var(--primary-600)",
                  width: 40,
                  height: 40,
                  fontSize: 22,
                  mb: "var(--space-2)",
                  boxShadow: "var(--shadow-xs)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                {c.icon}
              </Avatar>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "var(--text-lg)",
                  color: "var(--primary-900)",
                  mb: "var(--space-0)",
                }}
              >
                {c.title}
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-base)",
                }}
              >
                {c.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
