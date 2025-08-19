import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

const MarkdownText = `
# Data Processing Addendum (DPA)

**Between:** Continuia HealthTech Pvt Ltd ("Continuia") and Client/Partner ("Data Controller")  
**Version 1.0 – July 2025**

## 1. Purpose and Scope

This Data Processing Addendum ("DPA") forms part of the agreement between Continuia and the Data Controller for the provision of AI-assisted medical second opinion services. This DPA governs the processing of Personal Data and Protected Health Information (PHI) in compliance with:

- EU General Data Protection Regulation (GDPR)
- India Digital Personal Data Protection Act (DPDP) 2023
- US Health Insurance Portability and Accountability Act (HIPAA)
- California Consumer Privacy Act (CCPA)

## 2. Definitions

- **Personal Data:** Any information relating to an identified or identifiable natural person
- **PHI:** Protected Health Information as defined under HIPAA
- **Processing:** Any operation performed on Personal Data, including collection, storage, use, disclosure, or deletion
- **Data Subject:** The individual to whom Personal Data relates
- **Sub-processor:** Any third party engaged by Continuia to process Personal Data

## 3. Data Processing Details

### 3.1 Categories of Data Subjects
- Patients seeking medical second opinions
- Healthcare providers using the platform
- Administrative users and support staff

### 3.2 Categories of Personal Data Processed
- **Identity Data:** Name, date of birth, contact information
- **Medical Data:** Health records, test results, diagnostic reports, medical history
- **Technical Data:** IP addresses, device information, usage logs
- **Communication Data:** Messages, case notes, physician opinions

### 3.3 Purpose of Processing
- Providing AI-assisted medical second opinion services
- Facilitating communication between patients and physicians
- Platform administration and support
- Compliance with legal obligations
- Service improvement and quality assurance

## 4. Continuia's Obligations as Data Processor

### 4.1 Processing Instructions
Continuia shall process Personal Data only:
- On documented instructions from the Data Controller
- For the purposes specified in this DPA
- In accordance with applicable data protection laws

### 4.2 Confidentiality
Continuia ensures that persons authorized to process Personal Data:
- Are bound by confidentiality obligations
- Receive appropriate training on data protection
- Have access only to data necessary for their role

### 4.3 Security Measures
Continuia implements appropriate technical and organizational measures:
- **Encryption:** Data encrypted in transit (TLS 1.3+) and at rest (AES-256)
- **Access Controls:** Role-based access with multi-factor authentication
- **Audit Logging:** Comprehensive logging of all data access and processing activities
- **Regular Security Assessments:** Quarterly vulnerability assessments and penetration testing

### 4.4 Sub-processors
- Continuia maintains a list of approved sub-processors
- Data Controller consent required for new sub-processors
- All sub-processors bound by equivalent data protection obligations
- Current sub-processors include cloud infrastructure providers and security services

## 5. Data Subject Rights

Continuia assists the Data Controller in fulfilling Data Subject rights:

- **Right of Access:** Providing copies of Personal Data
- **Right to Rectification:** Correcting inaccurate data
- **Right to Erasure:** Deleting data when legally permissible
- **Right to Portability:** Exporting data in structured format
- **Right to Object:** Handling objections to processing

## 6. Data Transfers

### 6.1 International Transfers
- Data may be transferred to and processed in the United States, India, and European Union
- Transfers protected by appropriate safeguards including Standard Contractual Clauses
- Adequacy decisions relied upon where available

### 6.2 Government Access
- Continuia will notify Data Controller of government data requests where legally permitted
- Challenges to overbroad requests will be made where appropriate
- Transparency reports published annually

## 7. Data Retention and Deletion

### 7.1 Retention Periods
- **Active Cases:** Retained during case lifecycle and for 7 years post-completion
- **Audit Logs:** Retained for 7 years for compliance purposes
- **Backup Data:** Retained for 90 days in encrypted backups

### 7.2 Data Deletion
- Secure deletion within 30 days of retention period expiry
- Certification of deletion provided upon request
- Emergency deletion procedures available for urgent requests

## 8. Data Breach Notification

### 8.1 Incident Response
- Continuia maintains 24/7 security monitoring
- Data Controller notified within 24 hours of breach discovery
- Detailed incident report provided within 72 hours
- Assistance provided for regulatory notifications

### 8.2 Breach Documentation
- Comprehensive incident logs maintained
- Root cause analysis and remediation steps documented
- Regular review and update of incident response procedures

## 9. Compliance and Auditing

### 9.1 Compliance Monitoring
- Regular compliance assessments conducted
- Third-party security certifications maintained (SOC 2, ISO 27001)
- Data protection impact assessments for high-risk processing

### 9.2 Audit Rights
- Data Controller may audit Continuia's compliance annually
- Remote audits preferred; on-site audits by arrangement
- Audit reports shared within 30 days of completion

## 10. Liability and Indemnification

### 10.1 Data Protection Liability
- Each party liable for its own data protection violations
- Continuia indemnifies Data Controller for breaches caused by Continuia's negligence
- Data Controller indemnifies Continuia for breaches caused by inadequate instructions

## 11. Term and Termination

### 11.1 Duration
This DPA remains in effect for the duration of the underlying service agreement.

### 11.2 Post-Termination
- Personal Data deleted or returned within 30 days of termination
- Backup data securely destroyed within 90 days
- Certification of deletion provided

## 12. Governing Law and Disputes

- Governed by the laws of the jurisdiction specified in the main service agreement
- Disputes resolved through binding arbitration
- Data protection authorities may be contacted for unresolved issues

**Appendix A: List of Sub-processors**  
*(To be maintained and updated separately)*

**Appendix B: Technical and Organizational Security Measures**  
*(Detailed security specifications available upon request)*
`;

export default function Conditions() {
  return (
 <Box
      sx={{
        p: { xs: "var(--space-2)", sm: "var(--space-8)" },
        color: "var(--text-primary)",
      }}
    >      <ReactMarkdown>{MarkdownText}</ReactMarkdown>
    </Box>
  );
}
