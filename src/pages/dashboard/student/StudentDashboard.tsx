import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Video, FileText, ArrowRight, Zap, Trophy, Target, Activity, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PointsCounter, BadgeList, Leaderboard } from '@/components/dashboard/GamificationComponents';
import { LearningPath } from '@/components/dashboard/LearningPath';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';

export function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    profile: any;
    courses: any[];
    leaderboard: any[];
    schedule: any[];
  }>({
    profile: null,
    courses: [],
    leaderboard: [],
    schedule: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // We'll fetch multiple things here
        // For now, let's fetch profile as a starting point
        const [profileRes, coursesRes, leaderboardRes] = await Promise.all([
          api.get('/users/profile'),
          api.get('/courses/enrolled'),
          api.get('/gamification/leaderboard')
        ]) as [any, any, any];

        setData({
          profile: profileRes,
          courses: coursesRes || [],
          leaderboard: leaderboardRes || [],
          schedule: [] // We'll add this later or mock for now
        });
      } catch (error: any) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { profile, courses, leaderboard } = data;
  const studentPoints = profile?.points || 0;

  return (
    <div className="space-y-8">
      {/* Header Stats - Futuristic Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <PointsCounter points={studentPoints} />
        
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:neon-border transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen className="h-24 w-24 text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Courses</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{courses.length}</span>
              <span className="text-xs font-medium text-primary flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
                <Activity className="h-3 w-3 mr-1" /> Current
              </span>
            </div>
            <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4 shadow-[0_0_10px_hsl(var(--primary))]"></div>
            </div>
          </div>
        </div>
        
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:neon-border transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="h-24 w-24 text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Level</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{profile?.level || 1}</span>
              <span className="text-xs font-medium text-primary flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
                <Target className="h-3 w-3 mr-1" /> Rank
              </span>
            </div>
            <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/2 shadow-[0_0_10px_hsl(var(--primary))]"></div>
            </div>
          </div>
        </div>
        
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:neon-border transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText className="h-24 w-24 text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Assignments</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">3</span>
              <span className="text-xs font-medium text-destructive flex items-center bg-destructive/10 px-2 py-0.5 rounded-full">
                ! 1 Due Today
              </span>
            </div>
            <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/4 shadow-[0_0_10px_hsl(var(--primary))]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Learning Path */}
          <LearningPath />

          {/* Continue Learning Section */}
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="tracking-tight">Continue Learning</span>
              </h3>
              <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/10">
                <Link to="/courses">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="divide-y divide-border/50">
              {courses.length > 0 ? courses.map((course) => (
                <div key={course.id} className="group p-4 flex items-center gap-4 hover:bg-primary/5 transition-colors duration-300">
                  <div className="h-24 w-36 rounded-xl bg-muted overflow-hidden shrink-0 relative shadow-sm group-hover:shadow-md transition-all">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-background/90 rounded-full p-2 shadow-lg">
                        <Zap className="h-5 w-5 text-primary fill-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>
                      <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-[10px] uppercase tracking-wider">
                        In Progress
                      </Badge>
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                        <span>Progress</span>
                        <span className="text-primary">45%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[45%] shadow-[0_0_8px_hsl(var(--primary))]" />
                      </div>
                    </div>
                  </div>
                  <Button asChild size="sm" className="rounded-full px-4 sm:px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 shrink-0">
                    <Link to={`/courses/${course.id}`}>
                      <span className="hidden sm:inline">Resume</span>
                      <Zap className="sm:ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )) : (
                <div className="p-8 text-center space-y-4">
                  <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
                  <Button asChild>
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Badges */}
          <BadgeList achievements={profile?.achievements} />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Leaderboard */}
          <Leaderboard entries={leaderboard} />

          {/* Upcoming Schedule */}
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="tracking-tight">Upcoming Schedule</span>
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {[].length > 0 ? [].map((item, i) => (
                <div key={i} className="group flex items-center justify-between p-3 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                      <Video className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">Live Class</p>
                      <p className="text-xs text-muted-foreground font-medium">Starting soon</p>
                    </div>
                  </div>
                </div>
              )) : (
                 <div className="p-4 text-center text-sm text-muted-foreground italic">
                   No sessions scheduled for today.
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
