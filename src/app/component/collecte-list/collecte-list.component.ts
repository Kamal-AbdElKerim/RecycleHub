import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {Collecte} from "../../models/collecte.model";
import {select, Store} from "@ngrx/store";
import {selectAllCollectes, selectCollecteError} from "../../store/collecte/collecte.selectors";
import {deleteCollecte, loadCollectes, updateCollecte} from "../../store/collecte/collecte.actions";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {SweetAlertService} from "../../service/sweet-alert.service";
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {selectCurrentUser} from "../../store/user/selectors/auth.selectors";
import {User} from "../../models/User";

@Component({
  selector: 'app-collecte-list',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    DatePipe,
    NgForOf,
    FormsModule
  ],
  templateUrl: './collecte-list.component.html',
  styleUrl: './collecte-list.component.css'
})
export class CollecteListComponent  {
  collectes$: Observable<Collecte[]>;
  editingCollecte!: Collecte | null ;
  errorMessage: string = '';
  currentUser$: Observable<User | null>;
  AuthId: string = "" ;
  error$: Observable<string | null>;
  constructor(private store: Store , private sweetAlertService: SweetAlertService) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.currentUser$.subscribe(data => this.AuthId = data?.id ? data?.id : "");

    this.store.dispatch(loadCollectes({ id : this.AuthId}));
    this.collectes$ = this.store.select(selectAllCollectes);
    this.error$ = this.store.select(selectCollecteError);


  }



  deleteCollecte(collecteId : string){
    this.sweetAlertService.confirmDialog(
      'Are you sure?',
      'This action cannot be undone!',
      () => {
        console.log('Item deleted successfully!');
        this.store.dispatch(deleteCollecte({id : collecteId}));
        this.sweetAlertService.successAlert('Deleted!', 'The item has been removed.');
        this.store.dispatch(loadCollectes({ id : this.AuthId}));
      }
    );
}

  startEditing(collecte: Collecte) {
    this.editingCollecte = { ...collecte };
    this.errorMessage = '';
  }
  cancelEdit() {
    this.editingCollecte = null;
  }

  // Save the updated collecte
  saveUpdate() {
    if (!this.editingCollecte) return;

    // Validate poids (at least 1000g required)
    if (this.editingCollecte.poids < 1000) {
      this.errorMessage = 'Poids estimé (minimum 1000g obligatoire)';
      return;
    }

    // Check pending collectes and total weight before updating
    this.collectes$.pipe(take(1)).subscribe((collectes) => {
      if (!this.editingCollecte) return; // Ensure editingCollecte is not null

      const userCollectes = collectes.filter(
          (c) => c.CollecteId === this.AuthId && (c.status === "En attente" || c.status === "En cours")
      );

      // Count pending collectes (excluding the one being edited)
      const pendingCount = userCollectes.filter(c => c.id !== this.editingCollecte!.id).length;

      // Calculate total weight (excluding the old poids of the edited collecte)
      const totalWeight = userCollectes.reduce((sum, c) => sum + (c.id !== this.editingCollecte!.id ? c.poids : 0), 0);

      // Business Rules: Max 3 pending requests and max 10,000g (10kg) total weight
      if (pendingCount >= 3) {
        this.sweetAlertService.errorAlert("Error", "You cannot have more than 3 pending collectes.");
        return;
      }

      if (totalWeight + this.editingCollecte.poids > 10000) {
        this.sweetAlertService.errorAlert("Error", "Total collecte weight cannot exceed 10kg (10,000g).");
        return;
      }

      // Reset error message if all validations pass
      this.errorMessage = '';

      // Dispatch update action
      this.store.dispatch(updateCollecte({ collecte: this.editingCollecte }));

      // Reset form and success alert
      this.editingCollecte = null;
      this.sweetAlertService.successAlert('Success', 'Updated successfully!');
    });
  }




}
