import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, Avatar, useMediaQuery, Divider } from "@mui/material";
import { LocalHospital, Elderly, Person, Biotech, HealthAndSafety, WorkspacePremium, Diversity3, FlightTakeoff } from "@mui/icons-material";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import hosiptals from "../../assets/partnersMain/hospitals.webp";
import skilledNursingLiving from "../../assets/partnersMain/skilledNursingLiving.webp";
import individualDoctors from "../../assets/partnersMain/individualDoctors.webp";
import clinicsAndDiagnostic from "../../assets/partnersMain/clinicsAndDiagnostic.webp";
import healthPlanTPAs from "../../assets/partnersMain/healthPlanTPAs.webp";
import consultatntsAndWellness from "../../assets/partnersMain/consultatntsAndWellness.webp";
import groupsAndNGOs from "../../assets/partnersMain/groupsAndNGOs.webp";
import tourismAndHealth from "../../assets/partnersMain/tourismAndHealth.webp";

const partnerIcons = [
  <LocalHospital fontSize="inherit" sx={{ color: "var(--primary-700)" }} />,
  <Elderly fontSize="inherit" sx={{ color: "var(--primary-700)" }} />,
  <Person fontSize="inherit" sx={{ color: "var(--primary-700)" }} />,
  <Biotech fontSize="inherit" sx={{ color: "var(--primary-700)" }} />,
  <HealthAndSafety fontSize="inherit" sx={{ color: "var(--primary-700)" }} />,
  <WorkspacePremium fontSize="inherit" sx={{ color: "var(--primary-700)" }} />,
  <Diversity3 fontSize="inherit" sx={{ color: "var(--primary-700)" }} />,
  <FlightTakeoff fontSize="inherit" sx={{ color: "var(--primary-700)" }} />,
];

const partnersData = [
  {
    title: "Hospitals",
    description: "Discharge with Confidence, Reduce Risk, and Build Trust",
    details: "Reduce 30-day readmissions with structured second opinions that complement your clinical workflow. Our licensed physicians provide concise summaries—no diagnosis, just thoughtful clarity",
    path: "/partners/hospitals",
    imgPath: hosiptals,
  },
  {
    title: "Skilled Nursing & Assisted Living",
    description: "Support Your Residents Without Overloading Your Staff",
    details: "On-demand case reviews delivered in plain language summaries. No apps, no logins, no disruption—just improved family confidence and reduced transfers.",
    imgPath: skilledNursingLiving,
    path: "/partners/nursing-and-living",
  },
  {
    title: "Individual Doctors & Specialists",
    description: "You Stay in Control—We Simply Support Your Patients",
    details: "Invite a second pair of eyes without giving up control. Our interpretive role helps patients understand what's been done, not what to do next.",
    path: "/partners/doctors-and-specialists",
    imgPath: individualDoctors,
  },
  {
    title: "Outpatient Clinics & Diagnostic Centers",
    description: "Add Value to Every Report—Extend Patient Engagement",
    details: "Bridge interpretation gaps with one-click physician-led second opinions on imaging, pathology, or lab reports. Build long-term patient loyalty.",
    path: "/partners/clinics-diagnostics",
    imgPath: clinicsAndDiagnostic,
  },
  {
    title: "Health Plans & TPAs",
    description: "Reduce Avoidable Costs and Improve Member Decision-Making",
    details: "Help members make informed choices before unnecessary procedures. Lower downstream costs while boosting satisfaction with neutral, non-disruptive support.",
    path: "/partners/health-plans-tpas",
    imgPath: healthPlanTPAs,
  },
  {
    title: "Benefit Consultants & Wellness Platforms",
    description: "Offer Your Clients a High-Trust, Low-Friction Medical Add-On",
    details: "Turnkey second-opinion layer that adds medical clarity without legal risk. Fast to deploy, highly valued, and customizable for any population.",
    path: "/partners/benefit-consultants",
    imgPath: consultatntsAndWellness,
  },
  {
    title: "Patient Advocacy Groups & NGOs",
    description: "Empower Your Members with Expert Reviews—Delivered with Empathy",
    details: "Non-judgmental, structured second opinions in plain language. Perfect for rare disease groups and chronic illness organizations seeking clarity without cost burden.",
    path: "/partners/advocacy-ngos",
    imgPath: groupsAndNGOs,
  },
  {
    title: "Medical Tourism & Concierge Health",
    description: "Make Every Flight Count—Pre-Screen Medical Cases Before Travel",
    details: "Offer second opinions before patients commit to travel. Match patients to the right facility and reduce friction with multi-lingual support and global networks.",
    path: "/partners/medical-tourism",
    imgPath: tourismAndHealth,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.3, type: "spring", bounce: 0.28 },
  }),
  hover: {
    boxShadow: "0 10px 40px 0 rgba(124,58,237,0.17), 0 2px 10px 0 rgba(67,56,202,0.13)",
    scale: 1.034,
    transition: { duration: 0.22 },
  },
};

export const PartnersSection: React.FC = () => {
  const sm = useMediaQuery("(min-width:601px) and (max-width:899px)");
  const md = useMediaQuery("(min-width:900px) and (max-width:1199px)");
  const lg = useMediaQuery("(min-width:1200px)");
  const navigate = useNavigate();

  let cardBasis = "100%";
  if (lg) cardBasis = "27%";
  else if (md) cardBasis = "35%";
  else if (sm) cardBasis = "53%";
  const maxWidth = 400;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--bg-secondary)",
        py: "var(--space-20)",
        px: "clamp(var(--space-2), 5vw, var(--space-40))",
      }}
    >
      <Box sx={{ maxWidth: 1320, mx: "auto", textAlign: "center", mb: "var(--space-16)" }}>
        <Typography
          component="h2"
          sx={{
            fontSize: "var(--text-4xl)",
            fontWeight: 900,
            color: "var(--primary-700)",
            mb: "var(--space-2)",
          }}
        >
          Our Partnership Network
        </Typography>
        <Typography
          sx={{
            fontSize: "var(--text-lg)",
            color: "var(--text-secondary)",
            mb: "var(--space-1)",
          }}
        >
          Continuia bridges diverse organizations in collaborative partnership, serving every stakeholder in the health journey.
        </Typography>
        <Box
          sx={{
            mt: "var(--space-3)",
            width: 92,
            height: 6,
            mx: "auto",
            borderRadius: "var(--radius-full)",
            bgcolor: "var(--primary-400)",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-8)",
          justifyContent: "center",
          alignItems: "stretch",
          maxWidth: 1320,
          mx: "auto",
        }}
      >
        {partnersData.map((partner, i) => (
          <motion.div
            key={partner.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            variants={cardVariants}
            whileHover="hover"
            style={{
              flex: `1 1 ${cardBasis}`,
              minWidth: 300,
              maxWidth,
              display: "flex",
              borderRadius: "var(--radius-2xl)",
              cursor: "pointer",
            }}
            tabIndex={0}
            role="button"
            onClick={() => navigate(partner.path)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(partner.path);
              }
            }}
          >
            <Card
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: "1 1 100%",
                bgcolor: "var(--bg-secondary)",
                borderRadius: "var(--radius-2xl)",
                boxShadow: "var(--shadow-lg)",
                border: `2px solid var(--primary-100)`,
                height: "100%",
                minWidth: 0,
                transition: "box-shadow var(--transition-normal)",
                p: 0,
              }}
            >
              {/* UPLIFTED HEADER SECTION */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pt: "var(--space-6)",
                  pb: "var(--space-5)",
                  px: "var(--space-4)",
                  bgcolor: "transparent",
                  borderTopLeftRadius: "var(--radius-2xl)",
                  borderTopRightRadius: "var(--radius-2xl)",
                  position: "relative",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "var(--primary-200)",
                    color: "var(--primary-700)",
                    width: 62,
                    height: 62,
                    boxShadow: "var(--shadow-lg)",
                    mb: "var(--space-2)",
                  }}
                >
                  {partnerIcons[i]}
                </Avatar>
                <Typography
                  sx={{
                    fontSize: "var(--text-xl)",
                    fontWeight: 800,
                    color: "var(--primary-700)",
                    textAlign: "center",
                    mb: "var(--space-1)",
                  }}
                >
                  {partner.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "var(--text-base)",
                    color: "var(--text-secondary)",
                    textAlign: "center",
                  }}
                >
                  {partner.description}
                </Typography>
                <Divider
                  sx={{
                    mt: "var(--space-4)",
                    width: "100%",
                    mx: "auto",
                    borderColor: "var(--primary-100)",
                  }}
                />
              </Box>
              <CardContent sx={{ px: "var(--space-4)", pt: "var(--space-4)", pb: 0, flexGrow: 1 }}>
                <Typography
                  sx={{
                    fontSize: "var(--text-base)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {partner.details}
                </Typography>
              </CardContent>
              <Box sx={{ mt: "auto", px: "var(--space-4)", pb: "var(--space-5)" }}>
                <CardMedia
                  component="img"
                  image={partner.imgPath}
                  alt={partner.title}
                  sx={{
                    aspectRatio: "3/2",
                    borderRadius: "var(--radius-xl)",
                    objectFit: "cover",
                    boxShadow: "var(--shadow-md)",
                    mb: "var(--space-3)",
                  }}
                />
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};
