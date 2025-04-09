
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { ResumeData, ResumeTemplate } from '@/types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  activeTemplate: string;
  templates: ResumeTemplate[];
  updatePersonal: (personal: Partial<ResumeData['personal']>) => void;
  addExperience: () => void;
  updateExperience: (id: string, experience: Partial<Omit<ResumeData['experience'][0], 'id'>>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, education: Partial<Omit<ResumeData['education'][0], 'id'>>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, skill: Partial<Omit<ResumeData['skills'][0], 'id'>>) => void;
  removeSkill: (id: string) => void;
  setResumeData: (data: ResumeData) => void;
  setActiveTemplate: (templateId: string) => void;
}

const defaultResumeData: ResumeData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  experience: [
    {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      highlights: [''],
    },
  ],
  education: [
    {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      location: '',
      gpa: '',
      highlights: [''],
    },
  ],
  skills: [
    {
      id: uuidv4(),
      name: '',
      level: 'Intermediate',
    },
  ],
  projects: [],
  certifications: [],
  languages: [],
};

const templates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: '/placeholder.svg',
  },
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: '/placeholder.svg',
  },
  {
    id: 'creative',
    name: 'Creative',
    thumbnail: '/placeholder.svg',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '/placeholder.svg',
  },
];

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: defaultResumeData,
      activeTemplate: 'modern',
      templates,
      
      updatePersonal: (personal) => 
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personal: {
              ...state.resumeData.personal,
              ...personal,
            },
          },
        })),
      
      addExperience: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [
              ...state.resumeData.experience,
              {
                id: uuidv4(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                location: '',
                description: '',
                highlights: [''],
              },
            ],
          },
        })),
      
      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),
      
      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),
      
      addEducation: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [
              ...state.resumeData.education,
              {
                id: uuidv4(),
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                location: '',
                gpa: '',
                highlights: [''],
              },
            ],
          },
        })),
      
      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),
      
      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),
      
      addSkill: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [
              ...state.resumeData.skills,
              {
                id: uuidv4(),
                name: '',
                level: 'Intermediate',
              },
            ],
          },
        })),
      
      updateSkill: (id, skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((s) =>
              s.id === id ? { ...s, ...skill } : s
            ),
          },
        })),
      
      removeSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((s) => s.id !== id),
          },
        })),
      
      setResumeData: (data) => set({ resumeData: data }),
      
      setActiveTemplate: (templateId) => set({ activeTemplate: templateId }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
