import { useState } from "react";
import { datasets } from "@/data/datasets";
import { useCaseRecommendations } from "@/utils/aiSimulation";
import { DatasetCard } from "@/components/DatasetCard";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Target, BarChart3, Globe, Heart, MapPin, Sparkles, HelpCircle } from "lucide-react";

const useCases = [
  { id: "lead-generation", name: "Lead Generation", icon: Target, desc: "Find qualified prospects for outbound campaigns" },
  { id: "market-research", name: "Market Research", icon: BarChart3, desc: "Analyze markets with firmographic and location data" },
  { id: "expansion-planning", name: "Expansion Planning", icon: Globe, desc: "Identify new markets and expansion opportunities" },
  { id: "healthcare-outreach", name: "Healthcare Outreach", icon: Heart, desc: "Target healthcare providers and facilities" },
  { id: "retail-mapping", name: "Retail Mapping", icon: MapPin, desc: "Map retail locations and competitor footprints" },
];

const UseCases = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const rec = selected ? useCaseRecommendations[selected] : null;
  const recommendedDatasets = rec
    ? rec.datasetIds.map((id) => datasets.find((d) => d.id === id)!).filter(Boolean)
    : [];

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Compass className="h-5 w-5 text-primary mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Use-Case Navigator</h1>
        <p className="text-sm text-muted-foreground">Select a business use case to get AI-recommended datasets.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {useCases.map((uc) => (
          <button
            key={uc.id}
            onClick={() => setSelected(uc.id === selected ? null : uc.id)}
            className={`surface-card rounded-lg p-4 text-left hover-lift transition-all ${
              selected === uc.id ? "glow-border" : ""
            }`}
          >
            <uc.icon className={`h-5 w-5 mb-2 ${selected === uc.id ? "text-primary" : "text-muted-foreground"}`} />
            <h3 className="text-sm font-semibold text-foreground">{uc.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{uc.desc}</p>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {rec && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="glass-card rounded-lg p-4 mb-6 flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground mb-1">AI Recommendation</p>
                <p className="text-xs text-muted-foreground">{rec.reasoning}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedDatasets.map((ds) => (
                <DatasetCard key={ds.id} dataset={ds} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cannot Find Dataset Section */}
      <div className="surface-card rounded-lg p-6 mt-8 text-center">
        <HelpCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-base font-semibold text-foreground mb-2">
          Cannot find a dataset for your use case?
        </h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
          We're here to help! Tell us about your specific data needs and our team will work with you to find or create the perfect dataset.
        </p>
        <Button onClick={() => setShowContactModal(true)} size="lg" className="gap-2">
          Contact Us
        </Button>
      </div>

      {/* Contact Modal */}
      <ContactModal open={showContactModal} onOpenChange={setShowContactModal} />
    </div>
  );
};

export default UseCases;
