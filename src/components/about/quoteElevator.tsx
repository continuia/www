import { Box, Grid, Paper, Stack, Typography, Avatar } from "@mui/material";
import { motion, type Variants } from "framer-motion";

const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, type: "spring", stiffness: 50, damping: 18 },
  },
};

function QuoteChip() {
  return (
    <MotionBox
      initial={{ scale: 0.92, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      sx={{
        width: 32,
        height: 32,
        borderRadius: "var(--radius-full)",
        backgroundColor: "var(--primary-100)",
        color: "var(--primary-700)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-sm)",
      }}
      aria-hidden
    >
      <Box component="span" sx={{ fontWeight: 800, fontSize: 16, lineHeight: 1 }}>
        "
      </Box>
    </MotionBox>
  );
}

function TestimonialCard({ quote, name, role, avatar }: Testimonial) {
  return (
    <MotionPaper
      variants={cardVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      elevation={0}
      sx={{
        position: "relative",
        px: { xs: 3, md: 4 },
        py: { xs: 2.5, md: 3.25 },
        borderRadius: "18px",
        bgcolor: "rgba(255,255,255,0.92)",
        border: "1px solid var(--primary-100)",
        boxShadow: "var(--shadow-md)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        maxWidth: 560,
        width: "100%",
        mx: "auto",
        transition: "box-shadow var(--transition-normal), transform var(--transition-fast)",
        "&:hover": {
          boxShadow: "var(--shadow-lg)",
          transform: "translateY(-1px)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0 0 auto 0",
          height: 4,
          background: "linear-gradient(90deg, var(--primary-400), var(--primary-600))",
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
        },
      }}
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        <QuoteChip />
        <Typography
          component="blockquote"
          sx={{
            m: 0,
            color: "var(--neutral-700)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: { xs: "0.98rem", sm: "1.06rem" },
            lineHeight: 1.75,
            letterSpacing: 0.15,
          }}
        >
          "{quote}"
        </Typography>
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ pt: 0.5 }}>
          {avatar ? (
            <Avatar src={avatar} alt={name} sx={{ width: 36, height: 36 }} />
          ) : (
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "var(--primary-600)",
                color: "var(--text-inverse)",
                fontWeight: 700,
              }}
            >
              {name?.[0] ?? "•"}
            </Avatar>
          )}
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "var(--primary-700)",
                fontWeight: 700,
                fontSize: "0.98rem",
                lineHeight: 1.2,
              }}
            >
              {name}
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--neutral-500)", fontWeight: 500 }}>
              {role}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </MotionPaper>
  );
}

export default function TestimonialsTwoUp() {
  const data: Testimonial[] = [
    {
      quote: "I'm not building just another health-tech company, I’m building the global infrastructure for medical trust.",
      name: "Shree Mandadi",
      role: "Founder & CEO, Continuia",
    },
    {
      quote: "Every medical opinion carries weight. My job is to make sure the second one carries confidence.",
      name: "Dr. Unnikrishnan",
      role: "Chief Medical Officer & COO, Continuia",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        backgroundColor: "var(--neutral-50)",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {data.map((item, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center">
              <TestimonialCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
