// TrustedByHealthcare.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const stats = [
  {
    value: "25%",
    label: "Reduction in Medical Errors",
    desc: "Proven clinical safety improvements",
  },
  {
    value: "40%",
    label: "Faster Clinical Decisions",
    desc: "Accelerated diagnostic workflows",
  },
  {
    value: "98%",
    label: "Physician Satisfaction",
    desc: "Enhanced clinical confidence",
  },
  {
    value: "15min",
    label: "Average Implementation",
    desc: "Rapid deployment capability",
  },
];

export default function TrustedByHealthcare() {
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
          mb: "var(--space-2)",
          fontSize: "var(--text-3xl)",
        }}
      >
        Trusted by Leading Healthcare Institutions
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "var(--text-secondary)",
          mb: "var(--space-10)",
          fontSize: "var(--text-lg)",
        }}
      >
        Join forward-thinking hospitals that have transformed their clinical outcomes with Continia's ethical AI governance
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-8)",
          justifyContent: "center",
          alignItems: "stretch",
          maxWidth: 1100,
          mx: "auto",
        }}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.06, type: "spring" }}
            viewport={{ once: true, amount: 0.3 }}
            style={{
              flex: "1 1 180px",
              maxWidth: 220,
              minWidth: 140,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "var(--text-4xl)",
                fontWeight: 700,
                color: "var(--primary-600)",
                mb: "var(--space-2)",
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: "var(--text-primary)",
                fontSize: "var(--text-base)",
                mb: "var(--space-1)",
              }}
            >
              {stat.label}
            </Typography>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-sm)",
              }}
            >
              {stat.desc}
            </Typography>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
