import { Component } from '@angular/core';

import { SystemsListComponent } from './components/system/systems-list/systems-list';
import { ConnctionTest } from "./components/connction-test/connction-test";

@Component({
  selector: 'app-root',
  imports: [SystemsListComponent, ConnctionTest],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
