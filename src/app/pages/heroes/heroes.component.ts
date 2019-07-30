import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

/* operador map, para obtener solo el id en la respuesta del post */
import { map } from "rxjs/operators";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;
  constructor(private servicioHeroe: HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.servicioHeroe.getHeroes()
      .subscribe(respuesta => {
        this.heroes = respuesta;
        this.cargando = false;
      });
  }
  borrarHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(confirmacion => {
      if (confirmacion.value) {
        /* borrar el elemento de la posicion de i, cuantos elementos 1 */
        this.heroes.splice(i, 1);
        this.servicioHeroe.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
}
