import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Coffee, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Award, label: "Projects Completed", value: "50+", color: "text-primary" },
    { icon: Users, label: "Happy Clients", value: "30+", color: "text-accent" },
    { icon: Coffee, label: "Cups of Coffee", value: "1000+", color: "text-orange-500" },
    { icon: Clock, label: "Years Experience", value: "3+", color: "text-green-500" }
  ];

  const timeline = [
    {
      year: "2025",
      title: "Software Developer",
      company: "IDEAL IT TECHNO",
      description: "Full-time software developer role, currently working on enterprise applications and scalable solutions."
    },
    {
      year: "2024",
      title: "Software Developer",
      company: "Samyotech Software Solutions Pvt. Ltd.",
      description: "Developed and maintained client projects in Indore. Worked on full-stack development using modern technologies."
    },
    {
      year: "2023",
      title: "Trainee",
      company: "InfoBeans Foundation",
      description: "10-month training program focused on software development fundamentals and real-world project experience."
    },
    {
      year: "2022",
      title: "Master of Computer Applications (MCA)",
      company: "Rajiv Gandhi Technology University",
      description: "Completed MCA degree specializing in software development and modern web technologies."
    },
    {
      year: "2020-2022",
      title: "Bachelor of Science in Computer Science",
      company: "Vikram University",
      description: "Graduated with BSc in Computer Science, building strong foundation in programming and development."
    }
  ];

  // No GSAP animation needed - Framer Motion whileInView handles scroll animations
  // This prevents conflicts and ensures content always appears when scrolled into view

  return (
    <section id="about" ref={aboutRef} className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-primary font-semibold tracking-wider uppercase">About Me</span>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-primary"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My Journey in
            <span className="gradient-text"> Development</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Passionate Developer & Problem Solver
              </h3>
              <p className="text-lg text-primary font-medium">
                Building scalable, user-friendly web applications that solve real-world problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm a dedicated full-stack developer with a passion for creating innovative
                digital solutions. My journey in tech started with curiosity and has evolved
                into a strong focus on building clean, scalable, and user-centric applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With expertise in modern web technologies, I enjoy tackling complex
                challenges and turning ideas into reality. I believe in clean code,
                continuous learning, and delivering exceptional user experiences.
              </p>
            </div>

            {/* Tech Stack */}
            {/* <div className="glass-card p-6 rounded-xl space-y-3">
              <h4 className="text-lg font-semibold text-primary">Tech Stack</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="text-foreground font-medium">Frontend:</span> React, Vite, Next.js, Tailwind CSS</p>
                <p><span className="text-foreground font-medium">Backend:</span> Node.js, Express</p>
                <p><span className="text-foreground font-medium">Database:</span> MongoDB, Firebase</p>
                <p><span className="text-foreground font-medium">Tools:</span> Git, GitHub, Vercel, Postman</p>
              </div>
            </div> */}

            {/* What I Do */}
            <div className="glass-card p-6 rounded-xl space-y-3">
              <h4 className="text-lg font-semibold text-accent">What I Do</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Build responsive and high-performance web applications
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Design clean and reusable UI components
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Integrate APIs and third-party services
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Deploy and maintain production-ready applications
                </li>
              </ul>
            </div>

            {/* Let's Work Together */}
            <div className="glass-card p-6 rounded-xl border border-primary/30 space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Let's Work Together</h4>
              <p className="text-sm text-muted-foreground">
                I'm open to freelance work, internships, and full-time opportunities.
                Feel free to reach out through the contact form.
              </p>
              <a
                href="#contact"
                className="inline-block px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>

            {/* Core Values */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Core Values</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Quality First", desc: "Writing clean, maintainable code" },
                  { title: "User-Centric", desc: "Focusing on user experience" },
                  { title: "Continuous Learning", desc: "Staying updated with tech trends" },
                  { title: "Collaboration", desc: "Working effectively in teams" }
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 glass-card rounded-lg hover:border-primary/30 transition-all duration-300"
                  >
                    <h5 className="font-semibold text-primary mb-1">{value.title}</h5>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="timeline-container"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Career Timeline</h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="timeline-item relative pl-16 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-2 w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-background shadow-lg"></div>

                  {/* Content */}
                  <div className="glass-card p-6 rounded-xl hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary font-bold text-lg">{item.year}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {item.company}
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="stats-container mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card text-center p-6 glass-card rounded-xl hover:border-primary/30 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon size={32} className={stat.color} />
                  </div>
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2 counter`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}