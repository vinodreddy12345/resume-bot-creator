import React from 'react';
import { ResumeData } from '@/types/resume';

interface ExecutiveTemplateProps {
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

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#0f172a';
  const fontFamily = theme?.fontFamily || '"Georgia", serif';
  
  return (
    <div 
      className="executive-template" 
      style={{
        fontFamily,
        padding: '30px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
      }}
    >
      {/* Header with elegant design */}
      <header style={{ 
        marginBottom: '25px',
        borderBottom: `1px solid ${primaryColor}`,
        paddingBottom: '20px',
        textAlign: 'center',
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: primaryColor, 
          marginBottom: '5px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          {resumeData.personal.name || 'Your Name'}
        </h1>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '500', 
          color: '#555',
          marginBottom: '15px',
          letterSpacing: '1px',
        }}>
          {resumeData.personal.title || 'Executive Title'}
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '14px' }}>
          {resumeData.personal.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>{resumeData.personal.email}</span>
            </div>
          )}
          {resumeData.personal.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>{resumeData.personal.phone}</span>
            </div>
          )}
          {resumeData.personal.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>{resumeData.personal.location}</span>
            </div>
          )}
          {resumeData.personal.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>{resumeData.personal.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary Section - Executive Profile */}
      {resumeData.personal.summary && (
        <section style={{ marginBottom: '25px', textAlign: 'center' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Executive Profile
          </h3>
          <div style={{ 
            fontSize: '15px', 
            lineHeight: '1.6', 
            color: '#444',
            fontStyle: 'italic',
            maxWidth: '90%',
            margin: '0 auto',
          }}>
            {formatText(resumeData.personal.summary)}
          </div>
        </section>
      )}

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Left column (70%) */}
        <div style={{ flex: '7' }}>
          {/* Experience Section */}
          {resumeData.experience.length > 0 && resumeData.experience[0].company && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `1px solid ${primaryColor}`,
                paddingBottom: '5px',
              }}>
                Professional Experience
              </h3>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '20px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline',
                    marginBottom: '5px',
                  }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: primaryColor }}>
                      {exp.position}
                    </div>
                    <div style={{ fontSize: '14px', color: '#555' }}>
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '5px' }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                    {formatText(exp.description)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education Section */}
          {resumeData.education.length > 0 && resumeData.education[0].institution && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `1px solid ${primaryColor}`,
                paddingBottom: '5px',
              }}>
                Education
              </h3>
              {resumeData.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline',
                    marginBottom: '5px',
                  }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: primaryColor }}>
                      {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                    </div>
                    <div style={{ fontSize: '14px', color: '#555' }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  <div style={{ fontSize: '15px' }}>
                    {edu.institution}
                    {edu.location && <span>, {edu.location}</span>}
                  </div>
                  {edu.gpa && <div style={{ fontSize: '14px', marginTop: '5px' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right column (30%) */}
        <div style={{ flex: '3' }}>
          {/* Skills Section */}
          {resumeData.skills.length > 0 && resumeData.skills[0].name && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `1px solid ${primaryColor}`,
                paddingBottom: '5px',
              }}>
                Core Competencies
              </h3>
              <ul style={{ 
                listStyleType: 'none', 
                padding: 0, 
                margin: 0,
                fontSize: '14px',
              }}>
                {resumeData.skills.map((skill) => (
                  <li 
                    key={skill.id} 
                    style={{ 
                      padding: '5px 0', 
                      borderBottom: '1px dotted #ddd',
                    }}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications Section */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `1px solid ${primaryColor}`,
                paddingBottom: '5px',
              }}>
                Certifications
              </h3>
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{cert.name}</div>
                  <div style={{ fontSize: '13px', color: '#555' }}>
                    {cert.issuer} | {cert.date}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Languages Section */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `1px solid ${primaryColor}`,
                paddingBottom: '5px',
              }}>
                Languages
              </h3>
              {resumeData.languages.map((lang, index) => (
                <div key={lang.id || `lang-${index}`} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '8px', 
                  fontSize: '14px',
                }}>
                  <div>{lang.name}</div>
                  <div style={{ color: '#555' }}>{lang.proficiency}</div>
                </div>
              ))}
            </section>
          )}
          
          {/* Projects Section */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `1px solid ${primaryColor}`,
                paddingBottom: '5px',
              }}>
                Key Projects
              </h3>
              {resumeData.projects.map((project) => (
                <div key={project.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: primaryColor }}>{project.name}</div>
                  <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
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
      </div>
    </div>
  );
};
