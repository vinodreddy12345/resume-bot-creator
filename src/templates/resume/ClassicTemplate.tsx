import React from 'react';
import { ResumeData } from '@/types/resume';

interface ClassicTemplateProps {
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

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ resumeData, theme }) => {
  // Define theme colors with defaults
  const primaryColor = theme?.primaryColor || '#000000';
  const fontFamily = theme?.fontFamily || '"Times New Roman", serif';
  
  return (
    <div 
      className="classic-template" 
      style={{
        fontFamily,
        padding: '30px',
        background: theme?.gradient || 'white',
        color: '#333',
        minHeight: '11in',
        width: '8.5in',
      }}
    >
      {/* Classic Header - Centered and Traditional */}
      <header style={{ 
        textAlign: 'center',
        marginBottom: '20px',
        borderBottom: `1px solid #ccc`,
        paddingBottom: '20px',
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: primaryColor, 
          marginBottom: '5px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          {resumeData.personal.name || 'Your Name'}
        </h1>
        {resumeData.personal.title && (
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '500', 
            color: '#555',
            marginBottom: '10px',
          }}>
            {resumeData.personal.title}
          </h2>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '14px' }}>
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
            borderBottom: `1px solid #ccc`,
            paddingBottom: '5px',
            textTransform: 'uppercase',
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
            borderBottom: `1px solid #ccc`,
            paddingBottom: '5px',
            textTransform: 'uppercase',
          }}>
            Professional Experience
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
              <div style={{ fontSize: '14px', marginBottom: '5px', fontStyle: 'italic' }}>
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
            borderBottom: `1px solid #ccc`,
            paddingBottom: '5px',
            textTransform: 'uppercase',
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
              <div style={{ fontSize: '14px', fontStyle: 'italic' }}>
                {edu.institution}
                {edu.location && <span>, {edu.location}</span>}
              </div>
              {edu.gpa && <div style={{ fontSize: '14px', marginTop: '5px' }}>GPA: {edu.gpa}</div>}
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
            borderBottom: `1px solid #ccc`,
            paddingBottom: '5px',
            textTransform: 'uppercase',
          }}>
            Skills
          </h3>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '10px',
            fontSize: '14px',
          }}>
            {resumeData.skills.map((skill, index) => (
              <div key={skill.id || `skill-${index}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>{skill.name}</span>
                {index < resumeData.skills.length - 1 && <span style={{ margin: '0 5px' }}>•</span>}
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
            borderBottom: `1px solid #ccc`,
            paddingBottom: '5px',
            textTransform: 'uppercase',
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

      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: primaryColor, 
            marginBottom: '10px',
            borderBottom: `1px solid #ccc`,
            paddingBottom: '5px',
            textTransform: 'uppercase',
          }}>
            Certifications
          </h3>
          {resumeData.certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{cert.name}</div>
              <div style={{ fontSize: '13px', color: '#555', fontStyle: 'italic' }}>
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
            borderBottom: `1px solid #ccc`,
            paddingBottom: '5px',
            textTransform: 'uppercase',
          }}>
            Languages
          </h3>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '15px',
            fontSize: '14px',
          }}>
            {resumeData.languages.map((lang, index) => (
              <div key={lang.id || `lang-${index}`}>
                <span>{lang.name}</span>
                <span style={{ color: '#555' }}> ({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
