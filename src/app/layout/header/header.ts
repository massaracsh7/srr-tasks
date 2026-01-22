import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TranslatePipe } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserState, Logout } from '../../core/users/user.state';
import { toSignal } from '@angular/core/rxjs-interop';


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

  currentUser = toSignal(this.store.select(UserState.currentUser), { initialValue: null });
  constructor() {
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }
}
