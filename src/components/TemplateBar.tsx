import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { templateThumbnails } from '@/templates/resume';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TemplateBar = () => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Resume Template</h3>
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
    </div>
  );
};
