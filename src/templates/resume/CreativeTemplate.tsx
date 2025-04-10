import React from 'react';
import { ResumeData } from '@/types/resume';

interface CreativeTemplateProps {
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

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#6d28d9';
  const fontFamily = theme?.fontFamily || '"Poppins", sans-serif';
  
  return (
    <div 
      className="creative-template" 
      style={{
        fontFamily,
        padding: '30px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
      }}
    >
      {/* Header with creative design */}
      <header style={{ 
        marginBottom: '30px',
        position: 'relative',
        paddingLeft: '20px',
        borderLeft: `8px solid ${primaryColor}`,
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: primaryColor, 
          marginBottom: '5px',
          letterSpacing: '1px',
        }}>
          {resumeData.personal.name || 'Your Name'}
        </h1>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '500', 
          color: '#555',
          marginBottom: '15px',
          letterSpacing: '0.5px',
        }}>
          {resumeData.personal.title || 'Professional Title'}
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '14px' }}>
          {resumeData.personal.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>ud83dudce7</span>
              <span>{resumeData.personal.email}</span>
            </div>
          )}
          {resumeData.personal.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>ud83dudcf1</span>
              <span>{resumeData.personal.phone}</span>
            </div>
          )}
          {resumeData.personal.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>ud83dudccd</span>
              <span>{resumeData.personal.location}</span>
            </div>
          )}
          {resumeData.personal.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>ud83dudd17</span>
              <span>{resumeData.personal.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main content with creative styling */}
      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Left column (70%) */}
        <div style={{ flex: '7' }}>
          {/* Summary Section */}
          {resumeData.personal.summary && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '12px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                ABOUT ME
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '40px', 
                  height: '3px', 
                  background: primaryColor 
                }}></span>
              </h3>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#444' }}>
                {formatText(resumeData.personal.summary)}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {resumeData.experience.length > 0 && resumeData.experience[0].company && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '12px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                WORK EXPERIENCE
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '40px', 
                  height: '3px', 
                  background: primaryColor 
                }}></span>
              </h3>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '20px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '0', 
                    top: '5px', 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: primaryColor 
                  }}></div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>{exp.position}</div>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#555' }}>
                    {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                    {exp.startDate} - {exp.endDate}
                  </div>
                  <div style={{ fontSize: '14px', whiteSpace: 'pre-line', color: '#444' }}>
                    {formatText(exp.description)}
                  </div>
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
                marginBottom: '12px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                PROJECTS
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '40px', 
                  height: '3px', 
                  background: primaryColor 
                }}></span>
              </h3>
              {resumeData.projects.map((project) => (
                <div key={project.id} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '20px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '0', 
                    top: '5px', 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: primaryColor 
                  }}></div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>{project.name}</div>
                  <div style={{ fontSize: '14px', whiteSpace: 'pre-line', color: '#444' }}>
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

        {/* Right column (30%) */}
        <div style={{ flex: '3' }}>
          {/* Skills Section with creative display */}
          {resumeData.skills.length > 0 && resumeData.skills[0].name && (
            <section style={{ 
              marginBottom: '25px',
              padding: '20px',
              backgroundColor: `${primaryColor}10`,
              borderRadius: '8px',
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                SKILLS
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '40px', 
                  height: '3px', 
                  background: primaryColor 
                }}></span>
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {resumeData.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    style={{ 
                      padding: '6px 12px', 
                      backgroundColor: 'white', 
                      color: primaryColor,
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '500',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {resumeData.education.length > 0 && resumeData.education[0].institution && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '12px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                EDUCATION
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '40px', 
                  height: '3px', 
                  background: primaryColor 
                }}></span>
              </h3>
              {resumeData.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '15px', position: 'relative', paddingLeft: '20px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '0', 
                    top: '5px', 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: primaryColor 
                  }}></div>
                  <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{edu.degree}</div>
                  <div style={{ fontSize: '14px', marginBottom: '2px' }}>{edu.field}</div>
                  <div style={{ fontSize: '14px', color: '#555' }}>
                    {edu.institution}
                    {edu.location && <div style={{ fontSize: '13px' }}>{edu.location}</div>}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{edu.startDate} - {edu.endDate}</div>
                  {edu.gpa && <div style={{ fontSize: '13px', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </section>
          )}

          {/* Certifications Section */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '12px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                CERTIFICATIONS
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '40px', 
                  height: '3px', 
                  background: primaryColor 
                }}></span>
              </h3>
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '10px', position: 'relative', paddingLeft: '20px' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '0', 
                    top: '5px', 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: primaryColor 
                  }}></div>
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
                marginBottom: '12px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                LANGUAGES
                <span style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  left: '0', 
                  width: '40px', 
                  height: '3px', 
                  background: primaryColor 
                }}></span>
              </h3>
              {resumeData.languages.map((lang, index) => (
                <div key={lang.id || `lang-${index}`} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '8px', 
                  fontSize: '14px',
                  position: 'relative',
                  paddingLeft: '20px'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '0', 
                    top: '5px', 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    background: primaryColor 
                  }}></div>
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
