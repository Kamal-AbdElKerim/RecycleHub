import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { registerUser } from "../../store/user/auth.actions";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../../models/User";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import { Observable } from "rxjs";
import { selectAuthError, selectCurrentUser } from "../../store/user/auth.selectors";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    birthDate: new FormControl('', [Validators.required]),
    profilePicture: new FormControl(''),
  });

  currentUser$: Observable<User | null>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {

    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.error$ = this.store.pipe(select(selectAuthError));



  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = {
        id: uuidv4(),
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
        firstName: this.registerForm.value.firstName ?? '',
        lastName: this.registerForm.value.lastName ?? '',
        address: this.registerForm.value.address ?? '',
        phone: this.registerForm.value.phone ?? '',
        birthDate: this.registerForm.value.birthDate ?? '',
        profilePicture: this.registerForm.value.profilePicture ?? '',
        role: "particulier",
      };
      this.store.dispatch(registerUser({ user }));
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
