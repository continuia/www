import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Paper, TextField, Button, Typography, Stack, Card, CardContent, Chip, Divider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useToast } from "../components/toastContext";
import SEOHead from "../components/common/SEOHead";
import { getPageSEO } from "../utils/seoConfig";

// --- VALIDATION SCHEMA ---
const schema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }).min(1, "Email is required"),
  phone: z
    .string()
    .min(8, { message: "Phone is required" })
    .regex(/^[0-9+\- ]+$/, { message: "Enter a valid phone number" }),
  message: z.string().min(3, "Message is required"),
});

type FormValues = z.infer<typeof schema>;

// --- NETLIFY ENCODE FUNCTION ---
const encode = (data: Record<string, string>) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

/**
 * GetInTouchPage
 * Responsive full-page "Get in Touch" form, Netlify compatible.
 */
export default function GetInTouchPage() {
  const seoData = getPageSEO('contact');
  
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Get in Touch - Continuia",
    "description": "Contact Continuia for healthcare solutions and support",
    "url": "https://continuia.ai/getInTouch",
    "mainEntity": {
      "@type": "MedicalOrganization",
      "name": "Continuia",
      "telephone": "+1-800-CONTINUIA",
      "email": "mailto://contact@continuia.ai",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "telephone": "+1-800-CONTINUIA",
          "email": "mailto://support@continuia.ai",
          "availableLanguage": ["English", "Hindi", "Arabic", "Spanish"],
          "hoursAvailable": "24/7"
        },
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "telephone": "+1-800-CONTINUIA",
          "email": "mailto://sales@continuia.ai",
          "availableLanguage": ["English", "Hindi", "Arabic"],
          "hoursAvailable": "Mon-Fri 9AM-6PM"
        }
      ]
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const { addToast } = useToast();

  // Load Calendly script
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  // Handle actual POST
  const onSubmit = async (data: FormValues) => {
    try {
      // Submit to Netlify forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "get-in-touch",
          title: "Get-In-Touch Form",
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      addToast("Thank you for getting in touch. We'll be in contact soon!", "success");
      reset();
    } catch (error: any) {
      // Error handling, display toast
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        addToast("Network error. Please check your connection and try again.", "error");
      } else if (error.message.includes("HTTP error")) {
        addToast("Server error. Please try again later.", "error");
      } else {
        addToast("Could not submit your request. Please try again later.", "error");
      }
    }
  };

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        structuredData={contactStructuredData}
      />
      
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          background: "var(--bg-secondary)",
          py: { xs: "var(--space-6)", md: "var(--space-12)" },
          px: { xs: "var(--space-4)", sm: "var(--space-6)", md: "var(--space-8)" },
        }}
      >
      {/* Netlify hidden static form for build-time detection */}
      <form
        {...({
          name: "get-in-touch",
          netlify: true,
          "netlify-honeypot": "bot-field",
          hidden: true,
        } as any)}
      >
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <textarea name="message"></textarea>
      </form>

      {/* Main Container */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Page Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: "var(--space-8)", md: "var(--space-12)" },
            maxWidth: 800,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              background: "linear-gradient(90deg, var(--primary-700), var(--primary-900))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              mb: "var(--space-3)",
              fontSize: { xs: "var(--text-4xl)", sm: "var(--text-5xl)", md: "var(--text-6xl)" },
              letterSpacing: "-0.02em",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "var(--text-secondary)",
              fontWeight: 500,
              fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
              lineHeight: "var(--leading-relaxed)",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </Typography>
        </Box>

        {/* Two Column Layout */}
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: "var(--space-8)", lg: "var(--space-12)" }}
          alignItems="flex-start"
          sx={{ width: "100%" }}
        >
          {/* Left Column - Contact Form */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: "var(--radius-2xl)",
                background: "var(--bg-primary)",
                boxShadow: "var(--shadow-lg)",
                p: { xs: "var(--space-6)", md: "var(--space-8)" },
                width: "100%",
              }}
            >
          <form onSubmit={handleSubmit(onSubmit)} name="get-in-touch" data-netlify="true" data-netlify-honeypot="bot-field" autoComplete="off" noValidate>
            {/* Hidden Netlify field for client-side submissions */}
            <input type="hidden" name="form-name" value="get-in-touch" />

            {/* Honeypot anti-spam field */}
            <div style={{ display: "none" }}>
              <label>
                Don’t fill this out if you’re human:
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              required
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete="email"
              InputProps={{
                style: { borderRadius: "var(--radius-lg)" },
              }}
              sx={{
                bgcolor: "var(--bg-secondary)",
                mb: 2,
              }}
            />

            <TextField
              label="Phone"
              type="tel"
              fullWidth
              margin="normal"
              required
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              autoComplete="tel"
              InputProps={{
                style: { borderRadius: "var(--radius-lg)" },
              }}
              sx={{
                bgcolor: "var(--bg-secondary)",
                mb: 2,
              }}
            />

            <TextField
              label="Your Message"
              fullWidth
              margin="normal"
              required
              multiline
              minRows={4}
              {...register("message")}
              error={!!errors.message}
              helperText={errors.message?.message}
              InputProps={{
                style: { borderRadius: "var(--radius-lg)" },
              }}
              sx={{
                bgcolor: "var(--bg-secondary)",
                mb: 2,
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 2,
                py: { xs: 2 },
                background: "linear-gradient(90deg, var(--primary-500), var(--primary-700))",
                color: "var(--text-inverse)",
                borderRadius: "var(--radius-lg)",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "var(--shadow-sm)",
                "&:hover": {
                  background: "linear-gradient(90deg, var(--primary-600), var(--primary-800))",
                },
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
            </Paper>
          </Box>

          {/* Right Column - Contact Information */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Stack spacing={{ xs: "var(--space-6)", md: "var(--space-8)" }}>
              {/* Contact Methods */}
              <Card sx={{ borderRadius: "var(--radius-2xl)", background: "var(--bg-primary)", boxShadow: "var(--shadow-lg)" }}>
                <CardContent sx={{ p: { xs: "var(--space-6)", md: "var(--space-8)" } }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                      color: "var(--primary-700)",
                      fontWeight: 700,
                      mb: "var(--space-6)",
                      fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" }
                    }}
                  >
                    💬 Additional Ways to Reach Us
                  </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    📧 Email Support
                  </Typography>
                  <Typography variant="body2" color="var(--text-secondary)" sx={{ mb: 1 }}>
                    <strong>General:</strong> <a href="mailto:contact@continuia.ai" style={{ color: 'var(--primary-600)', textDecoration: 'none' }}>contact@continuia.ai</a>
                  </Typography>
                  <Typography variant="body2" color="var(--text-secondary)" sx={{ mb: 1 }}>
                    <strong>Support:</strong> <a href="mailto:support@continuia.ai" style={{ color: 'var(--primary-600)', textDecoration: 'none' }}>support@continuia.ai</a> (24/7 Response)
                  </Typography>
                  <Typography variant="body2" color="var(--text-secondary)">
                    <strong>Sales:</strong> <a href="mailto:sales@continuia.ai" style={{ color: 'var(--primary-600)', textDecoration: 'none' }}>sales@continuia.ai</a>
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Accordion
                  sx={{
                    borderRadius: "var(--radius-lg)",
                    background: "var(--bg-secondary)",
                    boxShadow: "none",
                    "&:before": { display: "none" }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      borderRadius: "var(--radius-lg)",
                      "&:hover": {
                        background: "var(--bg-tertiary)"
                      }
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "var(--text-primary)" }}>
                        📅 Schedule a Meeting
                      </Typography>
                      <Typography variant="body2" color="var(--text-secondary)">
                        Book a consultation with our healthcare experts
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 2 }}>
                    <div
                      className="calendly-inline-widget"
                      data-url="https://calendly.com/continuia/30min"
                      style={{
                        minWidth: "320px",
                        height: "700px"
                      }}
                    ></div>
                  </AccordionDetails>
                </Accordion>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    🌐 Connect with Us
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>
                    <Chip
                      label="LinkedIn"
                      size="medium"
                      sx={{
                        bgcolor: "#0077B5",
                        color: "white",
                        "&:hover": { bgcolor: "#005885" }
                      }}
                      component="a"
                      href="https://linkedin.com/company/continuia"
                      target="_blank"
                      clickable
                    />
                    <Chip
                      label="Instagram"
                      size="medium"
                      sx={{
                        bgcolor: "#E4405F",
                        color: "white",
                        "&:hover": { bgcolor: "#C13584" }
                      }}
                      component="a"
                      href="https://instagram.com/continuia"
                      target="_blank"
                      clickable
                    />
                    <Chip
                      label="Website"
                      size="medium"
                      sx={{
                        background: "linear-gradient(90deg, var(--primary-500), var(--primary-700))",
                        color: "var(--text-inverse)",
                        "&:hover": {
                          background: "linear-gradient(90deg, var(--primary-600), var(--primary-800))",
                        }
                      }}
                      component="a"
                      href="https://continuia.ai"
                      clickable
                    />
                  </Stack>
                </Box>
              </Stack>
                </CardContent>
              </Card>

              {/* Services */}
              <Card sx={{ borderRadius: "var(--radius-2xl)", background: "var(--bg-primary)", boxShadow: "var(--shadow-lg)" }}>
                <CardContent sx={{ p: { xs: "var(--space-6)", md: "var(--space-8)" } }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                      color: "var(--primary-700)",
                      fontWeight: 700,
                      mb: "var(--space-6)",
                      fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" }
                    }}
                  >
                    🏥 Our Services
                  </Typography>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "var(--text-primary)" }}>
                        Continuia Insights™
                      </Typography>
                      <Typography variant="body2" color="var(--text-secondary)">
                        AI-powered second medical opinions for patients seeking expert analysis and treatment recommendations from board-certified specialists.
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "var(--text-primary)" }}>
                        Continuia Governance™
                      </Typography>
                      <Typography variant="body2" color="var(--text-secondary)">
                        Clinical governance platform for healthcare providers, offering real-time specialist consultations and quality improvement tools.
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card sx={{ borderRadius: "var(--radius-2xl)", background: "var(--bg-primary)", boxShadow: "var(--shadow-lg)" }}>
                <CardContent sx={{ p: { xs: "var(--space-6)", md: "var(--space-8)" } }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                      color: "var(--primary-700)",
                      fontWeight: 700,
                      mb: "var(--space-6)",
                      fontSize: { xs: "var(--text-xl)", md: "var(--text-2xl)" }
                    }}
                  >
                    🕒 Business Hours
                  </Typography>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: "var(--text-primary)" }}>
                        Customer Support
                      </Typography>
                      <Typography variant="body2" color="var(--text-secondary)">
                        24/7 - Available around the clock in English, Hindi, Arabic, and Spanish
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: "var(--text-primary)" }}>
                        Sales & Business Development
                      </Typography>
                      <Typography variant="body2" color="var(--text-secondary)">
                        Monday - Friday: 9:00 AM - 6:00 PM (Local Time)
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
    </>
  );
}
