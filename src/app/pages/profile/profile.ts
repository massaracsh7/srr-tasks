import { Component, signal } from '@angular/core';
import { UserService } from '../../core/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  currentLang = signal<'EN'|'RU'>('EN');

  constructor(public userService: UserService) {}
}
