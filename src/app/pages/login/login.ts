import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { toSignal } from '@angular/core/rxjs-interop';

import { UserState, Login as LoginAction } from '../../core/users/user.state';

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

  currentUser = toSignal(
    this.store.select(UserState.currentUser),
    { initialValue: null }
  );

  constructor() {
    effect(() => {
      if (this.currentUser()) this.router.navigate(['/']);
    });
  }

  login() {
    this.errorMessage.set('');
    const emailValue = this.email();

    if (!emailValue) {
      this.errorMessage.set('Email is required');
      return;
    }

    this.store.dispatch(new LoginAction(emailValue));

    if (this.store.selectSnapshot(UserState.currentUser)) {
      this.router.navigate(['/']);
    }
  }
}
