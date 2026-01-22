import { State, Action, Selector, StateContext, NgxsOnInit } from '@ngxs/store';
import { User } from '../../models/user.model';

export interface UserStateModel {
  currentUser: User | null;
}

export class Login {
  static readonly type = '[User] Login';
  constructor(public email: string) {}
}

export class Logout {
  static readonly type = '[User] Logout';
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    currentUser: null
  }
})
export class UserState implements NgxsOnInit {

  private users: User[] = [
    { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
    { id: 2, name: 'Anna Petrova', email: 'anna@example.com', role: 'teacher' }
  ];

  @Selector()
  static currentUser(state: UserStateModel) {
    return state.currentUser;
  }

  ngxsOnInit(ctx: StateContext<UserStateModel>) {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('currentUser');
    if (!stored) return;

    const user = JSON.parse(stored);
    ctx.patchState({ currentUser: user });
  }

  @Action(Login)
  login(ctx: StateContext<UserStateModel>, { email }: Login) {
    const user = this.users.find(u => u.email === email) ?? null;
    ctx.patchState({ currentUser: user });

    if (typeof window !== 'undefined') {
      user
        ? localStorage.setItem('currentUser', JSON.stringify(user))
        : localStorage.removeItem('currentUser');
    }
  }

  @Action(Logout)
  logout(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ currentUser: null });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }
}
