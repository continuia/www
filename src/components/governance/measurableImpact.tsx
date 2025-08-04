import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function MeasurableImpact() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "var(--primary-50)",
        pt: "var(--space-20)",
        pb: "var(--space-24)",
        px: { xs: "var(--space-2)", md: 0 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "var(--text-primary)",
          fontSize: "var(--text-3xl)",
          mb: "var(--space-5)",
          textAlign: "center",
        }}
      >
        Measurable Impact on Your Bottom Line
      </Typography>
      <Typography
        sx={{
          color: "var(--text-secondary)",
          fontSize: "var(--text-lg)",
          mb: "var(--space-14)",
          maxWidth: 740,
          mx: "auto",
          textAlign: "center",
        }}
      >
        Healthcare executives report significant ROI within the first year of implementation, with measurable improvements in quality metrics and operational efficiency.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "var(--space-8)",
          maxWidth: 1050,
          mx: "auto",
          mt:"var(--space-8)"
        }}
      >
        {/* Left Stats */}
        <Box
          sx={{
            flex: "1 1 340px",
            minWidth: 280,
            maxWidth: 470,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          {/* $2.3M Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                bgcolor: "var(--bg-primary)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                p: { xs: "var(--space-6)", md: "var(--space-10)" },
                mb: { xs: "var(--space-4)", md: 0 },
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "var(--text-2xl)",
                  color: "var(--primary-600)",
                  mb: "var(--space-2)",
                  letterSpacing: 0,
                }}
              >
                $2.3M
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  fontSize: "var(--text-base)",
                  mb: "var(--space-2)",
                }}
              >
                Average Annual Savings
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-sm)",
                }}
              >
                Through reduced medical errors and improved efficiency
              </Typography>
            </Box>
          </motion.div>
          {/* 18-Month Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, type: "spring" }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                bgcolor: "var(--bg-primary)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                p: { xs: "var(--space-6)", md: "var(--space-10)" },
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "var(--text-2xl)",
                  color: "var(--primary-600)",
                  mb: "var(--space-2)",
                }}
              >
                18-Month
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  fontSize: "var(--text-base)",
                  mb: "var(--space-2)",
                }}
              >
                ROI Payback
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-sm)",
                }}
              >
                Faster than traditional quality improvement initiatives
              </Typography>
            </Box>
          </motion.div>
        </Box>
        {/* ROI Analysis CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.66, delay: 0.18, type: "spring" }}
          viewport={{ once: true }}
          style={{
            flex: "1 1 340px",
            minWidth: 280,
            maxWidth: 510,
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              bgcolor: "var(--bg-primary)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-lg)",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: { xs: "var(--space-8)", md: "var(--space-10)" },
              py: { xs: "var(--space-8)", md: "var(--space-10)" },
              minHeight: 208,
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "var(--text-primary)",
                fontSize: "var(--text-lg)",
                mb: "var(--space-3)",
                textAlign: "left",
              }}
            >
              Request Your Custom ROI Analysis
            </Typography>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-base)",
                mb: "var(--space-8)",
                textAlign: "left",
              }}
            >
              Get a personalized financial impact assessment based on your hospital's specific metrics and goals.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "var(--primary-500)",
                color: "var(--text-inverse)",
                fontWeight: 700,
                fontSize: "var(--text-base)",
                py: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                px: "var(--space-10)",
                boxShadow: "var(--shadow-xs)",
                "&:hover": {
                  bgcolor: "var(--primary-600)",
                },
                textTransform: "none",
              }}
            >
              Calculate Your ROI
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
