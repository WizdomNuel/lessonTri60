import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, BookOpen, Save } from 'lucide-react';
import { toast } from 'sonner';

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    liveClasses: true,
    assignments: true,
    courseAnnouncements: false,
    emailDigest: true,
    marketingEmails: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', settings);
    toast.success('Notification preferences saved successfully');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notification Settings</h2>
        <p className="text-muted-foreground">
          Manage how you receive notifications and updates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Push Notifications</CardTitle>
          </div>
          <CardDescription>
            Configure which notifications you want to receive in the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="live-classes" className="text-base">Live Class Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get notified 15 minutes before your live classes start.
              </p>
            </div>
            <Switch 
              id="live-classes" 
              checked={settings.liveClasses}
              onCheckedChange={() => handleToggle('liveClasses')}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="assignments" className="text-base">Assignment Deadlines</Label>
              <p className="text-sm text-muted-foreground">
                Receive reminders about upcoming assignment due dates.
              </p>
            </div>
            <Switch 
              id="assignments" 
              checked={settings.assignments}
              onCheckedChange={() => handleToggle('assignments')}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="announcements" className="text-base">New Course Announcements</Label>
              <p className="text-sm text-muted-foreground">
                Be the first to know when new courses are added.
              </p>
            </div>
            <Switch 
              id="announcements" 
              checked={settings.courseAnnouncements}
              onCheckedChange={() => handleToggle('courseAnnouncements')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle>Email Preferences</CardTitle>
          </div>
          <CardDescription>
            Manage what emails you receive from us.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="digest" className="text-base">Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">
                A weekly summary of your progress and upcoming schedule.
              </p>
            </div>
            <Switch 
              id="digest" 
              checked={settings.emailDigest}
              onCheckedChange={() => handleToggle('emailDigest')}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="marketing" className="text-base">Marketing & Offers</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new features and special offers.
              </p>
            </div>
            <Switch 
              id="marketing" 
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle('marketingEmails')}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
