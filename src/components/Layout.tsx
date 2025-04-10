
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, MessageSquare, Upload, Briefcase, LogOut, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isGuest, setIsGuest] = useState(false);
  const [guestName, setGuestName] = useState('');
  
  useEffect(() => {
    const guestStatus = localStorage.getItem('isGuest') === 'true';
    setIsGuest(guestStatus);
    if (guestStatus) {
      setGuestName(localStorage.getItem('guestName') || 'Guest');
    }
  }, []);
  
  const navItems = [
    { name: 'Form Builder', path: '/', icon: FileText },
    { name: 'Upload Resume', path: '/upload', icon: Upload },
    { name: 'Job Tailor', path: '/job-tailor', icon: Briefcase },
    { name: 'Job Search', path: '/job-search', icon: Search }
  ];

  const userInitials = isGuest 
    ? guestName.substring(0, 2).toUpperCase() 
    : (user?.email ? user.email.substring(0, 2).toUpperCase() : 'U');

  const handleSignOut = async () => {
    if (isGuest) {
      // Clear guest info
      localStorage.removeItem('isGuest');
      localStorage.removeItem('guestName');
      navigate('/landing');
    } else {
      await signOut();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">ResumeAI</Link>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path 
                      ? "bg-primary-foreground text-primary" 
                      : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary-foreground text-primary">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  {isGuest ? `Guest: ${guestName}` : 'My Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isGuest && (
                  <DropdownMenuItem 
                    className="cursor-pointer" 
                    onClick={() => navigate('/auth')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Sign In / Sign Up</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isGuest ? 'Exit Guest Mode' : 'Log out'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>
      
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-6">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex flex-col items-center p-2 rounded-md text-xs",
                  location.pathname === item.path 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Layout;
