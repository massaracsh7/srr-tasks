import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user';

export const authGuard: CanActivateFn = (route, state) => {
 const userService = inject(UserService);
  const router = inject(Router);
  if (!userService.currentUser()) {
    router.navigate(['/login']);
    return false;
  }
  return true;};
