
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Upload, Wand2, MessageSquare, Briefcase, Menu, X, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Layout = () => {
  const { isAuthenticated, logout, guestName, isGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    { name: 'Builder', path: '/builder', icon: <FileText className="w-5 h-5" /> },
    { name: 'Upload Resume', path: '/upload', icon: <Upload className="w-5 h-5" /> },
    { name: 'Job Tailor', path: '/tailor', icon: <Wand2 className="w-5 h-5" /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'AI Assistant', path: '/assistant', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r transform transition-transform duration-300 bg-background ${
          isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center border-b px-6">
          <Link to="/dashboard" className="flex items-center">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold text-xl">ResumeBuilder</span>
          </Link>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center h-10 px-3 py-2 text-base rounded-md transition-colors ${
                location.pathname === item.path ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
              }`}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {isGuest ? guestName : 'User'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isGuest ? 'Guest User' : 'Logged In'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setConfirmLogoutOpen(true)}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`flex-1 ${
          !isMobile ? 'ml-64' : ''
        } min-h-screen`}
      >
        <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile background overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={confirmLogoutOpen} onOpenChange={setConfirmLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
              {isGuest && " This will clear your guest session."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmLogoutOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                handleLogout();
                setConfirmLogoutOpen(false);
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;
