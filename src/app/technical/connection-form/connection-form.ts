import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './connection-form.html',
  styleUrl: './connection-form.scss',
})
export class ConnectionForm {
  form!: FormGroup;

  constructor(private usersService: UsersService , private router : Router) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(8)]),

      password: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    });
  }

  validate() : void {
    this.usersService.login(this.form.get("login")?.value, this.form.get("password")?.value);
    alert("Connexion réussie !");
    this.router.navigateByUrl("");
  }

  cancel() : void {
    alert("Connexion annulée !");
    this.router.navigateByUrl("");
  }
}
