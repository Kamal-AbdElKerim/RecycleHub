import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { User } from "../../models/User";
import { select, Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { selectCurrentUser } from "../../store/user/auth.selectors";
import { deleteUser } from "../../store/user/auth.actions";
import { NgIf } from "@angular/common";

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
export class SettingsComponent implements OnDestroy {
  currentUser$: Observable<User | null>;
  settingsForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private router: Router) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));

    this.settingsForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      birthDate: new FormControl('', Validators.required)
    });

    this.currentUser$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.settingsForm.patchValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          phone: user.phone,
          birthDate: user.birthDate
        });
      }
    });
  }

  updateProfile() {
    if (this.settingsForm.valid) {
      console.log(this.settingsForm.value)
      //this.store.dispatch(updateUser({ user: this.settingsForm.value }));
    }
  }

  deleteAccount() {
    const userId = this.settingsForm.get('id')?.value;

    if (!userId) {
      console.error("User ID not found!");
      return;
    }

    if (confirm('Are you sure you want to delete your account?')) {
      this.store.dispatch(deleteUser({ userId }));
      this.router.navigate(['/register']);
    }
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
