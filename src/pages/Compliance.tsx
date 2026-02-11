import { Shield, CheckCircle, Award, FileCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  {
    icon: Shield,
    title: "GDPR Ready",
    score: 98,
    description: "All datasets undergo GDPR compliance review. Consent tracking and data minimization principles applied.",
  },
  {
    icon: Award,
    title: "ISO 27001 Certified",
    score: 96,
    description: "Our data infrastructure and processes are ISO 27001 certified with annual third-party audits.",
  },
  {
    icon: CheckCircle,
    title: "Verified Sources",
    score: 94,
    description: "Every data source is verified for legitimacy. Multi-step validation ensures data provenance.",
  },
  {
    icon: Lock,
    title: "SOC 2 Type II",
    score: 97,
    description: "SOC 2 Type II compliant with continuous monitoring. Enterprise-grade security controls in place.",
  },
];

const Compliance = () => {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Compliance & Trust Center</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Enterprise-grade data governance. Every dataset is verified, compliant, and audit-ready.
        </p>
      </div>

      {/* Overall score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="surface-card rounded-lg p-8 text-center mb-8 glow-border"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Overall Trust Score</p>
        <p className="text-5xl font-bold gradient-text mb-2">96.3%</p>
        <p className="text-xs text-muted-foreground">Based on compliance audits across all data products</p>
      </motion.div>

      {/* Badges grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="surface-card rounded-lg p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{badge.title}</h3>
                  <span className="text-xs font-semibold text-primary">{badge.score}%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
                <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${badge.score}%` }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data practices */}
      <div className="surface-card rounded-lg p-6 mt-8">
        <h3 className="text-sm font-semibold text-foreground mb-4">Our Data Practices</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Data Minimization", desc: "We collect only what's needed for each dataset category." },
            { title: "Right to Erasure", desc: "Full support for data subject deletion requests within 72 hours." },
            { title: "Encryption at Rest", desc: "AES-256 encryption for all stored data with key rotation." },
          ].map((practice) => (
            <div key={practice.title} className="bg-secondary/50 rounded-md p-4">
              <FileCheck className="h-4 w-4 text-primary mb-2" />
              <h4 className="text-xs font-semibold text-foreground mb-1">{practice.title}</h4>
              <p className="text-[11px] text-muted-foreground">{practice.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compliance;
