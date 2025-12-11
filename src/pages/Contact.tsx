import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import HeaderNew from "@/components/layout/HeaderNew";
import contactBg from "@/assets/slide 3@300x-100.jpg";
import { Footer } from "@/components/layout/Footer";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNew />

      <section
        className="py-24 lg:py-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="container mx-auto px-4 text-center text-white bg-black bg-opacity-50 py-10 rounded-xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg lg:text-xl max-w-2xl mx-auto">
            We’re here to help with any questions you may have about our
            services.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              {isSubmitted ? (
                <div className="text-center py-10">
                    <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-gray-600">Your message has been sent successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register("name")} placeholder="John Doe" />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      rows={6}
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Contact Details</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center">
                    <Mail className="mr-3 text-blue-500" />
                    <span>support@officefeasthub.com</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="mr-3 text-green-500" />
                    <span>+1 (234) 567-890</span>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="mr-3 text-red-500" />
                    <span>123 Feast St, Lagos, Nigeria</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                 <h3 className="text-2xl font-bold mb-4">Our Location</h3>
                <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
                    <div className="bg-gray-200 h-48 flex items-center justify-center">
                        <MapPin className="w-12 h-12 text-gray-400" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;