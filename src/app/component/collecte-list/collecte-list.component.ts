import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
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
    console.log(this.AuthId)
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
    if (this.editingCollecte) {
      // Validate "poids" field (at least 1000g)
      console.log(this.editingCollecte.poids)
      if (this.editingCollecte.poids < 1000) {
        this.errorMessage = 'Poids estimé (minimum 1000g obligatoire)'; // Set error message
      } else {
        this.errorMessage = ''; // Reset error message if validation is passed
        console.log(this.editingCollecte);
        this.store.dispatch(updateCollecte({ collecte: this.editingCollecte }));
        this.editingCollecte = null;
        this.sweetAlertService.successAlert('Success', 'Updated successfully!');
      }
    }
  }


}
