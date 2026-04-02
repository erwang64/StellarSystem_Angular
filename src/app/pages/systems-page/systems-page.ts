import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { StellarSystem } from '../../model/stellar-system';
import { StellarSystemsService } from '../../services/stellar-systems.service';



@Component({
  selector: 'app-systems-page',
  imports: [RouterLink],
  templateUrl: './systems-page.html',
  styleUrl: './systems-page.scss',
})
export class SystemsPage {
  readonly allSystems: WritableSignal<Array<StellarSystem>> = signal<Array<StellarSystem>>([]);
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private service: StellarSystemsService) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const obs: Observable<Array<StellarSystem>> = this.service.getAllSystems();
    const tmpSystems = new Array<StellarSystem>();
    obs.subscribe((data: StellarSystem[]) => {
      data.forEach((tmpSys: StellarSystem) => {
        const curSys = new StellarSystem(tmpSys.name, tmpSys.posX, tmpSys.posY);
        curSys.id = tmpSys.id;
        curSys.star = tmpSys.star;
        curSys.planets = tmpSys.planets;
        tmpSystems.push(curSys);
      });
      this.allSystems.set(tmpSystems);
    });
  }

  onEdit(system: StellarSystem): void {
    // À implémenter : navigation vers une page d'édition ou ouverture d'un modal
    console.log('Modifier', system);
    // Exemple : this.router.navigate(['/edit-system', system.id]);
  }

  onDelete(system: StellarSystem): void {
    // À implémenter : demande de confirmation puis suppression
    console.log('Supprimer', system);
    // Appel au service : this.service.deleteSystem(system.id).subscribe(...)
  }
}