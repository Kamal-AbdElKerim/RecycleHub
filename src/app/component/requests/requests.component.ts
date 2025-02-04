import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {CollectionRequest} from "../../models/request.model";
import {Store} from "@ngrx/store";
import {selectAllRequests} from "../../store/requests/requests.selectors";
import * as RequestsActions from '../../store/requests/requests.actions';
import { v4 as uuidv4 } from 'uuid';
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {
  requests$: Observable<CollectionRequest[]>;
  newRequest: Partial<CollectionRequest> = {
    address: '',
    weight: 1000,
    wasteTypes: [],
    date: '',
    timeSlot: '',
    status: 'En attente',
  };

  constructor(private store: Store) {
    this.requests$ = this.store.select(selectAllRequests);
  }

  addNewRequest() {
    if (!this.newRequest.address || !this.newRequest.weight || !this.newRequest.date || !this.newRequest.timeSlot) {
      return;
    }

    const request: CollectionRequest = {
      id: uuidv4(),
      userId: '123', // ID fictif de l'utilisateur
      ...this.newRequest,
    } as CollectionRequest;

    this.store.dispatch(RequestsActions.addRequest({ request }));
    this.newRequest = { address: '', weight: 1000, wasteTypes: [], date: '', timeSlot: '', status: 'En attente' };
  }

  updateRequest(id: string, changes: Partial<CollectionRequest>) {
    this.store.dispatch(RequestsActions.updateRequest({ id, changes }));
  }

  deleteRequest(id: string) {
    this.store.dispatch(RequestsActions.deleteRequest({ id }));
  }
}
