export interface Experience {
  company: string;
  role: string;
  duration: string;
  description?: string;
  location?: string;
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
  details?: string;
}

export interface Skill {
  name: string;
  level?: string;
}

export interface Project {
  name: string;
  description: string;
  link: string;
}

export interface CVData {
  personal: {
    name: string;
    title: string;
    email: string;
    linkedin: string;
    location: string;
  };
  summary: string;
  skills: Skill[];
  languages: Skill[];
  certifications: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}