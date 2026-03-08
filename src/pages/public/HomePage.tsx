import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Video, CheckCircle, Star, ArrowRight, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left pt-10 lg:pt-0"
          >
            <Badge className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" variant="outline">
              🚀 #1 EdTech Platform in Nigeria
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Unlock Your <br />
              <span className="text-primary">Potential</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Quality education for Nursery to SS3 students. Learn from expert teachers, attend live classes, and master your subjects from anywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/courses">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full font-semibold shadow-lg shadow-primary/20">
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/become-teacher">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-2">
                  Become a Teacher
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6 pt-8 border-t justify-center lg:justify-start">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-card">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Student learning"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                    <Video className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Live Classes</p>
                    <p className="text-sm text-muted-foreground">Join interactive sessions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
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
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Active Students', value: '10K+', icon: Users },
              { label: 'Expert Teachers', value: '500+', icon: Award },
              { label: 'Courses', value: '1.2K+', icon: BookOpen },
              { label: 'Success Rate', value: '98%', icon: Star },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-10 md:mb-20"
          >
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 hover:bg-primary/20">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Reinventing Education
            </h2>
            <p className="text-muted-foreground text-lg">
              We provide a comprehensive learning experience tailored to the Nigerian curriculum.
            </p>
          </motion.div>

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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                icon: BookOpen,
                title: 'Comprehensive Curriculum',
                desc: 'Aligned with NERDC standards for Nursery, Primary, and Secondary schools.',
              },
              {
                icon: Video,
                title: 'Live & Recorded Classes',
                desc: 'Join interactive live sessions with real-time Q&A or watch recorded lessons at your own pace.',
              },
              {
                icon: Award,
                title: 'Expert Teachers',
                desc: 'Learn from qualified and vetted educators passionate about your success.',
              },
              {
                icon: CheckCircle,
                title: 'Personalized Learning',
                desc: 'Adaptive learning paths that adjust to your pace and performance.',
              },
              {
                icon: Users,
                title: 'Community Support',
                desc: 'Join study groups, participate in forums, and collaborate with peers.',
              },
              {
                icon: Star,
                title: 'Gamified Experience',
                desc: 'Earn badges, climb leaderboards, and get rewarded for your learning streaks.',
              },
            ].map((feature, i) => (
              <motion.div key={i} variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col sm:flex-row justify-between items-end mb-8 md:mb-12 gap-4"
          >
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Popular Courses</h2>
              <p className="text-muted-foreground">Explore our highest-rated courses.</p>
            </div>
            <Link to="/courses" className="w-full sm:w-auto">
              <Button variant="ghost" className="w-full sm:w-auto hover:text-primary">View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </motion.div>

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
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div key={i} variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer border-none shadow-md">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/course${i}/400/225`}
                      alt="Course thumbnail"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground">SS3</Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="text-xs text-primary font-bold mb-2 uppercase tracking-wider">Science</div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">Advanced Mathematics</h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Instructor" />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">Mr. Okon</span>
                      </div>
                      <span className="font-bold text-primary">₦5,000</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl opacity-90 mb-10">
              Join thousands of students achieving academic excellence with Lesson360.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-10 text-lg font-bold rounded-full shadow-lg">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full bg-transparent">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
