import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { CourseDetail } from './pages/course-detail/course-detail';
import { Lesson } from './pages/lesson/lesson';

export const routes: Routes = [{ path: '', component: Home },
{ path: 'login', component: Login },
{ path: 'profile', component: Profile },
{ path: 'course/:id', component: CourseDetail },
  { path: 'course/:courseId/:lessonId', component: Lesson },
{ path: '**', redirectTo: '' }
];
