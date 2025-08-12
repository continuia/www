import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
const MotionBox = motion.create(Box);

const items = [
  {
    number: 1,
    title: "Patient-Centered Design",
    text: "Every feature is designed with the patient's emotional and medical needs at the center. We understand that seeking a second opinion can be an anxious time, so our interface and interactions are crafted to provide comfort and clarity.",
  },
  {
    number: 2,
    title: "Clinical Validation",
    text: "All AI-generated insights are reviewed by qualified medical professionals before reaching patients. This human-in-the-loop approach ensures accuracy, safety, and clinical relevance in every recommendation.",
  },
  {
    number: 3,
    title: "Cultural Adaptation",
    text: "Our platform respects regional healthcare norms, practices, and cultural sensitivities. From India to the UAE to the US, we adapt our approach while maintaining the highest standards of care.",
  },
  {
    number: 4,
    title: "Continuous Improvement",
    text: "We learn from outcomes to enhance future recommendations. Our AI systems evolve based on real-world feedback while maintaining strict privacy and ethical guidelines.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring" },
  }),
};

export default function EthicalAIApproach() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--primary-50)",
        py: "var(--space-20)",
        px: { xs: "var(--space-4)", md: "var(--space-12)" },
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "var(--primary-700)",
          fontWeight: 700,
          textAlign: "center",
          mb: "var(--space-2)",
          fontSize: "var(--text-xl)",
        }}
      >
        Our Approach to Ethical AI in Healthcare
      </Typography>
      <Typography
        sx={{
          color: "var(--text-secondary)",
          textAlign: "center",
          mb: "var(--space-10)",
          fontSize: "var(--text-base)",
          maxWidth: 820,
          mx: "auto",
        }}
      >
        How we deliver value to patients and healthcare providers through responsible innovation
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "var(--space-8)",
          maxWidth: 1100,
          mx: "auto",
          textAlign: "left",
        }}
      >
        {items.map((item, idx) => (
          <MotionBox
            key={item.number}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            sx={{
              flex: "1 1 calc(50% - var(--space-8))",
              minWidth: 320,
              maxWidth: 512,
              bgcolor: "var(--bg-primary)",
              borderRadius: "var(--radius-md)",
              p: "var(--space-6)",
              boxShadow: "var(--shadow-sm)",
              mb: { xs: "var(--space-8)", md: 0 },
            }}
          >
            <Box
              sx={{
                bgcolor: "var(--primary-600)",
                borderRadius: "var(--radius-full)",
                width: 32,
                height: 32,
                color: "white",
                fontWeight: 600,
                fontSize: "var(--text-base)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: "var(--space-4)",
              }}
            >
              {item.number}
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: "var(--space-2)", color: "var(--primary-700)" }}>
              {item.title}
            </Typography>
            <Typography sx={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>{item.text}</Typography>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
}
