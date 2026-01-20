import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skill, SKILL_CATEGORIES, SKILLS } from './constants';

gsap.registerPlugin(ScrollTrigger);

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring" as const,
      bounce: 0.4
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.9,
    transition: { duration: 0.3 }
  }
};

export default function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSkills = selectedCategory === "All"
    ? SKILLS
    : SKILLS.filter(skill => skill.category === selectedCategory);

  // No GSAP animation needed - Framer Motion whileInView handles scroll animations
  // This prevents conflicts and ensures cards always appear when scrolled into view

  return (
    <section id="skills" ref={skillsRef} className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float-fast"></div>
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
            <span className="text-primary font-semibold tracking-wider uppercase">My Skills</span>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-primary"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What I Bring to the
            <span className="gradient-text"> Table</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive skill set spanning modern web technologies,
            with a focus on creating scalable and performant applications.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {SKILL_CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`cursor-pointer px-6 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-lg animate-pulse-glow"
                : "hover:bg-secondary/80"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="skills-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill: Skill, index: number) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={`${skill.name}-${selectedCategory}`}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  exit="exit"
                  layout
                  className="skill-card glass-card p-6 rounded-2xl hover:border-primary/30 transition-all duration-500 group relative"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Card content */}
                  <div className="relative z-10">
                    {/* Icon and Name */}
                    <div className="flex flex-col items-center text-center mb-4">
                      <div
                        className="mb-3 p-3 rounded-full bg-background/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                        style={{ color: skill.color }}
                      >
                        <IconComponent size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {skill.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs border-primary/30 text-primary bg-background/50"
                      >
                        {skill.category}
                      </Badge>
                    </div>

                    {/* Experience */}
                    <div className="text-center mb-4">
                      <span className="text-sm text-muted-foreground">
                        Experience: <span className="text-primary font-semibold">{skill.experience}</span>
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full bg-muted/50 rounded-full h-2 mb-2">
                        <motion.div
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1.5,
                            delay: 0.5,
                            ease: "easeOut" as const
                          }}
                          viewport={{ once: true }}
                          className="h-2 rounded-full relative overflow-hidden"
                          style={{
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                        </motion.div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Proficiency</span>
                        <span className="text-primary font-bold">{skill.level}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{ background: skill.color }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Skills", value: SKILLS.length },
            { label: "Frontend", value: SKILLS.filter(s => s.category === "Frontend").length },
            { label: "Backend", value: SKILLS.filter(s => s.category === "Backend").length },
            { label: "Avg. Experience", value: "1.5+" }
          ].map((stat, index) => (
            <Card
              key={stat.label}
              className="p-6 text-center glass-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-lg font-semibold mb-6 text-muted-foreground">Other Technologies & Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'GraphQL', 'Redis', 'Nginx', 'Linux', 'Jest',
              'Cypress', 'Adobe Creative Suite', 'Webpack', 'Vite', 'Prisma'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 glass-card rounded-full text-sm font-medium hover:border-primary/30 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}