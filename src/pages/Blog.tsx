import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, ArrowRight, Tag, User, Share2, ChevronRight, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "Industry Trends", "Tips & Guides", "Company News", "Case Studies", "Food Culture"];

const blogPosts = [
  {
    id: 1,
    title: "The Future of Corporate Catering: 5 Trends to Watch in 2024",
    excerpt: "From sustainable packaging to AI-powered ordering, discover the innovations shaping workplace food programs.",
    category: "Industry Trends",
    author: "Sarah Johnson",
    date: "Nov 15, 2024",
    readTime: "6 min read",
    featured: true,
    image: "/blog-trends.jpg",
    tags: ["Trends", "Innovation", "Sustainability"],
  },
  {
    id: 2,
    title: "How to Accommodate Dietary Requirements: A Complete Guide",
    excerpt: "Everything office managers need to know about catering to diverse dietary needs in the modern workplace.",
    category: "Tips & Guides",
    author: "Emma Chen",
    date: "Nov 12, 2024",
    readTime: "8 min read",
    featured: true,
    image: "/blog-dietary.jpg",
    tags: ["Dietary", "Guide", "Workplace"],
  },
  {
    id: 3,
    title: "Just Eat for Business Expands to 50 New Cities",
    excerpt: "We're excited to announce our expansion across the UK, bringing corporate catering to more businesses than ever.",
    category: "Company News",
    author: "Marketing Team",
    date: "Nov 10, 2024",
    readTime: "3 min read",
    featured: false,
    image: "/blog-expansion.jpg",
    tags: ["News", "Expansion"],
  },
  {
    id: 4,
    title: "5 Ways to Boost Team Morale Through Food",
    excerpt: "Research shows that shared meals improve team bonding. Here's how to make the most of food in your office.",
    category: "Tips & Guides",
    author: "Dr. Michael Roberts",
    date: "Nov 8, 2024",
    readTime: "5 min read",
    featured: false,
    image: "/blog-morale.jpg",
    tags: ["Team Building", "Culture", "Productivity"],
  },
  {
    id: 5,
    title: "Sustainable Catering: How to Reduce Your Food Program's Carbon Footprint",
    excerpt: "Practical steps for making your corporate food program more environmentally responsible.",
    category: "Tips & Guides",
    author: "Lisa Green",
    date: "Nov 5, 2024",
    readTime: "7 min read",
    featured: false,
    image: "/blog-sustainable.jpg",
    tags: ["Sustainability", "Environment", "Guide"],
  },
  {
    id: 6,
    title: "The Psychology of Food Choices in the Workplace",
    excerpt: "Understanding how environment and presentation influence what employees eat at work.",
    category: "Food Culture",
    author: "Dr. Anna Williams",
    date: "Nov 1, 2024",
    readTime: "9 min read",
    featured: false,
    image: "/blog-psychology.jpg",
    tags: ["Psychology", "Research", "Culture"],
  },
  {
    id: 7,
    title: "How TechStart UK Transformed Their Office Food Program",
    excerpt: "A detailed look at how one tech company revolutionized their approach to team catering.",
    category: "Case Studies",
    author: "James Wilson",
    date: "Oct 28, 2024",
    readTime: "10 min read",
    featured: false,
    image: "/blog-case-study.jpg",
    tags: ["Case Study", "Technology", "Success Story"],
  },
  {
    id: 8,
    title: "Planning the Perfect Company Holiday Party Menu",
    excerpt: "Tips for creating a memorable food experience at your end-of-year celebration.",
    category: "Tips & Guides",
    author: "Chef Marcus Brown",
    date: "Oct 25, 2024",
    readTime: "5 min read",
    featured: false,
    image: "/blog-party.jpg",
    tags: ["Events", "Planning", "Seasonal"],
  },
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const featuredPosts = blogPosts.filter((p) => p.featured);

  const handleShare = (post: typeof blogPosts[0]) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast({
        title: "Subscribed!",
        description: "You'll receive our latest articles in your inbox.",
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
                The <span className="text-gradient">Just Eat for Business</span> Blog
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Insights, tips, and stories from the world of corporate catering
              </p>
              
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <span className="text-4xl">📰</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border sticky top-16 lg:top-20 bg-background/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {displayedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="h-40 bg-muted flex items-center justify-center">
                      <span className="text-3xl">📝</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded bg-accent text-accent-foreground text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {visiblePosts < filteredPosts.length && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisiblePosts((prev) => prev + 6)}
                >
                  Load More Articles
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No articles found.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("All");
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
                Subscribe to Our Newsletter
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get the latest articles, tips, and industry insights delivered weekly
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

        {/* Article Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedPost(null)}
            >
              <motion.article
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-48 bg-muted flex items-center justify-center">
                  <span className="text-6xl">📰</span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                      {selectedPost.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{selectedPost.readTime}</span>
                  </div>
                  
                  <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
                    {selectedPost.title}
                  </h1>
                  
                  <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {selectedPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {selectedPost.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedPost.readTime}
                    </div>
                  </div>

                  <div className="prose max-w-none mb-8">
                    <p className="text-lg text-muted-foreground mb-6">{selectedPost.excerpt}</p>
                    <div className="bg-muted rounded-xl p-8 text-center">
                      <p className="text-muted-foreground">Full article content would appear here...</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm"
                      >
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-border">
                    <Button variant="outline" onClick={() => handleShare(selectedPost)}>
                      <Share2 className="w-4 h-4" />
                      Share Article
                    </Button>
                    <Button variant="ghost" onClick={() => setSelectedPost(null)} className="ml-auto">
                      Close
                    </Button>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
