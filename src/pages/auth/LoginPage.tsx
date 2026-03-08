import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Simulate login logic
    if (email.includes('student')) {
      navigate('/dashboard/student');
    } else if (email.includes('teacher')) {
      navigate('/dashboard/teacher');
    } else if (email.includes('admin')) {
      navigate('/dashboard/admin');
    } else {
      // Default to student for demo
      navigate('/dashboard/student');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-block mb-8">
              <span className="text-2xl font-bold text-primary">Lesson360</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2">
              Enter your email to sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base">Sign In</Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" className="h-11">
              Google
            </Button>
            <Button variant="outline" type="button" className="h-11">
              Microsoft
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>

          <div className="bg-muted/50 p-4 rounded-lg text-xs text-muted-foreground">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium">Student:</span> student@test.com
              </div>
              <div>
                <span className="font-medium">Teacher:</span> teacher@test.com
              </div>
              <div className="col-span-2">
                <span className="font-medium">Admin:</span> admin@test.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Testimonial */}
      <div className="hidden lg:flex flex-col justify-between bg-muted p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Students learning" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10">
          <Badge variant="outline" className="text-white border-white/20 bg-white/10 backdrop-blur-sm">
            Student Success Story
          </Badge>
        </div>

        <div className="relative z-10 max-w-lg">
          <blockquote className="text-2xl font-medium leading-relaxed mb-6">
            "Lesson360 completely transformed my approach to studying. The interactive lessons and supportive teachers helped me achieve straight A's in my WAEC exams."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full border-2 border-white/20 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Chidinma" alt="Student" />
            </div>
            <div>
              <div className="font-bold">Chidinma Okonkwo</div>
              <div className="text-white/80 text-sm">SS3 Student, Lagos</div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 flex gap-2">
           {[1, 2, 3].map((i) => (
             <div key={i} className={`h-1 rounded-full transition-all ${i === 1 ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
           ))}
        </div>
      </div>
    </div>
  );
}
