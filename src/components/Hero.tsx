import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, Download, Mail, Github, Linkedin, Code2 } from 'lucide-react';
import gsap from 'gsap';
// import profileImage from '@/assets/profile-image.jpg';
import profileImage from '@/components/profile.png';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImage, setCurrentImage] = useState<string>(profileImage);

  const skills = [
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'TypeScript', level: 88 },
    // { name: 'Python', level: 82 },
    { name: 'MongoDB', level: 78 },
    { name: 'AWS', level: 75 }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: import.meta.env.VITE_LINKEDIN_URL || '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background floating elements animation
      gsap.to('.floating-bg-1', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      gsap.to('.floating-bg-2', {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none"
      });

      // Profile image 3D rotation
      gsap.to('.profile-3d', {
        rotationY: 10,
        rotationX: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Skills animation
      gsap.from('.skill-item', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.2
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setCurrentImage(profileImage);
  };

  return (
    <section id="home" ref={heroRef} className="min-h-screen flex items-center px-6 pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-bg-1 absolute top-20 right-20 w-32 h-32 border-2 border-primary/20 rounded-lg"></div>
        <div className="floating-bg-2 absolute bottom-40 left-20 w-24 h-24 border-2 border-accent/30 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent"></div>
                <span className="text-muted-foreground text-lg">Hello, I'm</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="gradient-text">Pradumya</span>
                <br />
                <span className="text-foreground">Verma</span>
              </h1>

              <div className="flex items-center space-x-3">
                <Code2 className="text-primary" size={24} />
                <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                  Full Stack Developer
                </h2>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-md"
            >
              Passionate about creating innovative digital solutions that make a difference.
              I build scalable applications with modern technologies and clean code.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="hero-button px-8 py-3 rounded-full font-medium flex items-center gap-2"
              >
                <Mail size={18} />
                Get In Touch
              </a>
              <button className="outline-button px-8 py-3 rounded-full font-medium flex items-center gap-2">
                <Download size={18} />
                Download CV
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 glass-card rounded-full hover:bg-primary/10 transition-all duration-300 group"
                >
                  <social.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </motion.a>
              ))}
            </motion.div>

            {/* Quick Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Technologies I Love
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item flex items-center justify-between p-3 glass-card rounded-lg hover:border-primary/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: 1.2 + index * 0.1 }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated Background Glow */}
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl animate-pulse-glow"></div>

              {/* Profile Container */}
              <div className="relative">
                {/* Rotating Border */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary via-accent to-primary rounded-full animate-gradient-shift opacity-75"
                  style={{ backgroundSize: '400% 400%' }}></div>

                {/* Profile Image */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-background profile-3d group">
                  <img
                    src={currentImage}
                    alt="Pradumya Verma"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Floating Indicators */}
                <motion.div
                  className="absolute -top-4 -right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-background"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <motion.div
                  className="absolute -bottom-6 -left-6 glass-card px-4 py-2 rounded-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  <span className="text-sm font-medium text-primary">Available for work</span>
                </motion.div>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    handleFileSelect(files[0]);
                  }
                }}
                className="hidden"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}