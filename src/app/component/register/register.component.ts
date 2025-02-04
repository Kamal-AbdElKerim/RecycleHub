import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { registerUser } from "../../store/user/auth.actions";
import { v4 as uuidv4 } from 'uuid';
import {selectAllRequests} from "../../store/requests/requests.selectors";
import {Observable} from "rxjs";
import {CollectionRequest} from "../../models/request.model";
import {selectAllUsers} from "../../store/user/auth.selectors";
import {User} from "../../models/User";
import {JsonPipe, NgIf} from "@angular/common"; // Generate unique user ID

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf
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

  users$: Observable<any>;

  constructor(private store: Store, private router: Router) {
    this.users$ = this.store.select(selectAllUsers);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      const user = {
        id: uuidv4(),
        email: formData.email!,
        password: formData.password!,
        firstName: formData.firstName!,
        lastName: formData.lastName!,
        address: formData.address!,
        phone: formData.phone!,
        birthDate: formData.birthDate!,
        profilePicture: formData.profilePicture || '',
        role: "particulier" as const,
      };

      this.store.dispatch(registerUser({ user }));
      //this.router.navigate(['/login']); // Redirect after registration
      this.users$.subscribe(data => {console.log(data)});
    }
  }
}
