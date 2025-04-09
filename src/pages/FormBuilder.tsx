
import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ResumePreview } from '@/components/ResumePreview';

const FormBuilder = () => {
  const {
    resumeData,
    updatePersonal,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
  } = useResumeStore();
  
  const [activeTab, setActiveTab] = useState('personal');
  const { toast } = useToast();
  
  const handleSave = () => {
    // In a real app, you might want to save to backend here
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="form-section">
                  <h3 className="form-section-title">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input 
                        value={resumeData.personal.name} 
                        onChange={(e) => updatePersonal({ name: e.target.value })} 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Job Title</label>
                      <Input 
                        value={resumeData.personal.title} 
                        onChange={(e) => updatePersonal({ title: e.target.value })} 
                        placeholder="Software Engineer" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input 
                        value={resumeData.personal.email} 
                        onChange={(e) => updatePersonal({ email: e.target.value })} 
                        placeholder="john@example.com" 
                        type="email" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input 
                        value={resumeData.personal.phone} 
                        onChange={(e) => updatePersonal({ phone: e.target.value })} 
                        placeholder="(123) 456-7890" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <Input 
                        value={resumeData.personal.location} 
                        onChange={(e) => updatePersonal({ location: e.target.value })} 
                        placeholder="San Francisco, CA" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Website (Optional)</label>
                      <Input 
                        value={resumeData.personal.website} 
                        onChange={(e) => updatePersonal({ website: e.target.value })} 
                        placeholder="https://yourwebsite.com" 
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Professional Summary</label>
                    <Textarea 
                      value={resumeData.personal.summary} 
                      onChange={(e) => updatePersonal({ summary: e.target.value })} 
                      placeholder="A brief summary of your professional background and goals" 
                      rows={4} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="experience">
            <Card>
              <CardContent className="pt-6">
                <div className="form-section">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="form-section-title">Work Experience</h3>
                    <Button onClick={addExperience} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Experience
                    </Button>
                  </div>
                  
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="mb-6 p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Company</label>
                          <Input 
                            value={exp.company} 
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })} 
                            placeholder="Company name" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Position</label>
                          <Input 
                            value={exp.position} 
                            onChange={(e) => updateExperience(exp.id, { position: e.target.value })} 
                            placeholder="Your job title" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Start Date</label>
                          <Input 
                            value={exp.startDate} 
                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} 
                            placeholder="MM/YYYY" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">End Date</label>
                          <Input 
                            value={exp.endDate} 
                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} 
                            placeholder="MM/YYYY or Present" 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Location</label>
                          <Input 
                            value={exp.location} 
                            onChange={(e) => updateExperience(exp.id, { location: e.target.value })} 
                            placeholder="City, State" 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <Textarea 
                            value={exp.description} 
                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })} 
                            placeholder="Briefly describe your role" 
                            rows={3} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="education">
            <Card>
              <CardContent className="pt-6">
                <div className="form-section">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="form-section-title">Education</h3>
                    <Button onClick={addEducation} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Education
                    </Button>
                  </div>
                  
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="mb-6 p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Education {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Institution</label>
                          <Input 
                            value={edu.institution} 
                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} 
                            placeholder="University or School" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Degree</label>
                          <Input 
                            value={edu.degree} 
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} 
                            placeholder="Bachelor's, Master's, etc." 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Field of Study</label>
                          <Input 
                            value={edu.field} 
                            onChange={(e) => updateEducation(edu.id, { field: e.target.value })} 
                            placeholder="Computer Science, Business, etc." 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">GPA (Optional)</label>
                          <Input 
                            value={edu.gpa} 
                            onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })} 
                            placeholder="3.8/4.0" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Start Date</label>
                          <Input 
                            value={edu.startDate} 
                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} 
                            placeholder="MM/YYYY" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">End Date</label>
                          <Input 
                            value={edu.endDate} 
                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} 
                            placeholder="MM/YYYY or Present" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardContent className="pt-6">
                <div className="form-section">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="form-section-title">Skills</h3>
                    <Button onClick={addSkill} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Skill
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resumeData.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center space-x-2">
                        <Input 
                          value={skill.name} 
                          onChange={(e) => updateSkill(skill.id, { name: e.target.value })} 
                          placeholder="Skill name (e.g. JavaScript, Project Management)" 
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="hidden md:block sticky top-20 self-start">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <div className="border rounded-lg overflow-hidden shadow-md scale-75 origin-top-left">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
