import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Collecte} from "../../models/collecte.model";
import {NgIf} from "@angular/common";
import {addCollecte} from "../../store/collecte/collecte.actions";
import {Observable} from "rxjs";
import {User} from "../../models/User";
import {selectCurrentUser} from "../../store/user/selectors/auth.selectors";
import {v4 as uuidv4} from "uuid";
import {selectAllCollectes, selectCollecteError} from "../../store/collecte/collecte.selectors";
import {Router} from "@angular/router";
import {SweetAlertService} from "../../service/sweet-alert.service";

@Component({
  selector: 'app-particulier',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './particulier.component.html',
  styleUrl: './particulier.component.css'
})
export class ParticulierComponent implements OnInit {

  collecteForm!: FormGroup;
  currentUser$: Observable<User | null>;
  AuthId: string = ""

  collectes$!: Observable<Collecte[]>;  // Observable to hold the collectes
  error$!: Observable<string>;
  constructor(private fb: FormBuilder, private store: Store , private router: Router , private sweetAlertService: SweetAlertService) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.currentUser$.subscribe(currentUser => {this.AuthId = currentUser?.id ? currentUser?.id : ""});
  }


  ngOnInit(): void {
    this.collecteForm = this.fb.group({
      type: ['', Validators.required],
      poids: ['', [Validators.required, Validators.min(1000)]],
      adresse: ['', Validators.required],
      date: ['', Validators.required],
      horaire: ['', Validators.required],
      notes: [''],
      status: ['En attente', Validators.required], // Default to 'En attente'
      collecteurId: [0, Validators.required], // Collecteur ID can be a dynamic value based on the logged-in user
    });
    this.collectes$ = this.store.select(selectAllCollectes);
  }

  // Custom validator for date
  dateValidator(control: any) {
    const date = new Date(control.value);
    const minDate = new Date('2025-02-05T09:00');
    const maxDate = new Date('2025-02-05T18:00');
    return date >= minDate && date <= maxDate ? null : { invalidDate: true };
  }

  onSubmitForm(): void {
    if (this.collecteForm.invalid) {
      return;
    }

    const formData = this.collecteForm.value;
    const collecte: Collecte = {
      id: uuidv4(),
      type: formData.type,
      CollecteId: this.AuthId,
      poids: formData.poids,
      adresse: formData.adresse,
      date: formData.date,
      horaire: formData.horaire,
      notes: formData.notes || '',
      status: formData.status,
      collecteurId: "",
    };

    this.store.dispatch(addCollecte({ collecte }));

    this.collecteForm.reset();


    this.collecteForm.patchValue({
      status: 'En attente',
      collecteurId: 0
    });

    this.sweetAlertService.successAlert("Success", "Collecte added successfully!");
  }

  get poids() {
    return this.collecteForm.get('poids');
  }

  get date() {
    return this.collecteForm.get('date');
  }

  get horaire() {
    return this.collecteForm.get('horaire');
  }

  get collecteurId() {
    return this.collecteForm.get('collecteurId');
  }
}
