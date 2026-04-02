import { Component } from '@angular/core';
import { IConnexionListener } from '../../technical/iconnexion-listener';
import { User } from '../../model/user';
import { ConnectionCentralizer } from '../../technical/connection-centralizer';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-connction-test',
  imports: [],
  templateUrl: './connction-test.html',
  styleUrl: './connction-test.scss',
})
export class ConnctionTest implements IConnexionListener{

  connectedUser : User | null ;

  constructor( private userservice: UsersService) {
    ConnectionCentralizer.getInstance().addListener(this);
    this.connectedUser = ConnectionCentralizer.getInstance().user;
  }

  connectionChanged(newProfile: User | null): void {
    this.connectedUser = newProfile;
  }

  getName(): string {
    return "ConnctionTest";
  }


  connectDisconnect() {
    if(this.connectedUser == null) {
      this.userservice.login("PatcrikLebgdefou", "Test123456");
    } else {
      this.userservice.disconnect();
    }
  }

}
