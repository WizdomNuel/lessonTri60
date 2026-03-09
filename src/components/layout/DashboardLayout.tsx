import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { UserRole } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

import { useAuth } from '@/hooks/use-auth';

interface DashboardLayoutProps {
  role?: UserRole; // Optional role override for dev/testing
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const { user } = useAuth();
  const currentRole = role || user?.role || 'student';
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background/50">
      <Sidebar 
        role={currentRole} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
        <header className="h-16 lg:h-20 border-b border-border/50 glass-panel flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl lg:text-2xl font-bold capitalize tracking-tight neon-text">
              {currentRole} Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full shadow-[0_0_5px_hsl(var(--primary))]" />
            </Button>
            
            <div className="flex items-center gap-4 border-l border-border/50 pl-4 lg:pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{user.full_name}</p>
                <p className="text-xs text-muted-foreground capitalize mt-1">{currentRole}</p>
              </div>
              <Avatar className="h-8 w-8 lg:h-10 lg:w-10 ring-2 ring-primary/20 transition-all hover:ring-primary/50">
                <AvatarImage src={user.profile_photo} />
                <AvatarFallback>{user.full_name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
