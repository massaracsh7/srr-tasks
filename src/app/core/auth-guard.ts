import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCurrentUser } from './users/user.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  const currentUser =
    toSignal(store.select(selectCurrentUser));

  if (!currentUser()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
