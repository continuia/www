import { Box, Typography, Stack, Grid } from "@mui/material";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/ai_assisted_patient_intake.webp";

// Sample doctors data for demonstration
const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    description: "15+ years of experience in cardiovascular medicine & heart surgery",
    image: "PATH_TO_IMAGE1", // Replace with real image path or import
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    description: "Specialist in brain disorders and neurological conditions",
    image: "PATH_TO_IMAGE2",
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    description: "Caring for children's health and development for over 12 years",
    image: "PATH_TO_IMAGE3",
  },
  {
    name: "Dr. David Thompson",
    specialty: "Orthopedic Surgeon",
    description: "Expert in bone, joint, and musculoskeletal system treatments",
    image: "PATH_TO_IMAGE4",
  },
  {
    name: "Dr. Lisa Park",
    specialty: "Dermatologist",
    description: "Skin care specialist with expertise in cosmetic dermatology",
    image: "PATH_TO_IMAGE5",
  },
  {
    name: "Dr. James Wilson",
    specialty: "General Practitioner",
    description: "Primary care physician providing comprehensive health services",
    image: "PATH_TO_IMAGE6",
  },
];

// Framer Motion variant for entrance
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const MotionBox = motion(Box);

const ExpertCard = ({ doctor }: any) => (
  <MotionBox
    variants={fadeUp}
    whileHover={{ scale: 1.045, boxShadow: "0 6px 28px 0 var(--primary-100)" }}
    sx={{
      bgcolor: "var(--primary-50)",
      borderRadius: "2rem",
      boxShadow: "0 2px 18px 0 var(--neutral-200)",
      p: { xs: 2.5, md: 3 },
      overflow: "hidden",
      transition: "box-shadow 0.3s cubic-bezier(.4,2,.3,1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: 384,
    }}
  >
    <Box
      sx={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: "0 6px 24px 0 var(--primary-200)",
        mb: 2.5,
        background: "var(--neutral-100)",
        border: "4px solid var(--primary-200)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={heroIllustration}
        alt={doctor.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--neutral-900)", mb: 0.5, mt: 1, textAlign: "center" }}>
      {doctor.name}
    </Typography>
    <Typography variant="subtitle2" sx={{ color: "var(--primary-700)", fontWeight: 600, mb: 1, textAlign: "center" }}>
      {doctor.specialty}
    </Typography>
    <Typography variant="body2" sx={{ color: "var(--neutral-600)", textAlign: "center", lineHeight: 1.6, px: 1 }}>
      {doctor.description}
    </Typography>
  </MotionBox>
);

const MedicalExperts = () => (
  <Box sx={{ px: { xs: 2, md: 4 }, pt: 3, pb: 5 }}>
    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, textAlign: "center", letterSpacing: -0.5, color: "var(--neutral-900)" }}>
      Our Medical Experts
    </Typography>
    <Typography variant="subtitle1" sx={{ mb: 5, color: "var(--neutral-600)", textAlign: "center", maxWidth: 600, mx: "auto", fontWeight: 500 }}>
      Meet our team of highly qualified doctors dedicated to providing you with the best possible care.
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {doctors.map((doctor, idx) => (
        <Grid item xs={12} sm={6} md={4} key={doctor.name}>
          <ExpertCard doctor={doctor} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default MedicalExperts;
