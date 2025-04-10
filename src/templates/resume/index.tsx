import React from 'react';
import { ResumeData } from '@/types/resume';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { SimpleTemplate } from './SimpleTemplate';
import { CompactTemplate } from './CompactTemplate';
import { TechnicalTemplate } from './TechnicalTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { ElegantTemplate } from './ElegantTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { ChronoTemplate } from './ChronoTemplate';

interface TemplateProps {
  resumeData: ResumeData;
  templateId: string;
  theme?: {
    primaryColor?: string;
    fontFamily?: string;
    gradient?: string;
  };
}

export const ResumeTemplateRenderer: React.FC<TemplateProps> = ({ resumeData, templateId, theme }) => {
  // Select the appropriate template based on templateId
  switch (templateId) {
    case 'modern':
      return <ModernTemplate resumeData={resumeData} theme={theme} />;
    case 'minimal':
      return <MinimalTemplate resumeData={resumeData} theme={theme} />;
    case 'professional':
      return <ProfessionalTemplate resumeData={resumeData} theme={theme} />;
    case 'creative':
      return <CreativeTemplate resumeData={resumeData} theme={theme} />;
    case 'executive':
      return <ExecutiveTemplate resumeData={resumeData} theme={theme} />;
    case 'simple':
      return <SimpleTemplate resumeData={resumeData} theme={theme} />;
    case 'compact':
      return <CompactTemplate resumeData={resumeData} theme={theme} />;
    case 'technical':
      return <TechnicalTemplate resumeData={resumeData} theme={theme} />;
    case 'classic':
      return <ClassicTemplate resumeData={resumeData} theme={theme} />;
    case 'elegant':
      return <ElegantTemplate resumeData={resumeData} theme={theme} />;
    case 'minimalist':
      return <MinimalistTemplate resumeData={resumeData} theme={theme} />;
    case 'chrono':
      return <ChronoTemplate resumeData={resumeData} theme={theme} />;
    default:
      // Default to modern template
      return <ModernTemplate resumeData={resumeData} theme={theme} />;
  }
};

// Export template thumbnails for the template selector
export const templateThumbnails = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A clean, professional template with a modern design',
    thumbnail: '/templates/modern-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'A minimalist template with a focus on simplicity',
    thumbnail: '/templates/minimal-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A two-column template with a focus on professionalism',
    thumbnail: '/templates/professional-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A creative template with a unique design',
    thumbnail: '/templates/creative-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'An elegant template for executives and senior professionals',
    thumbnail: '/templates/executive-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'A straightforward and clean template',
    thumbnail: '/templates/simple-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'A space-efficient template for comprehensive resumes',
    thumbnail: '/templates/compact-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'A code-styled template for technical professionals',
    thumbnail: '/templates/technical-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'A traditional resume template with a timeless design',
    thumbnail: '/templates/classic-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'A sophisticated template with decorative elements',
    thumbnail: '/templates/elegant-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'A clean, modern template with minimal design elements',
    thumbnail: '/templates/minimalist-thumbnail.png' // Path to thumbnail image
  },
  {
    id: 'chrono',
    name: 'Chronological',
    description: 'A timeline-based template highlighting your career progression',
    thumbnail: '/templates/chrono-thumbnail.png' // Path to thumbnail image
  }
];
