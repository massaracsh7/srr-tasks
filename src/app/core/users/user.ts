import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../models/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private router = inject(Router);

  users = signal<User[]>([
    { id: 1, name: 'Ivan Ivanov', email: 'ivan@example.com', role: 'student' },
    { id: 2, name: 'Anna Petrova', email: 'anna@example.com', role: 'teacher' }
  ]);

  currentUser = signal<User | null>(null);

  login(email: string) {
    const user = this.users().find(u => u.email === email) || null;
    this.currentUser.set(user);
    return user;
  }

  logout() {
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }
}