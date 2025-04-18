
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useResumeStore } from '@/store/resumeStore';
import { tailorResumeToJob } from '@/services/openaiService';
import { ResumePreview } from '@/components/ResumePreview';

const JobTailor = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { resumeData, setResumeData } = useResumeStore();
  
  const handleTailorResume = async () => {
    if (!jobDescription.trim()) {
      toast.error("Job Description Required", {
        description: "Please paste a job description to tailor your resume."
      });
      return;
    }
    
    setIsLoading(true);
    setSuggestions([]);
    
    try {
      const response = await tailorResumeToJob(resumeData, jobDescription);
      
      if (response.success && response.data) {
        setResumeData(response.data.tailoredResume);
        setSuggestions(response.data.suggestions || []);
        toast.success("Resume Tailored", {
          description: "Your resume has been optimized for this job!"
        });
      } else {
        toast.error("Tailoring Failed", {
          description: response.error || "Failed to tailor your resume. Please try again."
        });
      }
    } catch (error) {
      console.error('Error tailoring resume:', error);
      toast.error("Error", {
        description: "An error occurred while tailoring your resume."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if resume has essential data with comprehensive null/undefined checks
  const isResumeEmpty = !resumeData || 
    !resumeData.personal || 
    !resumeData.personal.name || 
    !resumeData.personal.summary || 
    !resumeData.experience || 
    !Array.isArray(resumeData.experience) ||
    resumeData.experience.length === 0 || 
    !resumeData.skills || 
    !Array.isArray(resumeData.skills) ||
    resumeData.skills.length === 0;

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Resume Tailoring Tool</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="shadow-md border-primary/10">
            <CardContent className="pt-6">
              <div className="form-section">
                <h3 className="text-xl font-semibold mb-2">Paste Job Description</h3>
                <p className="text-muted-foreground mb-4">
                  Paste the job description you're applying for, and our AI will automatically tailor 
                  your resume to highlight relevant skills and experiences.
                </p>
                
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="min-h-[200px] resize-y"
                />
                
                <div className="mt-4">
                  <Button 
                    onClick={handleTailorResume} 
                    disabled={isLoading || !jobDescription.trim() || isResumeEmpty}
                    className="w-full"
                  >
                    {isLoading ? 'Analyzing...' : 'Tailor My Resume'}
                    {!isLoading && <Briefcase className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {isResumeEmpty && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Missing Resume Information</AlertTitle>
              <AlertDescription>
                Please fill out your resume in the Form Builder or upload a resume before using this feature.
              </AlertDescription>
            </Alert>
          )}
          
          {suggestions && suggestions.length > 0 && (
            <Card className="shadow-md border-primary/10">
              <CardContent className="pt-6">
                <div className="form-section">
                  <h3 className="text-xl font-semibold mb-4">AI Suggestions</h3>
                  <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p>{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="shadow-md border-primary/10">
            <CardContent className="pt-6">
              <div className="form-section">
                <h3 className="text-xl font-semibold mb-4">Why Tailor Your Resume?</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Modern companies use Applicant Tracking Systems (ATS) to screen resumes before a human ever sees them.
                    Tailoring your resume to match the job description increases your chances of getting past these filters.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-secondary p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Our AI will:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Match keywords from the job description</li>
                        <li>Highlight relevant skills and experiences</li>
                        <li>Adjust your summary to target the position</li>
                        <li>Rephrase achievements to align with the role</li>
                      </ul>
                    </div>
                    
                    <div className="bg-secondary p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Benefits:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Increase ATS compatibility by 60%</li>
                        <li>Stand out to hiring managers</li>
                        <li>Demonstrate relevant qualifications</li>
                        <li>Improve interview invitation rates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:sticky lg:top-20 self-start">
          <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
          <div className="border rounded-lg overflow-hidden shadow-md lg:transform lg:scale-90 lg:origin-top-left">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTailor;
