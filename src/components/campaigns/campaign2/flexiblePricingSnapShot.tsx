import React from "react";
import { Box, Typography, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Container, Chip, Stack } from "@mui/material";
import { Check as CheckIcon, AttachMoney as DiscountIcon, CalendarToday as PEPMIcon, AccountBalance as CoPayIcon, Star as PopularIcon, TrendingUp as TrendingIcon } from "@mui/icons-material";
import { motion, type Variants } from "framer-motion";

interface PricingPlan {
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

const FlexiblePricing: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const pricingPlans: PricingPlan[] = [
    {
      id: "discount",
      title: "Member Discount",
      subtitle: "Affinity Model",
      price: "FREE",
      duration: "For employers",
      features: ["No upfront costs for employers", "25% discount for employees", "Basic support included", "Perfect for testing"],
      recommendation: 'Good for: "Low-budget employers, pilot programs"',
      isPopular: false,
      icon: <DiscountIcon sx={{ fontSize: 40 }} />,
      color: "#10b981",
      buttonText: "Start with Member Discount",
    },
    {
      id: "pepm",
      title: "PEPM Subscription",
      subtitle: "Predictable Pricing",
      price: "$1-2 PEPM",
      duration: "Per employee per month",
      features: ["Predictable monthly costs", "Full coverage access", "Priority support", "Usage analytics included"],
      recommendation: 'Good for: "Employers seeking predictable budgeting"',
      isPopular: true,
      icon: <PEPMIcon sx={{ fontSize: 40 }} />,
      color: "#8b5cf6",
      buttonText: "Start with PEPM Plan",
    },
    {
      id: "copay",
      title: "Co-Pay / Subsidized",
      subtitle: "Shared Cost Model",
      price: "SHARED",
      duration: "Flexible contribution",
      features: ["Employer pays partial cost", "Employee cost sharing", "Flexible contribution levels", "Cost control benefits"],
      recommendation: 'Good for: "Mixed-cost control + shared utilization"',
      isPopular: false,
      icon: <CoPayIcon sx={{ fontSize: 40 }} />,
      color: "#f59e0b",
      buttonText: "Start with Co-Pay Plan",
    },
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
        overflow: "hidden",
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
          zIndex: 0,
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
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {/* Header Section */}
          <motion.div variants={itemVariants}>
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
                  WebkitTextFillColor: "transparent",
                }}
              >
                Flexible Pricing Models
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "var(--text-secondary)",
                  fontWeight: 400,
                  fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Choose the pricing model that works best for your organization
              </Typography>
            </Box>
          </motion.div>

          {/* Pricing Cards - EQUAL HEIGHTS */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: "var(--space-8)",
              alignItems: "stretch", // Force equal heights
              mb: "var(--space-16)",
            }}
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                style={{ height: "100%" }} // Ensure motion.div takes full height
              >
                <Card
                  sx={{
                    position: "relative",
                    borderRadius: "var(--radius-3xl)",
                    border: "2px solid transparent", // No dynamic border changes
                    background: "white",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: "var(--transition-normal)",
                    // Only scale the middle (popular) card
                    transform: plan.isPopular ? "scale(1.05)" : "scale(1)",
                    overflow: "hidden",
                    height: "100%", // Force full height
                    display: "flex", // Use flex to control internal layout
                    flexDirection: "column",
                    "&:hover": {
                      boxShadow: `0 30px 60px ${plan.color}40`,
                      transform: plan.isPopular ? "scale(1.06)" : "scale(1.02)",
                    },
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
                      transform: "translate(50px, -50px)",
                    }}
                  />

                  {/* Popular badge - only for middle card */}
                  {plan.isPopular && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "var(--space-4)",
                        right: "var(--space-4)",
                        zIndex: 10,
                      }}
                    >
                      <Chip
                        icon={<PopularIcon sx={{ fontSize: "14px !important" }} />}
                        label="Most Popular"
                        size="small"
                        sx={{
                          background: "linear-gradient(135deg, #f59e0b, #d97706)",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "11px",
                          boxShadow: "0 4px 12px rgba(245, 158, 11, 0.4)",
                          "& .MuiChip-icon": {
                            color: "white",
                          },
                        }}
                      />
                    </Box>
                  )}

                  <CardContent
                    sx={{
                      p: "var(--space-8)",
                      position: "relative",
                      zIndex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between", // Distribute content evenly
                    }}
                  >
                    {/* Top Section - Icon, Title, Price */}
                    <Box>
                      {/* Icon with enhanced styling */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: "var(--space-6)",
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
                              opacity: 0.6,
                            },
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
                            fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" },
                            lineHeight: "var(--leading-tight)",
                          }}
                        >
                          {plan.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "var(--text-secondary)",
                            fontSize: "var(--text-base)",
                            mb: "var(--space-4)",
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
                          border: `1px solid ${plan.color}20`,
                        }}
                      >
                        <Typography
                          variant="h2"
                          component="div"
                          sx={{
                            color: plan.color,
                            fontWeight: 900,
                            mb: "var(--space-1)",
                            fontSize: { xs: "var(--text-3xl)", md: "var(--text-4xl)" },
                            lineHeight: "var(--leading-none)",
                          }}
                        >
                          {plan.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "var(--text-tertiary)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 500,
                          }}
                        >
                          {plan.duration}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Middle Section - Features (flexible height) */}
                    <Box sx={{ flexGrow: 1 }}>
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
                                  justifyContent: "center",
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
                                  fontSize: "var(--text-sm)",
                                  lineHeight: "var(--leading-relaxed)",
                                },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    {/* Bottom Section - Recommendation & Button (aligned) */}
                    <Box>
                      {/* Recommendation */}
                      <Box
                        sx={{
                          background: `linear-gradient(135deg, ${plan.color}08, ${plan.color}05)`,
                          borderRadius: "var(--radius-xl)",
                          p: "var(--space-4)",
                          mb: "var(--space-8)",
                          border: `1px solid ${plan.color}15`,
                          minHeight: "80px", // Ensure consistent height for recommendations
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "var(--text-secondary)",
                            fontStyle: "italic",
                            fontSize: "var(--text-sm)",
                            lineHeight: "var(--leading-relaxed)",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          {plan.recommendation}
                        </Typography>
                      </Box>

                      {/* CTA Button */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          startIcon={<TrendingIcon />}
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
                              transform: "translateY(-2px)",
                            },
                            transition: "var(--transition-normal)",
                          }}
                        >
                          {plan.buttonText}
                        </Button>
                      </motion.div>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* Flexible Pricing Note */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                background: "white",
                borderRadius: "var(--radius-3xl)",
                p: "var(--space-8)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                border: "2px solid var(--primary-200)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background decoration */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "8px",
                  height: "100%",
                  background: "linear-gradient(180deg, #10b981, #8b5cf6, #f59e0b)",
                }}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing="var(--space-4)" alignItems="center" sx={{ pl: "var(--space-4)" }}>
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf6, #6b21a8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    boxShadow: "0 15px 40px rgba(139, 92, 246, 0.4)",
                    flexShrink: 0,
                  }}
                >
                  🤝
                </Box>
                <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "var(--text-2xl)", md: "var(--text-3xl)" },
                      color: "var(--text-primary)",
                      mb: "var(--space-2)",
                      lineHeight: "var(--leading-tight)",
                    }}
                  >
                    Let's Negotiate Together
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                      color: "var(--text-secondary)",
                      lineHeight: "var(--leading-relaxed)",
                      fontWeight: 500,
                    }}
                  >
                    <strong style={{ color: "#8b5cf6" }}>Pricing is always flexible</strong> — we tailor based on employee count, utilization projections, and your goals. Let's find the perfect solution for your organization.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FlexiblePricing;
