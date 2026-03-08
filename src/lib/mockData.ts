import { Course, TeacherProfile, User, Badge, LeaderboardEntry, LearningStep } from '@/types';

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Mathematics for SS3',
    description: 'Comprehensive guide to SS3 Mathematics covering Algebra, Calculus, and Geometry.',
    instructorId: 't1',
    instructorName: 'Mr. Chidi Okonjo',
    price: 5000,
    rating: 4.8,
    level: 'SSS',
    subject: 'Mathematics',
    thumbnail: 'https://picsum.photos/seed/math/400/250',
    lessonsCount: 24,
    duration: '12h 30m',
  },
  {
    id: '2',
    title: 'Basic Science for JSS1',
    description: 'Introduction to basic science concepts for junior secondary students.',
    instructorId: 't2',
    instructorName: 'Mrs. Funke Adebayo',
    price: 3500,
    rating: 4.5,
    level: 'JSS',
    subject: 'Science',
    thumbnail: 'https://picsum.photos/seed/science/400/250',
    lessonsCount: 18,
    duration: '8h 15m',
  },
  {
    id: '3',
    title: 'English Language Mastery',
    description: 'Master English grammar, composition, and comprehension.',
    instructorId: 't3',
    instructorName: 'Dr. Emeka Nwachukwu',
    price: 4000,
    rating: 4.9,
    level: 'SSS',
    subject: 'English',
    thumbnail: 'https://picsum.photos/seed/english/400/250',
    lessonsCount: 30,
    duration: '15h 00m',
  },
  {
    id: '4',
    title: 'Introduction to Coding for Kids',
    description: 'Learn the basics of programming with Scratch and Python.',
    instructorId: 't1',
    instructorName: 'Mr. Chidi Okonjo',
    price: 7500,
    rating: 4.7,
    level: 'Primary',
    subject: 'Computer Science',
    thumbnail: 'https://picsum.photos/seed/coding/400/250',
    lessonsCount: 12,
    duration: '6h 45m',
  },
];

export const MOCK_TEACHERS: TeacherProfile[] = [
  {
    id: 't1',
    userId: 'u2',
    bio: 'Experienced Mathematics and Computer Science teacher with over 10 years of experience.',
    subjects: ['Mathematics', 'Computer Science', 'Physics'],
    rating: 4.8,
    studentsCount: 1200,
    coursesCount: 5,
  },
  {
    id: 't2',
    userId: 'u3',
    bio: 'Passionate Science teacher dedicated to making learning fun and accessible.',
    subjects: ['Basic Science', 'Biology', 'Chemistry'],
    rating: 4.5,
    studentsCount: 850,
    coursesCount: 3,
  },
];

export const MOCK_BADGES: Badge[] = [
  {
    id: 'b1',
    name: 'Fast Starter',
    description: 'Completed first lesson within 24 hours',
    icon: '🚀',
    earnedAt: '2023-09-01',
  },
  {
    id: 'b2',
    name: 'Quiz Master',
    description: 'Scored 100% on 3 quizzes in a row',
    icon: '🎯',
    earnedAt: '2023-09-15',
  },
  {
    id: 'b3',
    name: 'Bookworm',
    description: 'Completed 10 reading assignments',
    icon: '📚',
  },
  {
    id: 'b4',
    name: 'Course Completer',
    description: 'Finished the Mathematics for SS3 course',
    icon: '🏆',
  },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, studentId: 's1', studentName: 'Emeka Obi', points: 12500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emeka' },
  { rank: 2, studentId: 's2', studentName: 'Aisha Bello', points: 11200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha' },
  { rank: 3, studentId: 's3', studentName: 'Tunde Bakare', points: 10800, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde' },
  { rank: 4, studentId: 'u1', studentName: 'Chioma Nwosu', points: 9500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma' }, // Current User
  { rank: 5, studentId: 's5', studentName: 'Ngozi Eze', points: 9100, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngozi' },
];

export const MOCK_LEARNING_PATH: LearningStep[] = [
  { id: 'lp1', title: 'Introduction to Algebra', type: 'video', status: 'completed', duration: '15 min', points: 50 },
  { id: 'lp2', title: 'Algebra Quiz 1', type: 'quiz', status: 'completed', duration: '10 min', points: 100 },
  { id: 'lp3', title: 'Linear Equations', type: 'reading', status: 'current', duration: '20 min', points: 50 },
  { id: 'lp4', title: 'Solving for X', type: 'video', status: 'locked', duration: '25 min', points: 50 },
  { id: 'lp5', title: 'Mid-Term Assignment', type: 'assignment', status: 'locked', duration: '45 min', points: 200 },
];
