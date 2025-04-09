
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { ResumeData, ResumeTemplate, ResumeTheme } from '@/types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  activeTemplate: string;
  templates: ResumeTemplate[];
  resumeTheme?: {
    gradient?: string;
    primaryColor?: string;
    fontFamily?: string;
  };
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
  addProject: () => void;
  updateProject: (id: string, project: Partial<Omit<ResumeData['projects'][0], 'id'>>) => void;
  removeProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, certification: Partial<Omit<ResumeData['certifications'][0], 'id'>>) => void;
  removeCertification: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, language: Partial<Omit<ResumeData['languages'][0], 'id'>>) => void;
  removeLanguage: (id: string) => void;
  setResumeData: (data: ResumeData) => void;
  setActiveTemplate: (templateId: string) => void;
  setResumeTheme: (theme: Partial<ResumeStore['resumeTheme']>) => void;
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
    profilePicture: '',
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
      resumeTheme: {
        gradient: 'none',
        primaryColor: '#3b82f6',
        fontFamily: 'Inter, sans-serif',
      },
      
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

      addProject: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [
              ...(state.resumeData.projects || []),
              {
                id: uuidv4(),
                name: '',
                description: '',
                highlights: [''],
              },
            ],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects?.map((p) =>
              p.id === id ? { ...p, ...project } : p
            ) || [],
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects?.filter((p) => p.id !== id) || [],
          },
        })),

      addCertification: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [
              ...(state.resumeData.certifications || []),
              {
                id: uuidv4(),
                name: '',
                issuer: '',
                date: '',
              },
            ],
          },
        })),

      updateCertification: (id, certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications?.map((c) =>
              c.id === id ? { ...c, ...certification } : c
            ) || [],
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications?.filter((c) => c.id !== id) || [],
          },
        })),

      addLanguage: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: [
              ...(state.resumeData.languages || []),
              {
                id: uuidv4(),
                name: '',
                proficiency: 'Professional Working',
              },
            ],
          },
        })),

      updateLanguage: (id, language) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: state.resumeData.languages?.map((l) =>
              l.id === id ? { ...l, ...language } : l
            ) || [],
          },
        })),

      removeLanguage: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: state.resumeData.languages?.filter((l) => l.id !== id) || [],
          },
        })),
      
      setResumeData: (data) => set({ resumeData: data }),
      
      setActiveTemplate: (templateId) => set({ activeTemplate: templateId }),

      setResumeTheme: (theme) => set((state) => ({
        resumeTheme: { ...state.resumeTheme, ...theme }
      })),
    }),
    {
      name: 'resume-storage',
    }
  )
);
