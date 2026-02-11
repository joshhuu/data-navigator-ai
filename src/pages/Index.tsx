import { SearchBar } from "@/components/SearchBar";
import { DatasetCard } from "@/components/DatasetCard";
import { categories, datasets } from "@/data/datasets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail, AtSign, Phone, Heart, Building2, Home, MapPin, Layers,
  TrendingUp, ArrowRight, Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Mail, AtSign, Phone, Heart, Building2, Home, MapPin, Layers,
};

const trendingDatasets = datasets.filter((d) => d.trending);

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(174,72%,46%,0.08)_0%,_transparent_70%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-xs text-primary mb-6">
              <Sparkles className="h-3 w-3" />
              AI-Powered Data Discovery
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
              Discover & Compare
              <br />
              <span className="gradient-text">Business Data Products</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
              Explore enterprise-grade datasets across industries. AI-ranked for relevance, compliance-verified, and ready for integration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SearchBar large />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-lg font-semibold text-foreground mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Layers;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    to={`/search?category=${cat.id}`}
                    className="surface-card rounded-lg p-4 flex items-center gap-3 hover-lift group block"
                  >
                    <div className="w-9 h-9 rounded-md flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{cat.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {datasets.filter((d) => d.category === cat.id).length} products
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 border-t border-border/50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Trending Data Products</h2>
            </div>
            <Link to="/search" className="text-xs text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingDatasets.map((ds) => (
              <DatasetCard key={ds.id} dataset={ds} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
