// OurSecondOpinionsDifferent.tsx
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp";

const items = [
  {
    bg: "var(--primary-600)",
    icon: (
      <Box
        component="span"
        sx={{
          fontSize: 28,
          color: "var(--text-inverse)",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        ★
      </Box>
    ),
    title: "Board-Certified Specialists",
    desc: "Every case reviewed by doctors who specialize in your specific condition, with years of clinical experience.",
  },
  {
    bg: "var(--info)",
    icon: (
      <Box
        component="span"
        sx={{
          fontSize: 28,
          color: "var(--text-inverse)",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        ⏱️
      </Box>
    ),
    title: "Faster, More Thorough Review",
    desc: "Advanced tools help our specialists analyze your case more quickly while ensuring nothing is missed.",
  },
  {
    bg: "var(--success)",
    icon: (
      <Box
        component="span"
        sx={{
          fontSize: 28,
          color: "var(--text-inverse)",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        ✔️
      </Box>
    ),
    title: "Easy to Understand",
    desc: "Complex medical information translated into clear, compassionate language you can understand and act on.",
  },
  {
    bg: "var(--primary-400)",
    icon: (
      <Box
        component="span"
        sx={{
          fontSize: 28,
          color: "var(--text-inverse)",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        🌍
      </Box>
    ),
    title: "Global Access",
    desc: "Connect with top specialists worldwide, regardless of your location or local healthcare limitations.",
  },
];

export default function OurSecondOpinionsDifferent() {
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
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
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
          What Makes Our Second Opinions Different
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "var(--text-secondary)",
            mb: "var(--space-10)",
            fontSize: "var(--text-lg)",
          }}
        >
          Expert care enhanced by advanced technology and compassionate understanding
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-8)",
          justifyContent: "center",
          alignItems: "stretch",
          mx: "auto",
          maxWidth: 1400,
          px: 2,
        }}
      >
        <Box
          sx={{
            flex: "1 1 420px",
            minWidth: 320,
            maxWidth: 540,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
            mt: { xs: "var(--space-10)", md: 0 },
            justifyContent: "center",
          }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.07,
                type: "spring",
              }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ display: "flex" }}
            >
              <Box
                sx={{
                  minWidth: 48,
                  height: 48,
                  borderRadius: "var(--radius-full)",
                  bgcolor: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: "var(--space-4)",
                  mt: "4px",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                {item.icon}
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-sm)",
                    mt: "var(--space-1)",
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
        <Box
          sx={{
            flex: "1 1 350px",
            maxWidth: 450,
            minHeight: 350,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
          }}
        >
          <motion.img
            src={heroIllustration}
            alt="Specialist consultation illustration"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-lg)",
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
