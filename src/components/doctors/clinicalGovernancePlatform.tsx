// ClinicalGovernancePlatform.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const features = [
  {
    iconColor: "var(--primary-400)",
    title: "Smart Alerts",
    desc: "Intelligent notifications for high-risk cases and quality deviations",
  },
  {
    iconColor: "var(--primary-400)",
    title: "Live Dashboard",
    desc: "Real-time visibility into clinical performance metrics",
  },
  {
    iconColor: "var(--primary-400)",
    title: "24/7 Monitoring",
    desc: "Continuous surveillance of clinical activities",
  },
];

export default function ClinicalGovernancePlatform() {
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
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Section Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "var(--text-primary)",
            mb: "var(--space-2)",
            fontSize: "var(--text-3xl)",
          }}
        >
          Comprehensive Clinical Governance Platform
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "var(--text-secondary)",
            mb: "var(--space-12)",
            fontSize: "var(--text-lg)",
            maxWidth: 800,
            mx: "auto",
          }}
        >
          Our integrated suite of AI-powered tools works behind the scenes to enhance every clinical decision, ensuring quality, safety, and compliance across your entire healthcare system.
        </Typography>

        {/* Content Row */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "var(--space-10)",
            maxWidth: 1200,
            mx: "auto",
            textAlign: "left",
          }}
        >
          {/* Left Column: Feature info */}
          <Box
            sx={{
              flex: "1 1 350px",
              minWidth: 300,
              maxWidth: 540,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "var(--text-primary)",
                mb: "var(--space-2)",
                fontSize: "var(--text-2xl)",
              }}
            >
              Real-Time Clinical Monitoring
            </Typography>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                mb: "var(--space-3)",
                fontWeight: 500,
              }}
            >
              Continuous oversight of clinical decisions
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "var(--text-secondary)",
                mb: "var(--space-6)",
                fontSize: "var(--text-base)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              Our AI continuously monitors clinical decisions across departments, identifying potential risks, quality gaps, and improvement opportunities in real-time. Get instant alerts when intervention is needed, ensuring no critical decision goes unreviewed.
            </Typography>
            {/* Bullets */}
            <Box component="ul" sx={{ pl: 0, m: 0, listStyle: "none" }}>
              {features.map((feat, idx) => (
                <motion.li
                  key={feat.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.09,
                    type: "spring",
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  style={{ display: "flex", alignItems: "flex-start", marginBottom: 16 }}
                >
                  <FiberManualRecordIcon
                    fontSize="small"
                    sx={{
                      color: feat.iconColor,
                      mt: "4px",
                      mr: "var(--space-3)",
                      fontSize: 16,
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "var(--text-base)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {feat.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--text-tertiary)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      {feat.desc}
                    </Typography>
                  </Box>
                </motion.li>
              ))}
            </Box>
          </Box>

          {/* Right Column: Illustration */}
          <Box
            sx={{
              flex: "1 1 320px",
              minWidth: 260,
              maxWidth: 480,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mt: { xs: "var(--space-6)", md: 0 },
            }}
          >
            <motion.img
              src={heroIllustration}
              alt="Clinical Dashboard Demo"
              style={{
                width: "100%",
                maxWidth: 400,
                height: "auto",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
