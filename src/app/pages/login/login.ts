import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
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
      this.errorMessage.set('Пользователь не найден');
    }
  }
}
