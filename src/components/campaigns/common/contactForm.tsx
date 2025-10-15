import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useToast } from "../../toastContext";

const schema = z.object({
  email: z.email({ message: "Enter a valid email address" }).min(1, "Email is required"),
  phone: z
    .string()
    .min(8, { message: "Phone is required" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Enter a valid phone number" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

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
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "campaign-initiative",
          title: "Campaign-Form",
          email: data.email,
          phone: data.phone,
          message: data.message || "",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      addToast("Thank you for joining the founding circle! We'll be in touch soon.", "success");
      reset();
    } catch (error: any) {
      console.error("Form submission error:", error);

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
        id="joinTheFoundingCircleForm"
        sx={{
          width: { xs: "100%" },
          fontFamily: "roboto",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            boxShadow: "none",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" name="campaign-initiative" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="campaign-initiative" />

            <div style={{ display: "none" }}>
              <label>
                Don't fill this out if you're human:
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* First Row - Name and Email */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column" },
                  gap: 2,
                }}
              >
                <TextField
                  label="Phone"
                  type="tel"
                  fullWidth
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  InputProps={{
                    style: { borderRadius: "var(--radius-lg)" },
                  }}
                  sx={{
                    bgcolor: "var(--bg-secondary)",
                  }}
                />

                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  autoComplete="email"
                  placeholder="Enter your email address"
                  InputProps={{
                    style: { borderRadius: "var(--radius-lg)" },
                  }}
                  sx={{
                    bgcolor: "var(--bg-secondary)",
                  }}
                />
              </Box>

              {/* Message - Full width */}
              <TextField
                label="Message"
                fullWidth
                multiline
                rows={4}
                {...register("message")}
                error={!!errors.message}
                helperText={errors.message?.message || "Optional: Share any additional information about your background or interests"}
                placeholder="Tell us more about your experience, interests, or how you'd like to contribute..."
                InputProps={{
                  style: { borderRadius: "var(--radius-lg)" },
                }}
                sx={{
                  bgcolor: "var(--bg-secondary)",
                }}
              />

              {/* Submit Button */}
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
                {isSubmitting ? "Sending..." : "Submit"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
}
