import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_COURSES } from '@/lib/mockData';
import { Users, DollarSign, BookOpen, TrendingUp, Plus, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';

export function TeacherDashboard() {
  const { user } = useAuth();
  const myCourses = MOCK_COURSES.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-3xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Trophy className="h-32 w-32 text-primary" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              Welcome back, <span className="text-primary">{user?.full_name || 'Instructor'}!</span>
            </h2>
            <p className="text-muted-foreground text-lg font-medium">
              You have {myCourses.length} active courses and 1,234 students.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/dashboard/teacher/courses">
              <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-5 w-5" /> New Course
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦450k</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Courses</CardTitle>
            <Link to="/dashboard/teacher/courses">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Create New
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded bg-muted overflow-hidden shrink-0">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold line-clamp-1">{course.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-[10px] px-1 py-0 h-5">{course.level}</Badge>
                        <span>{course.lessonsCount} Lessons</span>
                        <span>•</span>
                        <span>₦{course.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">245</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'Chinedu O.', action: 'enrolled in', target: 'SS3 Math', time: '2 mins ago' },
                { user: 'Amara K.', action: 'completed', target: 'Quiz: Algebra', time: '1 hour ago' },
                { user: 'System', action: 'payout processed', target: '₦45,000', time: 'Yesterday' },
                { user: 'Admin', action: 'approved', target: 'Physics 101', time: '2 days ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                    {activity.user[0]}
                  </div>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
