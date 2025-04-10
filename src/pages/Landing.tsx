
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileCheck, FileSearch, Briefcase, Wand2, ChevronRight, 
  FilePlus, Download, PanelLeft, Star, CheckCircle, Users, Globe
} from 'lucide-react';
import { toast } from 'sonner';

const Landing = () => {
  const { isAuthenticated, setGuestUser } = useAuth();
  const [guestName, setGuestName] = useState('');
  const [showGuestInput, setShowGuestInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGuestLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      setGuestUser(guestName.trim());
      navigate('/dashboard');
      toast.success(`Welcome, ${guestName.trim()}!`);
    } else {
      toast.error('Please enter your name to continue');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ResumeBuilder</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="outline">Log In</Button>
            </Link>
            <Button onClick={() => setShowGuestInput(true)}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Create Professional Resumes Tailored to Your Dream Job</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Stand out from the crowd with AI-powered resume optimization that matches your skills to job descriptions.
              </p>
              
              {showGuestInput ? (
                <form onSubmit={handleGuestLogin} className="flex flex-col sm:flex-row gap-4 mb-4">
                  <Input 
                    placeholder="Enter your name to continue" 
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="sm:max-w-xs"
                    autoFocus
                  />
                  <Button type="submit">Continue</Button>
                </form>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => setShowGuestInput(true)} size="lg" className="px-8">
                    Continue as Guest
                  </Button>
                  <Link to="/auth">
                    <Button variant="outline" size="lg">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="relative hidden md:block">
              <div className="bg-white shadow-xl rounded-lg p-6 transform rotate-2 border border-primary/20">
                <div className="bg-muted/30 h-16 w-full rounded-md mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-muted/30 h-8 w-3/4 rounded-md"></div>
                  <div className="bg-muted/30 h-8 w-full rounded-md"></div>
                  <div className="bg-muted/30 h-8 w-2/3 rounded-md"></div>
                </div>
              </div>
              <div className="absolute top-10 right-10 bg-white shadow-xl rounded-lg p-6 transform -rotate-3 border border-primary/20">
                <div className="bg-muted/30 h-12 w-full rounded-md mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-muted/30 h-6 w-5/6 rounded-md"></div>
                  <div className="bg-muted/30 h-6 w-full rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Land Your Dream Job
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-card border rounded-lg p-6 hover:border-primary/50 transition-all">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileSearch className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resume Templates</h3>
              <p className="text-muted-foreground mb-4">
                Choose from multiple professional templates designed to impress employers across industries.
              </p>
              <Link to="/dashboard" className="text-primary flex items-center gap-1 text-sm font-medium">
                Explore Templates <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="feature-card bg-card border rounded-lg p-6 hover:border-primary/50 transition-all">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Optimization</h3>
              <p className="text-muted-foreground mb-4">
                Tailor your resume to specific job descriptions with our smart keyword matching technology.
              </p>
              <Link to="/tailor" className="text-primary flex items-center gap-1 text-sm font-medium">
                Try Job Tailor <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="feature-card bg-card border rounded-lg p-6 hover:border-primary/50 transition-all">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Search</h3>
              <p className="text-muted-foreground mb-4">
                Find relevant job opportunities across multiple platforms and apply with your optimized resume.
              </p>
              <Link to="/jobs" className="text-primary flex items-center gap-1 text-sm font-medium">
                Search Jobs <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FilePlus className="h-8 w-8 text-primary" />
                <div className="absolute -right-1 -top-1 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create or Upload</h3>
              <p className="text-muted-foreground">
                Start from scratch or upload your existing resume to enhance it.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <PanelLeft className="h-8 w-8 text-primary" />
                <div className="absolute -right-1 -top-1 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Template</h3>
              <p className="text-muted-foreground">
                Select from professional templates that match your industry and style.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wand2 className="h-8 w-8 text-primary" />
                <div className="absolute -right-1 -top-1 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Optimize</h3>
              <p className="text-muted-foreground">
                Tailor your resume to specific job descriptions for better results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-primary" />
                <div className="absolute -right-1 -top-1 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  4
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Download & Apply</h3>
              <p className="text-muted-foreground">
                Export your resume as PDF and start applying to jobs.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button onClick={() => setShowGuestInput(true)} size="lg" className="px-8">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-lg p-6">
              <div className="flex text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="italic mb-4">
                "I landed my dream job at a tech company after using this resume builder. The job tailoring feature helped me highlight exactly what the employer was looking for."
              </p>
              <div className="flex items-center">
                <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <div className="flex text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="italic mb-4">
                "The templates are professional and elegant. I received compliments on my resume design during interviews, which definitely helped me stand out from other candidates."
              </p>
              <div className="flex items-center">
                <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-sm text-muted-foreground">Marketing Manager</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <div className="flex text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="italic mb-4">
                "As a recent graduate with limited experience, I was struggling to create an impressive resume. This tool helped me organize my skills and achievements in a way that caught employers' attention."
              </p>
              <div className="flex items-center">
                <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">RJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">Recent Graduate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Resume Builder
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="mt-1">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">ATS-Friendly Templates</h3>
                <p className="text-muted-foreground">
                  Our templates are designed to pass through Applicant Tracking Systems without losing information.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Keyword Optimization</h3>
                <p className="text-muted-foreground">
                  Match your resume to job descriptions to increase your chances of getting interviews.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
                <p className="text-muted-foreground">
                  Choose from templates designed by HR professionals and career experts.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                <p className="text-muted-foreground">
                  Intuitive interface that guides you through the resume creation process.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Export Options</h3>
                <p className="text-muted-foreground">
                  Download your resume in PDF format ready for applications.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Job Search Integration</h3>
                <p className="text-muted-foreground">
                  Find and apply to jobs directly from our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed interviews with resumes created using our platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setShowGuestInput(true)} size="lg" className="px-8">
              Get Started Free
            </Button>
            <Link to="/auth">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FileCheck className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">ResumeBuilder</span>
            </div>
            
            <div className="flex gap-6">
              <Link to="/auth" className="text-muted-foreground hover:text-foreground">
                Sign Up
              </Link>
              <Link to="/jobs" className="text-muted-foreground hover:text-foreground">
                Jobs
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                Templates
              </Link>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </a>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
