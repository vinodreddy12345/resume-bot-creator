import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalistTemplateProps {
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

export const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#111827';
  const fontFamily = theme?.fontFamily || '"Helvetica Neue", sans-serif';
  
  return (
    <div 
      className="minimalist-template" 
      style={{
        fontFamily,
        padding: '35px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
      }}
    >
      {/* Minimalist Header - Clean and Simple */}
      <header style={{ 
        marginBottom: '30px',
      }}>
        <h1 style={{ 
          fontSize: '26px', 
          fontWeight: '600', 
          color: primaryColor, 
          marginBottom: '8px',
          letterSpacing: '0.5px',
        }}>
          {resumeData.personal.name || 'Your Name'}
        </h1>
        {resumeData.personal.title && (
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '400', 
            color: '#555',
            marginBottom: '15px',
            letterSpacing: '0.5px',
          }}>
            {resumeData.personal.title}
          </h2>
        )}
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '14px', color: '#555' }}>
          {resumeData.personal.email && (
            <div>
              {resumeData.personal.email}
            </div>
          )}
          {resumeData.personal.phone && (
            <div>
              {resumeData.personal.phone}
            </div>
          )}
          {resumeData.personal.location && (
            <div>
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

      {/* Two column layout for minimalist design */}
      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Main column (70%) */}
        <div style={{ flex: '7' }}>
          {/* Summary Section - if present */}
          {resumeData.personal.summary && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: primaryColor, 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                About
              </h3>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#444' }}>
                {formatText(resumeData.personal.summary)}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {resumeData.experience.length > 0 && resumeData.experience[0].company && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: primaryColor, 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Experience
              </h3>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '20px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '5px',
                  }}>
                    <div style={{ fontWeight: '600', fontSize: '15px', color: primaryColor }}>{exp.position}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{exp.startDate} — {exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: '14px', marginBottom: '8px', color: '#555' }}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#444' }}>
                    {formatText(exp.description)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Projects Section */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: primaryColor, 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Projects
              </h3>
              {resumeData.projects.map((project) => (
                <div key={project.id} style={{ marginBottom: '20px' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: primaryColor, marginBottom: '5px' }}>
                    {project.name}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#444' }}>
                    {formatText(project.description)}
                  </div>
                  {project.url && (
                    <div style={{ fontSize: '14px', marginTop: '5px' }}>
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: primaryColor, textDecoration: 'none' }}
                      >
                        {project.url}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Side column (30%) */}
        <div style={{ flex: '3' }}>
          {/* Education Section */}
          {resumeData.education.length > 0 && resumeData.education[0].institution && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: primaryColor, 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Education
              </h3>
              {resumeData.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '20px' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: primaryColor, marginBottom: '5px' }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </div>
                  <div style={{ fontSize: '14px', color: '#555' }}>
                    {edu.institution}
                    {edu.location && <div style={{ color: '#666' }}>{edu.location}</div>}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginTop: '3px' }}>
                    {edu.startDate} — {edu.endDate}
                  </div>
                  {edu.gpa && <div style={{ fontSize: '14px', marginTop: '3px', color: '#666' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </section>
          )}

          {/* Skills Section */}
          {resumeData.skills.length > 0 && resumeData.skills[0].name && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: primaryColor, 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {resumeData.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    style={{ 
                      fontSize: '14px',
                      color: '#444',
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
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: primaryColor, 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Certifications
              </h3>
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#444' }}>{cert.name}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    {cert.issuer} · {cert.date}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Languages Section */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: primaryColor, 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Languages
              </h3>
              {resumeData.languages.map((lang, index) => (
                <div key={lang.id || `lang-${index}`} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '8px', 
                  fontSize: '14px',
                  color: '#444',
                }}>
                  <div>{lang.name}</div>
                  <div style={{ color: '#666' }}>{lang.proficiency}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
