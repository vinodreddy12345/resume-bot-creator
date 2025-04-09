
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileUp, FileText } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { extractResumeFromUpload } from '@/services/openaiService';
import { ResumePreview } from '@/components/ResumePreview';

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedContent, setUploadedContent] = useState<string>('');
  const [extractedText, setExtractedText] = useState<string>('');
  const { setResumeData } = useResumeStore();
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Read file content
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        if (e.target?.result) {
          // For demo purposes, we're just getting the raw text
          // In a real app, you'd want to parse the PDF/DOC correctly
          const content = e.target.result.toString();
          setUploadedContent(content);
          setExtractedText(content.substring(0, 500) + '...');
          
          // Call OpenAI to extract structured data
          const response = await extractResumeFromUpload(content);
          
          if (response.success && response.data?.extractedData) {
            setResumeData(response.data.extractedData);
            toast({
              title: "Resume Extracted",
              description: "Your resume has been successfully processed!",
            });
          } else {
            toast({
              title: "Extraction Failed",
              description: response.error || "Failed to extract data from your resume.",
              variant: "destructive",
            });
          }
        }
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        toast({
          title: "Upload Failed",
          description: "Failed to read the file. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      };
      
      reader.readAsText(file);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Error",
        description: "An error occurred while processing your file.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
        
        <Card>
          <CardContent className="pt-6">
            <div className="form-section">
              <h3 className="form-section-title">Upload Resume</h3>
              <p className="text-muted-foreground mb-4">
                Upload your existing resume and we'll extract the information to help you get started quickly. 
                Supported formats: PDF, DOC, DOCX, TXT.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <label 
                  htmlFor="resume-upload" 
                  className="flex flex-col items-center cursor-pointer"
                >
                  <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-lg font-medium">
                    {file ? file.name : 'Click to select a file'}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {file ? `${(file.size / 1024).toFixed(2)} KB` : 'PDF, DOC, DOCX or TXT up to 5MB'}
                  </span>
                </label>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={handleUpload} 
                  disabled={!file || isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Processing...' : 'Upload & Process Resume'}
                  {!isLoading && <Upload className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            {extractedText && (
              <div className="form-section mt-6">
                <h3 className="form-section-title">Extracted Content Preview</h3>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-auto max-h-60">
                  {extractedText}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="form-section">
              <h3 className="form-section-title">Resume Cloning</h3>
              <p className="text-muted-foreground mb-4">
                Our AI can analyze the structure of any resume and recreate it with your information.
                Upload a resume with a format you like, and we'll recreate that exact structure with your details.
              </p>
              
              <div className="flex items-center justify-center p-4 bg-secondary rounded-lg">
                <FileText className="h-8 w-8 text-muted-foreground mr-3" />
                <div className="text-sm">
                  <p className="font-medium">How Resume Cloning Works:</p>
                  <ol className="list-decimal list-inside mt-2 text-muted-foreground">
                    <li>Upload a resume with a format/structure you like</li>
                    <li>Our AI analyzes the layout, sections, and formatting</li>
                    <li>Your content is inserted into the same structure</li>
                    <li>Review and download your new resume!</li>
                  </ol>
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

export default UploadResume;
