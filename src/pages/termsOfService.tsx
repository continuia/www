import React from "react";
import { Box, Typography, Link, useMediaQuery, Divider } from "@mui/material";

const sectionStyle = {
  mb: "var(--space-12)",
  "&:last-child": { mb: 0 },
};

const headingStyle = {
  mt: "var(--space-8)",
  mb: "var(--space-2)",
  fontWeight: 800,
  fontSize: "var(--text-xl)",
  color: "var(--primary-700)",
  scrollMarginTop: "var(--space-32)",
};

export const TermsOfService: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const wrapWidth = isMobile ? "100%" : "min(100%, 800px)";

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        bgcolor: "var(--bg-primary)",
        px: "clamp(var(--space-3), 4vw, var(--space-48))",
        py: "var(--space-20)",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: wrapWidth }}>
        {/* Title */}
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

        {/* Welcome Section */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="welcome" sx={headingStyle}>
            Welcome to Continuia
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)", mb: "var(--space-2)" }}>
            We are honored to welcome you to Continuia, a service created to empower clarity in healthcare. Our second-opinion platform is designed to ensure that patients, families, and physicians never have to make high-stakes decisions alone. By using our website, mobile application, or any of our services, you agree to the terms outlined in this document. These terms form a binding agreement between you and Continuia Health Technologies.
            <br />
            Continuia is not just a service provider — it is a governance layer, a clinical conscience, and an ethical bridge between patients and providers. These terms outline the responsibilities and expectations of every party that engages with our services, ensuring that our ecosystem remains secure, transparent, and fair.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Scope of Services */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="scope" sx={headingStyle}>
            Scope of Services
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)", mb: "var(--space-2)" }}>
            Continuia offers access to remote, asynchronous second opinions from licensed physicians across various specialties. These opinions are purely educational and designed to provide you with an additional expert perspective to support—not replace—your ongoing care.
            <br />
            <br />
            When a case is submitted, it undergoes a triage process that uses secure AI agents to match your submission with the most relevant and appropriately licensed clinician. That physician then reviews your case, analyzes the clinical data, and provides a written second opinion. The turnaround time for most opinions ranges from 24 to 72 hours, although this may vary based on the complexity of the case and availability of the clinician.
            <br />
            <br />
            For institutions and care teams, Continuia integrates tools for internal governance reviews, cross-specialty collaboration, and audit-safe documentation. We serve as both an independent voice and an infrastructure layer supporting ethical decision-making.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Who May Use Continuia */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="who" sx={headingStyle}>
            Who May Use Continuia
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            <b>Patients and Families:</b> You must be of legal age in your jurisdiction (typically 18 years or older), or a legal guardian authorized to act on behalf of a minor or dependent. You must be capable of providing informed consent and responsible for ensuring the accuracy of the medical information submitted. This includes details about your symptoms, history, test results, and the questions you wish to explore.
            <br />
            <br />
            <b>Clinicians:</b> If you are engaging with Continuia as a physician or specialist, you must hold a valid and current license in your jurisdiction and be in good standing with your local medical board. You agree to provide second opinions within Continuia’s ethical framework, without directly treating or prescribing, and to follow documentation, consent validation, and turnaround guidelines.
            <br />
            <br />
            <b>Institutions and Partners:</b> Organizations working with Continuia to provide clinical oversight, medical review, or patient access must be formally authorized to represent their patient base. Institutional users are responsible for ensuring compliance with local regulatory bodies and for protecting patient data submitted through our platform.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Important Disclaimers */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="disclaimers" sx={headingStyle}>
            Important Disclaimers
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            Continuia does not provide urgent or emergency care under any circumstances. Our services are not designed for acute symptom evaluation, and we are not an appropriate channel for crises or life-threatening situations. If you or someone you know is experiencing chest pain, difficulty breathing, sudden loss of consciousness, or any other medical emergency, you should immediately contact local emergency services or go to the nearest hospital.
            <br />
            <br />
            The medical opinions provided through Continuia are based solely on the information you provide. They are second opinions and are not to be construed as primary diagnoses or treatment plans. Continuia does not assume liability for outcomes based on incomplete or inaccurate information submitted by users.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Global Compliance and Jurisdiction */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="compliance" sx={headingStyle}>
            Global Compliance and Jurisdiction
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            Continuia serves users in multiple countries and is committed to complying with local laws and standards related to patient privacy, data sovereignty, and telemedicine.
            <br />
            <br />
            <b>In India,</b> our services adhere to the Digital Personal Data Protection Act (DPDP) and the Telemedicine Practice Guidelines (2020). Physicians providing second opinions do so in accordance with National Medical Council standards and are prohibited from prescribing treatment unless they have previously seen the patient in person.
            <br />
            <br />
            <b>In the United States,</b> Continuia operates in compliance with the Health Insurance Portability and Accountability Act (HIPAA). We are not a covered entity unless specifically contracted under a Business Associate Agreement (BAA). All patient records are handled with end-to-end encryption, secure data storage, and access controls.
            <br />
            <br />
            <b>In the United Arab Emirates (Dubai),</b> we conform to the Dubai Health Authority (DHA) Telehealth regulations. Our platform ensures that second opinions offered to Dubai residents are rendered by qualified professionals who either hold DHA credentials or operate under approved cross-border frameworks.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Consent and Privacy */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="consent" sx={headingStyle}>
            Consent and Privacy
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            By using Continuia, you give informed consent to the collection, processing, and use of your personal and health-related information for the purpose of obtaining a second opinion.
            <br />
            <br />
            This includes:
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>The review of submitted medical records by licensed healthcare professionals.</li>
              <li>The processing of your data by Continuia’s AI triage and summarization engines, which are designed to match you to an appropriate specialist and organize your information into a clinical narrative.</li>
              <li>The optional sharing of your medical file and opinion with your treating physician or care team, which can only occur with your explicit approval.</li>
            </ul>
            You may withdraw this consent at any time. However, if consent is withdrawn before a case is completed, we may not be able to provide you with a second opinion. If consent is withdrawn after the case has been closed, we will retain your data only to the extent required by applicable laws or for compliance with audit requirements.
            <br />
            <br />
            Continuia’s privacy infrastructure follows the highest standards for data localization, encryption, and access management. Full details are available in our Privacy Policy.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Accounts and Security */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="account-security" sx={headingStyle}>
            Accounts and Security
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            When you create a Continuia account, you agree to be responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must not share your password or allow others to access your account.
            <br />
            <br />
            We protect user information through advanced security measures, including encryption at rest and in transit, two-factor authentication, login alerts, and continuous access monitoring. If we detect unusual behavior or potential compromise of your account, we may temporarily suspend access until identity verification is completed.
            <br />
            <br />
            Users are encouraged to use strong, unique passwords and to change them regularly.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* For Clinicians */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="for-clinicians" sx={headingStyle}>
            For Clinicians
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            Licensed physicians who provide second opinions through Continuia are bound by professional standards, contractual obligations, and regulatory laws.
            <br />
            <br />
            You are expected to provide detailed, thoughtful, and medically sound assessments based on the materials submitted. You must deliver these within the timeframe outlined in your agreement with Continuia, typically 24 to 72 hours. You are also responsible for disclosing any actual or perceived conflicts of interest, and for acknowledging limitations in your clinical expertise as they relate to the specific case.
            <br />
            <br />
            You may not treat patients, write prescriptions, or engage in follow-up interactions outside of the Continuia platform. Soliciting patients, attempting to build a private client base, or contacting them outside the platform constitutes a breach of this agreement and will result in immediate termination.
            <br />
            <br />
            All clinician responses are subject to periodic quality audits and documentation review to ensure compliance with Continuia’s internal governance policies.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Payment and Refunds */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="payment-refunds" sx={headingStyle}>
            Payment and Refunds
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            Continuia offers transparent pricing, which is communicated to the user before any case is submitted. Payment is typically collected at the time of submission, unless otherwise agreed through a partner institution or enterprise contract.
            <br />
            <br />A refund may be issued under the following circumstances:
            <ul style={{ paddingLeft: 20, marginTop: 8 }}>
              <li>If no qualified clinician is available within 72 hours of submission</li>
              <li>If the submitted case is outside the scope of our service (e.g., emergency, pediatric, or non-supported specialties)</li>
              <li>If a regulatory restriction prevents us from legally rendering an opinion</li>
            </ul>
            Please note that Continuia does not currently process insurance claims. However, patients may request a detailed invoice to pursue potential reimbursement from their insurer.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Data Ownership and Usage */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="data-ownership" sx={headingStyle}>
            Data Ownership and Usage
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            You retain ownership of any health records, documents, or media you upload to Continuia. We do not sell or rent user data. All identifiable information remains confidential and is stored securely.
            <br />
            <br />
            With your consent, we may use anonymized case data to train machine learning models, improve our triage systems, or support research in partnership with licensed academic or clinical bodies. These uses will never include personal identifiers unless you explicitly authorize such participation.
            <br />
            <br />
            You have the right to request a copy of all data stored about you, and you may also request that we delete your records in accordance with local data retention laws. In some jurisdictions, we may be required to retain records for a legally mandated period (e.g., seven years for clinical documentation).
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Intellectual Property */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="intellectual-property" sx={headingStyle}>
            Intellectual Property
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            All content, technology, and platform assets of Continuia—including but not limited to our clinical agent frameworks, UI designs, triage protocols, logos, documentation formats, and summary templates—are the intellectual property of Continuia Health Technologies and may not be used, copied, or reproduced without written permission.
            <br />
            <br />
            The clinical opinions generated by participating doctors remain the intellectual property of the clinician but are licensed to Continuia for platform operations, internal audits, and future educational purposes.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Termination of Access */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="termination" sx={headingStyle}>
            Termination of Access
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            Continuia may suspend or permanently terminate access to any user who violates these Terms, misuses our platform, submits fraudulent information, or engages in behavior that compromises the safety or privacy of others.
            <br />
            <br />
            Users may close their accounts at any time by contacting our support team. Data associated with the account will be retained or deleted in accordance with our privacy policy and applicable law.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Disputes and Jurisdiction */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="disputes" sx={headingStyle}>
            Disputes and Jurisdiction
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            Any disputes arising from the use of our platform will be handled based on the user’s region:
            <br />
            <br />
            <b>For users in India,</b> disputes will be resolved through arbitration under the Arbitration and Conciliation Act, 1996. The venue for such arbitration shall be Hyderabad, India.
            <br />
            <br />
            <b>For users in the United States,</b> disputes will be subject to binding arbitration in the state of Delaware, under the rules of the American Arbitration Association.
            <br />
            <br />
            <b>For users in Dubai,</b> disputes will be escalated through the Dubai Health Authority (DHA) grievance system and, if unresolved, referred to UAE civil courts.
            <br />
            <br />
            In all cases, users agree to waive any rights to participate in class action lawsuits or collective claims.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Updates to These Terms */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="updates" sx={headingStyle}>
            Updates to These Terms
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            Continuia may modify or update these Terms of Service from time to time. If changes are material, we will provide at least fifteen (15) days’ notice via email and through notifications within the application. The updated terms will take effect on the specified effective date.
            <br />
            <br />
            By continuing to use our services after the effective date, you agree to be bound by the revised Terms. If you do not accept the changes, you may discontinue use of the service at any time.
          </Typography>
        </Box>
        <Divider sx={{ mb: "var(--space-8)" }} />

        {/* Contact and Support */}
        <Box sx={sectionStyle}>
          <Typography component="h2" id="contact" sx={headingStyle}>
            Contact and Support
          </Typography>
          <Typography sx={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}>
            Continuia Health Technologies
            <br />
            <Link href="mailto:support@continuia.ai" sx={{ color: "var(--primary-600)", fontWeight: 500 }}>
              support@continuia.ai
            </Link>
            <br />
            <Link href="https://continuia.ai" target="_blank" rel="noopener" sx={{ color: "var(--primary-600)", fontWeight: 500 }}>
              https://continuia.ai
            </Link>
            <br />
            Compliance & Data Protection Officer: [Insert Contact]
            <br />
            <br />
            This document is version-controlled and subject to legal audit and jurisdictional review. A printed or notarized copy is available upon request. For inquiries, contact{" "}
            <Link href="mailto:compliance@continuia.ai" sx={{ color: "var(--primary-600)", fontWeight: 500 }}>
              compliance@continuia.ai
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
