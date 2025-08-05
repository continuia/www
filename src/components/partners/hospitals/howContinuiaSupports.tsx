import React from "react";
import { Box, Typography, Card, Avatar, useMediaQuery } from "@mui/material";
import { MemoryOutlined, Diversity3Outlined, DescriptionOutlined } from "@mui/icons-material";
import { motion, type Variants } from "framer-motion";

const featureList = [
  {
    icon: <MemoryOutlined fontSize="inherit" sx={{ color: "var(--text-inverse)" }} />,
    title: "AI-Assisted Reviews",
    description: "Independent, AI-assisted second opinion layer that integrates seamlessly with hospital workflows.",
  },
  {
    icon: <Diversity3Outlined fontSize="inherit" sx={{ color: "var(--text-inverse)" }} />,
    title: "Licensed Physicians",
    description: "Smart, secure reviews by licensed physicians. No workflow disruption, just enhanced clinical confidence.",
  },
  {
    icon: <DescriptionOutlined fontSize="inherit" sx={{ color: "var(--text-inverse)" }} />,
    title: "Audit-Ready Documentation",
    description: "Enhances trust, improves legal defensibility, and provides audit-ready documentation for governance.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.62, type: "spring", bounce: 0.25 },
  }),
  hover: {
    boxShadow: "0 8px 38px 0 rgba(124,58,237,0.12), 0 2px 10px 0 rgba(67,56,202,0.09)",
    scale: 1.017,
    transition: { duration: 0.21 },
  },
};

export const HowContinuiaSupports: React.FC = () => {
  const isSm = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--bg-secondary)",
        py: "var(--space-20)",
        px: "clamp(var(--space-2), 5vw, var(--space-40))",
        boxSizing: "border-box",
      }}
    >
      <Typography
        component="h3"
        sx={{
          textAlign: "center",
          fontSize: "var(--text-4xl)",
          fontWeight: 900,
          color: "var(--primary-900)",
          letterSpacing: 0.25,
          mb: "var(--space-2)",
        }}
      >
        How Continuia Supports Them
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          mb: "var(--space-14)",
          fontSize: "var(--text-lg)",
          color: "var(--text-secondary)",
        }}
      >
        What unique value Continuia provides to this group
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSm ? "column" : "row",
          gap: "var(--space-8)",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 1920,
          mx: "auto",
          width: "100%",
        }}
      >
        {featureList.map((feature, i) => (
          <motion.div
            key={feature.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            whileHover="hover"
            style={{
              flex: isSm ? undefined : "1 1 34%",
              minWidth: 280,
              maxWidth: 408,
              width: "100%",
              display: "flex",
            }}
          >
            <Card
              elevation={0}
              sx={{
                width: "100%",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-lg)",
                p: "var(--space-6) var(--space-6) var(--space-5)",
                background: "var(--bg-primary)",
                minHeight: 270,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "var(--space-2)",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "var(--primary-500)",
                  color: "var(--text-inverse)",
                  width: 54,
                  height: 54,
                  boxShadow: "var(--shadow-md)",
                  fontSize: 28,
                  mb: "var(--space-3)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                {feature.icon}
              </Avatar>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "var(--text-lg)",
                  color: "var(--primary-900)",
                  mb: "var(--space-1)",
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-base)",
                  mb: "var(--space-2)",
                }}
              >
                {feature.description}
              </Typography>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
