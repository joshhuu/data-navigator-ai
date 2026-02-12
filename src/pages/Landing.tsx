import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLoginModal } from "@/hooks/useLoginModal";
import {
  Sparkles,
  Search,
  LineChart,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Database,
  Lock,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const { openLoginModal } = useLoginModal();

  const features = [
    {
      icon: Search,
      title: "AI-Powered Discovery",
      description: "Find the perfect datasets with intelligent search and ranking algorithms",
    },
    {
      icon: LineChart,
      title: "Advanced Analytics",
      description: "Deep insights and comparisons across multiple data sources",
    },
    {
      icon: Shield,
      title: "Compliance First",
      description: "Enterprise-grade security with built-in compliance verification",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant results with optimized search and filtering capabilities",
    },
    {
      icon: Users,
      title: "Collaborative Tools",
      description: "Share insights and collaborate with your team seamlessly",
    },
    {
      icon: Database,
      title: "Rich Data Catalog",
      description: "Access thousands of verified, enterprise-grade datasets",
    },
  ];

  const benefits = [
    "Save 10+ hours per week on data discovery",
    "Access to 1000+ verified data sources",
    "Real-time compliance monitoring",
    "AI-powered relevance scoring",
    "Side-by-side dataset comparison",
    "Enterprise-grade security",
  ];

  const stats = [
    { value: "10K+", label: "Datasets" },
    { value: "500+", label: "Organizations" },
    { value: "95%", label: "Time Saved" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Custom Header with Login Button */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="DataNexus Logo" className="w-8 h-8 rounded-md" />
            <span className="font-bold text-foreground text-lg tracking-tight">
              Data Nexus<span className="text-primary">AI</span>
            </span>
          </div>

            <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <Button onClick={() => openLoginModal()} variant="default" size="sm">
              Login
            </Button>
          </nav>

          {/* Mobile Login Button */}
          <Button onClick={() => openLoginModal()} variant="default" size="sm" className="md:hidden">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(174,72%,46%,0.12)_0%,_transparent_70%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary mb-8">
              <Sparkles className="h-4 w-4" />
              The Future of Data Discovery
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground leading-tight mb-6">
              Discover Enterprise Data
              <br />
              <span className="gradient-text">at the Speed of Thought</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Harness the power of AI to find, compare, and integrate business data products. 
              Make data-driven decisions faster with our intelligent discovery platform.
            </p>
            
            {/* Central Login Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                onClick={() => openLoginModal()}
                size="lg"
                className="text-base px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-secondary/20">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary mb-4">
              <Rocket className="h-4 w-4" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need to
              <br />
              <span className="gradient-text">Navigate Data</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for data teams who demand speed, accuracy, and compliance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 md:py-32">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary mb-4">
                <TrendingUp className="h-4 w-4" />
                Why Choose Us
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Transform Your
                <br />
                <span className="gradient-text">Data Workflow</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop wasting time searching through scattered data sources. Our AI-powered platform 
                brings everything you need into one unified experience.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-2xl">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                  <Database className="h-24 w-24 text-primary/50" />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <span className="text-sm text-muted-foreground">Search Speed</span>
                    <span className="text-lg font-semibold text-primary">10x Faster</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <span className="text-sm text-muted-foreground">Data Quality</span>
                    <span className="text-lg font-semibold text-primary">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <span className="text-sm text-muted-foreground">Compliance</span>
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center glass-card p-12 rounded-2xl"
          >
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of data professionals who trust Data Nexus AI for their data discovery needs.
              Start your free trial today—no credit card required.
            </p>
            <Button
              onClick={() => openLoginModal()}
              size="lg"
              className="text-base px-10 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/10">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/favicon.png" alt="DataNexus Logo" className="w-6 h-6 rounded-md" />
                <span className="font-bold text-foreground">Data Nexus<span className="text-primary">AI</span></span>
              </div>
              <p className="text-sm text-muted-foreground">
                The intelligent platform for discovering and comparing enterprise data products.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/search" className="hover:text-foreground transition-colors">Discover</Link></li>
                <li><Link to="/compare" className="hover:text-foreground transition-colors">Compare</Link></li>
                <li><Link to="/use-cases" className="hover:text-foreground transition-colors">Use Cases</Link></li>
                <li><Link to="/compliance" className="hover:text-foreground transition-colors">Trust</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Data Nexus AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
