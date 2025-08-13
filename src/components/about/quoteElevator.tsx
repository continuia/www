import { Paper, Typography, Stack, Box } from "@mui/material";
import { motion } from "framer-motion";

// Use motion.create(Box) for latest Framer Motion + MUI v7
const MotionBox = motion.create(Box);

export default function QuoteElevator() {
  const QUOTES = [
    {
      quote: "I’m not building just another health-tech company, I’m building the global infrastructure for medical trust.",
      person: "Shree Mandadi,",
      title: "Founder & CEO, Continuia",
    },
    {
      quote: "Every medical opinion carries weight. My job is to make sure the second one carries confidence.",
      person: "Dr. Unnikrishnan,",
      title: "Chief Medical Officer & COO, Continuia",
    },
  ];

  return (
    <Stack
      spacing={4}
      sx={{
        my: { xs: 2, md: 5 },
        width: "100%",
        alignItems: "center",
      }}
    >
      {QUOTES.map(({ quote, person, title }, idx) => (
        <MotionBox
          key={idx}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 48,
            damping: 18,
          }}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              bgcolor: "var(--bg-glass)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--primary-100)",
              boxShadow: "var(--shadow-lg)",
              maxWidth: 620,
              width: "100%",
              mx: "auto",
              my: 2,
              backdropFilter: "blur(4px)",
              transition: "box-shadow var(--transition-normal)",
            }}
          >
            <Box component="blockquote" sx={{ m: 0, p: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontStyle: "italic",
                  color: "var(--neutral-800)",
                  fontWeight: 500,
                  fontSize: { xs: "1.08rem", sm: "1.18rem" },
                  lineHeight: 1.55,
                  mb: 1.5,
                  "&::before,&::after": {
                    content: '""',
                  },
                }}
              >
                “{quote}”
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "var(--primary-700)",
                fontWeight: 700,
                letterSpacing: 0.04,
                fontSize: "1rem",
                mt: 1,
              }}
            >
              — {person}
              <Box
                component="span"
                sx={{
                  ml: 1,
                  color: "var(--neutral-500)",
                  fontWeight: 500,
                  fontSize: "0.97em",
                }}
              >
                {title}
              </Box>
            </Typography>
          </Paper>
        </MotionBox>
      ))}
    </Stack>
  );
}
