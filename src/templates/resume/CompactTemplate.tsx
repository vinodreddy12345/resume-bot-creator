import React from 'react';
import { ResumeData } from '@/types/resume';

interface CompactTemplateProps {
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

export const CompactTemplate: React.FC<CompactTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#0891b2';
  const fontFamily = theme?.fontFamily || '"Inter", sans-serif';
  
  return (
    <div 
      className="compact-template" 
      style={{
        fontFamily,
        padding: '20px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
        fontSize: '12px', // Smaller base font size for compact design
      }}
    >
      {/* Compact Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '15px',
        borderBottom: `1px solid ${primaryColor}`,
        paddingBottom: '10px',
      }}>
        <div>
          <h1 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '3px',
          }}>
            {resumeData.personal.name || 'Your Name'}
          </h1>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#555',
            marginBottom: '5px',
          }}>
            {resumeData.personal.title || 'Professional Title'}
          </h2>
        </div>
        
        <div style={{ textAlign: 'right', fontSize: '12px' }}>
          {resumeData.personal.email && (
            <div style={{ marginBottom: '2px' }}>
              {resumeData.personal.email}
            </div>
          )}
          {resumeData.personal.phone && (
            <div style={{ marginBottom: '2px' }}>
              {resumeData.personal.phone}
            </div>
          )}
          {resumeData.personal.location && (
            <div style={{ marginBottom: '2px' }}>
              {resumeData.personal.location}
            </div>
          )}
          {resumeData.personal.website && (
            <div>
              {resumeData.personal.website}
            </div>
          )}
        </div>
      </header>

      {/* Two column layout for compact design */}
      <div style={{ display: 'flex', gap: '15px' }}>
        {/* Left column (70%) */}
        <div style={{ flex: '7' }}>
          {/* Summary Section - if present */}
          {resumeData.personal.summary && (
            <section style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Professional Summary
              </h3>
              <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                {formatText(resumeData.personal.summary)}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {resumeData.experience.length > 0 && resumeData.experience[0].company && (
            <section style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Experience
              </h3>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '10px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '2px',
                  }}>
                    <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{exp.position}</div>
                    <div style={{ fontSize: '12px', color: '#555' }}>{exp.startDate} - {exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: '12px', marginBottom: '3px', fontWeight: '500' }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: '1.3' }}>
                    {formatText(exp.description)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Projects Section */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Projects
              </h3>
              {resumeData.projects.map((project) => (
                <div key={project.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '2px' }}>{project.name}</div>
                  <div style={{ fontSize: '12px', lineHeight: '1.3' }}>
                    {formatText(project.description)}
                  </div>
                  {project.url && (
                    <div style={{ fontSize: '12px', color: primaryColor, marginTop: '2px' }}>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right column (30%) */}
        <div style={{ flex: '3' }}>
          {/* Education Section */}
          {resumeData.education.length > 0 && resumeData.education[0].institution && (
            <section style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Education
              </h3>
              {resumeData.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '2px' }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </div>
                  <div style={{ fontSize: '12px' }}>
                    {edu.institution}
                    {edu.location && <div>{edu.location}</div>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#555' }}>{edu.startDate} - {edu.endDate}</div>
                  {edu.gpa && <div style={{ fontSize: '12px' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </section>
          )}

          {/* Skills Section */}
          {resumeData.skills.length > 0 && resumeData.skills[0].name && (
            <section style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {resumeData.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    style={{ 
                      padding: '3px 6px', 
                      backgroundColor: `${primaryColor}15`, 
                      color: primaryColor,
                      borderRadius: '3px',
                      fontSize: '11px',
                      fontWeight: '500',
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
            <section style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Certifications
              </h3>
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{cert.name}</div>
                  <div style={{ fontSize: '11px', color: '#555' }}>
                    {cert.issuer} | {cert.date}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Languages Section */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Languages
              </h3>
              {resumeData.languages.map((lang, index) => (
                <div key={lang.id || `lang-${index}`} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '3px', 
                  fontSize: '12px',
                }}>
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
