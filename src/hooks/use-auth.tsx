/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { api } from '@/lib/api-client';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  registerPhase: (phase: number, data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('lesson360_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Verify token/get profile
          const userData = await api.get<User>('/users/profile');
          setUser(userData);
        } catch (error) {
          console.error('Failed to restore session', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await api.post<{ access_token: string, user: User }>('/auth/login', { email, password });
    const { access_token, user: userData } = response;
    
    localStorage.setItem('lesson360_token', access_token);
    setToken(access_token);
    setUser(userData);
  };

  const registerPhase = async (phase: number, data: any) => {
    let payload = {};

    if (phase === 1) {
      payload = {
        full_name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        role: data.role
      };
      const response = await api.post<{ access_token: string, user: User }>('/auth/register/phase1', payload);
      const { access_token, user: userData } = response;
      localStorage.setItem('lesson360_token', access_token);
      setToken(access_token);
      setUser(userData);
    } else if (phase === 2) {
      if (data.role === 'STUDENT') {
        payload = {
          class_level: data.gradeLevel,
          learning_goals: data.performance // Mapping loosely for now
        };
      } else {
        payload = {
          qualification: data.qualification,
          years_of_experience: data.experienceYears,
          bio: data.bio
        };
      }
      const userData = await api.post<User>('/auth/register/phase2', payload);
      setUser(userData);
    } else if (phase === 3) {
      if (data.role === 'STUDENT') {
        payload = {
          subjects_of_interest: data.subjectsToImprove,
          skills_to_improve: [data.learningStyle],
          challenge_level: data.primaryGoal
        };
      } else {
        payload = {
          subjects_of_interest: data.subjectsTaught,
          skills_to_improve: [data.availability]
        };
      }
      const userData = await api.post<User>('/auth/register/phase3', payload);
      setUser(userData);
    } else if (phase === 4) {
      payload = {
        bio: data.bio, // Syncing bio again if needed
        profile_photo: user?.profile_photo // or whatever we have
      };
      const userData = await api.post<User>('/auth/register/phase4', payload);
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem('lesson360_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated: !!user, 
      isLoading,
      login, 
      registerPhase, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
