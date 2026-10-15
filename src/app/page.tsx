import React from 'react';
import { SECTIONS_CONFIG } from '@/data/sections-config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { FeaturedSection } from '@/components/sections/FeaturedSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { LeadershipSection } from '@/components/sections/LeadershipSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ClubsSection } from '@/components/sections/ClubsSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { CertificateGallerySection } from '@/components/sections/CertificateGallerySection';
import { ContactSection } from '@/components/sections/ContactSection';

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  hero: HeroSection,
  about: AboutSection,
  stats: StatsSection,
  featured: FeaturedSection,
  journey: JourneySection,
  education: EducationSection,
  projects: ProjectsSection,
  achievements: AchievementsSection,
  experience: ExperienceSection,
  leadership: LeadershipSection,
  skills: SkillsSection,
  clubs: ClubsSection,
  events: EventsSection,
  certifications: CertificationsSection,
  'certificates-gallery': CertificateGallerySection,
  contact: ContactSection,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between selection:bg-[var(--accent-red)] selection:text-white">
      <Navbar />
      <main id="main-content" className="flex-grow">
        {SECTIONS_CONFIG.filter((s) => s.enabled).map((s) => {
          const Component = SECTION_COMPONENTS[s.id];
          if (!Component) return null;
          return <Component key={s.id} />;
        })}
      </main>
      <Footer />
    </div>
  );
}
