import { Component } from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {User} from "../../models/User";
import {Collecte} from "../../models/collecte.model";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {selectCurrentUser} from "../../store/user/selectors/auth.selectors";
import {loadCollectesByCity, loadCollectesByCollecteurId, updateCollecte} from "../../store/collecte/collecte.actions";
import {selectAllCollectes} from "../../store/collecte/collecte.selectors";
import {SweetAlertService} from "../../service/sweet-alert.service";

@Component({
  selector: 'app-collecteur-list',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './collecteur-list.component.html',
  styleUrl: './collecteur-list.component.css'
})
export class CollecteurListComponent {
  currentUser$: Observable<User | null>;
  collectes$: Observable<Collecte[]>;
  id: string = "" ;
  editingCollecte: Collecte | null = null;
  constructor(private store: Store, private router: Router ,  private sweetAlertService: SweetAlertService) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.currentUser$.subscribe(data => this.id = data?.id ? data?.id : "");
    console.log(this.id)
    this.store.dispatch(loadCollectesByCollecteurId({ id : this.id}));
    this.collectes$ = this.store.select(selectAllCollectes);

  }


  // Method to update the status
  updateStatus(collecte: Collecte, newStatus: 'En attente' | 'Occupée' | 'En cours' | 'Validée' | 'Rejetée'): void {
    this.editingCollecte = { ...collecte };
    this.editingCollecte.status = newStatus;
    this.store.dispatch(updateCollecte({ collecte: this.editingCollecte }));

    // Reset form and show success alert
    this.editingCollecte = null;
    this.sweetAlertService.successAlert('Success', 'Updated successfully!');
  }


}
