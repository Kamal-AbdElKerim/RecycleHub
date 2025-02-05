import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Collecte} from "../../models/collecte.model";
import {Store} from "@ngrx/store";
import {selectAllCollectes, selectCollecteError} from "../../store/collecte/collecte.selectors";
import {deleteCollecte, loadCollectes, updateCollecte} from "../../store/collecte/collecte.actions";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {SweetAlertService} from "../../service/sweet-alert.service";
import {FormsModule} from "@angular/forms";

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
export class CollecteListComponent implements OnInit {
  collectes$: Observable<Collecte[]>;
  editingCollecte!: Collecte | null ;

  AuthId: string = 'bf466b6d-517d-4e3c-a7d3-4ce054c743a8';
  error$: Observable<string | null>;
  constructor(private store: Store , private sweetAlertService: SweetAlertService) {

    this.collectes$ = this.store.select(selectAllCollectes);
    this.error$ = this.store.select(selectCollecteError);  }

  ngOnInit(): void {
    this.store.dispatch(loadCollectes());
    this.collectes$ = this.store.select(selectAllCollectes);

  }

  deleteCollecte(collecteId : string){
    this.sweetAlertService.confirmDialog(
      'Are you sure?',
      'This action cannot be undone!',
      () => {
        console.log('Item deleted successfully!');
        this.store.dispatch(deleteCollecte({id : collecteId}));
        this.sweetAlertService.successAlert('Deleted!', 'The item has been removed.');
        this.store.dispatch(loadCollectes());
      }
    );
}

  startEditing(collecte: Collecte) {
    this.editingCollecte = { ...collecte };
  }
  cancelEdit() {
    this.editingCollecte = null;
  }

  // Save the updated collecte
  saveUpdate() {
    if (this.editingCollecte) {
      console.log(this.editingCollecte)
      this.store.dispatch(updateCollecte({ collecte: this.editingCollecte }));
      this.editingCollecte = null;
      this.sweetAlertService.successAlert('Success', 'Updated successfully!');

    }
  }

}
