import React from 'react';
import { ResumeData } from '@/types/resume';

interface TechnicalTemplateProps {
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

export const TechnicalTemplate: React.FC<TechnicalTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#2563eb';
  const fontFamily = theme?.fontFamily || '"Roboto Mono", monospace';
  
  return (
    <div 
      className="technical-template" 
      style={{
        fontFamily,
        padding: '25px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
      }}
    >
      {/* Technical Header with code-like styling */}
      <header style={{ 
        marginBottom: '20px',
        borderBottom: `2px solid ${primaryColor}`,
        paddingBottom: '15px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: primaryColor, 
              marginBottom: '5px',
              fontFamily: '"Roboto Mono", monospace',
            }}>
              {resumeData.personal.name || 'Your Name'}
            </h1>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: '500', 
              color: '#555',
              marginBottom: '10px',
              fontFamily: '"Roboto Mono", monospace',
            }}>
              {resumeData.personal.title || 'Technical Role'}
            </h2>
          </div>
          
          <div style={{ textAlign: 'right', fontSize: '14px', fontFamily: '"Roboto Mono", monospace' }}>
            {resumeData.personal.email && (
              <div style={{ marginBottom: '3px' }}>
                <span style={{ color: primaryColor }}>email: </span>
                {resumeData.personal.email}
              </div>
            )}
            {resumeData.personal.phone && (
              <div style={{ marginBottom: '3px' }}>
                <span style={{ color: primaryColor }}>phone: </span>
                {resumeData.personal.phone}
              </div>
            )}
            {resumeData.personal.location && (
              <div style={{ marginBottom: '3px' }}>
                <span style={{ color: primaryColor }}>location: </span>
                {resumeData.personal.location}
              </div>
            )}
            {resumeData.personal.website && (
              <div>
                <span style={{ color: primaryColor }}>website: </span>
                {resumeData.personal.website}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Technical Summary - if present */}
      {resumeData.personal.summary && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '8px',
            fontFamily: '"Roboto Mono", monospace',
            borderLeft: `3px solid ${primaryColor}`,
            paddingLeft: '8px',
          }}>
            // SUMMARY
          </h3>
          <div style={{ 
            fontSize: '14px', 
            lineHeight: '1.5', 
            backgroundColor: '#f8f9fa', 
            padding: '10px',
            borderRadius: '4px',
            fontFamily: '"Roboto Mono", monospace',
          }}>
            {formatText(resumeData.personal.summary)}
          </div>
        </section>
      )}

      {/* Skills Section - Prominently displayed for technical resume */}
      {resumeData.skills.length > 0 && resumeData.skills[0].name && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '8px',
            fontFamily: '"Roboto Mono", monospace',
            borderLeft: `3px solid ${primaryColor}`,
            paddingLeft: '8px',
          }}>
            // TECHNICAL SKILLS
          </h3>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px',
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '4px',
          }}>
            {resumeData.skills.map((skill) => (
              <div 
                key={skill.id} 
                style={{ 
                  padding: '5px 10px', 
                  backgroundColor: `${primaryColor}15`, 
                  color: primaryColor,
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '500',
                  fontFamily: '"Roboto Mono", monospace',
                  border: `1px solid ${primaryColor}30`,
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {resumeData.experience.length > 0 && resumeData.experience[0].company && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '8px',
            fontFamily: '"Roboto Mono", monospace',
            borderLeft: `3px solid ${primaryColor}`,
            paddingLeft: '8px',
          }}>
            // EXPERIENCE
          </h3>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} style={{ 
              marginBottom: '15px', 
              backgroundColor: '#f8f9fa',
              padding: '10px',
              borderRadius: '4px',
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '5px',
                fontFamily: '"Roboto Mono", monospace',
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px', color: primaryColor }}>
                  {exp.position}
                </div>
                <div style={{ fontSize: '14px', color: '#555' }}>
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              <div style={{ 
                fontSize: '14px', 
                marginBottom: '5px',
                fontFamily: '"Roboto Mono", monospace',
              }}>
                <span style={{ color: primaryColor }}>@</span> {exp.company}
                {exp.location ? <span style={{ color: '#666' }}> | {exp.location}</span> : ''}
              </div>
              <div style={{ 
                fontSize: '14px',
                fontFamily: '"Roboto Mono", monospace',
                whiteSpace: 'pre-line',
              }}>
                {formatText(exp.description)}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects Section - Important for technical resumes */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '8px',
            fontFamily: '"Roboto Mono", monospace',
            borderLeft: `3px solid ${primaryColor}`,
            paddingLeft: '8px',
          }}>
            // PROJECTS
          </h3>
          {resumeData.projects.map((project) => (
            <div key={project.id} style={{ 
              marginBottom: '15px',
              backgroundColor: '#f8f9fa',
              padding: '10px',
              borderRadius: '4px',
            }}>
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '15px', 
                marginBottom: '5px',
                color: primaryColor,
                fontFamily: '"Roboto Mono", monospace',
              }}>
                {project.name}
              </div>
              <div style={{ 
                fontSize: '14px',
                fontFamily: '"Roboto Mono", monospace',
              }}>
                {formatText(project.description)}
              </div>
              {project.url && (
                <div style={{ 
                  fontSize: '14px', 
                  color: primaryColor, 
                  marginTop: '5px',
                  fontFamily: '"Roboto Mono", monospace',
                }}>
                  <span style={{ color: '#666' }}>url: </span>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.url}
                  </a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {resumeData.education.length > 0 && resumeData.education[0].institution && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '8px',
            fontFamily: '"Roboto Mono", monospace',
            borderLeft: `3px solid ${primaryColor}`,
            paddingLeft: '8px',
          }}>
            // EDUCATION
          </h3>
          {resumeData.education.map((edu) => (
            <div key={edu.id} style={{ 
              marginBottom: '15px',
              backgroundColor: '#f8f9fa',
              padding: '10px',
              borderRadius: '4px',
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '5px',
                fontFamily: '"Roboto Mono", monospace',
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px', color: primaryColor }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </div>
                <div style={{ fontSize: '14px', color: '#555' }}>
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              <div style={{ 
                fontSize: '14px',
                fontFamily: '"Roboto Mono", monospace',
              }}>
                <span style={{ color: primaryColor }}>@</span> {edu.institution}
                {edu.location && <span style={{ color: '#666' }}> | {edu.location}</span>}
                {edu.gpa && <span style={{ color: '#666' }}> | GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '8px',
            fontFamily: '"Roboto Mono", monospace',
            borderLeft: `3px solid ${primaryColor}`,
            paddingLeft: '8px',
          }}>
            // CERTIFICATIONS
          </h3>
          <div style={{ 
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '4px',
          }}>
            {resumeData.certifications.map((cert) => (
              <div key={cert.id} style={{ 
                marginBottom: '10px',
                fontFamily: '"Roboto Mono", monospace',
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: primaryColor }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: '13px', color: '#555' }}>
                  {cert.issuer} | {cert.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages Section */}
      {resumeData.languages && resumeData.languages.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '8px',
            fontFamily: '"Roboto Mono", monospace',
            borderLeft: `3px solid ${primaryColor}`,
            paddingLeft: '8px',
          }}>
            // LANGUAGES
          </h3>
          <div style={{ 
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '4px',
          }}>
            {resumeData.languages.map((lang, index) => (
              <div key={lang.id || `lang-${index}`} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '5px', 
                fontSize: '14px',
                fontFamily: '"Roboto Mono", monospace',
              }}>
                <div>{lang.name}</div>
                <div style={{ color: '#555' }}>{lang.proficiency}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
