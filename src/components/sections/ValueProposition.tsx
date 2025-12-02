import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Utensils, 
  HeadphonesIcon, 
  Receipt, 
  Clock,
  ShieldCheck,
  Truck
} from "lucide-react";

const benefits = [
  {
    icon: Building2,
    title: "600+ Partner Restaurants",
    description: "Access a diverse network of quality restaurants and caterers, from local favorites to premium brands.",
  },
  {
    icon: MapPin,
    title: "UK-Wide Coverage",
    description: "Serving businesses across London and major UK cities with reliable, consistent delivery.",
  },
  {
    icon: Utensils,
    title: "Every Diet, Every Budget",
    description: "Meals for every dietary requirement, appetite, and budget—from quick lunches to premium events.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Account Management",
    description: "Your personal account manager handles everything, from ordering to issue resolution.",
  },
  {
    icon: Receipt,
    title: "Simplified Billing",
    description: "Consolidated invoicing, expense tracking, and easy budget management for your team.",
  },
  {
    icon: Clock,
    title: "Last-Minute Orders",
    description: "Need food fast? Many of our partners can accommodate same-day and rush orders.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const ValueProposition = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-primary text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything your office{" "}
            <span className="text-gradient">needs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've thought of everything so you don't have to. From ordering to delivery, we make corporate catering effortless.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 card-elevated"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 lg:gap-12"
        >
          {[
            { icon: ShieldCheck, label: "Secure Payments" },
            { icon: Truck, label: "Reliable Delivery" },
            { icon: HeadphonesIcon, label: "24/7 Support" },
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-3 text-muted-foreground">
              <badge.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
