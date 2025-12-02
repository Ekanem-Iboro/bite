import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Users, Zap, Shield, ArrowRight, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const solutions = [
  {
    icon: Building2,
    title: "Enterprise Solutions",
    description: "For large organizations with 500+ employees. Custom integrations, dedicated support, and enterprise-grade security.",
    features: ["Dedicated account manager", "Custom API integrations", "Advanced analytics", "SSO authentication"],
    href: "/solutions/enterprise",
    badge: "Most Popular",
  },
  {
    icon: Users,
    title: "SME Solutions",
    description: "Perfect for small and medium businesses with 10-500 employees. Flexible plans that grow with you.",
    features: ["Self-service platform", "Flexible ordering", "Budget controls", "Team management"],
    href: "/solutions/sme",
    badge: null,
  },
];

const comparisonFeatures = [
  { feature: "Restaurant Access", enterprise: "600+ Premium", sme: "600+ Standard" },
  { feature: "Minimum Order", enterprise: "Custom", sme: "£50" },
  { feature: "Account Manager", enterprise: "Dedicated", sme: "Shared" },
  { feature: "API Access", enterprise: "Full Access", sme: "Limited" },
  { feature: "Analytics", enterprise: "Advanced", sme: "Basic" },
  { feature: "Support", enterprise: "24/7 Priority", sme: "Business Hours" },
  { feature: "Custom Branding", enterprise: "Yes", sme: "No" },
  { feature: "SSO Integration", enterprise: "Yes", sme: "No" },
];

const Solutions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 hero-gradient-subtle">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
                Solutions for Every Business
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Find the Perfect <span className="text-gradient">Solution</span> for Your Team
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                From startups to enterprises, we have tailored solutions to simplify your corporate catering needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/demo">
                  <Button variant="hero" size="xl">
                    Book a Demo
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="hero-outline" size="xl" onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/solution-guide.pdf';
                  link.download = 'JustEat-Solution-Guide.pdf';
                  link.click();
                }}>
                  <Download className="w-5 h-5" />
                  Download Guide
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Solutions Cards */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-card rounded-3xl p-8 lg:p-10 shadow-card hover:shadow-card-hover transition-all group"
                >
                  {solution.badge && (
                    <span className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {solution.badge}
                    </span>
                  )}
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
                    <solution.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {solution.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{solution.description}</p>
                  <ul className="space-y-3 mb-8">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={solution.href}>
                    <Button variant="hero" className="w-full group-hover:shadow-glow transition-shadow">
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Compare Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                See which plan is right for your business
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl shadow-card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-6 font-heading font-semibold text-foreground">Feature</th>
                      <th className="text-center p-6 font-heading font-semibold text-foreground bg-accent/50">
                        <div className="flex flex-col items-center">
                          <Building2 className="w-6 h-6 text-primary mb-2" />
                          Enterprise
                        </div>
                      </th>
                      <th className="text-center p-6 font-heading font-semibold text-foreground">
                        <div className="flex flex-col items-center">
                          <Users className="w-6 h-6 text-primary mb-2" />
                          SME
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="p-6 font-medium text-foreground">{row.feature}</td>
                        <td className="p-6 text-center text-foreground bg-accent/30">{row.enterprise}</td>
                        <td className="p-6 text-center text-muted-foreground">{row.sme}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <div className="flex justify-center gap-4 mt-8">
              <Link to="/solutions/enterprise">
                <Button variant="hero" size="lg">
                  View Enterprise
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/solutions/sme">
                <Button variant="hero-outline" size="lg">
                  View SME
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary rounded-3xl p-8 lg:p-16 text-center"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-secondary-foreground mb-4">
                Not Sure Which Solution is Right?
              </h2>
              <p className="text-xl text-secondary-foreground/70 mb-8 max-w-2xl mx-auto">
                Our team will help you find the perfect fit for your organization's needs.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Contact Sales
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
