import { 
  Code2, 
  Palette, 
  Database, 
  Cloud, 
  Smartphone,
  Globe,
  Zap,
  Shield,
  Server,
  Monitor,
  GitBranch,
  Terminal
} from 'lucide-react';

export interface Skill {
  name: string;
  category: string;
  level: number;
  experience: string;
  color: string;
  icon: any;
}

export const SKILL_CATEGORIES = [
  "All",
  "Frontend", 
  "Backend",
  "Mobile",
  "Cloud & DevOps",
  "Tools"
];

export const SKILLS: Skill[] = [
  // Frontend
  {
    name: "React",
    category: "Frontend",
    level: 95,
    experience: "2+ years",
    color: "#61DAFB",
    icon: Code2
  },
  {
    name: "Next.js",
    category: "Frontend", 
    level: 90,
    experience: "1.5+ years",
    color: "#000000",
    icon: Monitor
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: 88,
    experience: "1+ years",
    color: "#3178C6",
    icon: Code2
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: 92,
    experience: "2+ years",
    color: "#06B6D4",
    icon: Palette
  },
  {
    name: "Vue.js",
    category: "Frontend",
    level: 75,
    experience: "1+ years",
    color: "#4FC08D",
    icon: Code2
  },
  
  // Backend
  {
    name: "Node.js",
    category: "Backend",
    level: 85,
    experience: "2+ years",
    color: "#339933",
    icon: Server
  },
  {
    name: "Express.js",
    category: "Backend",
    level: 80,
    experience: "1.5+ years",
    color: "#000000",
    icon: Server
  },
  // {
  //   name: "Python",
  //   category: "Backend",
  //   level: 78,
  //   experience: "1+ years",
  //   color: "#3776AB",
  //   icon: Terminal
  // },
  {
    name: "PostgreSQL",
    category: "Backend",
    level: 82,
    experience: "1+ years",
    color: "#336791",
    icon: Database
  },
  {
    name: "MongoDB",
    category: "Backend",
    level: 80,
    experience: "1.5+ years",
    color: "#47A248",
    icon: Database
  },
  
  // Mobile
  {
    name: "React Native",
    category: "Mobile",
    level: 75,
    experience: "1+ years",
    color: "#61DAFB",
    icon: Smartphone
  },
  // {
  //   name: "Flutter",
  //   category: "Mobile",
  //   level: 70,
  //   experience: "6+ months",
  //   color: "#02569B",
  //   icon: Smartphone
  // },
  
  // Cloud & DevOps
  {
    name: "AWS",
    category: "Cloud & DevOps",
    level: 70,
    experience: "1+ years",
    color: "#FF9900",
    icon: Cloud
  },
  {
    name: "Docker",
    category: "Cloud & DevOps",
    level: 75,
    experience: "1+ years",
    color: "#2496ED",
    icon: Cloud
  },
  // {
  //   name: "Vercel",
  //   category: "Cloud & DevOps",
  //   level: 85,
  //   experience: "1.5+ years",
  //   color: "#000000",
  //   icon: Globe
  // },
  
  // Tools
  {
    name: "Git",
    category: "Tools",
    level: 90,
    experience: "2+ years",
    color: "#F05032",
    icon: GitBranch
  },
  {
    name: "VS Code",
    category: "Tools",
    level: 95,
    experience: "3+ years",
    color: "#007ACC",
    icon: Code2
  },
  {
    name: "Figma",
    category: "Tools",
    level: 80,
    experience: "1+ years",
    color: "#F24E1E",
    icon: Palette
  }
];