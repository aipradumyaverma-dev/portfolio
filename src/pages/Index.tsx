import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll animations for sections
      gsap.utils.toArray('section').forEach((section: any) => {
        gsap.fromTo(section, {
          opacity: 0.8,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Parallax effect for background elements
      gsap.utils.toArray('.parallax-bg').forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      <Navigation />
      <Hero /> 
      <Skills /> 
      <About />
      <Projects />
      <Contact />
      
      {/* Scroll to top button would go here */}
    </div>
  );
};

export default Index;
