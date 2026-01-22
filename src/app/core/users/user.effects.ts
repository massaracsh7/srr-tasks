import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { User } from '../../models/models';

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
            })
        )
    );
}
