import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Avatar, Chip, Skeleton, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion, type Variants } from "framer-motion";

// Doctor data type
export interface Doctor {
  hospital: string;
  image: string;
  doctorName: string;
  qualification: string;
  specialist: string[];
  licensed: string[];
}

// Card animation configs
const cardAnim: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
  },
};

const MotionBox = motion(Box);

// Skeleton Doctor Card
function SkeletonExpertCard() {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-lg)",
        background: "var(--bg-primary)",
        width: { xs: 300, sm: 350 },
        minHeight: 520,
        pb: "var(--space-5)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 190,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(120deg, var(--primary-100), var(--bg-tertiary))",
          mb: "var(--space-3)",
        }}
      >
        <Skeleton variant="circular" width={128} height={128} />
      </Box>
      <Box sx={{ px: "var(--space-3)", width: "100%" }}>
        <Skeleton variant="text" width="60%" height={30} sx={{ mx: "auto", mb: 2 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mx: "auto", mb: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
          {[1, 2].map((i) => (
            <Skeleton variant="rounded" width={60} height={28} key={i} />
          ))}
        </Box>
        <Box sx={{ mb: 1 }}>
          <Skeleton variant="text" width="30%" height={20} />
        </Box>
        <ul style={{ paddingLeft: 24 }}>
          {[1, 2, 3].map((i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              <Skeleton variant="text" width="80%" height={18} />
            </li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
}

// Actual Doctor Card
export const ExpertCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const [showMore, setShowMore] = useState(false);

  // Split qualification into bullet points
  const bulletPoints = doctor.qualification
    .split(/\n|•|;|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const collapseThreshold = 3;
  const isLongQualification = bulletPoints.length > collapseThreshold;
  const displayedPoints = isLongQualification && !showMore ? bulletPoints.slice(0, collapseThreshold) : bulletPoints;

  return (
    <MotionBox
      variants={cardAnim}
      whileHover={{
        scale: 1.03,
        boxShadow: "var(--shadow-xl)",
        y: -4,
      }}
      sx={{
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-lg)",
        background: "var(--bg-primary)",
        width: { xs: 300, sm: 350 },
        minHeight: 520,
        pb: "var(--space-5)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "box-shadow var(--transition-normal), transform var(--transition-normal)",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: "100%",
          height: 190,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(120deg, var(--primary-100), var(--bg-tertiary))",
          mb: "var(--space-3)",
        }}
      >
        <Avatar
          src={doctor.image}
          alt={doctor.doctorName}
          sx={{
            width: 128,
            height: 128,
            boxShadow: "var(--shadow-md)",
            border: "3px solid var(--bg-primary)",
            background: "var(--primary-200)",
            fontSize: "var(--text-2xl)",
          }}
        />
      </Box>
      <Box
        sx={{
          px: "var(--space-3)",
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            letterSpacing: -0.5,
            fontSize: "var(--text-xl)",
            textAlign: "center",
            color: "var(--text-primary)",
            mb: "var(--space-1)",
          }}
        >
          {doctor.doctorName}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "var(--primary-700)",
            fontWeight: 600,
            textAlign: "center",
            fontSize: "var(--text-base)",
            mb: "var(--space-2)",
          }}
        >
          {doctor.hospital}
        </Typography>
        {/* Specialist Chips */}
        {doctor.specialist.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-1)",
              justifyContent: "center",
              mb: "var(--space-2)",
            }}
          >
            {doctor.specialist.map((spec, idx) => (
              <Chip label={spec} key={spec + idx} color="success" size="small" sx={{ borderRadius: "var(--radius-lg)" }} />
            ))}
          </Box>
        )}
        {/* Licenses Chips */}
        {doctor.licensed.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-1)",
              justifyContent: "center",
              mb: "var(--space-2)",
            }}
          >
            {doctor.licensed.map((lic, idx) => (
              <Chip
                label={lic}
                key={lic + idx}
                size="small"
                sx={{
                  background: "var(--neutral-100)",
                  color: "var(--neutral-700)",
                  borderRadius: "var(--radius-lg)",
                  fontWeight: 500,
                  border: "1px solid var(--neutral-200)",
                }}
              />
            ))}
          </Box>
        )}
        {/* Qualifications */}
        <Box sx={{ width: "100%", mt: "var(--space-2)", flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: "var(--space-1)" }}>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontWeight: 700,
                fontSize: "var(--text-base)",
                mr: "var(--space-1)",
              }}
            >
              Qualifications
            </Typography>
            {isLongQualification && (
              <IconButton size="small" edge="end" onClick={() => setShowMore((v) => !v)}>
                <ExpandMoreIcon
                  sx={{
                    transform: showMore ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                  }}
                />
              </IconButton>
            )}
          </Box>
          <ul
            style={{
              paddingLeft: "var(--space-4)",
              color: "var(--text-secondary)",
              fontSize: "var(--text-base)",
              margin: 0,
              lineHeight: "var(--leading-normal)",
            }}
          >
            {displayedPoints.map((point, idx) => (
              <li key={idx} style={{ marginBottom: "var(--space-1)" }}>
                {point}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </MotionBox>
  );
};

// Main parent container
const API_URL = "https://coda.io/apis/v1/docs/xVB9OfVCsI/tables/grid-Nao6Gri_WW/rows?query=c-veetlBuEX9:true&useColumnNames=true";
const BEARER_TOKEN = "cbdf9ec2-b48d-4b2d-aa72-3a567c4b6122";

export const MedicalExperts: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const doctorsArray: Doctor[] = (data.items ?? []).map((item: any): Doctor => {
          const values = item.values ?? {};
          return {
            hospital: values["Affililation"] ?? item.name ?? "",
            image: values["ImageURL"] !== "" ? values["ImageURL"] : "https://www.shutterstock.com/image-photo/smiling-indian-man-doctor-wearing-600nw-2558930081.jpg",
            doctorName: values["DoctorName"] ?? "",
            qualification: values["Qualification"] ?? "",
            specialist: values["Specialist"] ? [values["Specialist"]] : [],
            licensed: values["LicensedIn"] ? [values["LicensedIn"]] : [],
          };
        });
        setDoctors(doctorsArray);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <Box
      id="ourDoctors"
      sx={{
        py: { xs: "var(--space-6)", md: "var(--space-12)" },
        px: { xs: "var(--space-2)", md: "var(--space-24)" },
        background: "var(--bg-secondary)",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: { xs: "var(--text-2xl)", sm: "var(--text-4xl)" },
          color: "var(--primary-700)",
          mb: "var(--space-2)",
          letterSpacing: -1,
        }}
      >
        Our Medical Experts
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: "var(--space-6)",
          color: "var(--text-secondary)",
          textAlign: "center",
          fontWeight: 500,
          fontSize: { xs: "var(--text-base)", md: "var(--text-lg)" },
          maxWidth: 580,
          mx: "auto",
        }}
      >
        Meet our team of highly qualified doctors dedicated to providing you with the best possible care.
      </Typography>
      {error && <Typography sx={{ color: "var(--error)", textAlign: "center", my: "var(--space-12)" }}>{error}</Typography>}
      {/* Skeleton cards while loading */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: { xs: "var(--space-4)", md: "var(--space-10)" },
            justifyContent: "center",
            alignItems: "stretch",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          {[1, 2, 3].map((i) => (
            <SkeletonExpertCard key={i} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: { xs: "var(--space-4)", md: "var(--space-10)" },
            justifyContent: "center",
            alignItems: "stretch",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          {doctors.map((doctor, idx) => (
            <ExpertCard doctor={doctor} key={doctor.doctorName + idx} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MedicalExperts;
