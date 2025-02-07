import {Component} from '@angular/core';
import {Observable, take} from "rxjs";
import {Collecte} from "../../models/collecte.model";
import {select, Store} from "@ngrx/store";
import {selectAllCollectes, selectCollecteError} from "../../store/collecte/collecte.selectors";
import {deleteCollecte, loadCollectes, updateCollecte} from "../../store/collecte/collecte.actions";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {SweetAlertService} from "../../service/sweet-alert.service";
import {selectCurrentUser} from "../../store/user/selectors/auth.selectors";
import {User} from "../../models/User";
import {CollecteItemComponent} from "./collecte-item/collecte-item.component";

@Component({
  selector: 'app-collecte-list',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    DatePipe,
    NgForOf,
    CollecteItemComponent
  ],
  templateUrl: './collecte-list.component.html',
  styleUrl: './collecte-list.component.css'
})
export class CollecteListComponent {
  collectes$: Observable<Collecte[]>;
  currentUser$: Observable<User | null>;
  error$: Observable<string | null>;
  AuthId: string = "";

  constructor(private store: Store, private sweetAlertService: SweetAlertService) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.currentUser$.subscribe(data => this.AuthId = data?.id ? data.id : "");
    this.store.dispatch(loadCollectes({id: this.AuthId}));
    this.collectes$ = this.store.select(selectAllCollectes);
    this.error$ = this.store.select(selectCollecteError);

  }

  deleteCollecte(collecteId: string) {
    this.sweetAlertService.confirmDialog(
        'Are you sure?',
        'This action cannot be undone!',
        () => {
          this.store.dispatch(deleteCollecte({id: collecteId}));
          this.sweetAlertService.successAlert('Deleted!', 'The item has been removed.');
          this.store.dispatch(loadCollectes({id: this.AuthId}));
        }
    );
  }

  updateCollecte(updatedCollecte: Collecte) {
    this.store.dispatch(updateCollecte({collecte: updatedCollecte}));
    this.sweetAlertService.successAlert('Success', 'Updated successfully!');

  }
}
