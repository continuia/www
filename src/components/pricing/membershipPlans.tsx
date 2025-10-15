import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Container, 
  Chip, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Stack
} from "@mui/material";
import { 
  Check as CheckIcon, 
  SmartToy as SmartToyIcon, 
  WorkspacePremium as WorkspacePremiumIcon 
} from "@mui/icons-material";

interface MembershipPlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
  isRecommended: boolean;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  buttonText: string;
  savings?: string;
}

const MembershipOptions: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("premium");

  const membershipPlans: MembershipPlan[] = [
    {
      id: "ai",
      title: "AI Summary Plan",
      subtitle: "Perfect for occasional use",
      price: "$199",
      period: "/year",
      features: [
        "Unlimited AI summaries", 
        "Basic medical record analysis", 
        "Plain-language explanations", 
        "Upgrade to physician review anytime"
      ],
      isRecommended: false,
      icon: <SmartToyIcon sx={{ fontSize: 28 }} />,
      color: "#3b82f6",
      bgColor: "#eff6ff",
      buttonText: "Start with AI Plan",
      savings: "Save vs. pay-per-use"
    },
    {
      id: "premium",
      title: "Continua+ Membership",
      subtitle: "Best value for comprehensive care",
      price: "$999",
      period: "/year",
      features: [
        "Everything in AI Plan", 
        "Physician review credits included", 
        "Family sharing (up to 4 members)", 
        "Priority support & faster turnaround", 
        "Exclusive access to specialists"
      ],
      isRecommended: true,
      icon: <WorkspacePremiumIcon sx={{ fontSize: 28 }} />,
      color: "#8b5cf6",
      bgColor: "#f3f4f6",
      buttonText: "Choose Premium",
      savings: "Save $500+ vs. individual reviews"
    }
  ];

  return (
    <Box 
      sx={{ 
        py: "var(--space-20)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Floating background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08), transparent)",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />
      
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "-5%",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)",
          filter: "blur(50px)",
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: "var(--space-16)" }}>
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: "var(--space-4)" }}>
            <Box sx={{ width: "50px", height: "4px", backgroundColor: "#3b82f6", borderRadius: "2px" }} />
            <Box sx={{ width: "50px", height: "4px", backgroundColor: "#8b5cf6", borderRadius: "2px" }} />
          </Stack>
          
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: "var(--text-3xl)", md: "var(--text-5xl)" },
              fontWeight: 900,
              mb: "var(--space-4)",
              background: "linear-gradient(135deg, #1e293b, #7c3aed)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Membership Options
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: "var(--text-secondary)",
              fontWeight: 400,
              fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
              maxWidth: "600px",
              margin: "0 auto"
            }}
          >
            Save with our subscription plans and get ongoing healthcare support
          </Typography>
        </Box>

        {/* Membership Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: "var(--space-10)",
            maxWidth: "1000px",
            margin: "0 auto"
          }}
        >
          {membershipPlans.map((plan) => (
            <Card
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              sx={{
                position: "relative",
                borderRadius: "var(--radius-3xl)",
                border: selectedPlan === plan.id 
                  ? `3px solid ${plan.color}`
                  : "2px solid transparent",
                background: `
                  linear-gradient(white, white) padding-box,
                  ${selectedPlan === plan.id 
                    ? `linear-gradient(135deg, ${plan.color}, ${plan.color}cc) border-box`
                    : 'transparent'
                  }
                `,
                boxShadow: selectedPlan === plan.id 
                  ? `0 25px 50px ${plan.color}25` 
                  : "0 15px 35px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "var(--transition-normal)",
                transform: plan.isRecommended ? "scale(1.05)" : "scale(1)",
                overflow: "hidden",
                "&:hover": {
                  boxShadow: `0 30px 60px ${plan.color}35`,
                  transform: plan.isRecommended ? "scale(1.06)" : "scale(1.02)"
                }
              }}
            >
              {/* Background pattern */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "200px",
                  height: "200px",
                  background: `radial-gradient(circle, ${plan.color}12, transparent 60%)`,
                  borderRadius: "50%",
                  transform: "translate(80px, -80px)"
                }}
              />

              <CardContent sx={{ p: "var(--space-10)", position: "relative", zIndex: 1 }}>
                {/* Badges */}
                <Box sx={{ position: "absolute", top: "var(--space-4)", right: "var(--space-4)", display: "flex", gap: 1 }}>
                  {plan.isRecommended && (
                    <Chip
                      label="Most Popular"
                      size="small"
                      sx={{
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "11px",
                        boxShadow: "0 4px 12px rgba(245, 158, 11, 0.4)"
                      }}
                    />
                  )}
                  {plan.savings && (
                    <Chip
                      label={plan.savings}
                      size="small"
                      sx={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "10px"
                      }}
                    />
                  )}
                </Box>

                {/* Enhanced Icon */}
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    mb: "var(--space-6)",
                    boxShadow: `0 12px 30px ${plan.color}40`,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: "-3px",
                      borderRadius: "50%",
                      padding: "3px",
                      background: `linear-gradient(135deg, ${plan.color}aa, transparent, ${plan.color}aa)`,
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "xor",
                      opacity: 0.7
                    }
                  }}
                >
                  {plan.icon}
                </Box>

                {/* Content */}
                <Box sx={{ mb: "var(--space-6)" }}>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      color: "var(--text-primary)",
                      fontWeight: 800,
                      mb: "var(--space-2)",
                      fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" }
                    }}
                  >
                    {plan.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--text-secondary)",
                      fontWeight: 400,
                      fontSize: "var(--text-base)",
                      mb: "var(--space-6)"
                    }}
                  >
                    {plan.subtitle}
                  </Typography>
                </Box>

                {/* Enhanced Price Display */}
                <Box
                  sx={{
                    mb: "var(--space-8)",
                    p: "var(--space-6)",
                    background: `linear-gradient(135deg, ${plan.color}08, ${plan.color}05)`,
                    borderRadius: "var(--radius-2xl)",
                    border: `2px solid ${plan.color}15`,
                    textAlign: "center"
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "center", mb: "var(--space-2)" }}>
                    <Typography
                      variant="h1"
                      component="span"
                      sx={{
                        color: plan.color,
                        fontWeight: 900,
                        fontSize: { xs: "var(--text-4xl)", md: "var(--text-5xl)" },
                        lineHeight: 1
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{
                        color: "var(--text-tertiary)",
                        ml: "var(--space-2)",
                        fontSize: "var(--text-xl)"
                      }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--text-tertiary)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500
                    }}
                  >
                    {plan.id === "premium" ? "Equivalent to $83/month" : "Equivalent to $16.50/month"}
                  </Typography>
                </Box>

                {/* Enhanced Features */}
                <List sx={{ mb: "var(--space-8)", p: 0 }}>
                  {plan.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} sx={{ px: 0, py: "var(--space-2)" }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box
                          sx={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 4px 12px ${plan.color}30`
                          }}
                        >
                          <CheckIcon sx={{ fontSize: 16, color: "white" }} />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          variant: "body2",
                          sx: {
                            color: "var(--text-secondary)",
                            fontSize: "var(--text-base)",
                            fontWeight: 500
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Enhanced CTA Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                    color: "white",
                    borderRadius: "var(--radius-full)",
                    py: "var(--space-4)",
                    fontSize: "var(--text-lg)",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: `0 12px 28px ${plan.color}40`,
                    position: "relative",
                    overflow: "hidden",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "left 0.6s ease"
                    },
                    "&:hover": {
                      background: `linear-gradient(135deg, ${plan.color}dd, ${plan.color})`,
                      boxShadow: `0 16px 36px ${plan.color}50`,
                      transform: "translateY(-2px)",
                      "&:before": {
                        left: "100%"
                      }
                    },
                    transition: "var(--transition-normal)"
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipOptions;
