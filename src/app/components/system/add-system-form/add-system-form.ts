import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StellarSystemsService } from '../../../services/stellar-systems.service';

@Component({
  selector: 'app-add-system-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-system-form.html',
  styleUrl: './add-system-form.scss',
})
export class AddSystemForm {
  form!: FormGroup;

  constructor(private systemService:  StellarSystemsService, private router : Router) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      posX: new FormControl('', [Validators.required]),
      posY: new FormControl('', [Validators.required]),
    });
  }

  validateCreationSystem() : void {
    const sys = {
      name: this.form.get("name")?.value,
      posX: this.form.get("posX")?.value,
      posY: this.form.get("posY")?.value,
    };

    this.systemService.addSystem(sys as any).subscribe(() => {
      alert("Système stellaire créé !");
      this.router.navigateByUrl("systems");
    });

  }

  cancelCreationSystem() : void {
    this.router.navigateByUrl("systems");
  }
}
