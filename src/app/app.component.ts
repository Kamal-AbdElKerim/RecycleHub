import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";
import {RegisterComponent} from "./component/register/register.component";
import {NavbarComponent} from "./component/navbar/navbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, RegisterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RecycleHub';

}
