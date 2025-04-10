
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Landing = () => {
  const [guestName, setGuestName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already a guest when component mounts
  useEffect(() => {
    const guestStatus = localStorage.getItem('isGuest') === 'true';
    const name = localStorage.getItem('guestName');
    
    if (guestStatus && name) {
      setIsGuest(true);
      setGuestName(name);
      // Skip the name input if already a guest
      navigate('/');
    }
  }, [navigate]);

  const handleContinueAsGuest = () => {
    if (showNameInput) {
      if (!guestName.trim()) {
        toast({
          title: "Name required",
          description: "Please enter your name to continue",
          variant: "destructive",
        });
        return;
      }
      
      // Store guest name in localStorage
      localStorage.setItem('guestName', guestName);
      localStorage.setItem('isGuest', 'true');
      
      // Force a re-render by updating state
      setIsGuest(true);
      
      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      
      // Small delay to ensure state updates before navigation
      setTimeout(() => {
        navigate('/');
      }, 100);
    } else {
      setShowNameInput(true);
    }
  };

  const handleGoToLogin = () => {
    navigate('/auth');
  };

  // If already logged in as guest, redirect to home
  if (isGuest) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">ResumeAI</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
          Create professional resumes powered by AI. Stand out from the crowd and land your dream job.
        </p>
        
        {!showNameInput ? (
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button 
              className="bg-primary hover:bg-primary/90" 
              size="lg" 
              onClick={handleGoToLogin}>
              Sign In / Sign Up
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleContinueAsGuest}>
              Continue as Guest
            </Button>
          </div>
        ) : (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Enter Your Name</CardTitle>
              <CardDescription>
                We'll use this to personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Your Name</Label>
                  <Input
                    id="guest-name"
                    placeholder="e.g., John Smith"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowNameInput(false)}>
                Back
              </Button>
              <Button onClick={handleContinueAsGuest}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      {/* Features Section */}
      <div className="bg-card p-8 w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Professional Templates</h3>
            <p className="text-muted-foreground">Multiple professionally designed templates to choose from</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">AI-Powered</h3>
            <p className="text-muted-foreground">Advanced AI to help improve your resume content</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Export Options</h3>
            <p className="text-muted-foreground">Download your resume in multiple formats</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
