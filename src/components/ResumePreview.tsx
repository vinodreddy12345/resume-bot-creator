
import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import './resume-preview.css';
import { ResumeTemplateRenderer } from '@/templates/resume';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileType } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

// Define page dimensions
const pageDimensions = {
  a4: { width: '210mm', height: '297mm', name: 'A4' },
  letter: { width: '215.9mm', height: '279.4mm', name: 'US Letter' },
  legal: { width: '215.9mm', height: '355.6mm', name: 'Legal' }
};

export const ResumePreview = () => {
  const { resumeData, activeTemplate, resumeTheme } = useResumeStore();
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'legal'>('a4');

  const exportToPDF = async () => {
    try {
      const element = document.querySelector('.resume-container');
      if (!element) {
        toast.error('Could not find resume to export');
        return;
      }

      toast.loading('Preparing your PDF...');
      
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF with the correct dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: pageSize
      });
      
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData?.personal?.name || 'resume'}_${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.dismiss();
      toast.success('PDF exported successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to export PDF. Please try again.');
      console.error('PDF export error:', error);
    }
  };

  const exportToDOCX = () => {
    // This would require a server-side component or a specialized library
    toast.info('DOCX export feature coming soon!');
  };

  return (
    <div className="resume-preview flex flex-col gap-4">
      <div className="export-controls flex flex-wrap items-center gap-3 bg-muted/50 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Page Size:</span>
          <Select value={pageSize} onValueChange={(value: 'a4' | 'letter' | 'legal') => setPageSize(value)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">A4</SelectItem>
              <SelectItem value="letter">US Letter</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" onClick={exportToPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export as PDF
        </Button>
        
        <Button variant="outline" onClick={exportToDOCX} className="flex items-center gap-2">
          <FileType className="h-4 w-4" />
          Export as DOCX
        </Button>
      </div>

      <div 
        className="resume-container bg-white shadow-lg mx-auto overflow-hidden"
        style={{ 
          width: pageDimensions[pageSize].width,
          minHeight: pageDimensions[pageSize].height,
          padding: '15mm',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          breakInside: 'avoid',
          pageBreakAfter: 'always'
        }}
      >
        <ResumeTemplateRenderer 
          resumeData={resumeData} 
          templateId={activeTemplate} 
          theme={resumeTheme}
        />
      </div>
    </div>
  );
};
