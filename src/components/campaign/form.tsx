import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useToast } from "../toastContext";

const schema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }).min(1, "Email is required"),
  phone: z
    .string()
    .min(8, { message: "Phone is required" })
    .regex(/^[0-9+\- ]+$/, { message: "Enter a valid phone number" }),
  message: z.string().min(3, "Message is required"),
});

type FormValues = z.infer<typeof schema>;

// Utility function to encode form data for Netlify
const encode = (data: Record<string, string>) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { addToast } = useToast();

  const onSubmit = async (data: FormValues) => {
    try {
      // Submit to Netlify forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "campaign-initiative", // Must match the name in your static form
          title:"Campaign-Form",
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      addToast("Thank you for joining the initiative! We'll be in touch soon.", "success");
      reset(); // Clear form fields on success
    } catch (error: any) {
      console.error("Form submission error:", error);

      // Handle different types of errors
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
      {/* Hidden static form for Netlify detection - place this in your main HTML file or component */}
      <form
        {...({
          name: "campaign-initiative",
          netlify: true,
          "netlify-honeypot": "bot-field",
          hidden: true,
        } as any)}
      >
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <textarea name="message"></textarea>
      </form>

      <Box
        id="joinTheInitiativeForm"
        sx={{
          minWidth: "280px",
          maxWidth: "600px",
          width: { base: "100%", lg: "40%" },
          mb: 3,
          fontFamily: "roboto",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, lg: 4 },
            borderRadius: "var(--radius-2xl)",
            background: "var(--bg-primary)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              color: "var(--primary-600)",
              mb: 2,
              fontWeight: 700,
            }}
          >
            Join the Initiative
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" name="campaign-initiative" data-netlify="true" data-netlify-honeypot="bot-field">
            {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="campaign-initiative" />

            {/* Honeypot field for spam protection */}
            <div style={{ display: "none" }}>
              <label>
                Don't fill this out if you're human:
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
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
              label="Message"
              fullWidth
              margin="normal"
              multiline
              rows={4}
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
    </>
  );
}
