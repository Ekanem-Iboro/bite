import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Users, TrendingUp, ArrowRight, Search, X, Download, Share2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const caseStudies = [
  {
    id: 1,
    company: "TechStart UK",
    industry: "Technology",
    size: "50-200",
    logo: "TS",
    image: "/case-tech.jpg",
    headline: "How TechStart UK Reduced Catering Admin by 80%",
    summary: "A fast-growing tech startup transformed their chaotic lunch ordering into a streamlined process.",
    challenge: "With 150 employees across 3 floors, coordinating daily lunch orders was consuming 10+ hours per week of admin time.",
    solution: "Implemented Just Eat for Business with group ordering and departmental budgets.",
    results: [
      { metric: "80%", label: "Reduction in admin time" },
      { metric: "£12,000", label: "Annual savings" },
      { metric: "95%", label: "Employee satisfaction" },
    ],
    quote: "Just Eat for Business has been a game-changer. What used to take us hours now takes minutes.",
    author: "Sarah Mitchell",
    role: "Office Manager",
  },
  {
    id: 2,
    company: "Global Finance Partners",
    industry: "Finance",
    size: "500+",
    logo: "GF",
    image: "/case-finance.jpg",
    headline: "Enterprise Catering at Scale: Global Finance Partners' Story",
    summary: "A leading financial services firm streamlined catering across 5 UK offices.",
    challenge: "Managing catering for client meetings, board lunches, and daily employee meals across multiple locations.",
    solution: "Enterprise solution with custom integrations, dedicated account management, and consolidated billing.",
    results: [
      { metric: "5", label: "Offices unified" },
      { metric: "40%", label: "Cost reduction" },
      { metric: "99.9%", label: "On-time delivery" },
    ],
    quote: "The level of service and reliability has exceeded our expectations. Our clients are always impressed.",
    author: "James Chen",
    role: "Facilities Director",
  },
  {
    id: 3,
    company: "Creative Agency London",
    industry: "Marketing",
    size: "50-200",
    logo: "CA",
    image: "/case-creative.jpg",
    headline: "Fueling Creativity: How This Agency Keeps Their Team Happy",
    summary: "A creative agency discovered that great food leads to great work.",
    challenge: "A diverse team with varying dietary requirements and preferences was hard to cater to.",
    solution: "Leveraged dietary filtering and individual meal ordering to give everyone choice.",
    results: [
      { metric: "100%", label: "Dietary needs met" },
      { metric: "Zero", label: "Food waste" },
      { metric: "4.9/5", label: "Team rating" },
    ],
    quote: "Our team loves having real choice. The variety of restaurants available means there's something for everyone.",
    author: "Emma Rodriguez",
    role: "People & Culture Lead",
  },
  {
    id: 4,
    company: "Legal Solutions LLP",
    industry: "Legal",
    size: "200-500",
    logo: "LS",
    image: "/case-legal.jpg",
    headline: "Professional Catering for Client-Facing Legal Firm",
    summary: "A prestigious law firm elevated their client meeting experience.",
    challenge: "Needed reliable, high-quality catering for important client meetings and working lunches.",
    solution: "Premium restaurant partners and scheduled deliveries for predictable, professional service.",
    results: [
      { metric: "Premium", label: "Quality assured" },
      { metric: "15 min", label: "Avg early delivery" },
      { metric: "£8,000", label: "Annual savings" },
    ],
    quote: "The consistency and quality of food has helped us make a great impression on clients.",
    author: "Michael Thompson",
    role: "Managing Partner",
  },
  {
    id: 5,
    company: "HealthTech Innovations",
    industry: "Healthcare",
    size: "50-200",
    logo: "HT",
    image: "/case-health.jpg",
    headline: "Health-Conscious Catering for a Health-Focused Company",
    summary: "A healthcare startup aligned their catering with their company values.",
    challenge: "Wanted to offer nutritious, balanced meals that reflected their health-first culture.",
    solution: "Curated selection of healthy restaurants with nutritional information displayed.",
    results: [
      { metric: "100%", label: "Healthy options" },
      { metric: "Calorie", label: "Info available" },
      { metric: "High", label: "Team wellbeing" },
    ],
    quote: "It's important our food choices reflect our values. Just Eat for Business made this easy.",
    author: "Dr. Lisa Park",
    role: "CEO",
  },
  {
    id: 6,
    company: "Manufacturing Plus",
    industry: "Manufacturing",
    size: "500+",
    logo: "MP",
    image: "/case-manufacturing.jpg",
    headline: "Feeding a 24/7 Operation: Manufacturing Plus Case Study",
    summary: "A manufacturing company solved their shift-based catering challenges.",
    challenge: "Three shifts meant catering needs at all hours, with varying crew sizes.",
    solution: "Flexible scheduling, shift-based budgets, and expanded delivery windows.",
    results: [
      { metric: "24/7", label: "Availability" },
      { metric: "3 shifts", label: "Fully covered" },
      { metric: "High", label: "Morale boost" },
    ],
    quote: "Finally, our night shift gets the same great food options as everyone else.",
    author: "Robert Davies",
    role: "Operations Manager",
  },
];

const industries = ["All", "Technology", "Finance", "Marketing", "Legal", "Healthcare", "Manufacturing"];
const sizes = ["All", "50-200", "200-500", "500+"];

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudy, setSelectedStudy] = useState<typeof caseStudies[0] | null>(null);

  const filteredStudies = caseStudies.filter((study) => {
    const matchesIndustry = selectedIndustry === "All" || study.industry === selectedIndustry;
    const matchesSize = selectedSize === "All" || study.size === selectedSize;
    const matchesSearch = study.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.headline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSize && matchesSearch;
  });

  const handleShare = (study: typeof caseStudies[0]) => {
    if (navigator.share) {
      navigator.share({
        title: study.headline,
        text: study.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

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
                Customer <span className="text-gradient">Success Stories</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                See how businesses like yours have transformed their corporate catering
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border sticky top-16 lg:top-20 bg-background/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search case studies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Industry Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedIndustry === industry
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>

              {/* Size Filter */}
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {size === "All" ? "All Sizes" : `${size} employees`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredStudies.map((study, index) => (
                  <motion.div
                    key={study.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
                    onClick={() => setSelectedStudy(study)}
                  >
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">{study.logo}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                          {study.industry}
                        </span>
                        <span className="text-xs text-muted-foreground">{study.size} employees</span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {study.headline}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{study.summary}</p>
                      <div className="flex gap-4">
                        {study.results.slice(0, 2).map((result) => (
                          <div key={result.label}>
                            <p className="text-xl font-bold text-primary">{result.metric}</p>
                            <p className="text-xs text-muted-foreground">{result.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredStudies.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No case studies match your filters.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedIndustry("All");
                    setSelectedSize("All");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of businesses who have transformed their corporate catering
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

        {/* Modal */}
        <AnimatePresence>
          {selectedStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedStudy(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{selectedStudy.logo}</span>
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl font-bold text-foreground">
                          {selectedStudy.company}
                        </h2>
                        <p className="text-muted-foreground">
                          {selectedStudy.industry} • {selectedStudy.size} employees
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStudy(null)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    {selectedStudy.headline}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">The Challenge</h4>
                      <p className="text-muted-foreground">{selectedStudy.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">The Solution</h4>
                      <p className="text-muted-foreground">{selectedStudy.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">The Results</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {selectedStudy.results.map((result) => (
                          <div key={result.label} className="bg-muted rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-primary">{result.metric}</p>
                            <p className="text-sm text-muted-foreground">{result.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-accent rounded-xl p-6">
                      <p className="text-lg text-foreground italic mb-4">"{selectedStudy.quote}"</p>
                      <p className="font-semibold text-foreground">{selectedStudy.author}</p>
                      <p className="text-sm text-muted-foreground">{selectedStudy.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                    <Button variant="outline" onClick={() => handleShare(selectedStudy)}>
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    <Button variant="outline" onClick={() => {
                      const link = document.createElement('a');
                      link.href = `/case-study-${selectedStudy.id}.pdf`;
                      link.download = `${selectedStudy.company}-Case-Study.pdf`;
                      link.click();
                    }}>
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                    <Link to="/contact" className="ml-auto">
                      <Button variant="hero">
                        Get Similar Results
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
