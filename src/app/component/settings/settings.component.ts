import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { User } from "../../models/User";
import { select, Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { selectCurrentUser, selectUpdateError } from "../../store/user/selectors/auth.selectors";
import { deleteUser, updateUser } from "../../store/user/actions/auth.actions";
import { NgIf } from "@angular/common";
import {SweetAlertService} from "../../service/sweet-alert.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent  {
  currentUser$: Observable<User | null>;
  updateError$: Observable<string | null>;
  settingsForm: FormGroup;
  currentUserId : string  =''

  constructor(private store: Store, private router: Router , private sweetAlertService: SweetAlertService) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.updateError$ = this.store.pipe(select(selectUpdateError));

    this.settingsForm = new FormGroup({
      email: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl(''),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      birthDate: new FormControl(''),
      role: new FormControl(''), // Add the role field
      profilePicture: new FormControl('')
    });

    this.currentUser$.subscribe(user => {
      if (user) {
        this.settingsForm.patchValue({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password : user.password,
          address: user.address,
          phone: user.phone,
          birthDate: user.birthDate,
          role: user.role,
          profilePicture: user.profilePicture

        });
        this.currentUserId = user.id;
      }
    });

  }

  updateProfile() {
    if (this.settingsForm.valid) {
      const updatedUser: User = {
        ...this.settingsForm.value,
        id: this.currentUserId
      };

      console.log("Updating user:", updatedUser);

      if (!updatedUser.id) {
        console.error("User ID is missing!");
        return;
      }

      this.store.dispatch(updateUser({ user: updatedUser }));
      this.sweetAlertService.successAlert('Success', 'Updated successfully!');
    }
  }


  deleteAccount() {
    const userId = this.currentUserId;

    if (!userId) {
      console.error("User ID is missing!");
      return;
    }

    this.sweetAlertService.confirmDialog(
      'Are you sure?',
      'Do you really want to delete your account? This action cannot be undone.',
      () => {
        this.store.dispatch(deleteUser({ userId }));
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }
    );
  }



}
