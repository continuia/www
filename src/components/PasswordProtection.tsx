import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Modal, Paper } from "@mui/material";

interface PasswordProtectionProps {
  password: string;
  children: React.ReactNode;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ password, children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if we're on a Netlify site
    const isNetlifySite = window.location.hostname.includes("netlify.app");
    
    // Check if already authenticated in this session
    const authenticated = sessionStorage.getItem("continuia-authenticated") === "true";
    
    // Only show password modal on Netlify sites and if not authenticated
    if (isNetlifySite && !authenticated) {
      setOpen(true);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputPassword === password) {
      setIsAuthenticated(true);
      setOpen(false);
      setError(false);
      // Store authentication in session storage
      sessionStorage.setItem("continuia-authenticated", "true");
    } else {
      setError(true);
    }
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <>
      <Modal
        open={open}
        disableEscapeKeyDown
        disableAutoFocus
        aria-labelledby="password-protection-modal"
        aria-describedby="enter-password-to-access-site"
      >
        <Paper sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" component="h2" gutterBottom>
            Password Protected
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            This site is password protected. Please enter the password to continue.
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            error={error}
            helperText={error ? "Incorrect password" : ""}
            sx={{ mb: 2 }}
            autoFocus
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Paper>
      </Modal>
      {isAuthenticated && children}
    </>
  );
};

export default PasswordProtection;
