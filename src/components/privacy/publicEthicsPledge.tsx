import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

const MarkdownText = `
# Continuia Public Ethics Pledge

**Our Commitment to Ethical AI-Assisted Healthcare**  
**Version 1.0 – July 2025**

## 🌟 Our Mission

Continuia is committed to revolutionizing healthcare through ethical AI assistance that empowers patients and supports physicians while maintaining the highest standards of medical ethics, patient safety, and professional integrity.

## 🏥 Core Ethical Principles

### 1. Patient-First Healthcare
**We pledge that:**
- Every patient receives care from licensed, qualified physicians
- AI serves only as a tool to assist, never to replace, medical judgment
- Patient autonomy and informed consent are paramount
- Healthcare decisions remain between patients and their doctors

### 2. Physician Independence
**We guarantee that:**
- All medical opinions come from independent, licensed physicians
- Doctors maintain full clinical autonomy and professional judgment
- AI recommendations can be modified, rejected, or overridden by physicians
- No financial incentives influence medical recommendations

### 3. Transparency and Trust
**We commit to:**
- Clear disclosure of AI involvement in all processes
- Open communication about our technology's capabilities and limitations
- Honest representation of what our platform does and does not do
- Regular public reporting on our ethical practices and outcomes

## 🤖 Responsible AI Governance

### AI Limitations and Boundaries
**We explicitly state that our AI:**
- Does NOT diagnose medical conditions
- Does NOT prescribe treatments or medications
- Does NOT provide medical advice directly to patients
- Does NOT replace the physician-patient relationship

**Our AI is designed to:**
- Assist physicians with document analysis and summarization
- Help organize complex medical information
- Suggest relevant medical literature and research
- Support administrative and workflow tasks

### Bias Prevention and Fairness
**We actively work to:**
- Eliminate bias in physician assignment algorithms
- Ensure equitable access across all demographic groups
- Regularly audit our systems for discriminatory patterns
- Maintain cultural sensitivity and inclusivity

### Data Protection and Privacy
**We safeguard patient information by:**
- Implementing industry-leading security measures
- Complying with HIPAA, GDPR, and DPDP regulations
- Limiting data access to authorized personnel only
- Providing patients full control over their health information

## 🌍 Global Healthcare Ethics

### Regulatory Compliance
**We pledge to:**
- Comply with medical regulations in all jurisdictions we serve
- Maintain appropriate licenses and certifications
- Cooperate fully with healthcare authorities and regulators
- Adapt our practices to meet evolving regulatory requirements

### Cultural Sensitivity
**We respect:**
- Diverse cultural approaches to healthcare and healing
- Religious and personal beliefs about medical treatment
- Language preferences and communication styles
- Local healthcare customs and practices

### Accessibility and Equity
**We strive to:**
- Make our services accessible to patients regardless of economic status
- Provide multilingual support where needed
- Accommodate patients with disabilities
- Reduce healthcare disparities through technology

## 🔬 Clinical Excellence and Safety

### Quality Assurance
**We maintain:**
- Rigorous physician credentialing and ongoing evaluation
- Continuous monitoring of clinical outcomes and patient satisfaction
- Regular review and improvement of our processes
- Commitment to evidence-based medical practices

### Patient Safety
**We prioritize:**
- Immediate escalation of emergency situations to appropriate care
- Clear communication of urgency levels and time-sensitive issues
- Robust systems to prevent medical errors
- Comprehensive audit trails for all clinical decisions

### Continuous Improvement
**We commit to:**
- Regular assessment of our ethical practices
- Incorporation of patient and physician feedback
- Staying current with medical ethics research and best practices
- Transparent reporting of our performance and areas for improvement

## 📊 Accountability and Oversight

### Internal Governance
**We maintain:**
- An independent Clinical Ethics Committee
- Regular internal audits of our ethical practices
- Clear escalation procedures for ethical concerns
- Whistleblower protections for staff reporting issues

### External Oversight
**We welcome:**
- Independent third-party audits of our practices
- Regulatory inspections and compliance reviews
- Academic research partnerships to study our impact
- Public scrutiny and feedback on our ethical performance

### Public Reporting
**We commit to publishing:**
- Annual ethics and transparency reports
- Patient safety and outcome statistics
- Bias audit results and remediation efforts
- Regulatory compliance status and any violations

## 🤝 Stakeholder Commitments

### To Patients
- Your health and safety are our highest priority
- You will always know when AI is involved in your care
- Your privacy and data security are rigorously protected
- You have the right to understand and question our processes

### To Physicians
- We respect your professional autonomy and clinical judgment
- We provide tools that enhance, not replace, your expertise
- We maintain clear boundaries around AI capabilities
- We support your continuing education and professional development

### To Healthcare Partners
- We operate with transparency and integrity in all partnerships
- We comply with all applicable laws and professional standards
- We share our commitment to ethical healthcare delivery
- We welcome collaboration to improve patient outcomes

### To Society
- We contribute to the advancement of ethical AI in healthcare
- We participate in policy discussions about AI regulation
- We share our learnings with the broader healthcare community
- We work to build public trust in AI-assisted healthcare

## 📞 Ethics Reporting and Contact

### Report Ethical Concerns
If you have concerns about our ethical practices, please contact:

**Ethics Hotline:** ethics@continuia.ai  
**Clinical Governance:** governance@continuia.ai  
**Patient Advocacy:** advocate@continuia.ai  
**Data Protection Officer:** privacy@continuia.ai

### Public Accountability
- All ethics reports are investigated thoroughly
- We publish quarterly summaries of ethics inquiries and resolutions
- We maintain an open dialogue with patients, physicians, and the public
- We continuously evolve our practices based on feedback and learning

## ✍️ Our Pledge

**As the leadership team of Continuia, we personally commit to upholding these ethical principles in every aspect of our work. We recognize that trust in healthcare technology must be earned through consistent ethical behavior, transparency, and unwavering commitment to patient welfare.**

**We invite patients, physicians, regulators, and the public to hold us accountable to these standards and to join us in advancing ethical AI-assisted healthcare for all.**

*This pledge is reviewed annually and updated as needed to reflect our evolving understanding of ethical AI in healthcare. The current version is always available at continuia.ai/ethics*

**Last Updated:** July 2025  
**Next Review:** July 2026
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
