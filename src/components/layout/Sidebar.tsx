import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  FileText,
  MessageSquare,
  User,
  BarChart,
  DollarSign,
  Users,
  CheckCircle,
  Settings,
  LogOut,
  Bell,
  Zap,
  X,
} from 'lucide-react';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const links = {
    student: [
      { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/dashboard/student/courses', label: 'My Courses', icon: BookOpen },
      { href: '/dashboard/student/live-classes', label: 'Live Classes', icon: Video },
      { href: '/dashboard/student/assignments', label: 'Assignments', icon: FileText },
      { href: '/dashboard/student/messages', label: 'Messages', icon: MessageSquare },
      { href: '/dashboard/student/notifications', label: 'Notifications', icon: Bell },
      { href: '/dashboard/student/profile', label: 'Profile', icon: User },
    ],
    teacher: [
      { href: '/dashboard/teacher', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/dashboard/teacher/courses', label: 'My Courses', icon: BookOpen },
      { href: '/dashboard/teacher/live-classes', label: 'Live Classes', icon: Video },
      { href: '/dashboard/teacher/assignments', label: 'Assignments', icon: FileText },
      { href: '/dashboard/teacher/analytics', label: 'Analytics', icon: BarChart },
      { href: '/dashboard/teacher/earnings', label: 'Earnings', icon: DollarSign },
    ],
    admin: [
      { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/dashboard/admin/teachers', label: 'Teachers', icon: Users },
      { href: '/dashboard/admin/courses', label: 'Courses', icon: BookOpen },
      { href: '/dashboard/admin/students', label: 'Students', icon: Users },
      { href: '/dashboard/admin/payments', label: 'Payments', icon: DollarSign },
      { href: '/dashboard/admin/approvals', label: 'Approvals', icon: CheckCircle },
      { href: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart },
    ],
  };

  const currentLinks = links[role] || [];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "h-screen w-64 glass-panel border-r border-border/50 flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" onClick={onClose}>
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-[0_0_10px_hsl(var(--primary))] group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">Lesson360</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {currentLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-[0_0_10px_hsl(var(--primary)/0.1)]'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                )}
                <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50 space-y-1">
          <Link
            to="/settings"
            onClick={() => {
              if (window.innerWidth < 1024) {
                onClose();
              }
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
