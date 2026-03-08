import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Briefcase, DollarSign, Users, BookOpen, Star, Video, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function BecomeTeacherPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">Join Our Team</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Become a Lesson360 Teacher</h1>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Share your knowledge, inspire the next generation of Nigerian students, and earn a competitive income teaching what you love.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary" className="text-primary font-bold">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Teach with Lesson360?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide the platform, tools, and support you need to succeed as an online educator.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Reach More Students',
                desc: 'Connect with thousands of eager learners across Nigeria and beyond. Expand your impact beyond the classroom.',
              },
              {
                icon: Calendar,
                title: 'Flexible Schedule',
                desc: 'Teach on your own terms. Set your availability and work from the comfort of your home or anywhere with internet.',
              },
              {
                icon: DollarSign,
                title: 'Earn Competitive Income',
                desc: 'Set your own rates for private tutoring or earn royalties from recorded courses. The sky is the limit.',
              },
              {
                icon: Briefcase,
                title: 'Professional Growth',
                desc: 'Access training resources, workshops, and a community of educators to enhance your teaching skills.',
              },
              {
                icon: Video,
                title: 'Advanced Tools',
                desc: 'Use our state-of-the-art virtual classroom, whiteboard, and course creation tools to deliver engaging lessons.',
              },
              {
                icon: BookOpen,
                title: 'Curriculum Support',
                desc: 'Get access to structured curriculum guides aligned with NERDC standards to help you plan your lessons.',
              },
            ].map((benefit, i) => (
              <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How to Get Started</h2>
            <p className="text-muted-foreground text-lg">
              Follow these simple steps to become a verified teacher on our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
             {/* Connecting Line (Desktop) */}
             <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-border -z-10" />

            {[
              { step: 1, title: 'Apply', desc: 'Fill out the application form with your details and qualifications.' },
              { step: 2, title: 'Verify', desc: 'Upload your credentials and pass a quick background check.' },
              { step: 3, title: 'Demo', desc: 'Submit a short demo lesson to showcase your teaching style.' },
              { step: 4, title: 'Start Teaching', desc: 'Once approved, set up your profile and start accepting students.' },
            ].map((item) => (
              <div key={item.step} className="text-center bg-background p-6 rounded-lg shadow-sm relative">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-background shadow-sm">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Hear from Our Teachers</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {[
               {
                 name: "Mr. Adebayo",
                 subject: "Mathematics",
                 quote: "Teaching on Lesson360 has given me the freedom to reach students who really need help, regardless of their location. The platform is intuitive and the support team is fantastic.",
                 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo"
               },
               {
                 name: "Mrs. Okon",
                 subject: "English Language",
                 quote: "I love the flexibility. I can schedule classes around my family time. Plus, the extra income has been a great boost. Highly recommended for passionate educators.",
                 avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Okon"
               }
             ].map((testimonial, i) => (
               <Card key={i} className="bg-muted/30">
                 <CardContent className="pt-6">
                   <div className="flex gap-1 mb-4">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                     ))}
                   </div>
                   <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full overflow-hidden bg-background border">
                       <img src={testimonial.avatar} alt={testimonial.name} />
                     </div>
                     <div>
                       <p className="font-bold">{testimonial.name}</p>
                       <p className="text-sm text-muted-foreground">{testimonial.subject} Teacher</p>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-muted/30" id="apply">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Teacher Application Form</CardTitle>
              <CardDescription>
                Ready to join us? Fill out the form below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input type="tel" placeholder="Enter your phone number" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subjects You Can Teach</label>
                  <Input placeholder="e.g. Mathematics, Physics, English" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Highest Qualification</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Select qualification</option>
                    <option value="nce">NCE</option>
                    <option value="bsc">B.Sc / B.Ed</option>
                    <option value="msc">M.Sc / M.Ed</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload CV (PDF)</label>
                  <Input type="file" accept=".pdf" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Demo Lesson Video (Link)</label>
                  <Input placeholder="YouTube or Google Drive link" />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
