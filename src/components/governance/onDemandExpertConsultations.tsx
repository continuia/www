// OnDemandExpertConsultations.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
// Swap this import with your world map artwork
import heroIllustration from "../../assets/governance/img3.webp";

const stats = [
  {
    value: "2-Hour",
    label: "Response Time",
  },
  {
    value: "50+",
    label: "Medical Fields",
  },
];

export default function OnDemandExpertConsultations() {
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
        {/* World map image */}
        <Box
          sx={{
            flex: "1 1 420px",
            minWidth: 340,
            maxWidth: 540,
            bgcolor: "#000",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.img
            src={heroIllustration}
            alt="World map with expert locations"
            style={{
              aspectRatio: "3/2",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          />
        </Box>

        {/* Text content and stats */}
        <Box
          sx={{
            flex: "1 1 360px",
            minWidth: 280,
            maxWidth: 460,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "-center",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "var(--text-primary)",
              fontSize: "var(--text-2xl)",
              mb: "var(--space-2)",
            }}
          >
            On-Demand Expert Consultations
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              mb: "var(--space-2)",
              fontWeight: 500,
            }}
          >
            Access to 500+ specialists worldwide
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              mb: "var(--space-8)",
              fontSize: "var(--text-base)",
            }}
          >
            When complex cases require specialized expertise, instantly connect with our global network of board-certified specialists. Get expert opinions within hours, not weeks, ensuring your patients receive the highest level of care.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "var(--space-6)",
              mt: "var(--space-2)",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {stats.map((stat) => (
              <Box
                key={stat.value}
                sx={{
                  borderRadius: "var(--radius-lg)",
                  px: "var(--space-10)",
                  py: "var(--space-4)",
                  bgcolor: "var(--bg-secondary)",
                  boxShadow: "var(--shadow-xs)",
                  minWidth: 120,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: "var(--space-2)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "var(--text-xl)",
                    fontWeight: 700,
                    color: "var(--primary-500)",
                    mb: "var(--space-1)",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
