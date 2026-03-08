import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_COURSES } from '@/lib/mockData';
import { Clock, BookOpen, User, Star, CheckCircle, PlayCircle, Award } from 'lucide-react';

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const course = MOCK_COURSES.find((c) => c.id === id);

  if (!course) {
    return <div className="container mx-auto py-20 text-center">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Course Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/courses" className="hover:underline">Courses</Link>
              <span>/</span>
              <span>{course.subject}</span>
              <span>/</span>
              <span className="text-foreground font-medium">{course.title}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
            <p className="text-lg text-muted-foreground">{course.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                {course.level}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{course.rating}</span>
                <span className="text-muted-foreground">(120 ratings)</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{course.instructorName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Last updated: March 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="curriculum" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger 
                value="instructor" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                Instructor
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-6 space-y-8">
              <section>
                <h3 className="text-xl font-bold mb-4">What you'll learn</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Master key concepts in {course.subject} for {course.level} level.</span>
                    </div>
                  ))}
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-bold mb-4">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Basic understanding of the subject matter (for advanced levels)</li>
                  <li>A computer or tablet with internet access</li>
                  <li>Dedication and willingness to learn</li>
                  <li>No prior experience required for beginner courses</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <div className="prose max-w-none text-muted-foreground">
                  <p>
                    This comprehensive course is designed to help students excel in their studies. 
                    Covering all essential topics required by the Nigerian educational curriculum, 
                    this course combines theoretical knowledge with practical examples.
                  </p>
                  <p className="mt-4">
                    Whether you are preparing for WAEC, NECO, or just want to improve your grades, 
                    this course provides the structured learning path you need.
                  </p>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="curriculum" className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Course Content</h3>
                  <span className="text-sm text-muted-foreground">{course.lessonsCount} lessons • {course.duration} total length</span>
                </div>
                
                {[1, 2, 3, 4].map((section) => (
                  <Card key={section} className="overflow-hidden">
                    <CardHeader className="bg-muted/30 py-3 px-4">
                      <CardTitle className="text-base font-medium flex justify-between">
                        <span>Section {section}: Introduction to Module {section}</span>
                        <span className="text-sm font-normal text-muted-foreground">3 lessons</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {[1, 2, 3].map((lesson) => (
                        <div key={lesson} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-muted/10 transition-colors">
                          <div className="flex items-center gap-3">
                            <PlayCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Lesson {section}.{lesson}: Topic Overview</span>
                          </div>
                          <span className="text-xs text-muted-foreground">10:00</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="pt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted overflow-hidden shrink-0">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructorId}`} alt={course.instructorName} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{course.instructorName}</h3>
                      <p className="text-sm text-muted-foreground mb-4">Senior {course.subject} Teacher</p>
                      
                      <div className="flex gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>4.8 Rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>1,200 Students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <PlayCircle className="h-4 w-4 text-muted-foreground" />
                          <span>5 Courses</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        An experienced educator with over 10 years of teaching experience in Nigerian secondary schools. 
                        Passionate about making complex subjects easy to understand.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar / Enrollment Card */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <Card className="overflow-hidden shadow-lg border-primary/20">
              <div className="aspect-video bg-muted relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer">
                  <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                    <PlayCircle className="h-8 w-8 text-primary fill-primary/20" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-4">₦{course.price.toLocaleString()}</div>
                
                <Button className="w-full mb-3" size="lg">Enroll Now</Button>
                <Button variant="outline" className="w-full mb-6">Add to Wishlist</Button>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Lessons
                    </span>
                    <span className="font-medium">{course.lessonsCount}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Duration
                    </span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" /> Level
                    </span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Award className="h-4 w-4" /> Certificate
                    </span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
