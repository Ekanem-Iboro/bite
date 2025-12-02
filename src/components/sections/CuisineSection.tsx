import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import cuisinePoke from "@/assets/cuisine-poke.jpg";
import cuisineBurger from "@/assets/cuisine-burger.jpg";
import cuisineSalad from "@/assets/cuisine-salad.jpg";
import cuisineWrap from "@/assets/cuisine-wrap.jpg";
import cuisinePizza from "@/assets/cuisine-pizza.jpg";
import cuisineAsian from "@/assets/cuisine-asian.jpg";
import cuisineMediterranean from "@/assets/cuisine-mediterranean.jpg";
import cuisineIndian from "@/assets/cuisine-indian.jpg";

const cuisines = [
  { name: "Poké Bowls", image: cuisinePoke, count: 45 },
  { name: "Burgers", image: cuisineBurger, count: 78 },
  { name: "Salads", image: cuisineSalad, count: 92 },
  { name: "Wraps", image: cuisineWrap, count: 56 },
  { name: "Pizza", image: cuisinePizza, count: 64 },
  { name: "Asian", image: cuisineAsian, count: 124 },
  { name: "Mediterranean", image: cuisineMediterranean, count: 87 },
  { name: "Indian", image: cuisineIndian, count: 68 },
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

export const CuisineSection = () => {
  return (
    <section id="restaurants" className="py-20 lg:py-32 bg-background">
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
            600+ Restaurants
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Browse by Cuisine
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From healthy salads to indulgent burgers, find the perfect catering for every occasion and preference.
          </p>
        </motion.div>

        {/* Cuisine Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.name}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl cursor-pointer card-elevated"
            >
              <div className="aspect-square">
                <img
                  src={cuisine.image}
                  alt={`${cuisine.name} cuisine`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="font-heading font-bold text-lg lg:text-xl text-background mb-1">
                  {cuisine.name}
                </h3>
                <p className="text-sm text-background/70">
                  {cuisine.count} restaurants
                </p>
              </div>
              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-5 h-5 text-background" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View all cuisines
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
