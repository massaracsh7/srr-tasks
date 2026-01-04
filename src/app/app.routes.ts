import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { CourseDetail } from './pages/course-detail/course-detail';
import { Lesson } from './pages/lesson/lesson';
import { authGuard } from './core/auth-guard';
import { CreateCourse } from './pages/create-course/create-course';


export const routes: Routes = [
  { path: '', component: Home },

  { path: 'login', component: Login },

  { path: 'profile', component: Profile, canActivate: [authGuard] },

  { path: 'course/:id', component: CourseDetail },

  { path: 'course/:courseId/:lessonId', component: Lesson, canActivate: [authGuard] },

  { path: 'create-course', component: CreateCourse, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];