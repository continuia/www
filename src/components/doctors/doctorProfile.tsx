import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Stack, Avatar, Button, CircularProgress } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CallIcon from "@mui/icons-material/Call";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";

// --- Type Definitions ---
type EducationEntry = {
  type: "verified" | "cert";
  title: string;
  subtitle: string;
};

type DoctorData = {
  name: string;
  title: string;
  credentials: string;
  hospital: string;
  photo: string;
  about: string;
  education: EducationEntry[];
};

type UrlParams = {
  id: string;
};

// --- Fake API, replace with your own ---
const fetchDoctor = async (id: string): Promise<DoctorData> => {
  // DEMO fallback: Replace with actual fetch logic
  await new Promise((r) => setTimeout(r, 600)); // simulate loading
  if (id === "1")
    return {
      name: "Dr. Michael Johnson",
      title: "Cardiologist & Internal Medicine Specialist",
      credentials: "MD, FACC • 15+ Years Experience",
      hospital: "St. Mary's Medical Center • Board Certified",
      photo: "", // Provide real image path here
      about: "Dr. Michael Johnson is highly experienced in preventive cardiology, heart disease management, and cardiac procedures. He trained at Harvard and Mayo Clinic, and is board certified in both Internal Medicine and Cardiovascular Disease.",
      education: [
        { type: "verified", title: "MD", subtitle: "Harvard Medical School" },
        { type: "verified", title: "Residency", subtitle: "Johns Hopkins Hospital" },
        { type: "verified", title: "Fellowship", subtitle: "Mayo Clinic" },
        { type: "cert", title: "Board Certified", subtitle: "Internal Medicine & Cardiology" },
      ],
    };
  throw new Error("Doctor not found");
};

const DoctorProfile: React.FC = () => {
  const { id } = useParams<UrlParams>();
  const [doctor, setDoctor] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchDoctor(id || "")
      .then((d) => setDoctor(d))
      .catch((e) => setError(e.message || "Error loading doctor"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: "var(--space-20)" }}>
        <CircularProgress color="primary" />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: "center", py: "var(--space-20)" }}>
        <Typography color="error" fontWeight={700} fontSize="var(--text-lg)">
          {error}
        </Typography>
      </Box>
    );

  if (!doctor) return null;

  return (
    <Box
      sx={{
        width: "100%",
        background: "var(--bg-primary)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-lg)",
        px: { xs: "var(--space-2)", md: "var(--space-10)" },
        py: { xs: "var(--space-6)", md: "var(--space-12)" },
        my: { xs: "var(--space-5)", md: "var(--space-8)" },
        maxWidth: "100%",
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" spacing={{ xs: "var(--space-6)", sm: "var(--space-8)" }} sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: { xs: "112px", sm: "144px" },
            width: { xs: "40%", sm: "180px" },
            maxWidth: "180px",
            mx: { xs: "auto", sm: 0 },
          }}
        >
          <Avatar
            src={doctor.photo}
            alt={doctor.name}
            sx={{
              width: { xs: "112px", sm: "144px", md: "180px" },
              height: { xs: "112px", sm: "144px", md: "180px" },
              border: "4px solid var(--primary-200)",
              boxShadow: "var(--shadow-md)",
              background: "var(--primary-50)",
            }}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, mt: { xs: "var(--space-2)", sm: 0 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "var(--text-2xl)", sm: "var(--text-3xl)", md: "var(--text-4xl)" },
              color: "var(--primary-700)",
              letterSpacing: "-.02em",
              lineHeight: "var(--leading-tight)",
              mb: "var(--space-1)",
              wordBreak: "break-word",
            }}
          >
            {doctor.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "var(--primary-500)",
              mb: "var(--space-1)",
              fontWeight: 600,
              fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
            }}
          >
            {doctor.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--text-secondary)",
              fontWeight: 500,
              fontSize: "var(--text-base)",
              mb: "var(--space-1)",
            }}
          >
            {doctor.credentials}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--text-tertiary)",
              fontWeight: 500,
              fontSize: "var(--text-sm)",
              mb: "var(--space-1)",
            }}
          >
            {doctor.hospital}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={"var(--space-3)"} mt="var(--space-2)" width="100%">
            <Button
              variant="contained"
              sx={{
                background: "var(--primary-600)",
                color: "var(--text-inverse)",
                fontWeight: 700,
                px: "var(--space-6)",
                py: "var(--space-3)",
                fontSize: "var(--text-base)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-md)",
                textTransform: "none",
                "&:hover": { background: "var(--primary-700)" },
                width: { xs: "100%", sm: "auto" },
              }}
              startIcon={<LocalHospitalIcon />}
              onClick={() => {
                /* implement booking */
              }}
            >
              Book Appointment
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "var(--primary-700)",
                borderColor: "var(--primary-300)",
                fontWeight: 700,
                px: "var(--space-6)",
                py: "var(--space-3)",
                fontSize: "var(--text-base)",
                borderRadius: "var(--radius-xl)",
                background: "var(--bg-primary)",
                textTransform: "none",
                "&:hover": {
                  borderColor: "var(--primary-700)",
                  background: "var(--primary-50)",
                },
                width: { xs: "100%", sm: "auto" },
              }}
              startIcon={<CallIcon />}
              onClick={() => {
                /* implement call */
              }}
            >
              Call Now
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: "var(--space-8)", sm: "var(--space-20)" }} mt="var(--space-8)" alignItems="flex-start" width="100%">
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <Typography
            variant="h4"
            sx={{
              mb: "var(--space-2)",
              color: "var(--primary-700)",
              fontSize: { xs: "var(--text-lg)", sm: "var(--text-xl)", md: "var(--text-2xl)" },
              fontWeight: 800,
            }}
          >
            About {doctor.name?.split(" ")[0] || "Doctor"}
          </Typography>
          <Typography
            sx={{
              color: "var(--text-primary)",
              fontSize: "var(--text-base)",
              mb: "var(--space-2)",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            {doctor.about}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1.25,
            minWidth: "220px",
            maxWidth: { xs: "100%", sm: "320px" },
            bgcolor: "var(--bg-tertiary)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-xs)",
            p: "var(--space-5)",
            mt: { xs: "var(--space-4)", sm: 0 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: "var(--space-3)",
              color: "var(--primary-700)",
              fontWeight: 700,
              fontSize: "var(--text-lg)",
            }}
          >
            Education & Training
          </Typography>
          <Stack spacing="var(--space-3)">
            {(doctor.education || []).map((entry, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "flex-start" }}>
                <Box sx={{ mt: "var(--space-px)", mr: "var(--space-2)", flexShrink: 0 }}>{entry.type === "verified" ? <VerifiedIcon sx={{ color: "var(--success)" }} /> : <CheckCircleIcon sx={{ color: "var(--primary-600)", fontSize: "1.3em" }} />}</Box>
                <Box>
                  <Typography sx={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "var(--text-base)" }}>{entry.title}</Typography>
                  <Typography sx={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "var(--text-sm)" }}>{entry.subtitle}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default DoctorProfile;
