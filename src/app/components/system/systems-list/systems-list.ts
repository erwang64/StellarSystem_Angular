import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

import { StellarSystem } from '../../../model/stellar-system';
import { StellarSystemsService } from '../../../services/stellar-systems.service';

@Component({
  selector: 'app-systems-list',
  imports: [],
  templateUrl: './systems-list.html',
  styleUrl: './systems-list.scss'
})
export class SystemsListComponent {
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
        // Copy received data in a new Object
        const curSys: StellarSystem = new StellarSystem(tmpSys.name, tmpSys.posX, tmpSys.posY);
        curSys.id = tmpSys.id;
        curSys.star = tmpSys.star;
        curSys.planets = tmpSys.planets;
        tmpSystems.push(curSys);
      });
      this.allSystems.set(tmpSystems);
    });
  }
}
