import { signal } from '@angular/core';
import { User } from '../models/models';

export class UserService {
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
  }
}