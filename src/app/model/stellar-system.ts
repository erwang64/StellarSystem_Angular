import { Planet } from './planet';
import { Star } from './star';

export class StellarSystem {
  id!: number;
  name!: string;
  posX!: string;
  posY!: string;
  star!: Star;
  planets!: Planet[];

  constructor(name = '', posX = '', posY = '') {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
  }

  addPlanet(planet: Planet): void {
    if (this.planets === undefined) {
      this.planets = [];
    }
    this.planets.push(planet);
  }

  removePlanet(planet: Planet): void {
    if (this.planets === undefined) {
      this.planets = [];
    }
    this.planets = this.planets.filter((curPlanet) => curPlanet !== planet);
  }
}
