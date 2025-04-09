
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
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
  const { toast } = useToast();
  
  const handleTailorResume = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please paste a job description to tailor your resume.",
        variant: "destructive",
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
        toast({
          title: "Resume Tailored",
          description: "Your resume has been optimized for this job!",
        });
      } else {
        toast({
          title: "Tailoring Failed",
          description: response.error || "Failed to tailor your resume. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error tailoring resume:', error);
      toast({
        title: "Error",
        description: "An error occurred while tailoring your resume.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const isResumeEmpty = 
    !resumeData.personal.name || 
    !resumeData.personal.summary || 
    !resumeData.experience[0]?.company || 
    !resumeData.skills[0]?.name;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">Job Description Tailor</h1>
        
        {isResumeEmpty && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Missing Resume Information</AlertTitle>
            <AlertDescription>
              Please fill out your resume in the Form Builder or upload a resume before using this feature.
            </AlertDescription>
          </Alert>
        )}
        
        <Card>
          <CardContent className="pt-6">
            <div className="form-section">
              <h3 className="form-section-title">Paste Job Description</h3>
              <p className="text-muted-foreground mb-4">
                Paste the job description you're applying for, and our AI will automatically tailor 
                your resume to highlight relevant skills and experiences.
              </p>
              
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="min-h-[200px]"
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
        
        {suggestions.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="form-section">
                <h3 className="form-section-title">AI Suggestions</h3>
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
        
        <Card>
          <CardContent className="pt-6">
            <div className="form-section">
              <h3 className="form-section-title">Why Tailor Your Resume?</h3>
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
      
      <div className="hidden md:block sticky top-20 self-start">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <div className="border rounded-lg overflow-hidden shadow-md scale-75 origin-top-left">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default JobTailor;
