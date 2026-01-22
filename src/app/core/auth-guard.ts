import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserState } from './users/user.state';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  const currentUser = toSignal(store.select(UserState.currentUser), { initialValue: null });

  if (!currentUser()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
