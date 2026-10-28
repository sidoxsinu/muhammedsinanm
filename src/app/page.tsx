import React from 'react';
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
import { ContactSection } from '@/components/sections/ContactSection';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ClickSpark } from '@/components/ui/ClickSpark';
import { GlobalEffects } from '@/components/ui/GlobalEffects';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ClickSpark />
      <GlobalEffects />
      <div className="site-wrapper">
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <StatsSection />
          <FeaturedSection />
          <JourneySection />
          <EducationSection />
          <ProjectsSection />
          <AchievementsSection />
          <ExperienceSection />
          <LeadershipSection />
          <SkillsSection />
          <ClubsSection />
          <EventsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
