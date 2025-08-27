import React from "react";
import { Box, Typography, Card, CardContent, Container, Chip } from "@mui/material";
import { Biotech as BiotechIcon, Psychology as PsychologyIcon, VideoCall as VideoCallIcon, Translate as TranslateIcon } from "@mui/icons-material";

interface AddOnService {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  popular?: boolean;
  timeline?: string;
}

const AddOnServices: React.FC = () => {
  const addOnServices: AddOnService[] = [
    {
      id: "radiology",
      title: "Radiology Re-read",
      description: "Get a second expert opinion on your imaging studies including MRI, CT scans, and X-rays",
      price: "$149",
      icon: <BiotechIcon sx={{ fontSize: 32 }} />,
      color: "#ef4444",
      bgColor: "#fef2f2",
      timeline: "2-3 days",
    },
    {
      id: "pathology",
      title: "Pathology Re-review",
      description: "Comprehensive pathology consultation for biopsy results and tissue analysis",
      price: "$199",
      icon: <PsychologyIcon sx={{ fontSize: 32 }} />,
      color: "#8b5cf6",
      bgColor: "#f3f4f6",
      popular: true,
      timeline: "3-4 days",
    },
    {
      id: "video",
      title: "Live Video Consultation",
      description: "One-on-one video discussion with your specialist to clarify questions",
      price: "$99",
      icon: <VideoCallIcon sx={{ fontSize: 32 }} />,
      color: "#10b981",
      bgColor: "#f0fdf4",
      timeline: "Same day",
    },
    {
      id: "translation",
      title: "Certified Medical Translation",
      description: "Professional translation of medical documents by certified medical translators",
      price: "$79",
      icon: <TranslateIcon sx={{ fontSize: 32 }} />,
      color: "#3b82f6",
      bgColor: "#eff6ff",
      timeline: "1-2 days",
    },
  ];

  return (
    <Box
      sx={{
        py: "var(--space-20)",

        background: `
          radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)
        `,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: "var(--space-16)" }}>
          <Box
            sx={{
              width: "60px",
              height: "4px",
              background: "linear-gradient(90deg, #8b5cf6, #ef4444, #10b981, #3b82f6)",
              margin: "0 auto var(--space-4)",
              borderRadius: "2px",
            }}
          />

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: "var(--text-3xl)", md: "var(--text-5xl)" },
              fontWeight: 800,
              mb: "var(--space-4)",
              color: "var(--text-primary)",
            }}
          >
            Specialized Add-On Services
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "var(--text-secondary)",
              fontWeight: 400,
              fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Enhance your second opinion with additional expert consultations
          </Typography>
        </Box>

        {/* Service Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: "var(--space-6)",
            alignItems: "stretch",
          }}
        >
          {addOnServices.map((service) => (
            <Card
              key={service.id}
              sx={{
                position: "relative",
                borderRadius: "var(--radius-3xl)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-lg)",
                cursor: "pointer",
                transition: "var(--transition-normal)",
                backgroundColor: "var(--bg-primary)",
                "&:hover": {
                  boxShadow: `0 20px 40px ${service.color}30`,
                  transform: "translateY(-8px)",
                  borderColor: service.color,
                },
              }}
            >
              <CardContent sx={{ p: "var(--space-8)", textAlign: "center", height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Badges */}
                <Box sx={{ position: "absolute", top: "var(--space-4)", right: "var(--space-4)", display: "flex", gap: 1 }}>
                  {service.popular && (
                    <Chip
                      label="Popular"
                      size="small"
                      sx={{
                        backgroundColor: "#f59e0b",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "10px",
                      }}
                    />
                  )}
                  {service.timeline && (
                    <Chip
                      label={service.timeline}
                      size="small"
                      sx={{
                        backgroundColor: service.color,
                        color: "white",
                        fontWeight: 600,
                        fontSize: "10px",
                      }}
                    />
                  )}
                </Box>

                {/* Icon */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: service.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: service.color,
                    mb: "var(--space-6)",
                    margin: "0 auto var(--space-6)",
                    border: `2px solid ${service.color}20`,
                    boxShadow: `0 8px 24px ${service.color}20`,
                  }}
                >
                  {service.icon}
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, mb: "var(--space-6)" }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      color: "var(--text-primary)",
                      fontWeight: 700,
                      mb: "var(--space-3)",
                      fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--text-secondary)",
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-relaxed)",
                      maxWidth: "280px",
                      margin: "0 auto",
                    }}
                  >
                    {service.description}
                  </Typography>
                </Box>

                {/* Price */}
                <Box
                  sx={{
                    backgroundColor: service.bgColor,
                    borderRadius: "var(--radius-full)",
                    p: "var(--space-4)",
                    border: `1px solid ${service.color}30`,
                  }}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      color: service.color,
                      fontWeight: 800,
                      fontSize: "var(--text-2xl)",
                    }}
                  >
                    {service.price}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "var(--text-tertiary)",
                      fontSize: "var(--text-xs)",
                    }}
                  >
                    Add to any review
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AddOnServices;
