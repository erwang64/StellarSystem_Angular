import { Component } from '@angular/core';

import { SystemsListComponent } from './components/system/systems-list/systems-list';

@Component({
  selector: 'app-root',
  imports: [SystemsListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
