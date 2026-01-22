import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import * as UserActions from '../../core/users/user.actions';
import { selectCurrentUser } from '../../core/users/user.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  private store = inject(Store);
  private router = inject(Router);

  currentUser = signal<null | { id: number; name: string; email: string; role: string }>(null);

  constructor() {
    effect(() => {
      this.store.select(selectCurrentUser).subscribe(user => this.currentUser.set(user));
    });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.store.dispatch(UserActions.logout());
    this.router.navigate(['/login']);
  }
}
