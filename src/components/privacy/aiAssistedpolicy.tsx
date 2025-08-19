import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

const MarkdownText = `
# AI-Assisted Opinion Creation Policy

**Version 1.0 – July 2025**  
**Applies to:** All physicians, AI agents, case managers, and platform compliance agents (e.g., Saira)

## 1. Purpose

This policy governs how AI agents assist licensed physicians in drafting medical second opinions on the Continuia platform. It defines safe, auditable use of AI without crossing into unauthorized clinical activity or undermining physician judgment.

## 2. Principles

- AI agents assist but do not decide.
- All clinical opinions are authored and signed by a licensed physician.
- Patients receive only human-reviewed, approved content.

## 3. Permitted AI Functions

AI agents may assist with:

- Parsing and summarizing uploaded records
- Organizing timelines and diagnostic sequences
- Highlighting abnormal findings (flagged, not interpreted)
- Suggesting literature or guidelines relevant to findings
- Drafting proposed narratives for physician review
- Creating structured formats for physician editing

## 4. Prohibited AI Functions

AI agents may not:

- Submit an opinion directly to the patient
- Generate diagnostic or treatment conclusions independently
- Represent output as a "final" interpretation
- Override physician decisions or auto-approve drafts

## 5. Physician Responsibilities

Physicians must:

- Review and edit any AI-drafted content before submission
- Make their own clinical judgment regardless of AI input
- Use AI suggestions as optional, not mandatory
- Sign all final reports with their license metadata

## 6. Audit and Transparency

- All AI-assisted cases are tagged ('ai_assisted: true')
- AI-generated vs. physician-edited content is diffed and logged
- Agent prompts and suggestions are stored for 7 years for auditability
- Any physician rejection or override of AI suggestions is logged

## 7. Patient Communication

- Patients are never shown AI-generated drafts
- All shared reports contain physician signature and a footer disclaimer:

*"This report was prepared with the assistance of AI tools. The contents have been reviewed and approved by the licensed physician named above."*

## 8. Exceptions and Escalations

- Complex or ambiguous cases should not rely on AI summarization
- If the AI suggests high-risk or uncertain conclusions, the report must be escalated to Continuia's compliance agent (e.g., Saira) for review before physician submission

## 9. Regulatory Alignment

This policy is designed to align with:

- **HIPAA (US):** No AI-to-patient communication without clinical sign-off
- **DPDP (India):** Purpose-limited access and consent-driven exposure
- **MDR & EU AI Act:** Avoidance of standalone clinical inference without CE approval

## 10. Amendment and Review

This policy will be reviewed every 6 months by the Clinical Governance Board. Updates will be shared with all physicians and agent designers.

---

**Prepared by:**  
Continuia Clinical Governance Office  
📧 governance@continuia.ai
`;

export default function Conditions() {
  return (
    <Box
      sx={{
        p: { xs: "var(--space-2)", sm: "var(--space-8)" },
        color: "var(--text-primary)",
      }}
    >
      {" "}
      <ReactMarkdown>{MarkdownText}</ReactMarkdown>
    </Box>
  );
}
