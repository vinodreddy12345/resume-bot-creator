
import React from 'react';
import { useResumeStore } from '@/store/resumeStore';

export const ResumePreview = () => {
  const { resumeData, activeTemplate } = useResumeStore();

  return (
    <div className="resume-preview">
      <div className="mb-6 flex items-start gap-4">
        {resumeData.personal.profilePicture && (
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img 
              src={resumeData.personal.profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{resumeData.personal.name || 'Your Name'}</h1>
          <p className="text-xl text-gray-600">{resumeData.personal.title || 'Professional Title'}</p>
          
          <div className="flex flex-wrap gap-x-4 mt-2 text-sm text-gray-600">
            {resumeData.personal.email && (
              <div>{resumeData.personal.email}</div>
            )}
            {resumeData.personal.phone && (
              <div>{resumeData.personal.phone}</div>
            )}
            {resumeData.personal.location && (
              <div>{resumeData.personal.location}</div>
            )}
            {resumeData.personal.website && (
              <div>{resumeData.personal.website}</div>
            )}
          </div>
        </div>
      </div>
      
      {resumeData.personal.summary && (
        <div className="resume-section">
          <h2 className="resume-section-title">Professional Summary</h2>
          <p>{resumeData.personal.summary}</p>
        </div>
      )}
      
      {resumeData.experience.length > 0 && resumeData.experience[0].company && (
        <div className="resume-section">
          <h2 className="resume-section-title">Experience</h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between font-medium">
                <div>{exp.position} at {exp.company}</div>
                <div className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              {exp.location && (
                <div className="text-sm text-gray-600 mb-1">{exp.location}</div>
              )}
              <p className="mt-1 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {resumeData.education.length > 0 && resumeData.education[0].institution && (
        <div className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between font-medium">
                <div>{edu.degree} in {edu.field}</div>
                <div className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              <div className="text-sm">
                {edu.institution}
                {edu.location && `, ${edu.location}`}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {resumeData.skills.length > 0 && resumeData.skills[0].name && (
        <div className="resume-section">
          <h2 className="resume-section-title">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="bg-secondary px-3 py-1 rounded-full text-sm">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="resume-section">
          <h2 className="resume-section-title">Projects</h2>
          {resumeData.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="font-medium">{project.name}</div>
              <p className="text-sm mt-1">{project.description}</p>
              {project.url && (
                <div className="text-sm text-primary mt-1">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="resume-section">
          <h2 className="resume-section-title">Certifications</h2>
          {resumeData.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="font-medium">{cert.name}</div>
              <div className="text-sm text-gray-600">
                {cert.issuer} | {cert.date}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {resumeData.languages && resumeData.languages.length > 0 && (
        <div className="resume-section">
          <h2 className="resume-section-title">Languages</h2>
          <div className="grid grid-cols-2 gap-2">
            {resumeData.languages.map((lang) => (
              <div key={lang.id} className="flex justify-between">
                <div>{lang.name}</div>
                <div className="text-gray-600">{lang.proficiency}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
