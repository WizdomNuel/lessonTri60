import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import { ChevronRight, ChevronLeft, Check, User, BookOpen, Target, Sparkles, Briefcase, GraduationCap } from 'lucide-react';

// Step definitions
const STUDENT_STEPS = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Academic Info', icon: BookOpen },
  { id: 3, title: 'Interests & Goals', icon: Target },
  { id: 4, title: 'Review', icon: Sparkles },
];

const TEACHER_STEPS = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Professional Info', icon: Briefcase },
  { id: 3, title: 'Teaching Profile', icon: GraduationCap },
  { id: 4, title: 'Review', icon: Sparkles },
];

const SUBJECTS = [
  'Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics', 
  'Agricultural Science', 'Economics', 'Government', 'Civic Education', 'Geography',
  'Literature in English', 'Christian Religious Studies', 'Islamic Religious Studies', 'French', 'Computer Studies',
  'Data Processing', 'Commerce', 'Financial Accounting', 'Further Mathematics', 'Technical Drawing'
];

const LEARNING_STYLES = [
  { value: 'visual', label: 'Visual (Images, Videos)' },
  { value: 'auditory', label: 'Auditory (Listening, Discussion)' },
  { value: 'reading', label: 'Reading/Writing (Text, Notes)' },
  { value: 'kinesthetic', label: 'Kinesthetic (Hands-on, Practice)' },
];

import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export function RegisterPage() {
  const navigate = useNavigate();
  const { registerPhase, isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STUDENT' as UserRole,
    // Step 2: Academic (Student)
    gradeLevel: '',
    schoolName: '',
    performance: '',
    // Step 2: Professional (Teacher)
    qualification: '',
    experienceYears: '',
    bio: '',
    // Step 3: Interests (Student)
    subjectsToImprove: [] as string[],
    learningStyle: '',
    primaryGoal: '',
    interests: '',
    otherGoals: '',
    // Step 3: Teaching Profile (Teacher)
    subjectsTaught: [] as string[],
    availability: '',
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      const rolePath = user.role.toLowerCase();
      navigate(`/dashboard/${rolePath}`);
    }
  }, [isAuthenticated, user, navigate]);

  const STEPS = formData.role === 'STUDENT' ? STUDENT_STEPS : TEACHER_STEPS;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubjectToggle = (subject: string, field: 'subjectsToImprove' | 'subjectsTaught' = 'subjectsToImprove') => {
    setFormData(prev => {
      const current = prev[field] as string[];
      return {
        ...prev,
        [field]: current.includes(subject)
          ? current.filter(s => s !== subject)
          : [...current, subject]
      };
    });
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    try {
      await registerPhase(currentStep, formData);
      if (currentStep < STEPS.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        toast.success('Account created successfully!');
        const rolePath = formData.role.toLowerCase();
        navigate(`/dashboard/${rolePath}`);
      }
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between px-2 pt-2">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center gap-1">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                    ${isActive ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' : 
                      isCompleted ? 'bg-primary/80 text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}>
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="pt-6 min-h-[400px]">
          <AnimatePresence mode="wait" custom={currentStep}>
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* STEP 1: PERSONAL INFO */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>I am a:</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        onClick={() => handleInputChange('role', 'STUDENT')}
                        className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-2 transition-all ${formData.role === 'STUDENT' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
                      >
                        <User className="w-6 h-6" />
                        <span className="font-medium">Student</span>
                      </div>
                      <div 
                        onClick={() => handleInputChange('role', 'TEACHER')}
                        className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-2 transition-all ${formData.role === 'TEACHER' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
                      >
                        <BookOpen className="w-6 h-6" />
                        <span className="font-medium">Teacher</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: ACADEMIC INFO (STUDENT) */}
              {currentStep === 2 && formData.role === 'STUDENT' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradeLevel">Current Class / Grade Level</Label>
                    <Select 
                      value={formData.gradeLevel} 
                      onValueChange={(val) => handleInputChange('gradeLevel', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JSS1">JSS 1</SelectItem>
                        <SelectItem value="JSS2">JSS 2</SelectItem>
                        <SelectItem value="JSS3">JSS 3</SelectItem>
                        <SelectItem value="SS1">SS 1</SelectItem>
                        <SelectItem value="SS2">SS 2</SelectItem>
                        <SelectItem value="SS3">SS 3</SelectItem>
                        <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="performance">Current Academic Performance</Label>
                    <Select 
                      value={formData.performance} 
                      onValueChange={(val) => handleInputChange('performance', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="How would you rate your current performance?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent (A's)</SelectItem>
                        <SelectItem value="good">Good (B's)</SelectItem>
                        <SelectItem value="average">Average (C's)</SelectItem>
                        <SelectItem value="struggling">Needs Improvement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name (Optional)</Label>
                    <Input 
                      id="schoolName" 
                      value={formData.schoolName}
                      onChange={(e) => handleInputChange('schoolName', e.target.value)}
                      placeholder="Enter your school name" 
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: PROFESSIONAL INFO (TEACHER) */}
              {currentStep === 2 && formData.role === 'TEACHER' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Highest Qualification</Label>
                    <Select 
                      value={formData.qualification} 
                      onValueChange={(val) => handleInputChange('qualification', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NCE">NCE</SelectItem>
                        <SelectItem value="BSc">B.Sc / B.Ed</SelectItem>
                        <SelectItem value="MSc">M.Sc / M.Ed</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceYears">Years of Experience</Label>
                    <Select 
                      value={formData.experienceYears} 
                      onValueChange={(val) => handleInputChange('experienceYears', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about your teaching experience and philosophy..." 
                      className="h-32"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: INTERESTS & GOALS (STUDENT) */}
              {currentStep === 3 && formData.role === 'STUDENT' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Subjects you want to improve on</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SUBJECTS.map((subject) => (
                        <div 
                          key={subject}
                          onClick={() => handleSubjectToggle(subject)}
                          className={`
                            cursor-pointer text-sm border rounded-md px-3 py-2 transition-all flex items-center gap-2
                            ${formData.subjectsToImprove.includes(subject) 
                              ? 'bg-primary text-primary-foreground border-primary' 
                              : 'hover:bg-muted'}
                          `}
                        >
                          {formData.subjectsToImprove.includes(subject) && <Check className="w-3 h-3" />}
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryGoal">Primary Goal</Label>
                    <Select 
                      value={formData.primaryGoal} 
                      onValueChange={(val) => handleInputChange('primaryGoal', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="What is your main goal?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exam_prep">Prepare for Exams (WAEC/JAMB/NECO)</SelectItem>
                        <SelectItem value="improve_grades">Improve School Grades</SelectItem>
                        <SelectItem value="learn_new">Learn New Topics</SelectItem>
                        <SelectItem value="homework_help">Homework Help</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="learningStyle">Preferred Learning Style</Label>
                    <Select 
                      value={formData.learningStyle} 
                      onValueChange={(val) => handleInputChange('learningStyle', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="How do you learn best?" />
                      </SelectTrigger>
                      <SelectContent>
                        {LEARNING_STYLES.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Other Interests / Hobbies</Label>
                    <Textarea 
                      id="interests" 
                      value={formData.interests}
                      onChange={(e) => handleInputChange('interests', e.target.value)}
                      placeholder="e.g. Coding, Music, Sports..." 
                      className="h-20"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: TEACHING PROFILE (TEACHER) */}
              {currentStep === 3 && formData.role === 'TEACHER' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Subjects you can teach</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SUBJECTS.map((subject) => (
                        <div 
                          key={subject}
                          onClick={() => handleSubjectToggle(subject, 'subjectsTaught')}
                          className={`
                            cursor-pointer text-sm border rounded-md px-3 py-2 transition-all flex items-center gap-2
                            ${formData.subjectsTaught.includes(subject) 
                              ? 'bg-primary text-primary-foreground border-primary' 
                              : 'hover:bg-muted'}
                          `}
                        >
                          {formData.subjectsTaught.includes(subject) && <Check className="w-3 h-3" />}
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select 
                      value={formData.availability} 
                      onValueChange={(val) => handleInputChange('availability', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="When are you available?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="both">Both Weekdays & Weekends</SelectItem>
                        <SelectItem value="evenings">Evenings Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg space-y-4 border">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground block">Name</span>
                        <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Email</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Role</span>
                        <span className="font-medium capitalize">{formData.role.toLowerCase()}</span>
                      </div>
                      
                      {formData.role === 'STUDENT' ? (
                        <>
                          <div>
                            <span className="text-muted-foreground block">Class</span>
                            <span className="font-medium">{formData.gradeLevel || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Performance</span>
                            <span className="font-medium capitalize">{formData.performance || 'N/A'}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="text-muted-foreground block">Qualification</span>
                            <span className="font-medium">{formData.qualification || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Experience</span>
                            <span className="font-medium">{formData.experienceYears ? `${formData.experienceYears} years` : 'N/A'}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t">
                      <span className="text-muted-foreground block text-sm mb-2">
                        {formData.role === 'STUDENT' ? 'Focus Subjects' : 'Subjects Taught'}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(formData.role === 'STUDENT' ? formData.subjectsToImprove : formData.subjectsTaught).length > 0 ? (
                          (formData.role === 'STUDENT' ? formData.subjectsToImprove : formData.subjectsTaught).map(s => (
                            <span key={s} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                              {s}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm italic text-muted-foreground">None selected</span>
                        )}
                      </div>
                    </div>

                    {formData.role === 'STUDENT' && (
                      <div className="pt-4 border-t grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-muted-foreground block text-sm mb-1">Primary Goal</span>
                          <span className="font-medium text-sm capitalize">
                            {formData.primaryGoal ? formData.primaryGoal.replace('_', ' ') : 'Not specified'}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-sm mb-1">Learning Style</span>
                          <span className="font-medium text-sm capitalize">
                            {LEARNING_STYLES.find(l => l.value === formData.learningStyle)?.label || 'Not specified'}
                          </span>
                        </div>
                      </div>
                    )}

                    {formData.role === 'TEACHER' && (
                      <div className="pt-4 border-t">
                        <span className="text-muted-foreground block text-sm mb-1">Bio</span>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {formData.bio || 'No bio provided'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm border border-yellow-200">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <p>
                      {formData.role === 'student' 
                        ? 'Your personalized dashboard will be ready based on these preferences!'
                        : 'Your teacher profile will be reviewed by our team shortly.'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
            className="w-24"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
            {currentStep === 1 && (
              <div className="text-xs text-muted-foreground">
                Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
              </div>
            )}
            <Button 
              onClick={handleNext}
              className="w-32"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : currentStep === STEPS.length ? 'Complete' : 'Next'}
              {!isSubmitting && currentStep !== STEPS.length && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
