import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
export class SystemsListComponent implements OnInit {
  allSystems: StellarSystem[];
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private service: StellarSystemsService) {
    this.allSystems = [];
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const obs: Observable<StellarSystem[]> = this.service.getAllSystems();
    obs.subscribe((data: StellarSystem[]) => {
      data.forEach((tmpSys: StellarSystem) => {
        const curSys: StellarSystem = new StellarSystem(tmpSys.name, tmpSys.posX, tmpSys.posY);
        curSys.id = tmpSys.id;
        curSys.star = tmpSys.star;
        curSys.planets = tmpSys.planets;
        this.allSystems.push(curSys);
      });
    });
  }
}
