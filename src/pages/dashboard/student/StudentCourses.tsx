import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_COURSES } from '@/lib/mockData';
import { PlayCircle } from 'lucide-react';

export function StudentCourses() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
        <p className="text-muted-foreground">Manage and continue your learning journey.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_COURSES.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <div className="aspect-video relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <Badge className="absolute top-2 right-2">{course.level}</Badge>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
              <CardDescription>{course.instructorName}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>35%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[35%]" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
