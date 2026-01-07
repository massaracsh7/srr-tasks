import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile').then(m => m.Profile),
    canActivate: [authGuard],
  },
  {
    path: 'course/:id',
    loadComponent: () =>
      import('./pages/course-detail/course-detail').then(m => m.CourseDetail),
  },
  {
    path: 'course/:courseId/:lessonId',
    loadComponent: () =>
      import('./pages/lesson/lesson').then(m => m.Lesson),
    canActivate: [authGuard],
  },
  {
    path: 'create-course',
    loadComponent: () =>
      import('./pages/create-course/create-course').then(m => m.CreateCourse),
    canActivate: [authGuard],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then(m => m.NotFound),
  },
];
