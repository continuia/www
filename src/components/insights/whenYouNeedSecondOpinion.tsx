// WhenYouNeedSecondOpinion.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Icon SVGs, custom to match the screenshot's feel.
const icons = [
  // U+2695 (Medical Symbol)
  <Box component="span" sx={{ fontSize: 32, color: "var(--error)" }}>
    ⚕️
  </Box>,
  // U+1F6E0 (Hammer/Wrench for surgery, abstract)
  <Box component="span" sx={{ fontSize: 32, color: "var(--info)" }}>
    🛠️
  </Box>,
  // U+1F4A1 (Light bulb, for "not working")
  <Box component="span" sx={{ fontSize: 32, color: "var(--warning)" }}>
    💡
  </Box>,
  // U+1F50D (Magnifying glass for Rare)
  <Box component="span" sx={{ fontSize: 32, color: "var(--primary-400)" }}>
    🔍
  </Box>,
  // U+1F9D0 (Face With Monocle for "Unclear")
  <Box component="span" sx={{ fontSize: 32, color: "var(--primary-600)" }}>
    🧐
  </Box>,
  // U+1F49A (Green heart for Peace of Mind)
  <Box component="span" sx={{ fontSize: 32, color: "var(--success)" }}>
    💚
  </Box>,
];

const cards = [
  {
    title: "Serious Diagnosis",
    desc: "You've received a diagnosis of cancer, heart disease, or another serious condition and want confirmation from a specialist.",
    iconIdx: 0,
    bg: "var(--primary-50)",
  },
  {
    title: "Surgery Recommended",
    desc: "Your doctor recommends surgery and you want to explore all options, including less invasive alternatives.",
    iconIdx: 1,
    bg: "var(--info)",
  },
  {
    title: "Treatment Not Working",
    desc: "Your current treatment isn’t providing the expected results and you need fresh perspective on alternatives.",
    iconIdx: 2,
    bg: "var(--warning)",
  },
  {
    title: "Rare Condition",
    desc: "You have a rare disease or complex symptoms that require specialized expertise not available locally.",
    iconIdx: 3,
    bg: "var(--primary-50)",
  },
  {
    title: "Unclear Diagnosis",
    desc: "Multiple doctors have given different opinions or you haven’t received a clear explanation of your condition.",
    iconIdx: 4,
    bg: "var(--primary-100)",
  },
  {
    title: "Peace of Mind",
    desc: "You want confirmation that you’re receiving the best possible care and haven’t missed any treatment options.",
    iconIdx: 5,
    bg: "var(--neutral-50)",
  },
];

export default function WhenYouNeedSecondOpinion() {
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
        When You Might Need a Second Opinion
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "var(--text-secondary)",
          mb: "var(--space-10)",
          fontSize: "var(--text-lg)",
        }}
      >
        These situations often benefit from expert review by specialists who understand your concerns
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-6)",
          justifyContent: "center",
          alignItems: "stretch",
          maxWidth: 1050,
          mx: "auto",
        }}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.08, type: "spring" }}
            viewport={{ once: true, amount: 0.45 }}
            style={{
              flex: "1 1 300px",
              maxWidth: 340,
              minWidth: 250,
              display: "flex",
            }}
          >
            <Box
              sx={{
                borderRadius: "var(--radius-lg)",
                bgcolor: "var(--bg-secondary)",
                p: "var(--space-6)",
                boxShadow: "var(--shadow-xs)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                minHeight: 196,
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  mb: "var(--space-3)",
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-full)",
                  bgcolor: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                }}
              >
                {icons[card.iconIdx]}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  mb: "var(--space-2)",
                  fontSize: "var(--text-lg)",
                  textAlign: "left",
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-sm)",
                  textAlign: "left",
                }}
              >
                {card.desc}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
