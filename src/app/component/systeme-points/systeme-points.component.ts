import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Collecte} from "../../models/collecte.model";
import {User} from "../../models/User";
import {SweetAlertService} from "../../service/sweet-alert.service";
import {selectCurrentUser} from "../../store/user/selectors/auth.selectors";
import {loadCollectes} from "../../store/collecte/collecte.actions";
import {selectAllCollectes, selectCollecteError} from "../../store/collecte/collecte.selectors";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-systeme-points',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './systeme-points.component.html',
  styleUrl: './systeme-points.component.css'
})
export class SystemePointsComponent {

  collectes$: Observable<Collecte[]>;
  currentUser$: Observable<User | null>;
  AuthId: string = "";
  error$: Observable<string | null>;
  totalPoints: number = 0;
  convertPoints : boolean = false;

  wastePoints: Record<string, number> = {
    'Plastique': 2,
    'Verre': 1,
    'Papier': 1,
    'métal': 5
  };


  constructor(private store: Store, private sweetAlertService: SweetAlertService) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.currentUser$.subscribe(data => this.AuthId = data?.id ? data?.id : "");

    this.store.dispatch(loadCollectes({ id: this.AuthId }));
    this.collectes$ = this.store.select(selectAllCollectes);
    this.error$ = this.store.select(selectCollecteError);

    this.collectes$.subscribe(data => {
      const validatedCollectes = data.filter(collecte => collecte.status === "Validée");
       console.log(validatedCollectes)
      this.totalPoints = validatedCollectes.reduce((acc, collecte) => {
        return acc + collecte.type.reduce((typeAcc: number, type: string) => {
          return typeAcc + ((this.wastePoints[type] || 0) * (collecte.poids / 1000)); // Convert to kg
        }, 0);
      }, 0);


      console.log(`Total Points: ${this.totalPoints}`);
    });
  }

  // Method to convert points to voucher value
  convertPointsToVoucher(): string {
    this.convertPoints = true
    if (this.totalPoints == 500) {
      return `Bon d'achat de 350 Dh pour ${this.totalPoints} points`;
    } else if (this.totalPoints == 200) {
      return `Bon d'achat de 120 Dh pour ${this.totalPoints} points`;
    } else if (this.totalPoints == 100) {
      return `Bon d'achat de 50 Dh pour ${this.totalPoints} points`;
    } else {
      return `Pas assez de points pour un bon d'achat.`;
    }
  }
}
