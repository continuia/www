import { useState } from "react";
import { Box, Container, Grid, Paper, Stack, Typography, Button, Chip, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, type Variants } from "framer-motion";
import NumberFlow from "@number-flow/react";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/VerifiedOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import confetti from "canvas-confetti";

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

// Styled tabs for billing toggle (Segmented Control)
const BillingTabs = styled((props: any) => <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} variant="standard" />)(() => ({
  backgroundColor: "var(--bg-tertiary, #f8f8fb)",
  borderRadius: 28,
  padding: 6,
  position: "relative",
  minHeight: "48px",
  boxShadow: "var(--shadow-md, 0 6px 16px rgba(0,0,0,0.06))",
  display: "inline-flex",
  "& .MuiTabs-flexContainer": {
    zIndex: 2,
  },
  "& .MuiTabs-indicator": {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1,
    transition: "all .3s cubic-bezier(.4,0,.2,1)",
  },
  "& .MuiTabs-indicatorSpan": {
    background: "linear-gradient(90deg, var(--primary-200,#e3f2fd) 0%, var(--primary-100,#bbdefb) 100%)",
    borderRadius: 22,
    width: "100%",
    height: "100%",
    boxShadow: "0 1px 8px rgba(33, 150, 243, 0.10)",
  },
}));

const BillingTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minWidth: 110,
  minHeight: "38px !important",
  padding: "10px 18px",
  transition: "color .3s",
  color: theme.palette.text.secondary,
  fontWeight: 700,
  fontSize: "1.08rem",
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    fontWeight: 800,
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    icon: PersonIcon,
    price: { monthly: 250, yearly: 230 },
    originalPrice: { monthly: 99, yearly: 82 },
    description: "Designed for scaling businesses",
    gradient: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)",
    features: ["Unlimited projects", "500GB cloud storage", "24/7 phone & chat support", "Custom integrations", "Advanced team management", "Custom branding options", "API access included"],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    icon: TrendingUpIcon,
    price: { monthly: 500, yearly: 450 },
    originalPrice: { monthly: 39, yearly: 32 },
    description: "Best for growing professionals",
    gradient: "linear-gradient(135deg, var(--primary-400) 0%, var(--primary-600) 100%)",
    features: ["25 projects included", "50GB cloud storage", "Priority email & chat support", "Advanced analytics & insights", "Mobile + desktop apps", "Team collaboration tools"],
    cta: "Get Started",
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    icon: BusinessIcon,
    price: { monthly: 800, yearly: 750 },
    originalPrice: { monthly: 99, yearly: 82 },
    description: "Designed for scaling businesses",
    gradient: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)",
    features: ["Unlimited projects", "500GB cloud storage", "24/7 phone & chat support", "Custom integrations", "Advanced team management", "Custom branding options", "API access included"],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: GroupsIcon,
    price: { monthly: "Custom", yearly: "Custom" },
    originalPrice: null,
    description: "Tailored for large organizations",
    gradient: "linear-gradient(135deg, var(--neutral-700) 0%, var(--neutral-900) 100%)",
    features: ["Everything in Business", "Unlimited cloud storage", "Dedicated account manager", "Custom integrations & APIs", "Advanced security features", "SLA guarantees", "Training & onboarding", "White-label solutions"],
    cta: "Contact Us",
    popular: false,
    highlighted: true,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.7,
    },
  },
};

function PricingCard({ tier, isYearly }: { tier: (typeof TIERS)[0]; isYearly: boolean }) {
  const price = tier.price[isYearly ? "yearly" : "monthly"];
  const originalPrice = tier.originalPrice?.[isYearly ? "yearly" : "monthly"];
  const IconComponent = tier.icon;
  const savings = originalPrice && typeof price === "number" ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <MotionPaper
      variants={cardVariants}
      elevation={tier.highlighted ? 16 : tier.popular ? 12 : 6}
      sx={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        borderRadius: "var(--radius-3xl)",
        background: tier.highlighted ? "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)" : "var(--bg-primary)",
        border: tier.popular ? "3px solid var(--primary-500)" : tier.highlighted ? "2px solid var(--neutral-300)" : "1px solid var(--border-light)",
        transition: "all var(--transition-slow)",
        "&:hover": {
          boxShadow: tier.highlighted ? "var(--shadow-2xl)" : "var(--shadow-xl)",
          borderColor: tier.popular ? "var(--primary-600)" : "var(--primary-300)",
        },
      }}
    >
      {/* Background gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 140,
          background: tier.gradient,
          opacity: tier.highlighted ? 0.2 : 0.1,
          zIndex: 1,
        }}
      />

      {/* Popular badge */}
      {tier.popular && (
        <MotionBox
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 250 }}
          sx={{
            position: "absolute",
            top: 7,
            right: -15,
            zIndex: 10,
          }}
        >
          <Chip
            icon={<StarIcon sx={{ fontSize: 16, color: "#fff !important" }} />}
            label="Most Popular"
            sx={{
              bgcolor: "var(--primary-500)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.75rem",
              px: 1.5,
              py: 0.5,
              transform: "rotate(12deg)",
              boxShadow: "var(--shadow-lg)",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          />
        </MotionBox>
      )}

      <Stack
        sx={{
          p: 4,
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ minHeight: 80, pt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "var(--radius-xl)",
                background: tier.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-lg)",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              <IconComponent sx={{ fontSize: 28, color: "#fff" }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  fontSize: "1.5rem",
                  lineHeight: 1.2,
                }}
              >
                {tier.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--text-tertiary)",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  lineHeight: 1.4,
                }}
              >
                {tier.description}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Pricing */}
        <Box sx={{ minHeight: 140, mt: 4 }}>
          {typeof price === "number" ? (
            <Stack spacing={1}>
              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography
                  variant="h1"
                  sx={{
                    color: "var(--text-tertiary)",
                    fontSize: "3rem",
                    fontWeight: 600,
                  }}
                >
                  $
                </Typography>
                <NumberFlow
                  value={price}
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "var(--text-primary)",
                    lineHeight: 0.9,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "var(--text-tertiary)",
                    ml: 1,
                    fontWeight: 600,
                    fontSize: "1.1rem",
                  }}
                >
                  /month
                </Typography>
              </Stack>
              {/* Price details */}
              <Box sx={{ minHeight: 50 }}>
                {originalPrice && (
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "var(--text-muted)",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                      }}
                    >
                      ${originalPrice}
                    </Typography>
                    {savings > 0 && (
                      <Chip
                        size="small"
                        label={`Save ${savings}%`}
                        sx={{
                          bgcolor: "var(--success)",
                          color: "#fff",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          height: 22,
                          px: 1,
                        }}
                      />
                    )}
                  </Stack>
                )}
                {isYearly && typeof price === "number" && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "var(--text-tertiary)",
                      display: "block",
                      mt: 1,
                      fontSize: "0.8rem",
                    }}
                  >
                    Billed annually (${Math.round(price * 12)} per year)
                  </Typography>
                )}
              </Box>
            </Stack>
          ) : (
            <Box marginTop={3}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  fontSize: "3.5rem",
                  lineHeight: 0.9,
                }}
              >
                {price}
              </Typography>
              <Box sx={{ height: 50 }} />
            </Box>
          )}
        </Box>

        {/* Features */}
        <Stack spacing={2} sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              mb: 1,
            }}
          >
            What's included:
          </Typography>
          <Stack spacing={1.5}>
            {tier.features.map((feature, idx) => (
              <Stack key={idx} direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "var(--primary-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    mt: 0.1,
                    border: "2px solid var(--primary-200)",
                  }}
                >
                  <CheckIcon sx={{ fontSize: 16, color: "var(--primary-600)", fontWeight: 700 }} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                    lineHeight: 1.5,
                    fontSize: "0.9rem",
                  }}
                >
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <Button
            variant={tier.highlighted || tier.popular ? "contained" : "outlined"}
            size="large"
            fullWidth
            sx={{
              py: 1,
              borderRadius: "var(--radius-xl)",
              fontWeight: 700,
              fontSize: "1.1rem",
              textTransform: "none",
              background: tier.highlighted ? "linear-gradient(135deg, var(--neutral-800) 0%, var(--neutral-900) 100%)" : tier.popular ? "linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%)" : "transparent",
              color: tier.highlighted || tier.popular ? "#fff" : "var(--primary-600)",
              border: tier.highlighted || tier.popular ? "none" : "2px solid var(--primary-300)",
              boxShadow: tier.highlighted || tier.popular ? "var(--shadow-lg)" : "var(--shadow-sm)",
              transition: "all var(--transition-normal)",
              "&:hover": {
                background: tier.highlighted ? "linear-gradient(135deg, var(--neutral-700) 0%, var(--neutral-800) 100%)" : tier.popular ? "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)" : "var(--primary-50)",
                boxShadow: "var(--shadow-xl)",
                borderColor: tier.highlighted || tier.popular ? "transparent" : "var(--primary-500)",
              },
            }}
          >
            {tier.cta}
          </Button>
        </Box>
      </Stack>
    </MotionPaper>
  );
}

// Confetti function
function launchConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ["#1976d2", "#64b5f6", "#90caf9", "#4caf50", "#81c784"];
  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }
    const particleCount = 35;
    confetti({
      particleCount,
      startVelocity: 30,
      spread: 330,
      gravity: 0.7,
      origin: {
        x: randomInRange(0.2, 0.8),
        y: Math.random() * 0.4 + 0.2,
      },
      colors,
    });
  }, 340);
}

export default function ProfessionalPricingTiers() {
  // tabIndex: 0 for Monthly, 1 for Yearly
  const [tabIndex, setTabIndex] = useState(0);
  const isYearly = tabIndex === 1;

  // Confetti only when switching to yearly
  const handleBillingChange = (_: any, newValue: number) => {
    if (newValue === 1 && tabIndex !== 1) {
      setTimeout(() => {
        launchConfetti();
      }, 120);
    }
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 40%, var(--bg-tertiary) 80%, var(--bg-primary) 100%)",
        py: { xs: 6, md: 10 },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(ellipse at top, var(--primary-50) 0%, transparent 70%)",
          opacity: 0.6,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header and billing tabs */}
        <Box sx={{ textAlign: "center", mb: 8, maxWidth: "800px", mx: "auto" }}>
          <MotionBox initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2rem", sm: "2.6rem", md: "3.3rem", lg: "3.5rem" },
                color: "var(--text-primary)",
                mb: 3,
                background: "linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 50%, var(--neutral-700) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Choose Your Plan
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "var(--text-tertiary)",
                fontWeight: 500,
                mb: 4,
                lineHeight: 1.6,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.23rem" },
                px: { xs: 2, sm: 0 },
              }}
            >
              Flexible pricing designed to grow with your business. Start free and upgrade as you scale.
            </Typography>
            {/* Modern Billing Toggle Tabs */}
            <MotionBox initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.6, type: "spring", stiffness: 200 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 1 }}>
              <BillingTabs value={tabIndex} onChange={handleBillingChange} aria-label="billing tabs">
                <BillingTab label="Monthly" />
                <BillingTab
                  label={
                    <>
                      <span style={{ position: "relative", zIndex: 10 }}>Yearly</span> <Chip label="Save 20%" size="small" sx={{ ml: 1, bgcolor: "var(--success)", color: "#fff", fontWeight: 700, fontSize: "0.74rem" }} />
                    </>
                  }
                />
              </BillingTabs>
            </MotionBox>
          </MotionBox>
        </Box>
        {/* Pricing Cards */}
        <MotionBox variants={containerVariants} initial="hidden" animate="show">
          <Grid container spacing={3}>
            {TIERS.map((tier) => (
              <Grid key={tier.id} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
                <PricingCard tier={tier} isYearly={isYearly} />
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}
