import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Eye } from 'lucide-react';

export function AdminCourses() {
  const pendingCourses = [
    { id: 1, title: 'Introduction to Biology', instructor: 'Sarah Johnson', level: 'SS1', price: 3500 },
    { id: 2, title: 'Advanced Geometry', instructor: 'Michael Okpara', level: 'SS3', price: 5000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Course Approvals</h2>
        <p className="text-muted-foreground">Review and approve new courses.</p>
      </div>

      <div className="grid gap-6">
        {pendingCourses.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-24 bg-muted rounded overflow-hidden">
                  <img src={`https://picsum.photos/seed/${course.id}/200/150`} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{course.instructor}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs py-0 h-5">{course.level}</Badge>
                    <span>•</span>
                    <span>₦{course.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" /> Preview
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

        {pendingCourses.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No pending course approvals.
          </div>
        )}
      </div>
    </div>
  );
}
