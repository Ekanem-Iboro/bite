import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const footerLinks = {
  solutions: {
    title: "Solutions",
    links: [
      { name: "Overview", href: "/solutions" },
      { name: "Enterprise", href: "/solutions/enterprise" },
      { name: "SME Business", href: "/solutions/sme" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "How It Works", href: "/how-it-works" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
      { name: "Guides", href: "/resources" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "Contact Sales", href: "/contact" },
      { name: "Book a Demo", href: "/demo" },
      { name: "Sign In", href: "/login" },
      { name: "Register", href: "/register" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Terms & Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
};

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">JE</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg">Just Eat</span>
                <span className="font-heading text-sm text-primary ml-1">for Business</span>
              </div>
            </Link>
            <p className="text-secondary-foreground/70 text-sm mb-6 max-w-xs">
              Corporate catering made simple. Connecting businesses with 600+ restaurants across the UK.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-heading font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/50">
            © {new Date().getFullYear()} Just Eat for Business. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-secondary-foreground/50">
            <span>Available across the UK</span>
            <span className="hidden md:inline">•</span>
            <span>600+ Partner Restaurants</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
