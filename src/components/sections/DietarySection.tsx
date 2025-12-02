import { motion } from "framer-motion";
import { Leaf, Wheat, Milk, Moon, Star, AlertTriangle, Check } from "lucide-react";

const dietaryOptions = [
  { name: "Vegetarian", icon: Leaf, color: "bg-dietary-vegetarian", description: "Meat-free options" },
  { name: "Vegan", icon: Leaf, color: "bg-dietary-vegan", description: "100% plant-based" },
  { name: "Gluten-Free", icon: Wheat, color: "bg-dietary-gluten-free", description: "No gluten ingredients" },
  { name: "Dairy-Free", icon: Milk, color: "bg-dietary-dairy-free", description: "Lactose-free meals" },
  { name: "Halal", icon: Moon, color: "bg-dietary-halal", description: "Halal certified" },
  { name: "Kosher", icon: Star, color: "bg-dietary-kosher", description: "Kosher certified" },
  { name: "Nut-Free", icon: AlertTriangle, color: "bg-dietary-nut-free", description: "No tree nuts or peanuts" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const DietarySection = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-primary text-sm font-semibold mb-4">
              Inclusive Catering
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Catering to{" "}
              <span className="text-gradient">everyone's</span> needs
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We know how hard it can be to cater to everyone. That's why every restaurant on our platform clearly labels dietary options, making it easy to order for teams with diverse requirements.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {[
                "Every dish clearly labeled with dietary information",
                "Filter restaurants by dietary requirements",
                "Dedicated support for complex dietary needs",
                "Custom menus available on request",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dietary Options Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {dietaryOptions.map((option, index) => (
              <motion.div
                key={option.name}
                variants={itemVariants}
                className="group p-4 lg:p-6 rounded-2xl bg-background card-elevated cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{option.name}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </motion.div>
            ))}
            
            {/* Extra Card */}
            <motion.div
              variants={itemVariants}
              className="p-4 lg:p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-center"
            >
              <span className="text-primary font-semibold mb-1">+ More</span>
              <span className="text-sm text-muted-foreground">Custom requirements</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
