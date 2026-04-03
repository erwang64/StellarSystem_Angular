import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StellarSystemsService } from '../../../services/stellar-systems.service';
import { StellarSystem } from '../../../model/stellar-system';


@Component({
  selector: 'app-edit-system-form',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './edit-system-form.html',
  styleUrl: './edit-system-form.scss',
})
export class EditSystemForm {
  form!: FormGroup;
  slectedSystem = inject(StellarSystemsService).selectedSystem;

  constructor(private router : Router, private systemService: StellarSystemsService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      posX: new FormControl('', [Validators.required]),
      posY: new FormControl('', [Validators.required]),
    });

    effect(() => {
      const sys = this.slectedSystem();
      if (sys) {
        this.form.patchValue({
          name: sys.name,
          posX: sys.posX,
          posY: sys.posY
        });
      }
    });
  }

validateUpdateSystem(): void {
  const sys = this.slectedSystem();
  if (!sys) return;

  
  const updatedSys = new StellarSystem(
    this.form.get("name")?.value,
    this.form.get("posX")?.value,
    this.form.get("posY")?.value
  );

  // Copier les propriétés qui ne changent pas
  updatedSys.id = sys.id;
  updatedSys.star = sys.star;
  updatedSys.planets = sys.planets;

  this.systemService.updateSystem(updatedSys).subscribe(() => {
    alert("Système stellaire mis à jour !");
    this.router.navigateByUrl("systems"); 
  });
}
}
