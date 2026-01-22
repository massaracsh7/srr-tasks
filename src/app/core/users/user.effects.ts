import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { User } from '../../models/user.model';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
    private users: User[] = [
        { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
        { id: 2, name: 'Anna Petrova', email: 'anna@example.com', role: 'teacher' }
    ];

    public actions$ = inject(Actions);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.login),
            map(action => {
                const user = this.users.find(u => u.email === action.email) || null;
                return UserActions.loginSuccess({ user });
            }),
            tap(action => {
                if (action.user) {
                    localStorage.setItem('currentUser', JSON.stringify(action.user));
                } else {
                    localStorage.removeItem('currentUser');
                }
            })
        ),
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.logout),
            map(action => {
                return UserActions.logoutSuccess();
            }),
            tap(() => {
                if (localStorage.getItem('currentUser')) {
                    localStorage.removeItem('currentUser');
                }
            })
        )
    )

   restoreSession$ = createEffect(() => {
    if (typeof localStorage === 'undefined') {
      return of();
    }

    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      return of();
    }

    const storedUser: User = JSON.parse(stored);
    const userAuth = this.users.find(u => u.email === storedUser.email);

    if (userAuth) {
      return of(UserActions.loginSuccess({ user: userAuth }));
    }

    localStorage.removeItem('currentUser');
    return of(UserActions.logoutSuccess());
  });
}
