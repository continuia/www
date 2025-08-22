import React, { useMemo, useState } from "react";
import { Box, TextField, Button, CircularProgress, InputAdornment, IconButton, OutlinedInput, Typography, Divider } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff, Person } from "@mui/icons-material";
import { useToast } from "../toastContext";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/useAuthStore";

type Mode = "login" | "signup";

// Base schema with optional names; we’ll enforce conditionally
const baseSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof baseSchema>;

const UsernamePasswordAuth: React.FC = () => {
  const loginWithToken = useAuthStore((s) => s.loginWithToken);
  const { addToast } = useToast();

  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);

  // One unified resolver; add a refinement when in signup mode
  const schemaForMode = useMemo(() => {
    if (mode === "signup") {
      return baseSchema.extend({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      });
    }
    // login mode uses base rules (email + password required)
    return baseSchema;
  }, [mode]);

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(schemaForMode),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/social-auth/username-password/register";

      const payload =
        mode === "login"
          ? { email: data.email, password: data.password }
          : {
              email: data.email,
              password: data.password,
              firstName: data.firstName,
              lastName: data.lastName,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || (mode === "login" ? "Login failed" : "Registration failed"));

      if (!result?.token || !result?.user) {
        throw new Error("Invalid response from server");
      }

      loginWithToken(result.token, result.user);
      addToast(`Welcome, ${result.user.firstName || result.user.email}`, "success");
    } catch (error: any) {
      addToast(error?.message || (mode === "login" ? "Login failed" : "Registration failed"), "error");
    }
  };

  const toggleMode = () => {
    const nextMode: Mode = mode === "login" ? "signup" : "login";
    setMode(nextMode);
    setShowPassword(false);
    // reset keeps consistent types for both modes
    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

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
    "& .MuiInputBase-input::placeholder": {
      color: "var(--text-tertiary)",
      opacity: 1,
    },
  } as const;

  const isLogin = mode === "login";

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>

      {!isLogin && (
        <>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="First name"
                error={!!formState.errors.firstName}
                helperText={formState.errors.firstName?.message}
                fullWidth
                margin="normal"
                sx={fieldStyle}
                slots={{ input: OutlinedInput }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "var(--neutral-400)" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Last name"
                error={!!formState.errors.lastName}
                helperText={formState.errors.lastName?.message}
                fullWidth
                margin="normal"
                sx={fieldStyle}
                slots={{ input: OutlinedInput }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "var(--neutral-400)" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </>
      )}

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Email"
            error={!!formState.errors.email}
            helperText={formState.errors.email?.message}
            fullWidth
            margin="normal"
            sx={fieldStyle}
            slots={{ input: OutlinedInput }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "var(--neutral-400)" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            error={!!formState.errors.password}
            helperText={formState.errors.password?.message}
            fullWidth
            margin="normal"
            sx={fieldStyle}
            slots={{ input: OutlinedInput }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "var(--neutral-400)" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((p) => !p)} edge="end" aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
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
        disabled={formState.isSubmitting}
        sx={{
          mt: "var(--space-3)",
          bgcolor: "var(--primary-600)",
          color: "var(--text-inverse)",
          fontWeight: 600,
          borderRadius: "var(--radius-lg)",
          transition: "var(--transition-normal)",
          "&:hover": { bgcolor: "var(--primary-700)" },
        }}
      >
        {formState.isSubmitting ? <CircularProgress size={24} color="inherit" /> : isLogin ? "Sign In" : "Create Account"}
      </Button>

      <Divider sx={{ my: "var(--space-3)" }} />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "var(--text-secondary)", mb: "var(--space-1)" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Typography>
        <Button variant="text" onClick={toggleMode} disabled={formState.isSubmitting} sx={{ color: "var(--primary-600)", fontWeight: 600 }}>
          {isLogin ? "Create Account" : "Sign In"}
        </Button>
      </Box>
    </Box>
  );
};

export default UsernamePasswordAuth;
