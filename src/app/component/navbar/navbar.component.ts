import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {logoutUser} from "../../store/user/actions/auth.actions";
import {selectCurrentUser} from "../../store/user/selectors/auth.selectors";
import {Observable} from "rxjs";
import {User} from "../../models/User";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentUser$: Observable<User | null>;
  user! : User;
  isLoggedIn: boolean = false;

  constructor(private store: Store, private router: Router) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));

    this.currentUser$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true ;
        this.user = user;
      }else {
        this.isLoggedIn = false ;
      }
    });

  }
  logout() : void {
    this.store.dispatch(logoutUser())
    this.router.navigate(['/login']);
  }
}
