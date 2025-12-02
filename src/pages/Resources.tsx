import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, Video, BookOpen, Download, ArrowRight, Search, 
  Play, Eye, Share2, Mail, Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const resourceCategories = [
  { id: "all", name: "All Resources", icon: BookOpen },
  { id: "guides", name: "Guides", icon: FileText },
  { id: "whitepapers", name: "Whitepapers", icon: FileText },
  { id: "webinars", name: "Webinars", icon: Video },
  { id: "templates", name: "Templates", icon: FileText },
];

const resources = [
  {
    id: 1,
    type: "guides",
    title: "The Complete Guide to Corporate Catering",
    description: "Everything you need to know about setting up and managing corporate catering for your team.",
    format: "PDF",
    downloadUrl: "/guide-corporate-catering.pdf",
    readTime: "15 min read",
    featured: true,
  },
  {
    id: 2,
    type: "whitepapers",
    title: "The ROI of Employee Food Programs",
    description: "Research-backed insights on how food benefits impact employee satisfaction and productivity.",
    format: "PDF",
    downloadUrl: "/whitepaper-roi.pdf",
    readTime: "20 min read",
    featured: true,
  },
  {
    id: 3,
    type: "webinars",
    title: "Best Practices for Large Event Catering",
    description: "Join our experts as they share tips for catering company events, conferences, and celebrations.",
    format: "Video",
    videoUrl: "#",
    duration: "45 min",
    featured: false,
  },
  {
    id: 4,
    type: "templates",
    title: "Catering Budget Planning Template",
    description: "A ready-to-use spreadsheet template to plan and track your corporate catering budget.",
    format: "Excel",
    downloadUrl: "/template-budget.xlsx",
    featured: false,
  },
  {
    id: 5,
    type: "guides",
    title: "Dietary Requirements Handbook",
    description: "A comprehensive guide to understanding and accommodating dietary requirements in the workplace.",
    format: "PDF",
    downloadUrl: "/guide-dietary.pdf",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 6,
    type: "whitepapers",
    title: "The Future of Workplace Food",
    description: "Trends and predictions for corporate food services in the post-pandemic workplace.",
    format: "PDF",
    downloadUrl: "/whitepaper-future.pdf",
    readTime: "25 min read",
    featured: false,
  },
  {
    id: 7,
    type: "webinars",
    title: "How to Manage Multi-Location Catering",
    description: "Strategies for coordinating food programs across multiple office locations.",
    format: "Video",
    videoUrl: "#",
    duration: "30 min",
    featured: false,
  },
  {
    id: 8,
    type: "templates",
    title: "Employee Food Preference Survey",
    description: "A customizable survey template to gather your team's food preferences and dietary needs.",
    format: "Google Form",
    downloadUrl: "/template-survey.pdf",
    featured: false,
  },
  {
    id: 9,
    type: "guides",
    title: "Sustainability in Corporate Catering",
    description: "How to make your corporate food program more environmentally friendly.",
    format: "PDF",
    downloadUrl: "/guide-sustainability.pdf",
    readTime: "12 min read",
    featured: false,
  },
];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewResource, setPreviewResource] = useState<typeof resources[0] | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "all" || resource.type === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter((r) => r.featured);

  const handleDownload = (resource: typeof resources[0]) => {
    if (resource.downloadUrl) {
      const link = document.createElement('a');
      link.href = resource.downloadUrl;
      link.download = resource.downloadUrl.split('/').pop() || 'download';
      link.click();
      toast({
        title: "Download started",
        description: `${resource.title} is downloading...`,
      });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast({
        title: "Subscribed!",
        description: "You'll receive our latest resources directly in your inbox.",
      });
      setEmail("");
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
                Resources & <span className="text-gradient">Learning</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Guides, whitepapers, and tools to help you master corporate catering
              </p>
              
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Featured Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      {resource.format}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{resource.readTime}</span>
                    <Button variant="hero" size="sm" onClick={() => handleDownload(resource)}>
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-8 border-b border-border sticky top-16 lg:top-20 bg-background/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {resourceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                        {resource.type === "webinars" ? (
                          <Video className="w-5 h-5 text-primary" />
                        ) : (
                          <FileText className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <span className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs font-medium">
                        {resource.format}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {resource.readTime || resource.duration}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewResource(resource)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {resource.downloadUrl ? (
                          <Button variant="ghost" size="sm" onClick={() => handleDownload(resource)}>
                            <Download className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No resources found.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get the latest guides, insights, and templates delivered to your inbox
              </p>
              
              {subscribed ? (
                <div className="flex items-center justify-center gap-3 text-success">
                  <Check className="w-6 h-6" />
                  <span className="font-medium">You're subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button variant="hero" type="submit">
                    Subscribe
                  </Button>
                </form>
              )}
            </motion.div>
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
                Put these insights into action with Just Eat for Business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="hero" size="xl">
                    Start Free Trial
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

        {/* Preview Modal */}
        <AnimatePresence>
          {previewResource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setPreviewResource(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-2xl max-w-2xl w-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <button
                    onClick={() => setPreviewResource(null)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {previewResource.title}
                </h3>
                <p className="text-muted-foreground mb-6">{previewResource.description}</p>
                <div className="bg-muted rounded-xl p-8 mb-6 text-center">
                  <p className="text-muted-foreground">Preview content would appear here</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({ title: "Link copied!" });
                  }}>
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="hero" className="flex-1" onClick={() => {
                    handleDownload(previewResource);
                    setPreviewResource(null);
                  }}>
                    <Download className="w-4 h-4" />
                    Download {previewResource.format}
                  </Button>
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

export default Resources;
