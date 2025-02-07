import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-systeme-points',
  standalone: true,
  imports: [],
  templateUrl: './systeme-points.component.html',
  styleUrl: './systeme-points.component.css'
})
export class SystemePointsComponent {

  constructor(private store: Store, private router: Router) {

  }

}
