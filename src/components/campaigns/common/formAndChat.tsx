import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Chat as ChatIcon, Assignment as FormIcon } from "@mui/icons-material";
import ContactForm from "./contactForm";
import RacchaAgent from "../../chat/racchaAgent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} style={{ height: "100%" }} {...other}>
      {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
    </div>
  );
}

export default function ChatWithTabs() {
  const [tabIndex, setTabIndex] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 3 },
      }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ width: "100%", maxWidth: "800px" }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "var(--radius-3xl)",
            background: "var(--bg-primary)",
            boxShadow: "var(--shadow-2xl)",
            overflow: "hidden",
            height: "85vh",
            maxHeight: "600px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Modern Tab Header with Card Style */}
          <Box
            sx={{
              background: "var(--bg-primary)",
              p: "var(--space-4)",
              borderBottom: "1px solid var(--border-light)",
              flexShrink: 0,
            }}
          >
            {/* Card-Style Tabs */}
            <Box
              sx={{
                display: "flex",
                gap: "var(--space-2)",
                p: "var(--space-1)",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border-light)",
              }}
            >
              {[
                { icon: FormIcon, label: "Contact Form", index: 0 },
                { icon: ChatIcon, label: "AI Assistant", index: 1 },
              ].map((tab) => (
                <Box
                  key={tab.index}
                  onClick={() => setTabIndex(tab.index)}
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--space-2)",
                    p: "var(--space-3)",
                    borderRadius: "var(--radius-lg)",
                    cursor: "pointer",
                    transition: "var(--transition-normal)",
                    background: tabIndex === tab.index ? "var(--primary-500)" : "transparent",
                    color: tabIndex === tab.index ? "var(--text-inverse)" : "var(--text-secondary)",
                    boxShadow: tabIndex === tab.index ? "var(--shadow-md)" : "none",
                    "&:hover": {
                      background: tabIndex === tab.index ? "var(--primary-600)" : "var(--bg-tertiary)",
                      color: tabIndex === tab.index ? "var(--text-inverse)" : "var(--text-primary)",
                    },
                  }}
                >
                  <tab.icon sx={{ fontSize: "1.25rem" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "var(--text-sm)", md: "var(--text-base)" },
                    }}
                  >
                    {tab.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Content Area */}
          <Box
            sx={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tabIndex}
                initial={{ opacity: 0, x: tabIndex === 1 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: tabIndex === 1 ? -50 : 50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <TabPanel value={tabIndex} index={0}>
                  <Box
                    sx={{
                      overflow: "auto",
                      background: "var(--bg-secondary)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      p: { xs: 2, md: 3 },
                    }}
                  >
                    <ContactForm />
                  </Box>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                  <Box
                    sx={{
                      height: "100%",
                      overflow: "hidden",
                      background: "var(--bg-primary)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <RacchaAgent agent="Arika_Reddy" heading="Chat with AI Assistant" />
                  </Box>
                </TabPanel>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
