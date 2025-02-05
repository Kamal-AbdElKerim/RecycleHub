import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Collecte} from "../models/collecte.model";

@Injectable({
  providedIn: 'root'
})
export class CollecteService {
  private API_URL = 'http://localhost:3000/collectes';

  constructor(private http: HttpClient) {}

  getCollectes(): Observable<Collecte[]> {
    return this.http.get<Collecte[]>(this.API_URL);
  }

  addCollecte(collecte: Collecte): Observable<Collecte> {
    console.log(collecte);
    return this.http.post<Collecte>(this.API_URL, collecte);
  }

  deleteCollecte(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  updateCollecte(collecte: Collecte): Observable<Collecte> {
    return this.http.put<Collecte>(`${this.API_URL}/${collecte.id}`, collecte);
  }
}
