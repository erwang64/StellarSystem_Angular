import { Component } from '@angular/core';


import { Header } from "./components/technical/header/header";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'stellarsystemAngular';
}
