
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import Index from './pages/Index';
import FormBuilder from './pages/FormBuilder';
import UploadResume from './pages/UploadResume';
import JobTailor from './pages/JobTailor';
import EnhancedJobSearch from './pages/EnhancedJobSearch';
import ChatBot from './pages/ChatBot';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Index />} />
            <Route path="/builder" element={<FormBuilder />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/tailor" element={<JobTailor />} />
            <Route path="/jobs" element={<EnhancedJobSearch />} />
            <Route path="/assistant" element={<ChatBot />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
