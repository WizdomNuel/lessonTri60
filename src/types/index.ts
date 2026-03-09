export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  profile_photo?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  price: number;
  rating: number;
  level: 'Nursery' | 'Primary' | 'JSS' | 'SSS';
  subject: string;
  thumbnail: string;
  lessonsCount: number;
  duration: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'assignment';
  isCompleted?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon?: string;
  points: number;
  earnedAt?: string;
}

export interface AchievementPayload extends Achievement {
  id: string;
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  points: number;
  profile_photo: string;
}

export interface LearningStep {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment' | 'reading';
  status: 'completed' | 'current' | 'locked';
  duration: string;
  points: number;
}

export interface StudentProfile extends User {
  points: number;
  level: number;
  achievements: Achievement[];
  learningPath: LearningStep[];
}

export interface TeacherProfile {
  id: string;
  userId: string;
  bio: string;
  subjects: string[];
  rating: number;
  studentsCount: number;
  coursesCount: number;
}
