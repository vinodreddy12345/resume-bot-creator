import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent } from '@/components/ui/card';
import { templateThumbnails } from '@/templates/resume';
import { Check } from 'lucide-react';

export const TemplateSelector = () => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choose a Template</h3>
      <div className="grid grid-cols-2 gap-4">
        {templateThumbnails.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${activeTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setActiveTemplate(template.id)}
          >
            <CardContent className="p-3">
              <div className="relative aspect-[8.5/11] bg-gray-100 mb-2 overflow-hidden">
                {/* Placeholder for template thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  {template.name}
                </div>
                
                {/* Show checkmark if selected */}
                {activeTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="text-sm font-medium">{template.name}</div>
              <div className="text-xs text-muted-foreground">{template.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
