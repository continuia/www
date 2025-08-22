import { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion, useAnimationFrame } from "framer-motion";
import logo1 from "../../assets/partnersLogos/Partner 1.png";
import logo2 from "../../assets/partnersLogos/Partner 2.png";
import logo3 from "../../assets/partnersLogos/Partner 3.png";
import logo4 from "../../assets/partnersLogos/Partner 4.png";
import logo5 from "../../assets/partnersLogos/Partner 5.png";
import logo6 from "../../assets/partnersLogos/Partner 6.png";
import logo7 from "../../assets/partnersLogos/Partner 7.png";
import logo8 from "../../assets/partnersLogos/Partner 8.png";

// Helper for responsive logo/gap
const useLogoSize = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  if (isSm) {
    return { width: 140, gap: 16 };
  }
  if (isMd) {
    return { width: 140, gap: 24 };
  }
  return { width: 200, gap: 40 };
};

export default function PartnerLogosMarquee() {
  const { width: LOGO_WIDTH, gap: GAP } = useLogoSize();
  const [offsetX, setOffsetX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const speed = 0.05;

  const logos = [logo1, logo8, logo2, logo3, logo4, logo5, logo6, logo7];
  const totalWidth = logos.length * (LOGO_WIDTH + GAP);

  // Smooth infinite loop using modulo for seamless transition
  useAnimationFrame((_, delta) => {
    if (!isHovered) {
      setOffsetX((prev) => {
        const next = prev - delta * speed;
        // Use modulo to create seamless loop without visible jump
        return next % (-totalWidth);
      });
    }
  });

  // Create enough duplicates to ensure smooth scrolling
  const renderLogos = [...logos, ...logos, ...logos];

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: "var(--space-8)", md: "var(--space-16)" },
        px: { xs: "var(--space-2)", sm: "var(--space-4)", md: "var(--space-10)" },
        background: "var(--bg-accent)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: "var(--space-4)", sm: "var(--space-6)", md: "var(--space-8)" },
      }}
    >
      <Typography
        variant={
          {
            xs: "h5",
            sm: "h4",
            md: "h3",
            lg: "h2",
          } as any
        }
        sx={{
          color: "var(--primary-700)",
          fontWeight: 900,
          mb: 2,
          background: "linear-gradient(90deg, var(--primary-400) 0%, var(--primary-700) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: 1.2,
          userSelect: "none",
          fontSize: { xs: "2rem", sm: "2.2rem", md: "2.5rem" },
          textAlign: { xs: "center" },
          width: "100%",
          pb: 0,
          lineHeight: { xs: "1.1", lg: "1.05" },
        }}
      >
        Our Partners
      </Typography>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            gap: `${GAP}px`,
            transform: `translate3d(${offsetX}px, 0, 0)`,
            willChange: "transform",
            alignItems: "center",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="list"
          aria-label="Hospital Partners"
        >
          {renderLogos.map((img, i) => (
            <Box
              component="img"
              key={i}
              src={img}
              alt={`Hospital Partner Logo ${(i % logos.length) + 1}`}
              sx={{
                width: LOGO_WIDTH,
                height: "auto",
                maxWidth: "93vw",
                objectFit: "contain",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-xl)",
                bgcolor: "var(--bg-primary)",
                p: { xs: "var(--space-2)" },
                transition: "box-shadow var(--transition-fast)",
                "&:hover": {
                  boxShadow: "0 6px 32px 6px var(--primary-200)",
                  bgcolor: "var(--bg-secondary)",
                },
              }}
            />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}