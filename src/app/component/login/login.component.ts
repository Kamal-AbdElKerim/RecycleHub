import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Route, Router} from "@angular/router";
import {loginUser} from "../../store/user/actions/auth.actions";
import {selectAuthError, selectCurrentUser} from "../../store/user/selectors/auth.selectors";
import {Observable} from "rxjs";
import {User} from "../../models/User";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  currentUser$: Observable<User | null>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.error$ = this.store.pipe(select(selectAuthError));



  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email && password) { // Ensure they are not null
        this.store.dispatch(loginUser({ email, password }));
        this.currentUser$.subscribe(user => {
          if (user) {
            console.log(user);
            const role = user.role === "particulier" ? 'particulier' : 'collecteur';
            this.router.navigate([role]);
          }
        });
      }
    }
  }

}
