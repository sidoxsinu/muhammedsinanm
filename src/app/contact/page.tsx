import React from 'react';

import { ContactPortalCard } from '@/components/ui/ContactPortalCard';
import { PageShell } from '@/components/ui/PageShell';

export default function ContactPage() {
  return (
    <PageShell
      maxWidth="max-w-4xl"
      badge="// Get in Touch"
      title="Let's Build Together"
      description="Whether you have an upcoming project, freelance inquiry, engineering role, or just want to discuss full-stack & AI architectures, I'd love to connect."
    >
      <div className="w-full">
        <ContactPortalCard />
      </div>
    </PageShell>
  );
}
