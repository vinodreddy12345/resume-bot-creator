import React, { useState, useRef, useEffect } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { 
  Plus, Trash2, Save, Download, Upload, Image, 
  Palette, FileText, Award, Globe, Briefcase
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ResumePreview } from '@/components/ResumePreview';
import { TemplateSelector } from '@/components/TemplateSelector';
import { TemplateBar } from '@/components/TemplateBar';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

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
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem,
    setResumeTheme,
    resumeTheme,
    saveResume,
    loadResumes,
    isSaving,
    lastSaved
  } = useResumeStore();
  
  const [activeTab, setActiveTab] = useState('personal');
  const [previewScale, setPreviewScale] = useState(75);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  // Load resume data when component mounts and user is authenticated
  useEffect(() => {
    if (user) {
      loadResumes();
    }
  }, [user, loadResumes]);
  
  const handleSave = async () => {
    await saveResume();
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          updatePersonal({ profilePicture: event.target.result.toString() });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = async () => {
    if (resumePreviewRef.current) {
      try {
        toast({
          title: "Preparing Download",
          description: "Generating your PDF. Please wait...",
        });

        // Create a temporary container with proper styling for PDF generation
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        document.body.appendChild(tempContainer);
        
        // Clone the resume content
        const resumeClone = resumePreviewRef.current.cloneNode(true) as HTMLDivElement;
        
        // Apply specific PDF styling to match preview design
        resumeClone.style.transform = 'none';  // Remove any scaling
        resumeClone.style.width = '8.5in';
        resumeClone.style.height = 'auto';
        resumeClone.style.padding = '0.25in';  // Reduced padding
        resumeClone.style.boxSizing = 'border-box';
        resumeClone.style.position = 'relative';
        resumeClone.style.background = 'white';
        resumeClone.style.maxWidth = '100%';
        resumeClone.style.margin = '0';
        
        // Fix font sizes for PDF output
        const styleElement = document.createElement('style');
        styleElement.textContent = `
          .resume-preview * {
            letter-spacing: normal !important;
            word-spacing: normal !important;
            font-kerning: normal !important;
            line-height: 1.3 !important;
          }
          .resume-preview h1 { font-size: 24px !important; }
          .resume-preview h2 { font-size: 18px !important; }
          .resume-preview p, .resume-preview div { font-size: 12px !important; }
          .resume-section-title { font-size: 16px !important; margin-top: 14px !important; }
          .resume-preview .mb-4 { margin-bottom: 10px !important; }
          .resume-preview .mt-1 { margin-top: 4px !important; }
        `;
        resumeClone.appendChild(styleElement);
        
        tempContainer.appendChild(resumeClone);
        
        // Create PDF with proper dimensions
        const pdf = new jsPDF({
          unit: 'in',
          format: 'letter',  // 8.5x11 inches
          orientation: 'portrait',
        });
        
        // Calculate dimensions - reduced margins to match preview
        const pdfWidth = 8.5;  // letter width in inches
        const pdfHeight = 11;  // letter height in inches
        const margin = 0.25;   // reduced margin in inches
        
        // Add the clone to the container to get accurate measurements
        tempContainer.appendChild(resumeClone);
        
        // Get the actual height after all styling is applied
        const actualContentHeight = (() => {
          // Precise measurement container
          const measureDiv = document.createElement('div');
          measureDiv.style.cssText = `
            position: absolute;
            visibility: hidden;
            width: 8.5in;
            padding: 0.25in;
            box-sizing: border-box;
            font-family: inherit;
            white-space: pre-wrap;
            max-width: 100%;
            margin: 0;
          `;
          measureDiv.innerHTML = resumeClone.innerHTML;
          document.body.appendChild(measureDiv);

          // Find last meaningful element - with TypeScript type safety
          let maxY = 0;
          const elements = measureDiv.querySelectorAll('*');
          elements.forEach(el => {
            if(el.textContent?.trim()) {
              const rect = el.getBoundingClientRect();
              if (rect.bottom > maxY) {
                maxY = rect.bottom;
              }
            }
          });
          document.body.removeChild(measureDiv);
          return maxY + 50; // 50px buffer
        })();
        
        // Force a single page PDF to eliminate empty pages
        const pageContentHeight = pdfHeight - (margin * 2);
        const pxPerInch = 96; // 96 pixels per inch (standard browser DPI)
        
        try {
          // Render the entire content in one go - single page only
          const canvas = await html2canvas(resumeClone, {
            scale: 2,  // Higher resolution
            logging: false,
            useCORS: true,
            windowHeight: actualContentHeight,
            y: 0,  // Start from the top
            height: actualContentHeight // Capture all content
          });
          
          // Add the image to the PDF - full width with minimal margins
          const imgData = canvas.toDataURL('image/png');
          
          // Calculate the aspect ratio to maintain proportions
          const aspectRatio = canvas.width / canvas.height;
          const imgWidth = pdfWidth - (margin * 2);
          const imgHeight = imgWidth / aspectRatio;
          
          // Add the image to the PDF - single page only
          pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight, '', 'FAST');
          
          // Clean up the temporary elements
          document.body.removeChild(tempContainer);
        } catch (error) {
          console.error('Error generating canvas:', error);
          // Clean up even if there's an error
          if (document.body.contains(tempContainer)) {
            document.body.removeChild(tempContainer);
          }
          throw error; // Re-throw to be caught by the outer try-catch
        }
        
        // Save the PDF
        pdf.save(`${resumeData.personal.name || 'Resume'}.pdf`);
        
        toast({
          title: "Download Complete",
          description: "Your resume has been downloaded as a PDF.",
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
        toast({
          title: "Download Failed",
          description: "There was an error generating your PDF. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const gradientOptions = [
    { id: 'none', name: 'None', value: 'none' },
    { id: 'blue-purple', name: 'Blue to Purple', value: 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)' },
    { id: 'orange-pink', name: 'Orange to Pink', value: 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)' },
    { id: 'green-blue', name: 'Green to Blue', value: 'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)' },
    { id: 'purple-pink', name: 'Purple to Pink', value: 'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)' },
  ];

  const formatLastSaved = () => {
    if (!lastSaved) return null;
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(lastSaved);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <div className="flex space-x-2 items-center">
            {lastSaved && (
              <span className="text-xs text-muted-foreground mr-2">
                Last saved: {formatLastSaved()}
              </span>
            )}
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="form-section">
                  <h3 className="form-section-title">Personal Information</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Profile Picture (Optional)</label>
                    <div className="flex items-center gap-4">
                      {resumeData.personal.profilePicture ? (
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border">
                          <img 
                            src={resumeData.personal.profilePicture} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="absolute top-0 right-0 w-6 h-6 p-0" 
                            onClick={() => updatePersonal({ profilePicture: undefined })}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleProfilePictureUpload}
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                  </div>
                  
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
                            value={exp.company || ''} 
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })} 
                            placeholder="Company name" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Position</label>
                          <Input 
                            value={exp.position || ''} 
                            onChange={(e) => updateExperience(exp.id, { position: e.target.value })} 
                            placeholder="Your job title" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <span>{exp.startDate || "Select start date"}</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={exp.startDate && !isNaN(new Date(exp.startDate).getTime()) ? new Date(exp.startDate) : undefined}
                                  onSelect={(date) => {
                                    if (date) {
                                      updateExperience(exp.id, { startDate: format(date, 'MMM yyyy') });
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <div className="flex items-start gap-2">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <span>{exp.endDate || "Select end date"}</span>
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={exp.endDate && exp.endDate !== "Present" && !isNaN(new Date(exp.endDate).getTime()) ? new Date(exp.endDate) : undefined}
                                    onSelect={(date) => {
                                      if (date) {
                                        updateExperience(exp.id, { endDate: format(date, 'MMM yyyy') });
                                      }
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <Button 
                                variant="secondary" 
                                className="whitespace-nowrap"
                                onClick={() => updateExperience(exp.id, { endDate: "Present" })}
                              >
                                Present
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Location</label>
                          <Input 
                            value={exp.location || ''} 
                            onChange={(e) => updateExperience(exp.id, { location: e.target.value })} 
                            placeholder="City, Country" 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <Textarea
                              placeholder="Describe your key responsibilities and achievements...
• Use bullet points (new lines) for better formatting
• Each responsibility or achievement on a new line
• This will display properly in your resume"
                              className="h-32"
                              value={exp.description || ''}
                              onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Press Enter for a new line. Each new line will be displayed as a separate bullet point.
                            </p>
                          </div>
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
                            value={edu.institution || ''} 
                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} 
                            placeholder="University or school name" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Location</label>
                          <Input 
                            value={edu.location || ''} 
                            onChange={(e) => updateEducation(edu.id, { location: e.target.value })} 
                            placeholder="City, Country" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Degree</label>
                          <Input 
                            value={edu.degree || ''} 
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} 
                            placeholder="Bachelor's, Master's, etc." 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Field of Study</label>
                          <Input 
                            value={edu.field || ''} 
                            onChange={(e) => updateEducation(edu.id, { field: e.target.value })} 
                            placeholder="Computer Science, Business, etc." 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">GPA (Optional)</label>
                          <Input 
                            value={edu.gpa || ''} 
                            onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })} 
                            placeholder="3.8/4.0" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <span>{edu.startDate || "Select start date"}</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={edu.startDate && !isNaN(new Date(edu.startDate).getTime()) ? new Date(edu.startDate) : undefined}
                                  onSelect={(date) => {
                                    if (date) {
                                      updateEducation(edu.id, { startDate: format(date, 'MMM yyyy') });
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <div className="flex items-start gap-2">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <span>{edu.endDate || "Select end date"}</span>
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={edu.endDate && edu.endDate !== "Present" && !isNaN(new Date(edu.endDate).getTime()) ? new Date(edu.endDate) : undefined}
                                    onSelect={(date) => {
                                      if (date) {
                                        updateEducation(edu.id, { endDate: format(date, 'MMM yyyy') });
                                      }
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <Button 
                                variant="secondary" 
                                className="whitespace-nowrap"
                                onClick={() => updateEducation(edu.id, { endDate: "Present" })}
                              >
                                Present
                              </Button>
                            </div>
                          </div>
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
          
          <TabsContent value="additional">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    className="h-auto py-6 flex flex-col gap-2"
                    onClick={() => setActiveTab('projects')}
                  >
                    <Briefcase className="h-10 w-10" />
                    <span>Add Projects</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-6 flex flex-col gap-2"
                    onClick={() => setActiveTab('certifications')}
                  >
                    <Award className="h-10 w-10" />
                    <span>Add Certifications</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-6 flex flex-col gap-2"
                    onClick={() => setActiveTab('languages')}
                  >
                    <Globe className="h-10 w-10" />
                    <span>Add Languages</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-6 flex flex-col gap-2"
                    onClick={() => setActiveTab('customSections')}
                  >
                    <Plus className="h-10 w-10" />
                    <span>Custom Section</span>
                  </Button>
                </div>
                
                                <Tabs defaultValue="projects">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="certifications">Certifications</TabsTrigger>
                    <TabsTrigger value="languages">Languages</TabsTrigger>
                    <TabsTrigger value="customSections">Custom</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="projects" className="space-y-4">
                    <div className="form-section">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="form-section-title">Projects</h3>
                        <Button onClick={addProject} variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" /> Add Project
                        </Button>
                      </div>
                      
                      {resumeData.projects?.map((project, index) => (
                        <div key={project.id} className="mb-6 p-4 border rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Project {index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProject(project.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Project Name</label>
                              <Input 
                                value={project.name} 
                                onChange={(e) => updateProject(project.id, { name: e.target.value })} 
                                placeholder="Project name" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">URL (Optional)</label>
                              <Input 
                                value={project.url} 
                                onChange={(e) => updateProject(project.id, { url: e.target.value })} 
                                placeholder="https://project-url.com" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Description</label>
                              <Textarea 
                                value={project.description} 
                                onChange={(e) => updateProject(project.id, { description: e.target.value })} 
                                placeholder="Describe your project" 
                                rows={3} 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="certifications" className="space-y-4">
                    <div className="form-section">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="form-section-title">Certifications</h3>
                        <Button onClick={addCertification} variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" /> Add Certification
                        </Button>
                      </div>
                      
                      {resumeData.certifications?.map((cert, index) => (
                        <div key={cert.id} className="mb-6 p-4 border rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Certification {index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCertification(cert.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Certification Name</label>
                              <Input 
                                value={cert.name} 
                                onChange={(e) => updateCertification(cert.id, { name: e.target.value })} 
                                placeholder="AWS Solutions Architect" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Issuing Organization</label>
                              <Input 
                                value={cert.issuer} 
                                onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })} 
                                placeholder="Amazon Web Services" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Date</label>
                              <Input 
                                value={cert.date} 
                                onChange={(e) => updateCertification(cert.id, { date: e.target.value })} 
                                placeholder="May 2023" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">URL (Optional)</label>
                              <Input 
                                value={cert.url} 
                                onChange={(e) => updateCertification(cert.id, { url: e.target.value })} 
                                placeholder="https://credential-url.com" 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="languages" className="space-y-4">
                    <div className="form-section">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="form-section-title">Languages</h3>
                        <Button onClick={addLanguage} variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" /> Add Language
                        </Button>
                      </div>
                      
                      {resumeData.languages?.map((lang, index) => (
                        <div key={lang.id} className="mb-6 p-4 border rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Language {index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLanguage(lang.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Language</label>
                              <Input 
                                value={lang.name} 
                                onChange={(e) => updateLanguage(lang.id, { name: e.target.value })} 
                                placeholder="English, Spanish, etc." 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Proficiency</label>
                              <Select 
                                value={lang.proficiency} 
                                onValueChange={(value) => updateLanguage(lang.id, { 
                                  proficiency: value as 'Elementary' | 'Limited Working' | 'Professional Working' | 'Full Professional' | 'Native'
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select proficiency level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Elementary">Elementary</SelectItem>
                                  <SelectItem value="Limited Working">Limited Working</SelectItem>
                                  <SelectItem value="Professional Working">Professional Working</SelectItem>
                                  <SelectItem value="Full Professional">Full Professional</SelectItem>
                                  <SelectItem value="Native">Native</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="customSections" className="space-y-4">
                    <div className="form-section">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="form-section-title">Custom Sections</h3>
                        <Button 
                          onClick={addCustomSection} 
                          variant="outline" 
                          size="sm"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Custom Section
                        </Button>
                      </div>
                      
                      {resumeData.customSections?.map((section, sectionIndex) => (
                        <div key={section.id} className="mb-6 p-4 border rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-full mr-2">
                              <label className="block text-sm font-medium mb-1">Section Title</label>
                              <Input 
                                value={section.title} 
                                onChange={(e) => updateCustomSection(section.id, { title: e.target.value })} 
                                placeholder="Section Title" 
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCustomSection(section.id)}
                              className="text-destructive mt-6"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {section.items.map((item, itemIndex) => (
                            <div key={item.id} className="mb-4 p-3 bg-muted/30 rounded-md">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">Item {itemIndex + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeCustomSectionItem(section.id, item.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-1 gap-3">
                                <div>
                                  <label className="block text-sm font-medium mb-1">Title</label>
                                  <Input 
                                    value={item.title} 
                                    onChange={(e) => updateCustomSectionItem(section.id, item.id, { title: e.target.value })} 
                                    placeholder="Item title" 
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">Description</label>
                                  <Textarea 
                                    value={item.description} 
                                    onChange={(e) => updateCustomSectionItem(section.id, item.id, { description: e.target.value })} 
                                    placeholder="Item description" 
                                    rows={3} 
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addCustomSectionItem(section.id)}
                            className="w-full mt-2"
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Item
                          </Button>
                        </div>
                      ))}
                      
                      {(!resumeData.customSections || resumeData.customSections.length === 0) && (
                        <div className="text-center p-6 border border-dashed rounded-md">
                          <p className="text-muted-foreground mb-4">No custom sections added yet</p>
                          <Button
                            variant="outline"
                            onClick={addCustomSection}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Create Your First Custom Section
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customize">
            <Card>
              <CardContent className="pt-6">
                <div className="form-section">
                  <h3 className="form-section-title">Resume Lab</h3>
                  <p className="text-muted-foreground mb-4">
                    Customize the look and feel of your resume with these options.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Template Selector */}
                    <TemplateSelector />
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Preview Scale</label>
                      <div className="flex items-center gap-4">
                        <Input 
                          type="range" 
                          min={50} 
                          max={100} 
                          value={previewScale} 
                          onChange={(e) => setPreviewScale(parseInt(e.target.value))} 
                          className="w-full"
                        />
                        <span>{previewScale}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Background Gradient</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {gradientOptions.map((gradient) => (
                          <div 
                            key={gradient.id}
                            onClick={() => setResumeTheme({ gradient: gradient.value })}
                            className={`h-20 rounded-md cursor-pointer transition hover:scale-105 ${
                              resumeTheme?.gradient === gradient.value ? 'ring-2 ring-primary' : 'ring-1 ring-border'
                            }`}
                            style={
                              gradient.id === 'none' 
                                ? { background: '#fff' } 
                                : { background: gradient.value }
                            }
                          >
                            <div className="h-full w-full flex items-end p-2">
                              <span className="text-xs font-medium truncate bg-background bg-opacity-70 px-2 py-1 rounded">
                                {gradient.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-medium">OpenAI Integration</span>
                      </div>
                      <p className="text-sm mt-1 mb-3">
                        To enable AI-powered features like resume optimization and cloning,
                        you'll need to connect your OpenAI API key.
                      </p>
                      <div>
                        <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
                        <div className="flex">
                          <Input 
                            type="password" 
                            placeholder="sk-..." 
                            className="flex-1"
                          />
                          <Button className="ml-2">
                            Connect
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Your API key is stored only in your browser and never sent to our servers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="hidden md:block sticky top-20 self-start">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Preview</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPreviewScale(Math.max(50, previewScale - 10))}
              >
                -
              </Button>
              <div className="text-sm text-muted-foreground min-w-16 text-center">
                {previewScale}%
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPreviewScale(Math.min(100, previewScale + 10))}
              >
                +
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewScale(75)}
            >
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleDownloadPDF}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download className="h-4 w-4 mr-1" /> Download PDF
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
        {/* Template Bar */}
        <TemplateBar />
        
        <div 
          className="border rounded-lg shadow-md relative"
          style={{ 
            width: `${8.5 * previewScale/100}in`,
            height: `${11 * previewScale/100}in`,
            overflow: 'hidden',
          }}
        >
          <div 
            ref={resumePreviewRef} 
            className="absolute top-0 left-0 w-full"
            style={{
              transform: `scale(${previewScale/100})`,
              transformOrigin: 'top left',
              width: '8.5in',
              minHeight: '11in',
              height: 'auto',
              background: 'white',
            }}
          >
            <ResumePreview />
          </div>
          
          {/* Page indicator */}
          <div className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-1 rounded-md">
            Page 1 {resumePreviewRef.current && 
              resumePreviewRef.current.scrollHeight > (11 * 96) ? 
              `of ${Math.ceil(resumePreviewRef.current.scrollHeight / (11 * 96))}` : ''}
          </div>
        </div>
        
        {/* Show second page preview if content overflows */}
        {resumePreviewRef.current && resumePreviewRef.current.scrollHeight > (11 * 96) && (
          <div 
            className="border rounded-lg shadow-md relative mt-4"
            style={{ 
              width: `${8.5 * previewScale/100}in`,
              height: `${11 * previewScale/100}in`,
              overflow: 'hidden',
            }}
          >
            <div 
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `scale(${previewScale/100})`,
                transformOrigin: 'top left',
                width: '8.5in',
                minHeight: '11in',
                height: 'auto',
                background: 'white',
                marginTop: `-11in`,
              }}
            >
              <ResumePreview />
            </div>
            
            {/* Page indicator */}
            <div className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-1 rounded-md">
              Page 2 of {Math.ceil(resumePreviewRef.current.scrollHeight / (11 * 96))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default FormBuilder;
