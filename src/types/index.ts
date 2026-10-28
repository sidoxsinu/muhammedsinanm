export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  roles: string[];
  bio: string;
  location: string;
  email: string;
  phone: string;
  contactUrl: string;
  resumeUrl: string;
  profileImage: string;
}

export interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

export interface Milestone {
  title: string;
  description: string;
}

export interface JourneyYear {
  year: string;
  milestones: Milestone[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  links: {
    live?: string;
    repo?: string;
  };
  image: string;
  featured?: boolean;
  badge?: string;
  recognition?: {
    text: string;
    links?: { label: string; url: string }[];
  };
}

export interface Achievement {
  title: string;
  subtitle?: string;
  organization: string;
  description?: string;
  date?: string;
  badge?: string;
  links?: { label: string; url: string }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: string;
  badge?: string;
  description?: string;
  companyUrl?: string;
  verifyUrl?: string;
  certificateImage?: string;
  highlights?: string[];
}

export interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  badge?: string;
}

export interface SkillItem {
  name: string;
  url?: string;
  category: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface ClubItem {
  title: string;
  items: string[];
}

export interface EventItem {
  name: string;
  result?: string;
}

export interface EventGroup {
  institution: string;
  events: EventItem[];
}

export interface FormalCertification {
  name: string;
  issuer?: string;
  period?: string;
}

export interface CertificateCard {
  number: string;
  name: string;
  thumbnail: string;
  documentUrl: string;
}
