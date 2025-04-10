import React from 'react';
import { ResumeData } from '@/types/resume';

interface ElegantTemplateProps {
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

export const ElegantTemplate: React.FC<ElegantTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#6d28d9';
  const fontFamily = theme?.fontFamily || '"Playfair Display", serif';
  
  return (
    <div 
      className="elegant-template" 
      style={{
        fontFamily,
        padding: '30px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
      }}
    >
      {/* Elegant Header with decorative elements */}
      <header style={{ 
        marginBottom: '25px',
        textAlign: 'center',
        position: 'relative',
        paddingBottom: '20px',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '2px',
          background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`,
        }} />
        
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: primaryColor, 
          marginTop: '15px',
          marginBottom: '5px',
          letterSpacing: '1px',
        }}>
          {resumeData.personal.name || 'Your Name'}
        </h1>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: '500', 
          color: '#555',
          marginBottom: '15px',
          letterSpacing: '1px',
          fontStyle: 'italic',
        }}>
          {resumeData.personal.title || 'Professional Title'}
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '14px' }}>
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
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '2px',
          background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`,
        }} />
      </header>

      {/* Summary Section */}
      {resumeData.personal.summary && (
        <section style={{ marginBottom: '25px', textAlign: 'center' }}>
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

      {/* Main content with elegant styling */}
      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Left column (65%) */}
        <div style={{ flex: '65' }}>
          {/* Experience Section */}
          {resumeData.experience.length > 0 && resumeData.experience[0].company && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                Experience
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  backgroundColor: primaryColor,
                }} />
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
                  <div style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '5px' }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
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
                marginBottom: '15px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                Projects
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  backgroundColor: primaryColor,
                }} />
              </h3>
              {resumeData.projects.map((project) => (
                <div key={project.id} style={{ marginBottom: '20px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: primaryColor, marginBottom: '5px' }}>
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

        {/* Right column (35%) */}
        <div style={{ flex: '35' }}>
          {/* Education Section */}
          {resumeData.education.length > 0 && resumeData.education[0].institution && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                Education
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  backgroundColor: primaryColor,
                }} />
              </h3>
              {resumeData.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '20px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: primaryColor, marginBottom: '5px' }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </div>
                  <div style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '5px' }}>
                    {edu.institution}
                    {edu.location && <div>{edu.location}</div>}
                  </div>
                  <div style={{ fontSize: '14px', color: '#555' }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                  {edu.gpa && <div style={{ fontSize: '14px', marginTop: '5px' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </section>
          )}

          {/* Skills Section */}
          {resumeData.skills.length > 0 && resumeData.skills[0].name && (
            <section style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '15px',
                position: 'relative',
                paddingBottom: '8px',
              }}>
                Skills
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  backgroundColor: primaryColor,
                }} />
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {resumeData.skills.map((skill) => (
                  <div 
                    key={skill.id} 
                    style={{ 
                      fontSize: '14px',
                      position: 'relative',
                      paddingLeft: '15px',
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: primaryColor,
                    }} />
                    {skill.name}
                  </div>
                ))}
              </div>
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
                position: 'relative',
                paddingBottom: '8px',
              }}>
                Certifications
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  backgroundColor: primaryColor,
                }} />
              </h3>
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: primaryColor }}>{cert.name}</div>
                  <div style={{ fontSize: '14px', fontStyle: 'italic' }}>
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
                position: 'relative',
                paddingBottom: '8px',
              }}>
                Languages
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  backgroundColor: primaryColor,
                }} />
              </h3>
              {resumeData.languages.map((lang, index) => (
                <div key={lang.id || `lang-${index}`} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '10px', 
                  fontSize: '14px',
                }}>
                  <div>{lang.name}</div>
                  <div style={{ fontStyle: 'italic', color: '#555' }}>{lang.proficiency}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
