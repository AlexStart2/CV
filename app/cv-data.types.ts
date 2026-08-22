export interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ProjectEntry {
  name: string;
  context: string;
  stack: string;
  description: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  notes: string[];
}

export interface SkillGroup {
  group: string;
  items: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface CvData {
  name: string;
  title: string;
  contact: {
    location: string;
    email: string;
    phone: string;
    github: { label: string; url: string };
  };
  summary: string;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  achievements: string[];
  skills: SkillGroup[];
  languages: LanguageEntry[];
}
