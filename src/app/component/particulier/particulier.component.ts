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

  collectes$!: Observable<Collecte[]>;
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
      date: ['', [Validators.required]],
      horaire: ['', Validators.required],
      notes: [''],
      status: ['En attente', Validators.required],
      collecteurId: [0, Validators.required],
    });
  }




  onSubmitForm(): void {
    if (this.collecteForm.invalid) {
      return;
    }

    this.collectes$.pipe(take(1)).subscribe((collectes) => {

      const userCollectes = collectes.filter(
        (c) => c.CollecteId === this.AuthId && (c.status === "En attente" || c.status === "En cours")
      );


      const pendingCount = userCollectes.length;

      const totalWeight = userCollectes.reduce((sum, c) => sum + c.poids, 0);

      const formData = this.collecteForm.value;
      const newCollecteWeight = formData.poids;

      if (pendingCount >= 3) {
        this.sweetAlertService.errorAlert("Error", "You cannot have more than 3 pending collectes.");
        return;
      }
      if ((totalWeight / 1000) + newCollecteWeight > 10000) { // 10,000g = 10kg
        this.sweetAlertService.errorAlert("Error", "Total collecte weight cannot exceed 10kg (10,000g).");
        return;
      }

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
