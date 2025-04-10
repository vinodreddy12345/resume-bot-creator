
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import FormBuilder from "@/pages/FormBuilder";
import ChatBot from "@/pages/ChatBot";
import UploadResume from "@/pages/UploadResume";
import JobTailor from "@/pages/JobTailor";
import JobSearch from "@/pages/JobSearch";
import Auth from "@/pages/Auth";
import Landing from "@/pages/Landing";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
  
  useEffect(() => {
    // Check if user is a guest
    const checkGuestStatus = () => {
      const guestStatus = localStorage.getItem('isGuest') === 'true';
      setIsGuest(guestStatus);
      setCheckingStatus(false);
    };
    
    // Check immediately on mount
    checkGuestStatus();
    
    // Also listen for storage events (in case localStorage changes in another tab)
    window.addEventListener('storage', checkGuestStatus);
    
    return () => {
      window.removeEventListener('storage', checkGuestStatus);
    };
  }, []);
  
  // Show loading state while checking auth status
  if (loading || checkingStatus) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Redirect if not authenticated and not a guest
  if (!user && !isGuest) {
    return <Navigate to="/landing" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<FormBuilder />} />
              <Route path="/chat" element={<ChatBot />} />
              <Route path="/upload" element={<UploadResume />} />
              <Route path="/job-tailor" element={<JobTailor />} />
              <Route path="/job-search" element={<JobSearch />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
