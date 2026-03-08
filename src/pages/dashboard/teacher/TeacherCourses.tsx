import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_COURSES } from '@/lib/mockData';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export function TeacherCourses() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
          <p className="text-muted-foreground">Manage your curriculum and content.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_COURSES.map((course) => (
          <Card key={course.id} className="flex flex-col group relative overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover rounded-t-lg transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
              <Badge className="absolute top-2 right-2">{course.level}</Badge>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
              <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                <span>{course.subject}</span>
                <Badge variant={course.rating > 4.5 ? 'default' : 'secondary'}>
                  {course.rating > 4.5 ? 'Best Seller' : 'Active'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-3 gap-2 text-center text-sm border-t pt-4">
                <div>
                  <div className="font-bold">245</div>
                  <div className="text-xs text-muted-foreground">Students</div>
                </div>
                <div className="border-l border-r">
                  <div className="font-bold">₦{course.price.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Price</div>
                </div>
                <div>
                  <div className="font-bold">{course.rating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
