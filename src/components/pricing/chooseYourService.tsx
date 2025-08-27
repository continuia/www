import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Container,
  Chip,
  Stack
} from "@mui/material";
import { 
  Check as CheckIcon, 
  FlashOn as FlashOnIcon, 
  Search as SearchIcon, 
  Psychology as PsychologyIcon 
} from "@mui/icons-material";

interface ServicePlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  features: string[];
  recommendation: string;
  isPopular: boolean;
  icon: React.ReactNode;
  color: string;
  buttonText: string;
}

const ServiceSelector: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const servicePlans: ServicePlan[] = [
    {
      id: "quick",
      title: "Quick Check",
      subtitle: "For one focused question",
      price: "$299",
      duration: "Typically 2-3 business days",
      features: ["Plain-language summary", "Single specialist review", "Clear recommendation"],
      recommendation: 'Good for: "Is this surgery necessary?"',
      isPopular: false,
      icon: <FlashOnIcon sx={{ fontSize: 40 }} />,
      color: "#10b981",
      buttonText: "Start with Quick Check"
    },
    {
      id: "detailed",
      title: "Detailed Review",
      subtitle: "For multiple tests or differing opinions",
      price: "$599",
      duration: "Typically 3-5 business days",
      features: ["Comprehensive analysis", "Follow-up clarifications included", "Multiple record review"],
      recommendation: 'Good for: "I have multiple reports and need clarity."',
      isPopular: true,
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      color: "#8b5cf6",
      buttonText: "Start with Detailed Review"
    },
    {
      id: "complex",
      title: "Complex Review",
      subtitle: "For rare, chronic, or multi-specialty cases",
      price: "$999",
      duration: "Typically 5-7 business days",
      features: ["Multi-specialist consultation", "Consolidated report", "Rare condition expertise"],
      recommendation: 'Good for: "I\'ve seen many doctors, and answers still conflict."',
      isPopular: false,
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      color: "#f59e0b",
      buttonText: "Start with Complex Review"
    }
  ];

  return (
    <Box 
      sx={{ 
        py: "var(--space-20)",
        background: `
          radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%),
          linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%)
        `,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)",
          filter: "blur(80px)",
          zIndex: 0
        }}
      />
      
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: "var(--space-16)" }}>
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: "var(--space-4)" }}>
            <Box sx={{ width: "40px", height: "4px", backgroundColor: "#10b981", borderRadius: "2px" }} />
            <Box sx={{ width: "40px", height: "4px", backgroundColor: "#8b5cf6", borderRadius: "2px" }} />
            <Box sx={{ width: "40px", height: "4px", backgroundColor: "#f59e0b", borderRadius: "2px" }} />
          </Stack>
          
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: "var(--text-3xl)", md: "var(--text-5xl)" },
              fontWeight: 900,
              mb: "var(--space-4)",
              background: "linear-gradient(135deg, #1f2937, #6b21a8)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Choose Your Service
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
            Select the level of review that fits your needs
          </Typography>
        </Box>

        {/* Service Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: "var(--space-8)",
            alignItems: "stretch"
          }}
        >
          {servicePlans.map((plan) => (
            <Card
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              sx={{
                position: "relative",
                borderRadius: "var(--radius-3xl)",
                border: selectedPlan === plan.id 
                  ? `3px solid ${plan.color}`
                  : "2px solid transparent",
                background: selectedPlan === plan.id
                  ? `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${plan.color}, ${plan.color}80) border-box`
                  : "white",
                boxShadow: selectedPlan === plan.id 
                  ? `0 25px 50px ${plan.color}30` 
                  : "0 10px 40px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "var(--transition-normal)",
                transform: plan.isPopular ? "scale(1.05)" : "scale(1)",
                overflow: "hidden",
                "&:hover": {
                  boxShadow: `0 30px 60px ${plan.color}40`,
                  transform: plan.isPopular ? "scale(1.06)" : "scale(1.02)"
                }
              }}
            >
              {/* Background gradient overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "150px",
                  height: "150px",
                  background: `radial-gradient(circle, ${plan.color}15, transparent 70%)`,
                  borderRadius: "50%",
                  transform: "translate(50px, -50px)"
                }}
              />

              {/* Popular badge */}
              {plan.isPopular && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "var(--space-4)",
                    right: "var(--space-4)",
                    zIndex: 10
                  }}
                >
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
                </Box>
              )}

              <CardContent sx={{ p: "var(--space-8)", position: "relative", zIndex: 1 }}>
                {/* Icon with enhanced styling */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: "var(--space-6)"
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      boxShadow: `0 15px 35px ${plan.color}50`,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: "-4px",
                        borderRadius: "50%",
                        padding: "4px",
                        background: `linear-gradient(135deg, ${plan.color}, transparent, ${plan.color})`,
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "xor",
                        opacity: 0.6
                      }
                    }}
                  >
                    {plan.icon}
                  </Box>
                </Box>

                {/* Title and Subtitle */}
                <Box sx={{ textAlign: "center", mb: "var(--space-6)" }}>
                  <Typography
                    variant="h4"
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
                      fontSize: "var(--text-base)",
                      mb: "var(--space-4)"
                    }}
                  >
                    {plan.subtitle}
                  </Typography>
                </Box>

                {/* Price with enhanced styling */}
                <Box
                  sx={{
                    textAlign: "center",
                    mb: "var(--space-6)",
                    p: "var(--space-4)",
                    background: `linear-gradient(135deg, ${plan.color}10, ${plan.color}05)`,
                    borderRadius: "var(--radius-2xl)",
                    border: `1px solid ${plan.color}20`
                  }}
                >
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      color: plan.color,
                      fontWeight: 900,
                      mb: "var(--space-1)",
                      fontSize: { xs: "var(--text-3xl)", md: "var(--text-4xl)" }
                    }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "var(--text-tertiary)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500
                    }}
                  >
                    {plan.duration}
                  </Typography>
                </Box>

                {/* Features */}
                <List sx={{ mb: "var(--space-6)", p: 0 }}>
                  {plan.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} sx={{ px: 0, py: "var(--space-1)" }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
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
                            fontWeight: 500,
                            fontSize: "var(--text-sm)"
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Recommendation */}
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${plan.color}08, ${plan.color}05)`,
                    borderRadius: "var(--radius-xl)",
                    p: "var(--space-4)",
                    mb: "var(--space-8)",
                    border: `1px solid ${plan.color}15`
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--text-secondary)",
                      fontStyle: "italic",
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-relaxed)",
                      textAlign: "center"
                    }}
                  >
                    {plan.recommendation}
                  </Typography>
                </Box>

                {/* CTA Button */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                    color: "white",
                    borderRadius: "var(--radius-full)",
                    py: "var(--space-4)",
                    fontSize: "var(--text-base)",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: `0 12px 28px ${plan.color}40`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${plan.color}dd, ${plan.color})`,
                      boxShadow: `0 16px 36px ${plan.color}50`,
                      transform: "translateY(-2px)"
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

export default ServiceSelector;
