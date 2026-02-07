import { Box, Typography, Stack, Button, Card, CardContent, Chip } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import GavelIcon from "@mui/icons-material/Gavel";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import EmailIcon from "@mui/icons-material/Email";

interface MetaTag {
  name?: string;
  httpEquiv?: string;
  content: string;
}

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const pillars = [
  {
    icon: <MedicalInformationIcon sx={{ fontSize: 40, color: "white" }} />,
    title: "Clinical Evidence",
    description:
      "AI-powered second medical opinions backed by board-certified specialists. Transform clinical decision-making with comprehensive, evidence-based insights.",
    chips: ["Expert Analysis", "AI-Enhanced", "Evidence-Based"],
    gradient: "linear-gradient(135deg, var(--primary-500), var(--primary-700))",
  },
  {
    icon: <GavelIcon sx={{ fontSize: 40, color: "white" }} />,
    title: "Governance",
    description:
      "Real-time clinical governance platform for healthcare organizations. Ensure compliance, quality standards, and measurable outcomes across your network.",
    chips: ["Real-time Reviews", "Quality Metrics", "Compliance"],
    gradient: "linear-gradient(135deg, var(--primary-600), var(--primary-800))",
  },
  {
    icon: <FactCheckIcon sx={{ fontSize: 40, color: "white" }} />,
    title: "Audit",
    description:
      "Comprehensive clinical audit tools that track, measure, and improve care quality. Automated reporting and actionable analytics for continuous improvement.",
    chips: ["Automated Reports", "Analytics", "Continuous Improvement"],
    gradient: "linear-gradient(135deg, var(--primary-700), var(--primary-900))",
  },
];

const HIMSS26 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Continuia at HIMSS 2026 | Clinical Evidence, Governance & Audit";

    const metaTags: MetaTag[] = [
      { name: "robots", content: "noindex, nofollow, noarchive, nosnippet, nocache" },
      { name: "googlebot", content: "noindex, nofollow, noarchive, nosnippet, nocache" },
      { httpEquiv: "Cache-Control", content: "no-cache, no-store, must-revalidate" },
      { httpEquiv: "Pragma", content: "no-cache" },
      { httpEquiv: "Expires", content: "0" },
    ];

    const createdTags: HTMLMetaElement[] = [];
    metaTags.forEach((tag) => {
      const meta = document.createElement("meta");
      if (tag.name) meta.name = tag.name;
      else if (tag.httpEquiv) meta.httpEquiv = tag.httpEquiv;
      meta.content = tag.content;
      document.head.appendChild(meta);
      createdTags.push(meta);
    });

    return () => {
      createdTags.forEach((tag) => {
        if (document.head.contains(tag)) document.head.removeChild(tag);
      });
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" position="relative" width="100%">
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(150deg, var(--primary-600) 0%, var(--primary-800) 50%, var(--primary-900) 100%)",
          color: "white",
          py: { xs: "var(--space-16)", md: "var(--space-24)" },
          px: { xs: "var(--space-4)", sm: "var(--space-6)", md: "var(--space-12)" },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />

        <MotionBox initial="hidden" animate="visible" variants={staggerChildren} sx={{ position: "relative", zIndex: 1 }}>
          <MotionBox variants={fadeUp}>
            <Chip
              label="HIMSS 2026"
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "var(--text-xl)", sm: "var(--text-2xl)", md: "var(--text-3xl)" },
                px: { xs: 3, md: 5 },
                py: { xs: 1, md: 1.5 },
                mb: 4,
                height: "auto",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />
          </MotionBox>

          <MotionBox variants={fadeUp}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "var(--text-4xl)", sm: "var(--text-5xl)", md: "var(--text-7xl)" },
                mb: 2,
                lineHeight: "var(--leading-tight)",
                letterSpacing: "-0.03em",
              }}
            >
              continuia
            </Typography>
          </MotionBox>

          <MotionBox variants={fadeUp}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 400,
                fontSize: { xs: "var(--text-xl)", sm: "var(--text-2xl)", md: "var(--text-3xl)" },
                mb: 4,
                opacity: 0.9,
                letterSpacing: "0.05em",
              }}
            >
              Your Care. Continued
            </Typography>
          </MotionBox>

          <MotionBox variants={fadeUp}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                maxWidth: 700,
                mx: "auto",
                lineHeight: "var(--leading-relaxed)",
                opacity: 0.85,
              }}
            >
              Welcome to Continuia — the AI-powered platform transforming clinical decision-making with expert second opinions, governance, and audit solutions.
            </Typography>
          </MotionBox>
        </MotionBox>
      </Box>

      {/* Pillars Section */}
      <Box
        sx={{
          py: { xs: "var(--space-12)", md: "var(--space-20)" },
          px: { xs: "var(--space-4)", sm: "var(--space-6)", md: "var(--space-12)" },
          background: "var(--bg-secondary)",
        }}
      >
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          sx={{ maxWidth: 1200, mx: "auto" }}
        >
          <MotionBox variants={fadeUp} sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "var(--text-3xl)", md: "var(--text-4xl)" },
                color: "var(--text-primary)",
                mb: 2,
              }}
            >
              What We Do
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "var(--text-secondary)",
                fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                maxWidth: 600,
                mx: "auto",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              Three pillars powering better healthcare outcomes
            </Typography>
          </MotionBox>

          <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 4, md: 4 }}>
            {pillars.map((pillar) => (
              <MotionCard
                key={pillar.title}
                variants={fadeUp}
                sx={{
                  flex: 1,
                  borderRadius: "var(--radius-2xl)",
                  background: "var(--bg-primary)",
                  boxShadow: "var(--shadow-lg)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "var(--shadow-2xl)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: "var(--space-6)", md: "var(--space-8)" } }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "var(--radius-2xl)",
                      background: pillar.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    {pillar.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      mb: 2,
                      fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
                    }}
                  >
                    {pillar.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--text-secondary)",
                      lineHeight: "var(--leading-relaxed)",
                      mb: 3,
                      fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
                    }}
                  >
                    {pillar.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                    {pillar.chips.map((chip) => (
                      <Chip
                        key={chip}
                        label={chip}
                        size="small"
                        sx={{
                          bgcolor: "var(--primary-100)",
                          color: "var(--primary-800)",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </MotionCard>
            ))}
          </Stack>
        </MotionBox>
      </Box>

      {/* CTA Section */}
      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        sx={{
          background: "linear-gradient(150deg, var(--primary-300) 0%, var(--primary-600) 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          px: { xs: 3, sm: 5 },
          textAlign: "center",
          borderRadius: { xs: "1rem", md: "2rem" },
          m: { xs: 1, md: 2 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "var(--text-2xl)", sm: "var(--text-3xl)", md: "var(--text-4xl)" },
            mb: 2,
          }}
        >
          Let's Connect at HIMSS 2026
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "rgba(255,255,255,0.95)",
            fontWeight: 500,
            fontSize: { xs: "var(--text-base)", sm: "var(--text-lg)" },
            maxWidth: 560,
            mx: "auto",
            mb: 4,
            lineHeight: "var(--leading-relaxed)",
          }}
        >
          Discover how Continuia can transform clinical evidence, governance, and audit for your organization.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            onClick={() => navigate("/getInTouch")}
            sx={{
              bgcolor: "white",
              color: "var(--primary-600)",
              fontWeight: 800,
              px: 4,
              py: 1.5,
              borderRadius: "var(--radius-2xl)",
              fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
              textTransform: "none",
              boxShadow: "0 10px 22px -4px var(--primary-300)",
              "&:hover": { bgcolor: "var(--primary-100)" },
            }}
          >
            Get in Touch
          </Button>
          <Button
            variant="outlined"
            onClick={() => (window.location.href = "mailto:info@continuia.ai")}
            sx={{
              color: "white",
              borderColor: "white",
              px: 4,
              py: 1.2,
              borderRadius: "var(--radius-2xl)",
              fontWeight: 700,
              fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
              textTransform: "none",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.12)",
                borderColor: "var(--primary-100)",
              },
            }}
          >
            info@continuia.ai
          </Button>
        </Stack>
      </MotionBox>
    </Box>
  );
};

export default HIMSS26;
