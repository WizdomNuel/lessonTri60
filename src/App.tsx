/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { HomePage } from '@/pages/public/HomePage';
import { CoursesPage } from '@/pages/public/CoursesPage';
import { CourseDetailPage } from '@/pages/public/CourseDetailPage';
import { TeachersPage } from '@/pages/public/TeachersPage';
import { BecomeTeacherPage } from '@/pages/public/BecomeTeacherPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { StudentDashboard } from '@/pages/dashboard/student/StudentDashboard';
import { StudentCourses } from '@/pages/dashboard/student/StudentCourses';
import { StudentLiveClasses } from '@/pages/dashboard/student/StudentLiveClasses';
import { NotificationSettings } from '@/pages/dashboard/student/NotificationSettings';
import { TeacherDashboard } from '@/pages/dashboard/teacher/TeacherDashboard';
import { TeacherCourses } from '@/pages/dashboard/teacher/TeacherCourses';
import { TeacherAnalytics } from '@/pages/dashboard/teacher/TeacherAnalytics';
import { AdminDashboard } from '@/pages/dashboard/admin/AdminDashboard';
import { AdminTeachers } from '@/pages/dashboard/admin/AdminTeachers';
import { AdminCourses } from '@/pages/dashboard/admin/AdminCourses';
import { ContactPage } from '@/pages/public/ContactPage';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/hooks/use-auth';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/layout/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/courses" element={<PageTransition><CoursesPage /></PageTransition>} />
          <Route path="/courses/:id" element={<PageTransition><CourseDetailPage /></PageTransition>} />
          <Route path="/teachers" element={<PageTransition><TeachersPage /></PageTransition>} />
          <Route path="/become-teacher" element={<PageTransition><BecomeTeacherPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />

        {/* Student Dashboard */}
        <Route path="/dashboard/student" element={<DashboardLayout role="STUDENT" />}>
          <Route index element={<PageTransition><StudentDashboard /></PageTransition>} />
          <Route path="courses" element={<PageTransition><StudentCourses /></PageTransition>} />
          <Route path="live-classes" element={<PageTransition><StudentLiveClasses /></PageTransition>} />
          <Route path="notifications" element={<PageTransition><NotificationSettings /></PageTransition>} />
          <Route path="*" element={<PageTransition><div className="p-4">Page under construction</div></PageTransition>} />
        </Route>

        {/* Teacher Dashboard */}
        <Route path="/dashboard/teacher" element={<DashboardLayout role="TEACHER" />}>
          <Route index element={<PageTransition><TeacherDashboard /></PageTransition>} />
          <Route path="courses" element={<PageTransition><TeacherCourses /></PageTransition>} />
          <Route path="analytics" element={<PageTransition><TeacherAnalytics /></PageTransition>} />
          <Route path="*" element={<PageTransition><div className="p-4">Page under construction</div></PageTransition>} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/dashboard/admin" element={<DashboardLayout role="ADMIN" />}>
          <Route index element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="teachers" element={<PageTransition><AdminTeachers /></PageTransition>} />
          <Route path="courses" element={<PageTransition><AdminCourses /></PageTransition>} />
          <Route path="*" element={<PageTransition><div className="p-4">Page under construction</div></PageTransition>} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-center" richColors />
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

