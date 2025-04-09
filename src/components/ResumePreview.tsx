
import React from 'react';
import { useResumeStore } from '@/store/resumeStore';

export const ResumePreview = () => {
  const { resumeData, activeTemplate } = useResumeStore();

  return (
    <div className="resume-preview">
      <div className="mb-8">
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
    </div>
  );
};
