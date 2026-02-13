export interface FAQItem {
  question: string;
  answer: string;
}

export const complianceFAQ: FAQItem[] = [
  {
    question: "How do you ensure dataset compliance with GDPR?",
    answer: "All datasets undergo a multi-step GDPR compliance review before listing. We verify consent mechanisms, data minimization practices, and ensure proper documentation for cross-border transfers. Each dataset includes compliance metadata and audit trails."
  },
  {
    question: "Can I use these datasets for commercial purposes?",
    answer: "Yes, all datasets come with commercial licensing options. The specific terms vary by dataset and are clearly outlined in each product's licensing section. Enterprise licenses include additional usage rights and support."
  },
  {
    question: "What happens if a dataset violates compliance standards?",
    answer: "We have a 24-hour response protocol for compliance violations. Datasets are immediately suspended, affected customers are notified, and remediation plans are implemented. Full incident reports are provided to enterprise clients."
  },
  {
    question: "Are datasets regularly audited for compliance?",
    answer: "Yes, all datasets undergo quarterly compliance audits. High-risk categories (PII, financial data) are audited monthly. Third-party auditors verify our SOC 2 Type II and ISO 27001 certifications annually."
  },
  {
    question: "How is personal data protected in your datasets?",
    answer: "We employ multiple protection layers: anonymization and pseudonymization techniques, encryption at rest (AES-256) and in transit (TLS 1.3), access controls with audit logging, and regular penetration testing of our infrastructure."
  },
  {
    question: "What regions do your compliance certifications cover?",
    answer: "Our compliance framework covers EU (GDPR), US (CCPA, SOC 2), UK (UK GDPR), and Asia-Pacific regions. We maintain data residency options for customers with specific geographic requirements."
  },
  {
    question: "How can I verify a dataset's compliance score?",
    answer: "Each dataset page displays a detailed compliance scorecard with verification badges. Enterprise customers can access full audit reports, certification documents, and compliance test results through their dashboard."
  },
  {
    question: "Do you support data subject rights requests?",
    answer: "Yes, we provide tooling to facilitate data subject access requests (DSAR), right to erasure, and data portability. Our support team processes these requests within 72 hours per GDPR requirements."
  }
];
