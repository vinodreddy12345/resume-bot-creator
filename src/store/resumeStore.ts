import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, ResumeTheme } from '@/types/resume';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Json } from '@/integrations/supabase/types';

interface ResumeTemplate {
  id: string;
  name: string;
  thumbnail: string;
}

interface ResumeStore {
  resumeData: ResumeData;
  activeTemplate: string;
  templates: ResumeTemplate[];
  resumeTheme?: {
    gradient?: string;
    primaryColor?: string;
    fontFamily?: string;
  };
  isSaving: boolean;
  lastSaved: Date | null;
  
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
  addCustomSection: () => void;
  updateCustomSection: (id: string, section: Partial<Omit<ResumeData['customSections'][0], 'id'>>) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<Omit<ResumeData['customSections'][0]['items'][0], 'id'>>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  setResumeData: (data: ResumeData) => void;
  setActiveTemplate: (templateId: string) => void;
  setResumeTheme: (theme: Partial<ResumeStore['resumeTheme']>) => void;
  saveResume: () => Promise<void>;
  loadResumes: () => Promise<void>;
}

// Define a type for our resume database row
interface ResumeRow {
  id: string;
  user_id: string;
  resume_data: ResumeData;
  active_template: string;
  resume_theme: {
    gradient?: string;
    primaryColor?: string;
    fontFamily?: string;
  };
  created_at: string;
  updated_at: string;
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
    (set, get) => ({
      resumeData: defaultResumeData,
      activeTemplate: 'modern',
      templates,
      resumeTheme: {
        gradient: 'none',
        primaryColor: '#22c55e', // Changed to green from blue
        fontFamily: 'Inter, sans-serif',
      },
      isSaving: false,
      lastSaved: null,
      
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
        
      addCustomSection: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: [
              ...(state.resumeData.customSections || []),
              {
                id: uuidv4(),
                title: 'New Section',
                items: [{
                  id: uuidv4(),
                  title: '',
                  description: ''
                }]
              },
            ],
          },
        })),
      
      updateCustomSection: (id, section) =>
        set((state) => {
          const customSections = state.resumeData.customSections || [];
          return {
            resumeData: {
              ...state.resumeData,
              customSections: customSections.map((s) =>
                s.id === id ? { ...s, ...section } : s
              ),
            },
          };
        }),
      
      removeCustomSection: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            customSections: state.resumeData.customSections?.filter((s) => s.id !== id) || [],
          },
        })),
        
      addCustomSectionItem: (sectionId) =>
        set((state) => {
          const customSections = [...(state.resumeData.customSections || [])];
          const sectionIndex = customSections.findIndex(s => s.id === sectionId);
          
          if (sectionIndex === -1) return state;
          
          customSections[sectionIndex] = {
            ...customSections[sectionIndex],
            items: [
              ...customSections[sectionIndex].items,
              {
                id: uuidv4(),
                title: '',
                description: ''
              }
            ]
          };
          
          return {
            resumeData: {
              ...state.resumeData,
              customSections
            }
          };
        }),
        
      updateCustomSectionItem: (sectionId, itemId, item) =>
        set((state) => {
          const customSections = [...(state.resumeData.customSections || [])];
          const sectionIndex = customSections.findIndex(s => s.id === sectionId);
          
          if (sectionIndex === -1) return state;
          
          const items = [...customSections[sectionIndex].items];
          const itemIndex = items.findIndex(i => i.id === itemId);
          
          if (itemIndex === -1) return state;
          
          items[itemIndex] = {
            ...items[itemIndex],
            ...item
          };
          
          customSections[sectionIndex] = {
            ...customSections[sectionIndex],
            items
          };
          
          return {
            resumeData: {
              ...state.resumeData,
              customSections
            }
          };
        }),
        
      removeCustomSectionItem: (sectionId, itemId) =>
        set((state) => {
          const customSections = [...(state.resumeData.customSections || [])];
          const sectionIndex = customSections.findIndex(s => s.id === sectionId);
          
          if (sectionIndex === -1) return state;
          
          customSections[sectionIndex] = {
            ...customSections[sectionIndex],
            items: customSections[sectionIndex].items.filter(i => i.id !== itemId)
          };
          
          return {
            resumeData: {
              ...state.resumeData,
              customSections
            }
          };
        }),
      
      setResumeData: (data) => set({ resumeData: data }),
      
      setActiveTemplate: (templateId) => set({ activeTemplate: templateId }),

      setResumeTheme: (theme) => set((state) => ({
        resumeTheme: { ...state.resumeTheme, ...theme }
      })),
      
      saveResume: async () => {
        const state = get();
        const user = (await supabase.auth.getUser()).data.user;
        
        if (!user) {
          toast({
            title: "Error",
            description: "You must be logged in to save your resume",
            variant: "destructive",
          });
          return;
        }
        
        set({ isSaving: true });
        
        try {
          // Cast the resume data to Json type for Supabase
          const { data, error } = await supabase
            .from('resumes')
            .upsert({
              user_id: user.id,
              resume_data: state.resumeData as unknown as Json,
              active_template: state.activeTemplate,
              resume_theme: state.resumeTheme as unknown as Json,
              updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' })
            .select();
          
          if (error) throw error;
          
          set({ lastSaved: new Date() });
          
          toast({
            title: "Resume Saved",
            description: "Your resume has been saved successfully",
          });
        } catch (error: any) {
          console.error('Error saving resume:', error);
          toast({
            title: "Error",
            description: error.message || "Failed to save resume",
            variant: "destructive",
          });
        } finally {
          set({ isSaving: false });
        }
      },
      
      loadResumes: async () => {
        const user = (await supabase.auth.getUser()).data.user;
        
        if (!user) {
          return;
        }
        
        try {
          const { data, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (error) throw error;
          
          if (data) {
            // Safely cast the data to our ResumeRow type
            const resumeData = data as unknown as ResumeRow;
            
            set({
              resumeData: resumeData.resume_data,
              activeTemplate: resumeData.active_template,
              resumeTheme: resumeData.resume_theme,
              lastSaved: new Date(resumeData.updated_at)
            });
          }
        } catch (error) {
          console.error('Error loading resumes:', error);
        }
      }
    }),
    {
      name: 'resume-storage',
    }
  )
);
