import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();
  constructor(private servicioHeroe: HeroesService) { }

  ngOnInit() {
  }

  guardar(formulario: NgForm) {
    if (formulario.invalid) {
      console.log('Formulario no valido.');
      return;
    }
    this.servicioHeroe.crearHeroe(this.heroe).subscribe(respuesta => {
      console.log(respuesta);
    });
    console.log(formulario);
    console.log(this.heroe);
  }

}
