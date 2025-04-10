
import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import './resume-preview.css'; // We'll create this file for page break styling
import { ResumeTemplateRenderer } from '@/templates/resume';

export const ResumePreview = () => {
  const { resumeData, activeTemplate, resumeTheme } = useResumeStore();

  return (
    <div className="resume-preview">
      <ResumeTemplateRenderer 
        resumeData={resumeData} 
        templateId={activeTemplate} 
        theme={resumeTheme}
      />
    </div>
  );
};
