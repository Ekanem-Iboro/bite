import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Truck,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  HelpCircle,
  ChevronDown,
  Building2,
  CreditCard,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import HeaderNew from "@/components/layout/HeaderNew";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Browse & Discover",
    description:
      "Explore 600+ restaurants and caterers. Filter by cuisine, dietary requirements, budget, and delivery time to find the perfect match for your team.",
    details: [
      "Filter by dietary requirements",
      "View real menus and prices",
      "Read verified reviews",
      "Save favorites for quick reordering",
    ],
  },
  {
    icon: ShoppingCart,
    number: "02",
    title: "Customize & Order",
    description:
      "Build your order with individual meals or group catering packages. Add special instructions and accommodate every dietary need.",
    details: [
      "Group ordering made easy",
      "Individual meal selections",
      "Bulk discount available",
      "Special instructions for each item",
    ],
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Simple Payment",
    description:
      "Consolidated billing for easy expense management. Set budgets, track spending, and download invoices with one click.",
    details: [
      "Invoice or card payment",
      "Department cost codes",
      "Automatic receipt generation",
      "Monthly spending reports",
    ],
  },
  {
    icon: Truck,
    number: "04",
    title: "Reliable Delivery",
    description:
      "Track your order in real-time. Our vetted delivery partners ensure your food arrives fresh and on time, every time.",
    details: [
      "Real-time tracking",
      "SMS notifications",
      "Contactless delivery option",
      "Dedicated delivery windows",
    ],
  },
];

const faqs = [
  {
    question: "What's the minimum order value?",
    answer:
      "For SME accounts, the minimum order is £50. Enterprise clients can negotiate custom minimums based on volume.",
  },
  {
    question: "How far in advance do I need to order?",
    answer:
      "Same-day ordering is available for most restaurants with at least 2 hours notice. For larger orders (20+ people), we recommend 24-48 hours advance notice.",
  },
  {
    question: "Can I set up recurring orders?",
    answer:
      "Yes! You can schedule weekly or monthly recurring orders with your preferred restaurants. Perfect for regular team lunches or office snacks.",
  },
  {
    question: "How do dietary requirements work?",
    answer:
      "Every restaurant clearly labels dietary options (vegetarian, vegan, gluten-free, etc.). You can filter by these requirements and add notes for allergies or specific needs.",
  },
  {
    question: "What if there's an issue with my order?",
    answer:
      "Our support team is available during business hours via chat, email, or phone. Enterprise clients have access to 24/7 priority support.",
  },
  {
    question: "Can multiple people order at once?",
    answer:
      "Absolutely! Our group ordering feature lets team members add their individual selections to a shared cart, with you approving the final order.",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
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
                How <span className="text-gradient">Just Eat for Business</span>{" "}
                Works
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                From discovery to delivery, we've made corporate catering as
                simple as ordering for yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => setShowVideoModal(true)}
                >
                  <Play className="w-5 h-5" />
                  Watch Full Demo
                </Button>
                <Link to="/demo">
                  <Button variant="hero-outline" size="xl">
                    Try Interactive Demo
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Four Simple Steps
              </h2>
              <p className="text-lg text-muted-foreground">
                Getting great food for your team has never been easier
              </p>
            </motion.div>

            {/* Step Navigation */}
            <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${
                    activeStep === index
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                  <span className="font-medium whitespace-nowrap">
                    {step.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <span className="text-7xl font-bold text-primary/20">
                    {steps[activeStep].number}
                  </span>
                  <h3 className="font-heading text-3xl font-bold text-foreground mb-4 -mt-8">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {steps[activeStep].description}
                  </p>
                  <ul className="space-y-3">
                    {steps[activeStep].details.map((detail, index) => (
                      <motion.li
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-foreground">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted rounded-3xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    {(() => {
                      const StepIcon = steps[activeStep].icon;
                      return (
                        <StepIcon className="w-20 h-20 text-primary/30 mx-auto mb-4" />
                      );
                    })()}
                    <p className="text-muted-foreground">
                      Step {activeStep + 1} Visualization
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Integrates With Your Workflow
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect Just Eat for Business with the tools you already use
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "Slack", desc: "Order from Slack" },
                { name: "Teams", desc: "Microsoft Teams bot" },
                { name: "SAP", desc: "Expense integration" },
                { name: "Xero", desc: "Invoice sync" },
              ].map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 text-center shadow-card"
                >
                  <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {integration.name[0]}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {integration.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-2xl shadow-card overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-foreground">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-muted-foreground">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                className="bg-card rounded-3xl p-8 shadow-card"
              >
                <Download className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Process Flowchart
                </h3>
                <p className="text-muted-foreground mb-6">
                  Download our detailed process flowchart to share with your
                  team.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/process-flowchart.pdf";
                    link.download = "Process-Flowchart.pdf";
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-3xl p-8 shadow-card"
              >
                <HelpCircle className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Need More Help?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to answer any questions you have.
                </p>
                <Link to="/contact">
                  <Button variant="outline">
                    Contact Support
                    <ArrowRight className="w-4 h-4" />
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
                Ready to Get Started?
              </h2>
              <p className="text-xl text-secondary-foreground/70 mb-8 max-w-2xl mx-auto">
                Set up your account in minutes and place your first order today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="hero" size="xl">
                    Start Setup
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="hero-white" size="xl">
                    Book a Demo
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
            className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-card rounded-2xl p-4 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Full Demo Video</p>
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

export default HowItWorks;
