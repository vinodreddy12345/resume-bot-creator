
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
  const formatText = (text: string | undefined) => {
    if (!text) return null;
    return text.split(/\r?\n/).map((paragraph, index) => (
      <p key={index} className="mb-1">{paragraph}</p>
    ));
  };

  const primaryColor = theme?.primaryColor || '#22c55e';
  const fontFamily = theme?.fontFamily || '"Inter", sans-serif';

  // Safe access helpers with default empty objects to prevent runtime errors
  const personal = resumeData?.personal || {};
  const experience = resumeData?.experience || [];
  const education = resumeData?.education || [];
  const skills = resumeData?.skills || [];
  const projects = resumeData?.projects || [];
  const certifications = resumeData?.certifications || [];
  const languages = resumeData?.languages || [];
  const customSections = resumeData?.customSections || [];

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
        {personal && 'profilePicture' in personal && personal.profilePicture && (
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img 
              src={personal.profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
            {'name' in personal ? personal.name : 'Your Name'}
          </h1>
          <p className="text-xl text-gray-600">
            {'title' in personal ? personal.title : 'Professional Title'}
          </p>
          
          <div className="flex flex-wrap gap-x-4 mt-2 text-sm text-gray-600">
            {'email' in personal && personal.email && (
              <div key="email">{personal.email}</div>
            )}
            {'phone' in personal && personal.phone && (
              <div key="phone">{personal.phone}</div>
            )}
            {'location' in personal && personal.location && (
              <div key="location">{personal.location}</div>
            )}
            {'website' in personal && personal.website && (
              <div key="website">{personal.website}</div>
            )}
          </div>
        </div>
      </header>
      
      {/* Summary Section */}
      {'summary' in personal && personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Professional Summary
          </h2>
          <div className="text-sm">
            {formatText(personal.summary)}
          </div>
        </section>
      )}
      
      {/* Experience Section */}
      {experience && Array.isArray(experience) && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Experience
          </h2>
          {experience.map((exp) => (
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
              {exp.highlights && Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
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
      {education && Array.isArray(education) && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Education
          </h2>
          {education.map((edu) => (
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
              {edu.highlights && Array.isArray(edu.highlights) && edu.highlights.length > 0 && (
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
      {skills && Array.isArray(skills) && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
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
      {projects && Array.isArray(projects) && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Projects
          </h2>
          {projects.map((project) => (
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
              {project.highlights && Array.isArray(project.highlights) && project.highlights.length > 0 && (
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
      {certifications && Array.isArray(certifications) && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Certifications
          </h2>
          {certifications.map((cert) => (
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
      {languages && Array.isArray(languages) && languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between">
                <div>{lang.name}</div>
                <div className="text-gray-600">{lang.proficiency}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Custom Sections */}
      {customSections && Array.isArray(customSections) && customSections.length > 0 && 
       customSections[0] && 'title' in customSections[0] && customSections[0].title && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            {customSections[0].title}
          </h2>
          {customSections[0].items && Array.isArray(customSections[0].items) && customSections[0].items.map((item) => (
            <div key={item.id} className="mb-3">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm">{formatText(item.description)}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
