import { motion } from "framer-motion";
import { Building, Users, Heart, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import aboutImage from "@/assets/slide 4@300x-100.jpg";
import storyImage from "@/assets/side.jpg";
import teamMember1 from "@/assets/1@300x-100.jpg";
import teamMember2 from "@/assets/2@300x-100.jpg";
import teamMember3 from "@/assets/3@300x-100.jpg";
import { Footer } from "@/components/layout/Footer";
import HeaderNew from "@/components/layout/HeaderNew";

const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    image: teamMember1,
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Maria Garcia",
    role: "Head of Operations",
    image: teamMember2,
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Sam Wilson",
    role: "Lead Developer",
    image: teamMember3,
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "We are deeply committed to the success and satisfaction of our clients.",
  },
  {
    icon: Building,
    title: "Innovate & Simplify",
    description:
      "We constantly seek better, more efficient ways to solve problems.",
  },
  {
    icon: Users,
    title: "Stronger Together",
    description:
      "We believe in the power of collaboration and community.",
  },
];

const About = () => {
  return (
    <div className="bg-gray-50/90">
      <HeaderNew />
      <main>
        <section
          className="relative py-32 bg-cover bg-center text-white"
          style={{ backgroundImage: `url(${aboutImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl lg:text-6xl font-bold mb-4"
            >
              We're Reimagining Office Lunches
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto"
            >
              Office Feast Hub is dedicated to connecting teams with delicious,
              local food, making every workday a little more flavorful.
            </motion.p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <Card>
              <CardContent className="p-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <motion.img
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      src={storyImage}
                      alt="Our Story"
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                    >
                      <h2 className="text-4xl font-bold mb-4">Our Story</h2>
                      <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                        It all started with a simple problem: boring office
                        lunches. We were tired of the same old sandwiches and
                        salads. We dreamed of a world where teams could easily
                        access the vibrant culinary scenes of their cities.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        So, we built Office Feast Hub—a bridge between local
                        restaurants and hungry office workers. Today, we're
                        proud to help thousands of employees enjoy better food
                        and stronger connections with their colleagues.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-24 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="bg-primary/10 text-primary p-5 rounded-full mb-4 w-fit mx-auto">
                        <value.icon size={32} />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="our-team" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                The passionate individuals making it all happen.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full overflow-hidden">
                    <CardContent className="p-6">
                      <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-primary/10">
                        <AvatarImage
                          src={member.image}
                          alt={member.name}
                        />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <h4 className="text-xl font-bold">{member.name}</h4>
                      <p className="text-primary font-medium mb-3">
                        {member.role}
                      </p>
                      <div className="flex justify-center space-x-4">
                        <a
                          href={member.social.twitter}
                          className="text-gray-400 hover:text-blue-500"
                        >
                          <Twitter />
                        </a>
                        <a
                          href={member.social.linkedin}
                          className="text-gray-400 hover:text-blue-700"
                        >
                          <Linkedin />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default About;
