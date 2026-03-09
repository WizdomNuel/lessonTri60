import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, DollarSign, AlertCircle, Settings } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-3xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Settings className="h-32 w-32 text-primary" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            Welcome back, <span className="text-primary">{user?.full_name || 'Administrator'}!</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            System health is normal. You have 12 pending approvals to review.
          </p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+1,200 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">+24 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦12.5M</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 teachers, 4 courses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Doe', role: 'Student', email: 'john@example.com', date: '2 mins ago' },
                { name: 'Jane Smith', role: 'Teacher', email: 'jane@example.com', date: '1 hour ago' },
                { name: 'Bob Johnson', role: 'Student', email: 'bob@example.com', date: '3 hours ago' },
                { name: 'Alice Williams', role: 'Student', email: 'alice@example.com', date: 'Yesterday' },
                { name: 'Charlie Brown', role: 'Teacher', email: 'charlie@example.com', date: 'Yesterday' },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${user.role === 'Teacher' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {user.role}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{user.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Server Uptime', status: '99.9%', color: 'text-green-600' },
                { name: 'Database Load', status: 'Normal', color: 'text-green-600' },
                { name: 'Storage Usage', status: '45%', color: 'text-yellow-600' },
                { name: 'API Latency', status: '120ms', color: 'text-green-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b last:border-0">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
