import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

const MarkdownText = `
# Business Associate Agreement (BAA)

**Between:** Healthcare Entity ("Covered Entity") and Continuia HealthTech Pvt Ltd ("Business Associate")  
**Version 1.0 – July 2025**

## 1. Purpose and Background

This Business Associate Agreement ("BAA") is entered into pursuant to the Health Insurance Portability and Accountability Act of 1996 ("HIPAA"), as amended by the Health Information Technology for Economic and Clinical Health Act ("HITECH Act").

The Covered Entity requires Business Associate services for AI-assisted medical second opinion platform services. Business Associate will have access to Protected Health Information ("PHI") in connection with these services.

## 2. Definitions

Terms used but not defined in this Agreement have the meanings assigned in 45 CFR §§ 160.103 and 164.501, including:

- **Business Associate:** Continuia HealthTech Pvt Ltd
- **Covered Entity:** The healthcare organization contracting for services
- **PHI:** Protected Health Information as defined under HIPAA
- **Required by Law:** As defined in 45 CFR § 164.103
- **Secretary:** The Secretary of the U.S. Department of Health and Human Services

## 3. Permitted Uses and Disclosures

### 3.1 General Use and Disclosure Provisions
Business Associate may use or disclose PHI only:
- As permitted or required under this Agreement
- As required by law
- For the proper management and administration of Business Associate
- To carry out legal responsibilities of Business Associate

### 3.2 Specific Permitted Uses
Business Associate may use PHI to:
- Provide AI-assisted medical second opinion services
- Generate clinical summaries and reports for physicians
- Facilitate communication between patients and reviewing physicians
- Maintain audit logs for compliance and quality assurance
- Provide technical support for the platform

### 3.3 Specific Permitted Disclosures
Business Associate may disclose PHI to:
- Licensed physicians providing second opinions through the platform
- Technical support staff with appropriate training and access controls
- Sub-contractors bound by equivalent HIPAA obligations
- Legal authorities when required by law

## 4. Prohibited Uses and Disclosures

Business Associate shall not:
- Use or disclose PHI for marketing purposes
- Sell PHI or receive remuneration for PHI
- Use or disclose PHI in a manner that would violate the HIPAA Privacy Rule
- Use PHI for any purpose other than those specified in this Agreement

## 5. Safeguards and Security

### 5.1 Administrative Safeguards
- Designated HIPAA Security Officer responsible for compliance
- Workforce training on HIPAA requirements and data handling
- Access management procedures with role-based permissions
- Incident response procedures for security breaches

### 5.2 Physical Safeguards
- Secure data centers with biometric access controls
- Workstation security measures and clean desk policies
- Media controls for data storage and disposal
- Equipment disposal procedures with certified data destruction

### 5.3 Technical Safeguards
- **Access Control:** Multi-factor authentication and session management
- **Audit Controls:** Comprehensive logging of all PHI access and modifications
- **Integrity:** Digital signatures and checksums to prevent unauthorized alteration
- **Transmission Security:** TLS 1.3 encryption for all data in transit
- **Encryption:** AES-256 encryption for all PHI at rest

## 6. Individual Rights

### 6.1 Access Rights
Business Associate shall provide access to PHI in a Designated Record Set within 30 days of a request from Covered Entity for such access.

### 6.2 Amendment Rights
Business Associate shall make amendments to PHI in a Designated Record Set as directed by Covered Entity within 60 days of the request.

### 6.3 Accounting of Disclosures
Business Associate shall maintain and provide an accounting of disclosures of PHI as required by 45 CFR § 164.528 within 60 days of a request.

### 6.4 Restriction Requests
Business Associate shall comply with any restriction on use or disclosure of PHI agreed to by Covered Entity under 45 CFR § 164.522.

## 7. Minimum Necessary Standard

Business Associate shall limit uses, disclosures, and requests for PHI to the minimum necessary to accomplish the intended purpose, except:
- When disclosure is to a healthcare provider for treatment
- When disclosure is to the individual who is the subject of the information
- When use or disclosure is required by law

## 8. Reporting and Breach Notification

### 8.1 Incident Reporting
Business Associate shall report to Covered Entity any use or disclosure not permitted by this Agreement within 24 hours of discovery.

### 8.2 Breach Notification
Business Associate shall notify Covered Entity of any Breach of Unsecured PHI within 24 hours of discovery, including:
- Description of the breach and PHI involved
- Steps taken to investigate and mitigate harm
- Contact information for further inquiries

### 8.3 Documentation
Business Associate shall maintain documentation of all security incidents and breaches for a minimum of six years.

## 9. Subcontractors and Agents

### 9.1 Subcontractor Agreements
Business Associate shall ensure that any subcontractors that create, receive, maintain, or transmit PHI agree to the same restrictions and conditions that apply to Business Associate.

### 9.2 Current Subcontractors
- Cloud infrastructure providers (AWS, Google Cloud)
- Security monitoring services
- Data backup and recovery services
- Technical support vendors

## 10. Termination

### 10.1 Term
This Agreement shall be effective as of the date signed and shall terminate when all PHI provided by Covered Entity is destroyed or returned.

### 10.2 Termination for Cause
Covered Entity may immediately terminate this Agreement if Business Associate violates a material term and fails to cure the violation within 30 days.

### 10.3 Effect of Termination
Upon termination, Business Associate shall:
- Return or destroy all PHI received from Covered Entity
- Retain no copies of PHI
- Ensure subcontractors return or destroy PHI
- Provide certification of destruction if requested

### 10.4 Survival
The obligations of Business Associate under this Section shall survive termination of this Agreement.

## 11. Compliance and Auditing

### 11.1 Compliance Monitoring
Business Associate shall conduct annual HIPAA compliance assessments and maintain appropriate certifications (SOC 2 Type II, HITRUST).

### 11.2 Audit Rights
Covered Entity may audit Business Associate's compliance with this Agreement upon reasonable notice, not more than once per year unless there is a suspected violation.

## 12. Liability and Indemnification

### 12.1 HIPAA Violations
Business Associate shall indemnify and hold harmless Covered Entity from any civil penalties, damages, or costs arising from Business Associate's violation of HIPAA.

### 12.2 Limitation of Liability
Except for violations of HIPAA or this Agreement, neither party's liability shall exceed the fees paid under the underlying service agreement.

## 13. Miscellaneous Provisions

### 13.1 Regulatory Changes
This Agreement shall be amended as necessary to comply with changes in applicable law, including HIPAA regulations.

### 13.2 Interpretation
Any ambiguity in this Agreement shall be resolved in favor of a meaning that permits Covered Entity to comply with HIPAA.

### 13.3 Governing Law
This Agreement shall be governed by federal law and the laws of the state where the Covered Entity is located.

**Exhibit A: Description of Services**  
*(Detailed description of AI-assisted second opinion services)*

**Exhibit B: Categories of PHI**  
*(Specific types of health information to be processed)*
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
