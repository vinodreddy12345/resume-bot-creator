import React from 'react';
import { ResumeData } from '@/types/resume';

interface SimpleTemplateProps {
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

export const SimpleTemplate: React.FC<SimpleTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#374151';
  const fontFamily = theme?.fontFamily || '"Arial", sans-serif';
  
  return (
    <div 
      className="simple-template" 
      style={{
        fontFamily,
        padding: '30px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
      }}
    >
      {/* Simple Header */}
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ 
          fontSize: '24px', 
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
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '14px' }}>
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

      {/* Summary Section */}
      {resumeData.personal.summary && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '10px',
            borderBottom: `1px solid #ddd`,
            paddingBottom: '5px',
          }}>
            Summary
          </h3>
          <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
            {formatText(resumeData.personal.summary)}
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
            marginBottom: '10px',
            borderBottom: `1px solid #ddd`,
            paddingBottom: '5px',
          }}>
            Experience
          </h3>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '15px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '5px',
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{exp.position}</div>
                <div style={{ fontSize: '14px', color: '#555' }}>{exp.startDate} - {exp.endDate}</div>
              </div>
              <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </div>
              <div style={{ fontSize: '14px' }}>
                {formatText(exp.description)}
              </div>
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
            marginBottom: '10px',
            borderBottom: `1px solid #ddd`,
            paddingBottom: '5px',
          }}>
            Education
          </h3>
          {resumeData.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '15px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '5px',
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                <div style={{ fontSize: '14px', color: '#555' }}>{edu.startDate} - {edu.endDate}</div>
              </div>
              <div style={{ fontSize: '14px' }}>
                {edu.institution}
                {edu.location && <span>, {edu.location}</span>}
                {edu.gpa && <span> | GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {resumeData.skills.length > 0 && resumeData.skills[0].name && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '10px',
            borderBottom: `1px solid #ddd`,
            paddingBottom: '5px',
          }}>
            Skills
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {resumeData.skills.map((skill) => (
              <div 
                key={skill.id} 
                style={{ 
                  padding: '4px 10px', 
                  backgroundColor: '#f5f5f5', 
                  borderRadius: '4px',
                  fontSize: '13px',
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
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '10px',
            borderBottom: `1px solid #ddd`,
            paddingBottom: '5px',
          }}>
            Projects
          </h3>
          {resumeData.projects.map((project) => (
            <div key={project.id} style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '5px' }}>{project.name}</div>
              <div style={{ fontSize: '14px' }}>
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

      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '10px',
            borderBottom: `1px solid #ddd`,
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
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '10px',
            borderBottom: `1px solid #ddd`,
            paddingBottom: '5px',
          }}>
            Languages
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            {resumeData.languages.map((lang, index) => (
              <div key={lang.id || `lang-${index}`} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '14px',
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
