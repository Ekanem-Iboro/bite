import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Shield, Zap, Users, ArrowRight, Check, Download, Phone, Lock, BarChart3, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const enterpriseFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure with end-to-end encryption, SSO support, and role-based access controls.",
  },
  {
    icon: Zap,
    title: "Custom Integrations",
    description: "Seamlessly integrate with your existing HR, procurement, and expense management systems via our robust API.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time dashboards, spending insights, and predictive analytics to optimize your food program.",
  },
  {
    icon: Globe,
    title: "Multi-Location Support",
    description: "Manage catering across all your office locations from a single, unified platform.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Your own account manager, implementation specialist, and 24/7 priority support line.",
  },
  {
    icon: Lock,
    title: "Compliance & Audit",
    description: "Full audit trails, GDPR compliance, and customizable approval workflows for financial controls.",
  },
];

const enterpriseClients = [
  { name: "TechCorp", logo: "TC" },
  { name: "FinanceHub", logo: "FH" },
  { name: "MediaGroup", logo: "MG" },
  { name: "ConsultPro", logo: "CP" },
];

const testimonials = [
  {
    quote: "Just Eat for Business transformed how we handle catering for our 2,000+ employees across 5 offices. The integration with our expense system alone saves us 20 hours per week.",
    author: "Sarah Chen",
    role: "VP of Operations",
    company: "TechCorp International",
  },
  {
    quote: "The dedicated support team understands our complex requirements. They've helped us achieve 95% employee satisfaction with our food program.",
    author: "Michael Roberts",
    role: "Facilities Director",
    company: "Global Finance Partners",
  },
];

const EnterpriseSolutions = () => {
  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 hero-gradient-subtle relative overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
                  <Building2 className="w-4 h-4" />
                  Enterprise Solutions
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Built for <span className="text-gradient">Large Organizations</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Enterprise-grade food solutions with custom integrations, dedicated support, and the security your organization demands.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/demo">
                    <Button variant="hero" size="xl">
                      Request Custom Demo
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <a href="tel:+442012345678">
                    <Button variant="hero-outline" size="xl">
                      <Phone className="w-5 h-5" />
                      Call Enterprise Team
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="bg-card rounded-3xl p-8 shadow-card">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6">Trusted by Industry Leaders</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {enterpriseClients.map((client) => (
                      <div key={client.name} className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">{client.logo}</span>
                        </div>
                        <span className="font-medium text-foreground">{client.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Enterprise-Grade Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything your large organization needs to manage corporate catering at scale
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enterpriseFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Downloads Section */}
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Resources for Enterprise
              </h2>
              <p className="text-lg text-muted-foreground">
                Download detailed documentation for your evaluation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "API Documentation", desc: "Full API reference with examples", file: "api-docs.pdf" },
                { title: "Security Whitepaper", desc: "Our security practices & compliance", file: "security-whitepaper.pdf" },
                { title: "Enterprise Guide", desc: "Complete feature overview", file: "enterprise-guide.pdf" },
              ].map((doc, index) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card"
                >
                  <Download className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{doc.title}</h3>
                  <p className="text-muted-foreground mb-4">{doc.desc}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDownload(doc.file)}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                What Enterprise Clients Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-3xl p-8 shadow-card"
                >
                  <p className="text-lg text-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{testimonial.author[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 hero-gradient-subtle">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Transform Your Corporate Catering?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of enterprise clients who trust Just Eat for Business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/demo">
                  <Button variant="hero" size="xl">
                    Request Custom Demo
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/pricing#enterprise">
                  <Button variant="hero-outline" size="xl">
                    See Enterprise Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EnterpriseSolutions;
