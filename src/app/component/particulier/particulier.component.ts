import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Collecte} from "../../models/collecte.model";
import {NgIf} from "@angular/common";
import {addCollecte, loadCollectes} from "../../store/collecte/collecte.actions";
import {Observable, take} from "rxjs";
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
    this.store.dispatch(loadCollectes({ id : this.AuthId}));
    this.collectes$ = this.store.select(selectAllCollectes);
  }


  ngOnInit(): void {
    this.collecteForm = this.fb.group({
      type: ['', Validators.required],
      poids: ['', [Validators.required, Validators.min(1000)]],
      adresse: ['', Validators.required],
      date: ['', [Validators.required]], // Apply date validation
      horaire: ['', Validators.required], // Keep required validation for horaire
      notes: [''],
      status: ['En attente', Validators.required], // Default to 'En attente'
      collecteurId: [0, Validators.required], // Default value for collecteurId
    });
  }




  onSubmitForm(): void {
    if (this.collecteForm.invalid) {
      return;
    }

    this.collectes$.pipe(take(1)).subscribe((collectes) => {
      // Filter collectes where status is "En attente" or "En cours"
      const userCollectes = collectes.filter(
        (c) => c.CollecteId === this.AuthId && (c.status === "En attente" || c.status === "En cours")
      );

      // Count pending collectes
      const pendingCount = userCollectes.length;

      // Calculate total weight in grams
      const totalWeight = userCollectes.reduce((sum, c) => sum + c.poids, 0);

      // Get form data
      const formData = this.collecteForm.value;
      const newCollecteWeight = formData.poids; // Assume poids is in grams

      // Business Rules: Max 3 pending requests and max 10,000g (10kg) total weight
      if (pendingCount >= 3) {
        this.sweetAlertService.errorAlert("Error", "You cannot have more than 3 pending collectes.");
        return;
      }

      if (totalWeight + newCollecteWeight > 10000) { // 10,000g = 10kg
        this.sweetAlertService.errorAlert("Error", "Total collecte weight cannot exceed 10kg (10,000g).");
        return;
      }

      // Create collecte object
      const collecte: Collecte = {
        id: uuidv4(),
        type: formData.type,
        CollecteId: this.AuthId,
        poids: formData.poids, // Keep it in grams
        adresse: formData.adresse,
        date: formData.date,
        horaire: formData.horaire,
        notes: formData.notes || '',
        status: formData.status,
        collecteurId: "",
      };

      // Dispatch action
      this.store.dispatch(addCollecte({ collecte }));

      // Reset form
      this.collecteForm.reset();

      this.collecteForm.patchValue({
        status: 'En attente',
        collecteurId: 0
      });

      this.sweetAlertService.successAlert("Success", "Collecte added successfully!");
    });
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
