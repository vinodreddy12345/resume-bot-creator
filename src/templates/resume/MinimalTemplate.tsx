import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalTemplateProps {
  resumeData: ResumeData;
  theme?: {
    primaryColor?: string;
    fontFamily?: string;
    gradient?: string;
  };
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ resumeData, theme }) => {
  // Function to split text into paragraphs based on line breaks
  const formatText = (text: string) => {
    if (!text) return null;
    return text.split(/\r?\n/).map((paragraph, index) => (
      <p key={index} className="mb-1">{paragraph}</p>
    ));
  };

  const primaryColor = theme?.primaryColor || '#22c55e';
  const fontFamily = theme?.fontFamily || '"Inter", sans-serif';

  return (
    <div className="resume-template minimal" style={{
      fontFamily: fontFamily,
      color: '#333',
      background: 'white',
      padding: '30px',
      minHeight: '100%',
      height: 'auto',
      width: '100%'
    }}>
      {/* Header - Simple and centered */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-1">
          {resumeData.personal.name || 'Your Name'}
        </h1>
        <p className="text-lg mb-3">
          {resumeData.personal.title || 'Professional Title'}
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-4 text-sm text-gray-600">
          {resumeData.personal.email && (
            <div key="email">{resumeData.personal.email}</div>
          )}
          {resumeData.personal.phone && (
            <div key="phone">{resumeData.personal.phone}</div>
          )}
          {resumeData.personal.location && (
            <div key="location">{resumeData.personal.location}</div>
          )}
          {resumeData.personal.website && (
            <div key="website">{resumeData.personal.website}</div>
          )}
        </div>
      </header>
      
      {/* Summary Section */}
      {resumeData.personal.summary && (
        <section className="mb-6">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-2 text-center" style={{ color: primaryColor }}>
            Professional Summary
          </h2>
          <div className="text-sm text-center max-w-2xl mx-auto">
            {formatText(resumeData.personal.summary)}
          </div>
        </section>
      )}
      
      {/* Experience Section */}
      {resumeData.experience.length > 0 && resumeData.experience[0].company && (
        <section className="mb-6">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: primaryColor }}>
            Experience
          </h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-1">
                <div className="font-medium text-center sm:text-left">
                  {exp.position} at {exp.company}
                </div>
                <div className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              {exp.location && (
                <div className="text-sm text-gray-600 mb-1 text-center sm:text-left">{exp.location}</div>
              )}
              <div className="mt-1 text-sm">
                {formatText(exp.description)}
              </div>
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-disc list-inside text-sm mt-1 ml-1">
                  {exp.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Education Section */}
      {resumeData.education.length > 0 && resumeData.education[0].institution && (
        <section className="mb-6">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: primaryColor }}>
            Education
          </h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-1">
                <div className="font-medium">
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                </div>
                <div className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              <div className="text-sm">
                {edu.institution}
                {edu.location && `, ${edu.location}`}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </div>
              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="list-disc list-inside text-sm mt-1 ml-1">
                  {edu.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Skills Section - Horizontal layout */}
      {resumeData.skills.length > 0 && resumeData.skills[0].name && (
        <section className="mb-6">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {resumeData.skills.map((skill) => (
              <div 
                key={skill.id} 
                className="px-3 py-1 rounded-full text-sm border" 
                style={{ borderColor: primaryColor }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Two column layout for Projects and Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Projects Section */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-md font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: primaryColor }}>
              Projects
            </h2>
            {resumeData.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="font-medium text-center sm:text-left">{project.name}</div>
                <div className="text-sm mt-1">
                  {formatText(project.description)}
                </div>
                {project.url && (
                  <div className="text-sm mt-1 text-center sm:text-left">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: primaryColor }}
                    >
                      {project.url}
                    </a>
                  </div>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-1 ml-1">
                    {project.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
        
        {/* Certifications and Languages in one column */}
        <div>
          {/* Certifications Section */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section className="mb-6">
              <h2 className="text-md font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: primaryColor }}>
                Certifications
              </h2>
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="mb-2 text-center sm:text-left">
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-sm text-gray-600">
                    {cert.issuer} | {cert.date}
                  </div>
                  {cert.url && (
                    <div className="text-sm">
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: primaryColor }}
                      >
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
          
          {/* Languages Section */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-md font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: primaryColor }}>
                Languages
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {resumeData.languages.map((lang, index) => (
                  <div key={lang.id || `lang-${index}`} className="flex justify-between">
                    <div>{lang.name}</div>
                    <div className="text-gray-600">{lang.proficiency}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      {/* Custom Sections */}
      {resumeData.customSections && resumeData.customSections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className="text-md font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: primaryColor }}>
            {section.title}
          </h2>
          {section.items.map((item) => (
            <div key={item.id} className="mb-3 text-center sm:text-left">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm">{formatText(item.description)}</div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
