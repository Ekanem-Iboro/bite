import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Calendar, Clock, ArrowRight, Check, Loader2, Video, 
  Users, Building2, ChevronLeft, ChevronRight, Download 
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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  employees: z.string().min(1, "Please select company size"),
  demoType: z.string().min(1, "Please select demo type"),
  interests: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const demoTypes = [
  { id: "general", name: "General Platform Demo", duration: "30 min", icon: Video },
  { id: "enterprise", name: "Enterprise Features Deep-Dive", duration: "45 min", icon: Building2 },
  { id: "integration", name: "Integration & API Demo", duration: "45 min", icon: Users },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDemoType, setSelectedDemoType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select a date and time",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Demo booked!",
      description: "You'll receive a calendar invite shortly.",
    });
  };

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date >= today && dayOfWeek !== 0 && dayOfWeek !== 6;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const generateICSFile = () => {
    if (!selectedDate || !selectedTime) return;
    
    const startDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.replace(' AM', '').replace(' PM', '').split(':');
    let hour = parseInt(hours);
    if (selectedTime.includes('PM') && hour !== 12) hour += 12;
    startDate.setHours(hour, parseInt(minutes));
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Just Eat for Business Demo
DESCRIPTION:Your scheduled demo with Just Eat for Business team
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'demo-booking.ics';
    link.click();
  };

  const days = getDaysInMonth(currentMonth);

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
                <Calendar className="w-4 h-4" />
                Schedule Your Demo
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Book a <span className="text-gradient">Personalized Demo</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                See how Just Eat for Business can transform your corporate catering in just 30 minutes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-card">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-success" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                    Demo Booked Successfully!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Your demo is scheduled for {selectedDate && formatDate(selectedDate)} at {selectedTime}.
                    You'll receive a calendar invite and confirmation email shortly.
                  </p>
                  
                  <div className="bg-muted rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-foreground mb-4">What's Next?</h3>
                    <ul className="space-y-3 text-left">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success mt-0.5" />
                        <span className="text-muted-foreground">Check your email for the calendar invite</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success mt-0.5" />
                        <span className="text-muted-foreground">Add the meeting link to your calendar</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success mt-0.5" />
                        <span className="text-muted-foreground">Prepare any questions you'd like to ask</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="hero" onClick={generateICSFile}>
                      <Download className="w-4 h-4" />
                      Add to Calendar
                    </Button>
                    <Link to="/">
                      <Button variant="outline">
                        Return Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="max-w-5xl mx-auto">
                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-12">
                  {["Demo Type", "Select Time", "Your Details"].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                          index + 1 <= currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className={`ml-2 hidden sm:inline ${
                        index + 1 <= currentStep ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {step}
                      </span>
                      {index < 2 && (
                        <div
                          className={`w-8 sm:w-16 h-1 mx-2 ${
                            index + 1 < currentStep ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Step 1: Demo Type */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
                        Select Demo Type
                      </h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {demoTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              setSelectedDemoType(type.id);
                              setValue("demoType", type.id);
                            }}
                            className={`p-6 rounded-2xl border-2 text-left transition-all ${
                              selectedDemoType === type.id
                                ? "border-primary bg-accent"
                                : "border-border bg-card hover:border-primary/50"
                            }`}
                          >
                            <type.icon className={`w-10 h-10 mb-4 ${
                              selectedDemoType === type.id ? "text-primary" : "text-muted-foreground"
                            }`} />
                            <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                              {type.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {type.duration}
                            </p>
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-end mt-8">
                        <Button
                          type="button"
                          variant="hero"
                          onClick={() => selectedDemoType && setCurrentStep(2)}
                          disabled={!selectedDemoType}
                        >
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Calendar */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
                        Select Date & Time
                      </h2>
                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Calendar */}
                        <div className="bg-card rounded-2xl p-6 shadow-card">
                          <div className="flex items-center justify-between mb-6">
                            <button
                              type="button"
                              onClick={prevMonth}
                              className="p-2 rounded-lg hover:bg-muted transition-colors"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h3 className="font-heading font-semibold text-foreground">
                              {currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                            </h3>
                            <button
                              type="button"
                              onClick={nextMonth}
                              className="p-2 rounded-lg hover:bg-muted transition-colors"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                              <div key={day} className="text-center text-sm text-muted-foreground py-2">
                                {day}
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-7 gap-1">
                            {days.map((day, index) => (
                              <button
                                key={index}
                                type="button"
                                disabled={!day || !isDateSelectable(day)}
                                onClick={() => day && isDateSelectable(day) && setSelectedDate(day)}
                                className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                                  !day
                                    ? ""
                                    : !isDateSelectable(day)
                                    ? "text-muted-foreground/30 cursor-not-allowed"
                                    : selectedDate?.toDateString() === day.toDateString()
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-foreground"
                                }`}
                              >
                                {day?.getDate()}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Time Slots */}
                        <div className="bg-card rounded-2xl p-6 shadow-card">
                          <h3 className="font-heading font-semibold text-foreground mb-4">
                            {selectedDate ? formatDate(selectedDate) : "Select a date"}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-6">
                            All times shown in GMT
                          </p>
                          
                          {selectedDate ? (
                            <div className="grid grid-cols-2 gap-3">
                              {timeSlots.map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => setSelectedTime(time)}
                                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                                    selectedTime === time
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border hover:border-primary text-foreground"
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-64 text-muted-foreground">
                              Please select a date first
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                          <ChevronLeft className="w-4 h-4" />
                          Back
                        </Button>
                        <Button
                          type="button"
                          variant="hero"
                          onClick={() => selectedDate && selectedTime && setCurrentStep(3)}
                          disabled={!selectedDate || !selectedTime}
                        >
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Details */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="max-w-2xl mx-auto"
                    >
                      <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
                        Your Details
                      </h2>
                      
                      <div className="bg-accent rounded-xl p-4 mb-8">
                        <div className="flex items-center gap-4">
                          <Calendar className="w-6 h-6 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">
                              {selectedDate && formatDate(selectedDate)} at {selectedTime}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {demoTypes.find((t) => t.id === selectedDemoType)?.name}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-auto"
                            onClick={() => setCurrentStep(2)}
                          >
                            Change
                          </Button>
                        </div>
                      </div>

                      <div className="bg-card rounded-2xl p-8 shadow-card space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              placeholder="John Smith"
                              {...register("name")}
                              className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && (
                              <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Work Email *</Label>
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
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
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
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
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

                        <div className="space-y-2">
                          <Label>Company Size *</Label>
                          <Select onValueChange={(value) => setValue("employees", value)}>
                            <SelectTrigger className={errors.employees ? "border-destructive" : ""}>
                              <SelectValue placeholder="Select company size" />
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

                        <div className="space-y-2">
                          <Label htmlFor="interests">What are you most interested in learning about?</Label>
                          <Textarea
                            id="interests"
                            placeholder="Tell us what you'd like to see in the demo..."
                            rows={3}
                            {...register("interests")}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                          <ChevronLeft className="w-4 h-4" />
                          Back
                        </Button>
                        <Button type="submit" variant="hero" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Booking...
                            </>
                          ) : (
                            <>
                              Confirm Booking
                              <Check className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
