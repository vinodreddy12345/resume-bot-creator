import React from 'react';
import { ResumeData } from '@/types/resume';

interface ChronoTemplateProps {
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

export const ChronoTemplate: React.FC<ChronoTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#047857';
  const fontFamily = theme?.fontFamily || '"Open Sans", sans-serif';
  
  return (
    <div 
      className="chrono-template" 
      style={{
        fontFamily,
        padding: '30px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
      }}
    >
      {/* Header */}
      <header style={{ 
        marginBottom: '25px',
        borderBottom: `2px solid ${primaryColor}`,
        paddingBottom: '15px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ 
              fontSize: '26px', 
              fontWeight: 'bold', 
              color: primaryColor, 
              marginBottom: '5px',
            }}>
              {resumeData.personal.name || 'Your Name'}
            </h1>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: '500', 
              color: '#555',
              marginBottom: '10px',
            }}>
              {resumeData.personal.title || 'Professional Title'}
            </h2>
          </div>
          
          <div style={{ textAlign: 'right', fontSize: '14px' }}>
            {resumeData.personal.email && (
              <div style={{ marginBottom: '3px' }}>
                {resumeData.personal.email}
              </div>
            )}
            {resumeData.personal.phone && (
              <div style={{ marginBottom: '3px' }}>
                {resumeData.personal.phone}
              </div>
            )}
            {resumeData.personal.location && (
              <div style={{ marginBottom: '3px' }}>
                {resumeData.personal.location}
              </div>
            )}
            {resumeData.personal.website && (
              <div>
                {resumeData.personal.website}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Summary Section */}
      {resumeData.personal.summary && (
        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Professional Summary
          </h3>
          <div style={{ 
            fontSize: '14px', 
            lineHeight: '1.5', 
            padding: '10px',
            border: `1px solid ${primaryColor}20`,
            borderLeft: `4px solid ${primaryColor}`,
            backgroundColor: `${primaryColor}05`,
            borderRadius: '0 4px 4px 0',
          }}>
            {formatText(resumeData.personal.summary)}
          </div>
        </section>
      )}

      {/* Experience Section with Timeline Visual */}
      {resumeData.experience.length > 0 && resumeData.experience[0].company && (
        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Work Experience
          </h3>
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '7px',
              top: '8px',
              bottom: '0',
              width: '2px',
              backgroundColor: `${primaryColor}40`,
            }} />
            
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} style={{ 
                marginBottom: '20px',
                paddingLeft: '30px',
                position: 'relative',
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '8px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: primaryColor,
                  zIndex: 1,
                }} />
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '5px',
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: primaryColor }}>
                    {exp.position}
                  </div>
                  <div style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: '15px', marginBottom: '5px', fontWeight: '500' }}>
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  {formatText(exp.description)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section with Timeline Visual */}
      {resumeData.education.length > 0 && resumeData.education[0].institution && (
        <section style={{ marginBottom: '25px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Education
          </h3>
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '7px',
              top: '8px',
              bottom: '0',
              width: '2px',
              backgroundColor: `${primaryColor}40`,
            }} />
            
            {resumeData.education.map((edu) => (
              <div key={edu.id} style={{ 
                marginBottom: '20px',
                paddingLeft: '30px',
                position: 'relative',
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '8px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: primaryColor,
                  zIndex: 1,
                }} />
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '5px',
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: primaryColor }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </div>
                  <div style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <div style={{ fontSize: '15px', marginBottom: '5px' }}>
                  {edu.institution}
                  {edu.location && <span>, {edu.location}</span>}
                  {edu.gpa && <div style={{ fontSize: '14px', marginTop: '3px' }}>GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills and Additional Sections */}
      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Left column */}
        <div style={{ flex: '1' }}>
          {/* Skills Section */}
          {resumeData.skills.length > 0 && resumeData.skills[0].name && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {resumeData.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    style={{ 
                      padding: '5px 12px', 
                      backgroundColor: `${primaryColor}15`, 
                      color: primaryColor,
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '500',
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
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Projects
              </h3>
              {resumeData.projects.map((project) => (
                <div key={project.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: primaryColor, marginBottom: '5px' }}>
                    {project.name}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                    {formatText(project.description)}
                  </div>
                  {project.url && (
                    <div style={{ fontSize: '14px', marginTop: '5px' }}>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor }}>
                        {project.url}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right column */}
        <div style={{ flex: '1' }}>
          {/* Certifications Section */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Certifications
              </h3>
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: primaryColor }}>{cert.name}</div>
                  <div style={{ fontSize: '14px', color: '#555' }}>
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
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Languages
              </h3>
              {resumeData.languages.map((lang, index) => (
                <div key={lang.id || `lang-${index}`} style={{ 
                  marginBottom: '10px', 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '3px', 
                    fontSize: '14px',
                  }}>
                    <div style={{ fontWeight: '500' }}>{lang.name}</div>
                    <div style={{ color: '#555' }}>{lang.proficiency}</div>
                  </div>
                  <div style={{ 
                    height: '6px', 
                    backgroundColor: '#eee', 
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: primaryColor,
                      width: lang.proficiency === 'Full Professional' ? '100%' :
                             lang.proficiency === 'Professional Working' ? '80%' :
                             lang.proficiency === 'Limited Working' ? '60%' :
                             lang.proficiency === 'Elementary' ? '40%' : '50%',
                    }} />
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
