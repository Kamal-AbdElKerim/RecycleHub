import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Route, Router} from "@angular/router";
import {addCollecte, loadCollectes, loadCollectesByCity, updateCollecte} from "../../store/collecte/collecte.actions";
import {selectCurrentUser} from "../../store/user/selectors/auth.selectors";
import {Observable} from "rxjs";
import {User} from "../../models/User";
import {selectAllCollectes} from "../../store/collecte/collecte.selectors";
import {Collecte} from "../../models/collecte.model";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {CollecteurListComponent} from "../collecteur-list/collecteur-list.component";
import {SweetAlertService} from "../../service/sweet-alert.service";

@Component({
  selector: 'app-collecteur',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CollecteurListComponent
  ],
  templateUrl: './collecteur.component.html',
  styleUrl: './collecteur.component.css'
})
export class CollecteurComponent {
  currentUser$: Observable<User | null>;
  authID : string = "" ;
  collectes$: Observable<Collecte[]>;
  address: string = "" ;
  editingCollecte: Collecte | null = null;
  constructor(private store: Store, private router: Router , private sweetAlertService: SweetAlertService) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.currentUser$.subscribe(data => this.authID = data?.id ? data?.id : "");
    this.currentUser$.subscribe(data => this.address = data?.address ? data?.address : "");
    this.store.dispatch(loadCollectesByCity({ address : this.address}));
    this.collectes$ = this.store.select(selectAllCollectes);
    console.log(this.address)
    this.collectes$.subscribe(data => console.log(data))

  }


  OccupeeCollecte(collecte: Collecte) {
    this.editingCollecte = { ...collecte };
    this.editingCollecte.status = "Occupée";
    this.editingCollecte.collecteurId = this.authID;
    this.store.dispatch(updateCollecte({ collecte: this.editingCollecte }));

    // Reset form and success alert
    this.editingCollecte = null;
    this.sweetAlertService.successAlert('Success', 'Updated successfully!');
  }


}
