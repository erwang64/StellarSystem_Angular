import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { StellarSystem } from '../../model/stellar-system';
import { StellarSystemsService } from '../../services/stellar-systems.service';
import { ConnectionCentralizer } from '../../technical/connection-centralizer';



@Component({
  selector: 'app-systems-page',
  imports: [RouterLink, NgIf],
  templateUrl: './systems-page.html',
  styleUrl: './systems-page.scss',
})
export class SystemsPage {
  allSystems = inject(StellarSystemsService).allSystems;  // ← Utiliser directement du service
  connection = ConnectionCentralizer.getInstance();

  constructor(private service: StellarSystemsService) {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    
    // Plus simple : juste s'abonner
    this.service.getAllSystems().subscribe();
  }

  onDelete(sys: StellarSystem): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le système stellaire "${sys.name}" ?`)) {
      this.service.deleteSystem(sys.id).subscribe(() => {
        alert(`Système stellaire "${sys.name}" supprimé !`);
      });
    }
  }

}