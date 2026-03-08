import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_COURSES } from '@/lib/mockData';
import { BookOpen, Clock, Video, FileText, ArrowRight, Zap, Trophy, Target, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PointsCounter, BadgeList, Leaderboard } from '@/components/dashboard/GamificationComponents';
import { LearningPath } from '@/components/dashboard/LearningPath';

export function StudentDashboard() {
  const enrolledCourses = MOCK_COURSES.slice(0, 2); // Mock enrolled courses
  const studentPoints = 9500; // Mock points

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
              <span className="text-4xl font-bold text-foreground">4</span>
              <span className="text-xs font-medium text-primary flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
                <Activity className="h-3 w-3 mr-1" /> +1
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
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Learning Hours</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">12.5</span>
              <span className="text-xs font-medium text-primary flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
                <Target className="h-3 w-3 mr-1" /> +2.5h
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
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="divide-y divide-border/50">
              {enrolledCourses.map((course) => (
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
                        <span>Lesson 5 of {course.lessonsCount}</span>
                        <span className="text-primary">45%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[45%] shadow-[0_0_8px_hsl(var(--primary))]" />
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="rounded-full px-4 sm:px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 shrink-0">
                    <span className="hidden sm:inline">Resume</span>
                    <Zap className="sm:ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Badges */}
          <BadgeList />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Leaderboard */}
          <Leaderboard />

          {/* Upcoming Schedule */}
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="tracking-tight">Upcoming Schedule</span>
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { title: 'Math Live Class', time: '10:00 AM', date: 'Today', type: 'Live' },
                { title: 'Physics Quiz', time: '2:00 PM', date: 'Today', type: 'Quiz' },
                { title: 'English Essay', time: '11:59 PM', date: 'Tomorrow', type: 'Assignment' },
              ].map((item, i) => (
                <div key={i} className="group flex items-center justify-between p-3 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      item.type === 'Live' 
                        ? 'bg-red-500/10 text-red-500' 
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {item.type === 'Live' ? <Video className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">{item.title}</p>
                      <p className="text-xs text-muted-foreground font-medium">{item.date} • {item.time}</p>
                    </div>
                  </div>
                  {item.type === 'Live' && (
                    <Button size="sm" variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground h-8 px-4">
                      Join
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
