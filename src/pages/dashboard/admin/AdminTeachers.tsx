import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, FileText } from 'lucide-react';

export function AdminTeachers() {
  const pendingTeachers = [
    { id: 1, name: 'Michael Okpara', subject: 'Chemistry', qualification: 'M.Sc', status: 'Pending' },
    { id: 2, name: 'Sarah Johnson', subject: 'English', qualification: 'B.Ed', status: 'Pending' },
    { id: 3, name: 'David Lee', subject: 'Physics', qualification: 'PhD', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Teacher Approvals</h2>
        <p className="text-muted-foreground">Review and approve teacher applications.</p>
      </div>

      <div className="grid gap-6">
        {pendingTeachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center font-bold text-lg">
                  {teacher.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{teacher.name}</h3>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{teacher.subject}</span>
                    <span>•</span>
                    <span>{teacher.qualification}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" /> View CV
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Check className="mr-2 h-4 w-4" /> Approve
                </Button>
                <Button size="sm" variant="destructive">
                  <X className="mr-2 h-4 w-4" /> Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {pendingTeachers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No pending teacher applications.
          </div>
        )}
      </div>
    </div>
  );
}
