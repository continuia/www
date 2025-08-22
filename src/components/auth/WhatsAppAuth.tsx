import React from "react";
import { Box, Button, TextField, Typography, InputAdornment, OutlinedInput } from "@mui/material";
import { Phone } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../toastContext";
import { useAuthStore } from "../../store/useAuthStore";

const schema = z.object({
  phoneNumber: z
    .string()
    .min(8, "Enter valid phone")
    .regex(/^\+?[0-9\s\-]{8,}$/, "Enter valid phone"),
  otp: z.string().length(6, "OTP must be 6 digits").optional(),
});
type FormValues = z.infer<typeof schema>;

const WhatsAppAuth: React.FC = () => {
  const loginWithToken = useAuthStore((s) => s.loginWithToken);
  const { addToast } = useToast();

  const { control, handleSubmit, formState, setError } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { phoneNumber: "", otp: "" },
  });

  const [step, setStep] = React.useState<0 | 1>(0);
  const [countdown, setCountdown] = React.useState(0);

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const fieldStyle = {
    bgcolor: "var(--neutral-100)",
    borderRadius: "var(--radius-lg)",
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "var(--border-light)" },
      "&:hover fieldset": { borderColor: "var(--border-focus)" },
      "&.Mui-focused fieldset": {
        borderColor: "var(--primary-500)",
        borderWidth: 2,
      },
    },
  };

  const requestOTP = async (data: FormValues) => {
    try {
      await fetch("/api/social-auth/whatsapp/request-otp", {
        method: "POST",
        body: JSON.stringify({ phoneNumber: data.phoneNumber }),
        headers: { "Content-Type": "application/json" },
      });
      setStep(1);
      setCountdown(60);
      addToast("OTP sent via WhatsApp", "success");
    } catch {
      setError("phoneNumber", {
        type: "manual",
        message: "Failed to send OTP",
      });
    }
  };

  const verifyOTP = async (data: FormValues) => {
    try {
      const resp = await fetch("/api/social-auth/whatsapp/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          phoneNumber: data.phoneNumber,
          otp: data.otp,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.message || "Invalid OTP");

      loginWithToken(result.token, result.user);
      addToast(`Welcome, ${result.user.firstName}`, "success");
    } catch (e: any) {
      setError("otp", { type: "manual", message: e.message || "Invalid OTP" });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(step === 0 ? requestOTP : verifyOTP)}>
      {step === 0 && (
        <>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter phone number"
                error={!!formState.errors.phoneNumber}
                helperText={formState.errors.phoneNumber?.message}
                fullWidth
                sx={fieldStyle}
                slots={{ input: OutlinedInput }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: "var(--neutral-400)" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "var(--primary-600)",
              color: "white",
              fontWeight: 600,
              borderRadius: "var(--radius-lg)",
              "&:hover": { bgcolor: "var(--primary-700)" },
            }}
          >
            Send OTP
          </Button>
        </>
      )}

      {step === 1 && (
        <>
          <Controller name="otp" control={control} render={({ field }) => <TextField {...field} placeholder="Enter OTP" error={!!formState.errors.otp} helperText={formState.errors.otp?.message} fullWidth sx={fieldStyle} slots={{ input: OutlinedInput }} />} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "var(--primary-600)",
              color: "white",
              fontWeight: 600,
              borderRadius: "var(--radius-lg)",
              "&:hover": { bgcolor: "var(--primary-700)" },
            }}
          >
            Verify OTP
          </Button>

          <Typography align="center" mt={2} color="var(--text-tertiary)">
            {countdown > 0 ? `Resend OTP in ${countdown}s` : <Button onClick={() => setStep(0)}>Change Number</Button>}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default WhatsAppAuth;
