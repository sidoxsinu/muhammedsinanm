import React from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { AboutSection } from '@/components/sections/AboutSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ClubsSection } from '@/components/sections/ClubsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { Footer } from '@/components/sections/Footer';
import { GitHubSection } from '@/components/sections/GitHubSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { LeadershipSection } from '@/components/sections/LeadershipSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { StatsSection } from '@/components/sections/StatsSection';

export default function Home() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <GitHubSection />
        <ExperienceSection />
        <JourneySection />
        <EducationSection />
        <AchievementsSection />
        <LeadershipSection />
        <ClubsSection />
        <EventsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
