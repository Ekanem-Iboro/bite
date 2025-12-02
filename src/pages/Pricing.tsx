import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Check, X, ArrowRight, Calculator, Building2, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Slider } from "@/components/ui/slider";

const plans = [
  {
    id: "sme",
    name: "SME",
    icon: Users,
    description: "Perfect for small and medium businesses",
    price: { monthly: 0, annual: 0 },
    priceLabel: "Platform fee",
    features: [
      { name: "Access to 600+ restaurants", included: true },
      { name: "Team management dashboard", included: true },
      { name: "Budget controls", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: true },
      { name: "Dedicated account manager", included: false },
      { name: "API access", included: false },
      { name: "SSO integration", included: false },
      { name: "Custom branding", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    ctaLink: "/register",
    popular: false,
  },
  {
    id: "business",
    name: "Business",
    icon: Zap,
    description: "For growing companies with more needs",
    price: { monthly: 99, annual: 79 },
    priceLabel: "per month",
    features: [
      { name: "Access to 600+ restaurants", included: true },
      { name: "Team management dashboard", included: true },
      { name: "Budget controls", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority email support", included: true },
      { name: "Shared account manager", included: true },
      { name: "Limited API access", included: true },
      { name: "SSO integration", included: false },
      { name: "Custom branding", included: false },
      { name: "24/7 support", included: false },
    ],
    cta: "Start Free Trial",
    ctaLink: "/register",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    description: "For large organizations with custom needs",
    price: { monthly: null, annual: null },
    priceLabel: "Custom pricing",
    features: [
      { name: "Access to 600+ premium restaurants", included: true },
      { name: "Team management dashboard", included: true },
      { name: "Advanced budget controls", included: true },
      { name: "Custom analytics & reporting", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Full API access", included: true },
      { name: "SSO integration", included: true },
      { name: "Custom branding", included: true },
      { name: "SLA guarantee", included: true },
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
    popular: false,
  },
];

const Pricing = () => {
  const location = useLocation();
  const [isAnnual, setIsAnnual] = useState(true);
  const [employees, setEmployees] = useState([50]);
  const [ordersPerWeek, setOrdersPerWeek] = useState([3]);

  // Scroll to section if hash present
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate estimated cost
  const estimatedMonthly = Math.round(employees[0] * ordersPerWeek[0] * 4 * 12); // £12 average meal

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 lg:py-32 hero-gradient-subtle">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Simple, <span className="text-gradient">Transparent</span> Pricing
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                No hidden fees. No surprises. Just great food for your team.
              </p>
              
              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-4 p-2 bg-muted rounded-xl">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    !isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  Annual
                  <span className="ml-2 text-xs text-success font-semibold">Save 20%</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 lg:py-32 -mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  id={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-card rounded-3xl p-8 shadow-card ${
                    plan.popular ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                      <plan.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    {plan.price.monthly !== null ? (
                      <>
                        <span className="text-4xl font-bold text-foreground">
                          £{isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-muted-foreground">/{plan.priceLabel}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-foreground">{plan.priceLabel}</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-success flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link to={plan.ctaLink}>
                    <Button
                      variant={plan.popular ? "hero" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Calculator */}
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                  <Calculator className="w-4 h-4" />
                  Cost Calculator
                </div>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Estimate Your Monthly Spend
                </h2>
                <p className="text-lg text-muted-foreground">
                  See how much your team's meals might cost
                </p>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-card">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="font-medium text-foreground">Number of Employees</label>
                      <span className="font-bold text-primary">{employees[0]}</span>
                    </div>
                    <Slider
                      value={employees}
                      onValueChange={setEmployees}
                      min={10}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>10</span>
                      <span>500+</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="font-medium text-foreground">Orders per Week</label>
                      <span className="font-bold text-primary">{ordersPerWeek[0]}</span>
                    </div>
                    <Slider
                      value={ordersPerWeek}
                      onValueChange={setOrdersPerWeek}
                      min={1}
                      max={7}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>1x/week</span>
                      <span>Daily</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Estimated Monthly Food Spend</p>
                      <p className="text-5xl font-bold text-foreground">
                        £{estimatedMonthly.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Based on £12 average meal price
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Link to="/contact">
                    <Button variant="hero" className="w-full" size="lg">
                      Get Custom Quote
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Pricing FAQs
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  q: "Are there any hidden fees?",
                  a: "No hidden fees. You only pay for the food you order plus delivery fees where applicable.",
                },
                {
                  q: "Can I change plans anytime?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, invoicing for business accounts, and direct debit for enterprise.",
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes! All plans come with a 14-day free trial so you can test all features before committing.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card"
                >
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-32 hero-gradient-subtle">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our team is here to help you find the right plan for your business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="xl">
                    Contact Sales
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="hero-outline" size="xl">
                    Book a Demo
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

export default Pricing;
