
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FileText, MessageSquare, Upload, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Layout() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Form Builder', path: '/', icon: FileText },
    { name: 'AI Chat', path: '/chat', icon: MessageSquare },
    { name: 'Upload Resume', path: '/upload', icon: Upload },
    { name: 'Job Tailor', path: '/job-tailor', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">ResumeAI</Link>
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
