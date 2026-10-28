import React from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperiencePreviewSection } from '@/components/sections/ExperiencePreviewSection';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ClickSpark } from '@/components/ui/ClickSpark';
import { CustomCursor } from '@/components/ui/CustomCursor';
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
          <StatsSection />
          <ProjectsSection />
          <SkillsSection />
          <ExperiencePreviewSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
