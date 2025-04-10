
import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { templateThumbnails } from '@/templates/resume';
import { Check, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TemplateBar = () => {
  const { activeTemplate, setActiveTemplate, resumeTheme, setResumeTheme } = useResumeStore();

  // Pre-defined color themes
  const themes = [
    { id: 'blue', color: '#3b82f6', name: 'Blue' },
    { id: 'green', color: '#10b981', name: 'Green' },
    { id: 'purple', color: '#8b5cf6', name: 'Purple' },
    { id: 'red', color: '#ef4444', name: 'Red' },
    { id: 'gray', color: '#6b7280', name: 'Gray' },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <Layout className="h-4 w-4" /> 
        Resume Template
      </h3>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {templateThumbnails.map((template) => (
          <Button
            key={template.id}
            variant={activeTemplate === template.id ? "default" : "outline"}
            className="flex items-center gap-1 whitespace-nowrap"
            onClick={() => setActiveTemplate(template.id)}
          >
            {activeTemplate === template.id && <Check className="h-3 w-3" />}
            {template.name}
          </Button>
        ))}
      </div>
      
      <h3 className="text-sm font-medium mb-2 mt-4 flex items-center gap-2">
        <span className="flex h-4 w-4 items-center justify-center rounded-full" 
              style={{backgroundColor: resumeTheme?.primaryColor || themes[0].color}}>
        </span>
        Color Theme
      </h3>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {themes.map((theme) => (
          <Button
            key={theme.id}
            variant="outline"
            className="w-8 h-8 p-0 rounded-full"
            style={{
              backgroundColor: theme.color,
              borderColor: resumeTheme?.primaryColor === theme.color ? 'white' : theme.color,
              outline: resumeTheme?.primaryColor === theme.color ? `2px solid ${theme.color}` : 'none',
              outlineOffset: '2px'
            }}
            onClick={() => setResumeTheme({
              primaryColor: theme.color,
              secondaryColor: theme.color + '33', // 20% opacity version for secondary
              fontFamily: resumeTheme?.fontFamily || 'Roboto, sans-serif'
            })}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  );
};
