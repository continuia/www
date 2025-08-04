// ComplianceQualityAnalytics.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
// Swap this with your dashboard/analytics art as needed
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp";

const cards = [
  {
    title: "Automated Compliance Tracking",
    desc: "Continuous monitoring against Joint Commission, CMS, and other regulatory standards",
  },
  {
    title: "Quality Improvement Analytics",
    desc: "Data-driven insights to identify trends and optimize clinical outcomes",
  },
];

export default function ComplianceQualityAnalytics() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--bg-primary)",
        py: "var(--space-16)",
        px: { xs: "var(--space-2)", md: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "var(--space-12)",
          justifyContent: "center",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Left column: Content and Cards */}
        <Box
          sx={{
            flex: "1 1 280px",
            minWidth: 320,
            maxWidth: 520,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "var(--text-primary)",
              fontSize: "var(--text-2xl)",
              mb: "var(--space-2)",
              textAlign: "left",
            }}
          >
            Compliance & Quality Analytics
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              mb: "var(--space-3)",
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            Built-in governance and reporting
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              mb: "var(--space-6)",
              fontSize: "var(--text-base)",
              textAlign: "left",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            Stay ahead of regulatory requirements with automated compliance monitoring and comprehensive quality analytics. Generate detailed reports for accreditation bodies and track improvement initiatives with precision.
          </Typography>
          {/* Cards */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {cards.map((card, idx) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: idx * 0.1, type: "spring" }} viewport={{ once: true, amount: 0.45 }} style={{ width: "100%" }}>
                <Box
                  sx={{
                    bgcolor: "var(--bg-secondary)",
                    borderRadius: "var(--radius-lg)",
                    p: "var(--space-6)",
                    boxShadow: "var(--shadow-xs)",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      fontSize: "var(--text-base)",
                      mb: "var(--space-1)",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text-secondary)",
                      fontSize: "var(--text-sm)",
                    }}
                  >
                    {card.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
        {/* Right column: Illustration/image */}
        <Box
          sx={{
            flex: "1 1 350px",
            minWidth: 340,
            maxWidth: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
          }}
        >
          <motion.img
            src={heroIllustration}
            alt="Analytics dashboard"
            style={{
              width: "100%",
              maxWidth: 440,
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-lg)",
              display: "block",
              objectFit: "cover",
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
