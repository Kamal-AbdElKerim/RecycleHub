import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf, NgForOf, DatePipe, NgClass} from "@angular/common";
import {Collecte} from "../../../models/collecte.model";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-collecte-item',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule, DatePipe, NgClass],
  templateUrl: './collecte-item.component.html',
  styleUrl: './collecte-item.component.css'
})
export class CollecteItemComponent {
  @Input() collecte!: Collecte;
  @Output() onUpdate = new EventEmitter<Collecte>();
  @Output() onDelete = new EventEmitter<string>();



  editingCollecte: Collecte | null = null;
  errorMessage: string = '';
  @Input() error$!: Observable<string | null>;

  startEditing() {
    this.editingCollecte = {...this.collecte};
    this.errorMessage = '';
  }

  cancelEdit() {
    this.editingCollecte = null;
  }

  saveUpdate() {


    if (!this.editingCollecte) return;

    if (this.editingCollecte.poids < 1000) {
      this.errorMessage = 'Poids estimé (minimum 1000g obligatoire)';
      return;
    }

    this.onUpdate.emit(this.editingCollecte);
    this.editingCollecte = null;


  }
}
