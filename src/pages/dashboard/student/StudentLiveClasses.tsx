import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Calendar } from 'lucide-react';

export function StudentLiveClasses() {
  const classes = [
    { id: 1, title: 'Advanced Algebra', instructor: 'Mr. Chidi', time: '10:00 AM - 11:30 AM', date: 'Today', status: 'Live Now' },
    { id: 2, title: 'Physics: Motion', instructor: 'Mrs. Funke', time: '2:00 PM - 3:30 PM', date: 'Tomorrow', status: 'Upcoming' },
    { id: 3, title: 'English Literature', instructor: 'Dr. Emeka', time: '4:00 PM - 5:00 PM', date: 'Wed, Mar 12', status: 'Upcoming' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Live Classes</h2>
        <p className="text-muted-foreground">Join interactive sessions with your teachers.</p>
      </div>

      <div className="space-y-4">
        {classes.map((cls) => (
          <Card key={cls.id}>
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{cls.title}</h3>
                  <p className="text-muted-foreground text-sm">with {cls.instructor}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {cls.date}
                  </div>
                  <p className="text-sm text-muted-foreground">{cls.time}</p>
                </div>
                
                {cls.status === 'Live Now' ? (
                  <Button variant="destructive" className="animate-pulse">Join Now</Button>
                ) : (
                  <Button variant="outline" disabled>Upcoming</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
