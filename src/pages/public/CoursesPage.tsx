import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_COURSES } from '@/lib/mockData';
import { Search, Filter, BookOpen, Clock, BarChart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel ? course.level === selectedLevel : true;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-muted/30 py-12 border-b">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6"
          >
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 text-primary bg-primary/10">Catalog</Badge>
              <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
              <p className="text-xl text-muted-foreground">
                Discover a world of knowledge with our comprehensive curriculum designed for Nigerian students.
              </p>
            </div>
            
            {/* Search and Filter */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, subjects..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </motion.div>

          {/* Level Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {['All Levels', 'Nursery', 'Primary', 'JSS', 'SSS'].map((level) => (
              <Button
                key={level}
                variant={selectedLevel === (level === 'All Levels' ? null : level) ? 'default' : 'outline'}
                className="rounded-full transition-all duration-300"
                onClick={() => setSelectedLevel(level === 'All Levels' ? null : level)}
              >
                {level}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          {filteredCourses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={`/courses/${course.id}`} className="group h-full block">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border-muted group-hover:border-primary/50">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="secondary" className="font-semibold">View Course</Button>
                        </div>
                        <Badge className="absolute top-3 right-3 bg-background/90 text-foreground backdrop-blur-sm shadow-sm">
                          {course.level}
                        </Badge>
                      </div>
                      
                      <CardHeader className="p-5 pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                            {course.subject}
                          </Badge>
                          <div className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
                            <Star className="h-3 w-3 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-5 pt-2 flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {course.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>12 Lessons</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>4h 30m</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart className="h-3 w-3" />
                            <span>Beginner</span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-5 pt-0 border-t bg-muted/5 mt-auto">
                        <div className="flex items-center justify-between w-full mt-4">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-muted overflow-hidden border">
                              <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructorId}`} 
                                alt={course.instructorName}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground truncate max-w-[100px]">
                              {course.instructorName}
                            </span>
                          </div>
                          <div className="font-bold text-lg text-primary">
                            ₦{course.price.toLocaleString()}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-muted/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any courses matching "{searchTerm}". Try adjusting your search or filters.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedLevel(null); }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
