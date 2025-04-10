import React from 'react';
import { ResumeData } from '@/types/resume';

interface ModernTemplateProps {
  resumeData: ResumeData;
  theme?: {
    primaryColor?: string;
    fontFamily?: string;
    gradient?: string;
  };
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData, theme }) => {
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
    <div className="resume-template modern" style={{
      fontFamily: fontFamily,
      color: '#333',
      background: theme?.gradient || 'white',
      padding: '30px',
      minHeight: '100%',
      height: 'auto',
      width: '100%'
    }}>
      {/* Header Section */}
      <header className="mb-6 flex items-start gap-4">
        {resumeData.personal.profilePicture && (
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img 
              src={resumeData.personal.profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
            {resumeData.personal.name || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-600">
            {resumeData.personal.title || 'Professional Title'}
          </p>
          
          <div className="flex flex-wrap gap-x-4 mt-2 text-sm text-gray-600">
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
        </div>
      </header>
      
      {/* Summary Section */}
      {resumeData.personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Professional Summary
          </h2>
          <div className="text-sm">
            {formatText(resumeData.personal.summary)}
          </div>
        </section>
      )}
      
      {/* Experience Section */}
      {resumeData.experience.length > 0 && resumeData.experience[0].company && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Experience
          </h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between font-medium">
                <div className="text-md">
                  <span style={{ color: primaryColor }}>{exp.position}</span> at {exp.company}
                </div>
                <div className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              {exp.location && (
                <div className="text-sm text-gray-600 mb-1">{exp.location}</div>
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
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Education
          </h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between font-medium">
                <div>
                  <span style={{ color: primaryColor }}>{edu.degree}</span>
                  {edu.field && <span> in {edu.field}</span>}
                </div>
                <div className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              <div className="text-sm">
                {edu.institution}
                {edu.location && <span>, {edu.location}</span>}
                {edu.gpa && <span> | GPA: {edu.gpa}</span>}
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
      
      {/* Skills Section */}
      {resumeData.skills.length > 0 && resumeData.skills[0].name && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <div 
                key={skill.id} 
                className="px-3 py-1 rounded-full text-sm" 
                style={{ 
                  backgroundColor: `${primaryColor}20`, // 20% opacity
                  color: primaryColor 
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects Section */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Projects
          </h2>
          {resumeData.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="font-medium" style={{ color: primaryColor }}>{project.name}</div>
              <div className="text-sm mt-1">
                {formatText(project.description)}
              </div>
              {project.url && (
                <div className="text-sm mt-1">
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
      
      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
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
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {resumeData.languages.map((lang, index) => (
              <div key={lang.id || `lang-${index}`} className="flex justify-between">
                <div>{lang.name}</div>
                <div className="text-gray-600">{lang.proficiency}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Custom Sections */}
      {resumeData.customSections && resumeData.customSections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            {section.title}
          </h2>
          {section.items.map((item) => (
            <div key={item.id} className="mb-3">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm">{formatText(item.description)}</div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
