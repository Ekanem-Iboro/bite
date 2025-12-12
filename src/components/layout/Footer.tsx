import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Tracking", href: "/tracking" },
      { name: "About", href: "/about" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "#" },
      { name: "Support Center", href: "#" },
      { name: "Documentation", href: "#" },
    ],
  },
  account: {
    title: "Account",
    links: [
      { name: "Sign In", href: "/signin" },
      { name: "Sign Up", href: "/signup" },
      { name: "Profile Settings", href: "#" },
      { name: "Rider Portal", href: "/dashboard" },
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
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-red-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12"> */}
        <div className="flex flex-col justify-center items-center gap-8 lg:gap-12">
          <div className=" flex flex-col justify-center items-center mb-8 lg:mb-0">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt=""  className={` md:w-[300px] w- 200px`} />
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs text-center">
              Fast, reliable rider matching and tracking. Sign up, set your
              location, and get matched with nearby riders instantly.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center hover:bg-red-600 text-gray-300 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-heading font-semibold text-sm mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-red-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}
        </div>

        <div className="mt-12 pt-8 border-t border-red-600/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Bitbite. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>Serving Lagos</span>
            <span className="hidden md:inline">•</span>
            <span>Reliable · Fast · Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
