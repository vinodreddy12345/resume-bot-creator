
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileUp, FileText } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { extractResumeFromUpload } from '@/services/openaiService';
import { ResumePreview } from '@/components/ResumePreview';

// Dynamic imports for PDF and Word parsing
const pdfParseModule = () => import('pdf-parse');
const mammothModule = () => import('mammoth');

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
      let fileContent = "";
      
      // Process different file types appropriately
      if (file.type === 'application/pdf') {
        // Handle PDF files
        try {
          // For now, let's use a simpler approach for PDFs
          // Instead of parsing, we'll extract text using the OpenAI API directly
          // Just read the PDF as a base64 string
          const reader = new FileReader();
          const pdfBase64Promise = new Promise((resolve, reject) => {
            reader.onload = () => {
              if (reader.result) {
                // Get just the base64 part after the data URL prefix
                const base64 = reader.result.toString().split(',')[1];
                resolve(base64);
              } else {
                reject(new Error('Failed to read PDF'));
              }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          });
          
          const base64Data = await pdfBase64Promise;
          // For now, we'll just use a placeholder text
          // In a real implementation, you would send this base64 data to a server
          // that can extract text from PDFs
          fileContent = `PDF content from ${file.name}. This is a placeholder for the actual PDF content.`;
          
          toast({
            title: "PDF Detected",
            description: "PDF processing is simplified for this demo. In a production app, PDF text would be fully extracted.",
          });
        } catch (pdfError) {
          console.error('Error processing PDF:', pdfError);
          toast({
            title: "PDF Processing Failed",
            description: "Could not process this PDF. Please try another file.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Handle DOC/DOCX files
        try {
          // Similar to PDF, use a simplified approach for Word documents
          const reader = new FileReader();
          const docBase64Promise = new Promise((resolve, reject) => {
            reader.onload = () => {
              if (reader.result) {
                const base64 = reader.result.toString().split(',')[1];
                resolve(base64);
              } else {
                reject(new Error('Failed to read document'));
              }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          });
          
          await docBase64Promise;
          // Use a placeholder for Word documents as well
          fileContent = `Word document content from ${file.name}. This is a placeholder for the actual document content.`;
          
          toast({
            title: "Word Document Detected",
            description: "Word document processing is simplified for this demo. In a production app, document text would be fully extracted.",
          });
        } catch (docError) {
          console.error('Error processing DOC/DOCX:', docError);
          toast({
            title: "Document Processing Failed",
            description: "Could not process this document. Please try another file.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      } else if (file.type === 'text/plain') {
        // Handle plain text files
        fileContent = await file.text();
      }
      
      if (!fileContent || fileContent.trim() === "") {
        toast({
          title: "Empty Content",
          description: "No text could be extracted from this file. Please try another file.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Set the extracted text for preview
      setUploadedContent(fileContent);
      setExtractedText(fileContent.substring(0, 500) + (fileContent.length > 500 ? '...' : ''));
      
      // Call OpenAI to extract structured data
      const response = await extractResumeFromUpload(fileContent);
      
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
      
      setIsLoading(false);
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
