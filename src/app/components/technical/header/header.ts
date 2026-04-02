import { Component, signal, WritableSignal } from '@angular/core';
import { IConnexionListener } from '../../../technical/iconnexion-listener';
import { User } from '../../../model/user';
import { UsersService } from '../../../services/users.service';
import { ConnectionCentralizer } from '../../../technical/connection-centralizer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements IConnexionListener {

  readonly connectedUser : WritableSignal<User | null> = signal<User | null>(null);

  constructor( private router: Router ,private userservice: UsersService) {
    ConnectionCentralizer.getInstance().addListener(this);
    this.connectedUser.set(ConnectionCentralizer.getInstance().user);
  }

  connectionChanged(newProfile: User | null): void {
    this.connectedUser.set(newProfile);
  }

  getName(): string {
    return "Header";
  }

  connect() {
    this.router.navigateByUrl("connect");
  }

  disconnect() {
    this.userservice.disconnect();
  }

}
