// /terms-and-conditions/TermsOfService.tsx
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
// Import all sections below -- use your own section files here:
import WelcomeSection from "../components/termsOfService/welcomeSection";
import ScopeOfServicesSection from "../components/termsOfService/ScopeOfServicesSection";
import WhoMayUseSection from "../components/termsOfService/WhoMayUseSection";
import DisclaimersSection from "../components/termsOfService/DisclaimersSection";
import ComplianceSection from "../components/termsOfService/ComplianceSection";
import ConsentSection from "../components/termsOfService/ConsentSection";
import AccountSecuritySection from "../components/termsOfService/AccountSecuritySection";
import ForCliniciansSection from "../components/termsOfService/ForCliniciansSection";
import PaymentRefundsSection from "../components/termsOfService/PaymentRefundsSection";
import DataOwnershipSection from "../components/termsOfService/DataOwnershipSection";
import IntellectualPropertySection from "../components/termsOfService/IntellectualPropertySection";
import TerminationSection from "../components/termsOfService/TerminationSection";
import DisputesSection from "../components/termsOfService/DisputesSection";
import UpdatesSection from "../components/termsOfService/UpdatesSection";
import ContactSection from "../components/termsOfService/ContactSection";
import { useLocation } from "react-router-dom";

export const TermsOfService: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Only scroll if hash is present and path is correct
    if (location.pathname === "/privacy" && location.hash) {
      const id = location.hash.replace(/^#/, "");
      // Wait for content to render
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          // On desktop, scroll the sidebar-scroll container; mobile, scrollIntoView
          const contentBox = document.getElementById("terms-content-scroll");
          if (contentBox) {
            if (window.innerWidth >= 1200) {
              // Desktop: custom content area scroll
              const offset = section.offsetTop - contentBox.offsetTop;
              contentBox.scrollTo({ top: offset, behavior: "smooth" });
            } else {
              // Mobile: use scrollIntoView
              section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }
      }, 100); // Small delay to let React render the content and the DOM to settle
    }
  }, [location]);

  return (
    <Box
      id="terms-content-scroll"
      className="sidebarNavScroll"
      sx={{
        width: "100%",
        maxWidth: 1500,
        bgcolor: "var(--bg-primary)",
        boxShadow: "var(--shadow-sm)",
        p: { xs: "var(--space-2)", sm: "var(--space-8)" },
        maxHeight: { md: "calc(100vh - 2 * var(--space-20))" },
        overflowY: { xs: "visible", md: "auto" },
        scrollBehavior: "smooth",
      }}
    >
      {/* Page Titles */}
      <Typography
        component="h1"
        sx={{
          fontSize: "var(--text-3xl)",
          fontWeight: 900,
          letterSpacing: 0.2,
          color: "var(--primary-800)",
          mb: "var(--space-2)",
        }}
      >
        Continuia Terms of Service
      </Typography>
      <Typography sx={{ color: "var(--text-tertiary)", fontSize: "var(--text-base)", mb: "var(--space-1)" }}>
        Last Updated: <i>[Insert Date]</i>
      </Typography>
      <Typography sx={{ color: "var(--primary-700)", fontWeight: 600, fontSize: "var(--text-base)", mb: "var(--space-4)" }}>Applies to: Patients, Clinicians, Institutional Partners</Typography>
      {/* Sections */}
      <WelcomeSection />
      <ScopeOfServicesSection />
      <WhoMayUseSection />
      <DisclaimersSection />
      <ComplianceSection />
      <ConsentSection />
      <AccountSecuritySection />
      <ForCliniciansSection />
      <PaymentRefundsSection />
      <DataOwnershipSection />
      <IntellectualPropertySection />
      <TerminationSection />
      <DisputesSection />
      <UpdatesSection />
      <ContactSection />
    </Box>
  );
};

export default TermsOfService;
