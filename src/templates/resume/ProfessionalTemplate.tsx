import React from 'react';
import { ResumeData } from '@/types/resume';

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
  theme?: {
    primaryColor?: string;
    fontFamily?: string;
    gradient?: string;
  };
}

// Helper function to format text with line breaks
const formatText = (text: string) => {
  if (!text) return null;
  return text.split(/\r?\n/).map((paragraph, index) => (
    <p key={index} className="mb-1">{paragraph}</p>
  ));
};

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#1e40af';
  const fontFamily = theme?.fontFamily || '"Inter", sans-serif';
  
  return (
    <div 
      className="professional-template" 
      style={{
        fontFamily,
        padding: '30px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
      }}
    >
      {/* Header Section with Name and Contact Info */}
      <header style={{ borderBottom: `2px solid ${primaryColor}`, paddingBottom: '15px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: primaryColor, marginBottom: '5px' }}>
          {resumeData.personal.name || 'Your Name'}
        </h1>
        <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#555', marginBottom: '10px' }}>
          {resumeData.personal.title || 'Professional Title'}
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '14px' }}>
          {resumeData.personal.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>📧</span>
              <span>{resumeData.personal.email}</span>
            </div>
          )}
          {resumeData.personal.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>📱</span>
              <span>{resumeData.personal.phone}</span>
            </div>
          )}
          {resumeData.personal.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>📍</span>
              <span>{resumeData.personal.location}</span>
            </div>
          )}
          {resumeData.personal.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>🔗</span>
              <span>{resumeData.personal.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Two Column Layout */}
      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Main Column (70%) */}
        <div style={{ flex: '7' }}>
          {/* Summary Section */}
          {resumeData.personal.summary && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}>
                PROFESSIONAL SUMMARY
              </h3>
              <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                {formatText(resumeData.personal.summary)}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {resumeData.experience.length > 0 && resumeData.experience[0].company && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}>
                PROFESSIONAL EXPERIENCE
              </h3>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{exp.position}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>{exp.startDate} - {exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  <div style={{ fontSize: '14px', whiteSpace: 'pre-line' }}>
                    {formatText(exp.description)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Projects Section */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}>
                PROJECTS
              </h3>
              {resumeData.projects.map((project) => (
                <div key={project.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '5px' }}>{project.name}</div>
                  <div style={{ fontSize: '14px', whiteSpace: 'pre-line' }}>
                    {formatText(project.description)}
                  </div>
                  {project.url && (
                    <div style={{ fontSize: '14px', color: primaryColor, marginTop: '5px' }}>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar Column (30%) */}
        <div style={{ flex: '3' }}>
          {/* Education Section */}
          {resumeData.education.length > 0 && resumeData.education[0].institution && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}>
                EDUCATION
              </h3>
              {resumeData.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{edu.degree}</div>
                  <div style={{ fontSize: '14px', marginBottom: '5px' }}>{edu.field}</div>
                  <div style={{ fontSize: '14px' }}>
                    {edu.institution}
                    {edu.location && <div>{edu.location}</div>}
                  </div>
                  <div style={{ fontSize: '14px', color: '#555' }}>{edu.startDate} - {edu.endDate}</div>
                  {edu.gpa && <div style={{ fontSize: '14px', marginTop: '5px' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </section>
          )}

          {/* Skills Section */}
          {resumeData.skills.length > 0 && resumeData.skills[0].name && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}>
                SKILLS
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {resumeData.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    style={{ 
                      padding: '5px 10px', 
                      backgroundColor: `${primaryColor}20`, 
                      color: primaryColor,
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}>
                CERTIFICATIONS
              </h3>
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{cert.name}</div>
                  <div style={{ fontSize: '14px', color: '#555' }}>
                    {cert.issuer} | {cert.date}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Languages Section */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '5px', marginBottom: '10px' }}>
                LANGUAGES
              </h3>
              {resumeData.languages.map((lang, index) => (
                <div key={lang.id || `lang-${index}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                  <div>{lang.name}</div>
                  <div style={{ color: '#555' }}>{lang.proficiency}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
