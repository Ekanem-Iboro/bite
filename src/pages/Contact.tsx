import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Mail, Phone, MapPin, ArrowRight, Check, Loader2, 
  MessageCircle, Clock, Download, Building2, Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  employees: z.string().min(1, "Please select company size"),
  inquiryType: z.string().min(1, "Please select inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const teamMembers = [
  { name: "Sarah Mitchell", role: "Head of Sales", email: "sarah@justeat.business" },
  { name: "James Chen", role: "Enterprise Account Manager", email: "james@justeat.business" },
  { name: "Emma Rodriguez", role: "SME Account Manager", email: "emma@justeat.business" },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "Our team will be in touch within 24 hours.",
    });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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
                Contact <span className="text-gradient">Our Team</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Have questions? We're here to help you find the perfect solution for your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 -mt-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Phone,
                  title: "Call Sales",
                  content: "+44 20 1234 5678",
                  action: "tel:+442012345678",
                  actionText: "Call now",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  content: "sales@justeat.business",
                  action: "mailto:sales@justeat.business",
                  actionText: "Send email",
                },
                {
                  icon: Clock,
                  title: "Business Hours",
                  content: "Mon-Fri 9am-6pm GMT",
                  action: null,
                  actionText: null,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.content}</p>
                  {item.action && (
                    <a href={item.action}>
                      <Button variant="outline" size="sm">
                        {item.actionText}
                      </Button>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {isSubmitted ? (
                  <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-card text-center">
                    <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-success" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                      Message Received!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for contacting us. A member of our team will be in touch within 24 hours.
                    </p>
                    <Link to="/">
                      <Button variant="outline">
                        Return Home
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-card">
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Fill out the form below and we'll get back to you shortly.
                    </p>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mb-8">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step <= currentStep
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {step}
                          </div>
                          {step < 3 && (
                            <div
                              className={`w-12 h-1 ${
                                step < currentStep ? "bg-primary" : "bg-muted"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      {currentStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name *</Label>
                              <Input
                                id="firstName"
                                placeholder="John"
                                {...register("firstName")}
                                className={errors.firstName ? "border-destructive" : ""}
                              />
                              {errors.firstName && (
                                <p className="text-sm text-destructive">{errors.firstName.message}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name *</Label>
                              <Input
                                id="lastName"
                                placeholder="Smith"
                                {...register("lastName")}
                                className={errors.lastName ? "border-destructive" : ""}
                              />
                              {errors.lastName && (
                                <p className="text-sm text-destructive">{errors.lastName.message}</p>
                              )}
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="john@company.com"
                                {...register("email")}
                                className={errors.email ? "border-destructive" : ""}
                              />
                              {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+44 20 1234 5678"
                                {...register("phone")}
                                className={errors.phone ? "border-destructive" : ""}
                              />
                              {errors.phone && (
                                <p className="text-sm text-destructive">{errors.phone.message}</p>
                              )}
                            </div>
                          </div>
                          <Button type="button" onClick={nextStep} variant="hero" className="w-full">
                            Continue
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )}

                      {currentStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="company">Company Name *</Label>
                            <Input
                              id="company"
                              placeholder="Acme Inc."
                              {...register("company")}
                              className={errors.company ? "border-destructive" : ""}
                            />
                            {errors.company && (
                              <p className="text-sm text-destructive">{errors.company.message}</p>
                            )}
                          </div>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="jobTitle">Job Title *</Label>
                              <Input
                                id="jobTitle"
                                placeholder="Office Manager"
                                {...register("jobTitle")}
                                className={errors.jobTitle ? "border-destructive" : ""}
                              />
                              {errors.jobTitle && (
                                <p className="text-sm text-destructive">{errors.jobTitle.message}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label>Company Size *</Label>
                              <Select onValueChange={(value) => setValue("employees", value)}>
                                <SelectTrigger className={errors.employees ? "border-destructive" : ""}>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1-50">1-50 employees</SelectItem>
                                  <SelectItem value="51-200">51-200 employees</SelectItem>
                                  <SelectItem value="201-500">201-500 employees</SelectItem>
                                  <SelectItem value="500+">500+ employees</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.employees && (
                                <p className="text-sm text-destructive">{errors.employees.message}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                              Back
                            </Button>
                            <Button type="button" onClick={nextStep} variant="hero" className="flex-1">
                              Continue
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <Label>Inquiry Type *</Label>
                            <Select onValueChange={(value) => setValue("inquiryType", value)}>
                              <SelectTrigger className={errors.inquiryType ? "border-destructive" : ""}>
                                <SelectValue placeholder="What can we help with?" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="demo">Request a Demo</SelectItem>
                                <SelectItem value="pricing">Pricing Information</SelectItem>
                                <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                                <SelectItem value="support">Support Inquiry</SelectItem>
                                <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.inquiryType && (
                              <p className="text-sm text-destructive">{errors.inquiryType.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message *</Label>
                            <Textarea
                              id="message"
                              placeholder="Tell us about your catering needs..."
                              rows={5}
                              {...register("message")}
                              className={errors.message ? "border-destructive" : ""}
                            />
                            {errors.message && (
                              <p className="text-sm text-destructive">{errors.message.message}</p>
                            )}
                          </div>
                          <div className="flex gap-4">
                            <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                              Back
                            </Button>
                            <Button type="submit" variant="hero" className="flex-1" disabled={isSubmitting}>
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  Submit Inquiry
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </form>
                  </div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                {/* Team Members */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                    Our Sales Team
                  </h3>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.name} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">{member.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <a href={`mailto:${member.email}`} className="ml-auto">
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Office Location */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    Our Office
                  </h3>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-foreground">123 Business Street</p>
                      <p className="text-muted-foreground">London, EC1A 1BB</p>
                      <p className="text-muted-foreground">United Kingdom</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-muted-foreground" />
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    <Link to="/demo" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Book a Demo</span>
                      <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
                    </Link>
                    <Link to="/pricing" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Building2 className="w-5 h-5 text-primary" />
                      <span className="text-foreground">View Pricing</span>
                      <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
                    </Link>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/media-kit.zip';
                        link.download = 'JustEat-MediaKit.zip';
                        link.click();
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full"
                    >
                      <Download className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Download Media Kit</span>
                      <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
