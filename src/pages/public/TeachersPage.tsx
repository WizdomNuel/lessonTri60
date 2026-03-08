import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_TEACHERS } from '@/lib/mockData';
import { Star, BookOpen, User, Award, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export function TeachersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-muted/30 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center max-w-3xl"
        >
          <Badge variant="secondary" className="mb-4 text-primary bg-primary/10">Our Faculty</Badge>
          <h1 className="text-4xl font-bold mb-4">Meet Our Expert Teachers</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Learn from passionate educators who are experts in their fields and dedicated to your success.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/become-teacher">
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">Become a Teacher</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Teachers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {MOCK_TEACHERS.map((teacher) => (
              <motion.div key={teacher.id} variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-muted hover:border-primary/50 flex flex-col">
                  <CardHeader className="text-center pb-2 relative pt-12">
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                        <Award className="h-3 w-3 mr-1 text-yellow-500" />
                        Top Rated
                      </Badge>
                    </div>
                    <div className="w-32 h-32 mx-auto rounded-full bg-muted overflow-hidden mb-4 border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.id}`} 
                        alt="Teacher" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">Teacher {teacher.id}</CardTitle>
                    <div className="text-sm text-primary font-medium flex flex-wrap justify-center gap-1 mt-2">
                      {teacher.subjects.map((subject, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-normal">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground line-clamp-3 px-6 flex-grow">
                    {teacher.bio}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 border-t pt-4 bg-muted/5 mt-auto">
                    <div className="flex justify-between w-full text-sm text-muted-foreground px-2">
                      <div className="flex items-center gap-1" title="Rating">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-foreground">{teacher.rating}</span>
                      </div>
                      <div className="flex items-center gap-1" title="Students">
                        <User className="h-4 w-4" />
                        <span>{teacher.studentsCount} Students</span>
                      </div>
                      <div className="flex items-center gap-1" title="Courses">
                        <BookOpen className="h-4 w-4" />
                        <span>{teacher.coursesCount} Courses</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      View Profile
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center max-w-3xl relative z-10"
        >
          <div className="mb-6 inline-flex p-3 rounded-full bg-primary-foreground/10">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Are you a passionate educator?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join our community of teachers and help shape the future of education in Nigeria.
          </p>
          <Link to="/become-teacher">
            <Button size="lg" variant="secondary" className="font-bold rounded-full">
              Start Teaching Today
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
