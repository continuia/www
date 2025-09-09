import React, { useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Container, Paper } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FrequentlyAskedQuestions: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>("pricing");

  const faqData: FAQItem[] = [
    {
      id: "pricing",
      question: "Do I see pricing before committing?",
      answer: "Yes, absolutely. We believe in complete transparency. You'll see the exact cost for your selected service before making any commitment. No hidden fees, no surprises - just clear, upfront pricing so you can make an informed decision.",
    },
    {
      id: "ai-summary",
      question: "Can I start with an AI summary?",
      answer: "Yes, you can start with our AI Summary Plan for $199/year. This gives you unlimited AI-powered summaries of your medical records. You can always upgrade to a physician review anytime if you need a more detailed analysis from our board-certified specialists.",
    },
    {
      id: "doctor-privacy",
      question: "Will my doctor see this?",
      answer: "Your privacy is completely protected. Your current doctor will not be notified about your second opinion unless you choose to share the results with them. All reviews are confidential and HIPAA-compliant. You have full control over who sees your information.",
    },
    {
      id: "turnaround",
      question: "How fast will I get my opinion?",
      answer: "Turnaround times vary by service level: Quick Check typically takes 2-3 business days, Detailed Review takes 3-5 business days, and Complex Review takes 5-7 business days. AI summaries are available within minutes of uploading your records.",
    },
  ];

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: "var(--space-20)", backgroundColor: "var(--bg-secondary)" }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: "var(--space-16)" }}>
          <Box
            sx={{
              width: "60px",
              height: "4px",
              background: "linear-gradient(90deg, var(--primary-500), var(--info))",
              margin: "0 auto var(--space-4)",
              borderRadius: "2px",
            }}
          />

          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "var(--text-3xl)", md: "var(--text-5xl)" },
              fontWeight: 800,
              mb: "var(--space-4)",
              color: "var(--text-primary)",
            }}
          >
            Frequently Asked Questions
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
            Get answers to common questions
          </Typography>
        </Box>

        {/* FAQ Accordions */}
        <Box sx={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqData.map((faq) => (
            <Paper
              key={faq.id}
              elevation={0}
              sx={{
                mb: "var(--space-4)",
                borderRadius: "var(--radius-2xl)",
                border: "1px solid var(--border-light)",
                overflow: "hidden",
                backgroundColor: "var(--bg-primary)",
                "&:hover": {
                  boxShadow: "var(--shadow-md)",
                  borderColor: "var(--primary-300)",
                },
                transition: "var(--transition-normal)",
              }}
            >
              <Accordion
                expanded={expanded === faq.id}
                onChange={handleChange(faq.id)}
                disableGutters
                elevation={0}
                sx={{
                  backgroundColor: "transparent",
                  "&:before": { display: "none" },
                  "&.Mui-expanded": { margin: 0 },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: expanded === faq.id ? "var(--primary-500)" : "var(--text-tertiary)",
                        fontSize: 28,
                        transition: "var(--transition-normal)",
                      }}
                    />
                  }
                  sx={{
                    px: "var(--space-6)",
                    py: "var(--space-4)",
                    minHeight: "72px",
                    "&:hover": {
                      backgroundColor: "var(--bg-accent)",
                    },
                    transition: "var(--transition-normal)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: expanded === faq.id ? "var(--primary-600)" : "var(--text-primary)",
                      fontWeight: 600,
                      fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
                      transition: "var(--transition-normal)",
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    px: "var(--space-6)",
                    pb: "var(--space-6)",
                    pt: 0,
                    borderTop: expanded === faq.id ? `1px solid var(--border-light)` : "none",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--text-secondary)",
                      lineHeight: "var(--leading-relaxed)",
                      fontSize: "var(--text-base)",
                      pt: "var(--space-4)",
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FrequentlyAskedQuestions;
