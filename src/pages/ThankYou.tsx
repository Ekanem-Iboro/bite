import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Check, ArrowRight, Download, Share2, Home, BookOpen, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "general";
  const { toast } = useToast();

  const content = {
    demo: {
      title: "Demo Request Received!",
      description: "Thank you for booking a demo with us. You'll receive a calendar invite shortly with all the details.",
      nextSteps: [
        "Check your email for the calendar invite",
        "Add the meeting to your calendar",
        "Prepare any questions you'd like to ask",
        "Our team will send a reminder 24 hours before",
      ],
    },
    contact: {
      title: "Message Received!",
      description: "Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.",
      nextSteps: [
        "Check your email for a confirmation",
        "Our team will review your request",
        "Expect a response within 24 business hours",
        "We may reach out for additional information",
      ],
    },
    trial: {
      title: "Welcome to Just Eat for Business!",
      description: "Your free trial is now active. Let's get you started with setting up your account.",
      nextSteps: [
        "Check your email for login credentials",
        "Complete your account setup",
        "Invite your team members",
        "Place your first order!",
      ],
    },
    general: {
      title: "Thank You!",
      description: "We appreciate your interest in Just Eat for Business. Our team will be in touch soon.",
      nextSteps: [
        "Check your email for confirmation",
        "Explore our resources while you wait",
        "Our team will reach out shortly",
      ],
    },
  };

  const currentContent = content[type as keyof typeof content] || content.general;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Just Eat for Business",
        text: "Check out Just Eat for Business for your corporate catering needs!",
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  const suggestedResources = [
    {
      title: "Getting Started Guide",
      description: "Everything you need to know to start using the platform",
      href: "/resources",
      icon: BookOpen,
    },
    {
      title: "Browse Solutions",
      description: "Explore our enterprise and SME solutions",
      href: "/solutions",
      icon: MessageCircle,
    },
    {
      title: "Case Studies",
      description: "See how other businesses use Just Eat for Business",
      href: "/case-studies",
      icon: Download,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20 lg:py-32 hero-gradient-subtle min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto"
            >
              {/* Success Card */}
              <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-card text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-8"
                >
                  <Check className="w-12 h-12 text-success" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4"
                >
                  {currentContent.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground mb-8"
                >
                  {currentContent.description}
                </motion.p>

                {/* Next Steps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-muted rounded-2xl p-6 text-left mb-8"
                >
                  <h2 className="font-heading font-semibold text-foreground mb-4">What's Next?</h2>
                  <ul className="space-y-3">
                    {currentContent.nextSteps.map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-success" />
                        </div>
                        <span className="text-muted-foreground">{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link to="/">
                    <Button variant="hero" size="lg">
                      <Home className="w-4 h-4" />
                      Return Home
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </motion.div>
              </div>

              {/* Suggested Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h2 className="font-heading text-xl font-bold text-foreground mb-6 text-center">
                  While You Wait...
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {suggestedResources.map((resource, index) => (
                    <Link
                      key={resource.title}
                      to={resource.href}
                      className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all group"
                    >
                      <resource.icon className="w-10 h-10 text-primary mb-4" />
                      <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
