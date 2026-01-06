import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/user';
import { TranslatePipe } from '@ngx-translate/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, TranslatePipe, InputTextModule, ButtonModule, MessageModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = signal('');
  errorMessage = signal('');

  constructor(private userService: UserService, private router: Router) {}

  login() {
    const user = this.userService.login(this.email());
    if (user) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage.set('LOGIN.ERROR_USER_NOT_FOUND');
    }
  }
}
