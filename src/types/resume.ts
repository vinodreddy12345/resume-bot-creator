
export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    summary: string;
    profilePicture?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  customSections?: CustomSection[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | 'Present';
  location?: string;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | 'Present';
  location?: string;
  gpa?: string;
  highlights?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Limited Working' | 'Professional Working' | 'Full Professional' | 'Native';
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  description: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  thumbnail: string;
}

export interface ResumeTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  gradient?: string;
}
