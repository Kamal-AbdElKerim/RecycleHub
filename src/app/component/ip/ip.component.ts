import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ip',
  standalone: true,
  imports: [],
  templateUrl: './ip.component.html',
  styleUrl: './ip.component.css'
})
export class IpComponent {

  Auth: any;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((resolvedData) => {
      this.Auth = resolvedData['Auth'];
      console.log(resolvedData['Auth']);
    });
  }
}
