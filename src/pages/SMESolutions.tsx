import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Zap, CreditCard, Calendar, ArrowRight, Check, Play, Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const smeFeatures = [
  {
    icon: Zap,
    title: "Quick Setup",
    description: "Get started in minutes with our self-service onboarding. No lengthy contracts or complex integrations required.",
  },
  {
    icon: CreditCard,
    title: "Flexible Pricing",
    description: "Pay only for what you use with transparent pricing. No hidden fees or minimum commitments.",
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Schedule recurring orders, set reminders, and manage your team's preferences from one dashboard.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Invite team members, set ordering permissions, and track departmental spending with ease.",
  },
];

const successStories = [
  {
    company: "StartupX",
    industry: "Technology",
    employees: "45 employees",
    quote: "We went from chaotic lunch ordering to a streamlined process in just one day.",
    result: "60% reduction in ordering time",
  },
  {
    company: "Creative Agency",
    industry: "Marketing",
    employees: "80 employees",
    quote: "The dietary filtering alone has been a game-changer for our diverse team.",
    result: "100% team satisfaction",
  },
  {
    company: "Legal Partners LLP",
    industry: "Legal",
    employees: "120 employees",
    quote: "Professional enough for client meetings, convenient for daily team lunches.",
    result: "£5,000/year saved on catering",
  },
];

const SMESolutions = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 hero-gradient-subtle relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
                  <Users className="w-4 h-4" />
                  SME Solutions
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Perfect for <span className="text-gradient">Growing Teams</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Affordable, flexible corporate catering that scales with your business. No contracts, no complexity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button variant="hero" size="xl">
                      Start Free Trial
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="hero-outline"
                    size="xl"
                    onClick={() => setShowVideoModal(true)}
                  >
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="bg-card rounded-3xl p-8 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-heading text-xl font-bold text-foreground">SME Plan</h3>
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">£0</span>
                    <span className="text-muted-foreground"> platform fee</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {["Access to 600+ restaurants", "Team management dashboard", "Budget controls", "Basic analytics", "Email support"].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-success" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register">
                    <Button variant="hero" className="w-full">
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Built for Small & Medium Businesses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All the features you need without the enterprise complexity
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {smeFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
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

        {/* Success Stories */}
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Success Stories from Businesses Like Yours
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{story.company[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{story.company}</p>
                      <p className="text-sm text-muted-foreground">{story.industry} • {story.employees}</p>
                    </div>
                  </div>
                  <p className="text-foreground mb-4 italic">"{story.quote}"</p>
                  <div className="px-4 py-2 rounded-lg bg-success/10 text-success text-sm font-medium">
                    {story.result}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Get Started in 3 Simple Steps
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Create Account", desc: "Sign up in under 2 minutes with just your email" },
                { step: "2", title: "Add Your Team", desc: "Invite colleagues and set up ordering preferences" },
                { step: "3", title: "Start Ordering", desc: "Browse restaurants and place your first order" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 shadow-card"
              >
                <Download className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">SME Starter Guide</h3>
                <p className="text-muted-foreground mb-6">
                  Everything you need to know to get your team up and running with corporate catering.
                </p>
                <Button variant="outline" onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/sme-starter-guide.pdf';
                  link.download = 'SME-Starter-Guide.pdf';
                  link.click();
                }}>
                  <Download className="w-4 h-4" />
                  Download Guide
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 shadow-card"
              >
                <MessageCircle className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Chat with Sales</h3>
                <p className="text-muted-foreground mb-6">
                  Have questions? Our friendly team is here to help you find the right solution.
                </p>
                <Link to="/contact">
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4" />
                    Start Chat
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary rounded-3xl p-8 lg:p-16 text-center"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-secondary-foreground mb-4">
                Ready to Simplify Your Team's Lunch?
              </h2>
              <p className="text-xl text-secondary-foreground/70 mb-8 max-w-2xl mx-auto">
                Join thousands of growing businesses who trust Just Eat for Business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="hero" size="xl">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/pricing#sme">
                  <Button variant="hero-white" size="xl">
                    See SME Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card rounded-2xl p-4 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Demo Video Placeholder</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="mt-4 w-full"
                onClick={() => setShowVideoModal(false)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SMESolutions;
