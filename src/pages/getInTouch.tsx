import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Paper, TextField, Button, Typography, Stack } from "@mui/material";
import { useToast } from "../components/toastContext";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const { addToast } = useToast();

  // Handle actual POST
  const onSubmit = async (data: FormValues) => {
    try {
      // Submit to Netlify forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "get-in-touch",
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
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        background: "var(--bg-secondary)",
        py: { xs: 6, md: 12 },
        px: { xs: 2, sm: 4, md: 8 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

      {/* Actual Form Card */}
      <Stack
        spacing={4}
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: 560,
        }}
      >
        {/* Page Title */}
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 900,
            color: "var(--primary-700)",
            mb: 0.5,
            fontSize: { xs: "2.2rem", sm: "2.6rem", md: "2.9rem" },
            letterSpacing: "-1.5px",
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            fontSize: { xs: "1.07rem", md: "1.18rem" },
            mb: { xs: 2, md: 3 },
            maxWidth: 440,
          }}
        >
          We’d love to hear from you. Fill out the form below and we’ll get back to you as soon as possible.
        </Typography>

        <Paper
          elevation={3}
          sx={{
            borderRadius: "var(--radius-2xl)",
            background: "var(--bg-primary)",
            boxShadow: "var(--shadow-lg)",
            p: { xs: 3, md: 5 },
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
      </Stack>
    </Box>
  );
}
