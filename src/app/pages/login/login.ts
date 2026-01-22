import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import * as UserActions from '../../core/users/user.actions';
import { selectCurrentUser } from '../../core/users/user.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    TranslatePipe,
    InputTextModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private store = inject(Store);
  private router = inject(Router);

  email = signal('');
  errorMessage = signal('');
  currentUser = signal<null | { id: number; name: string; email: string; role: string }>(null);

  constructor() {
    effect(() => {
      this.store.select(selectCurrentUser).subscribe(user => {
        this.currentUser.set(user);
        if (user) {
          this.router.navigate(['/']);
        }
      });
    });
  }

  login() {
    this.errorMessage.set('');
    this.store.dispatch(UserActions.login({ email: this.email() }));
  }
}
