import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';


/* npm install --save sweetalert2, paquete para utilizar la alerta que se le presenta al usuario
  se debe importar el siguiente paquete*/
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();
  constructor(private servicioHeroe: HeroesService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    /* en esta forma se obtienen los cambios de la ruta sin tener que suscribirce */
    const id = this.router.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.servicioHeroe.getHeroe(id).subscribe((respuesta: HeroeModel) => {
        this.heroe = respuesta;
        this.heroe.id = id;
      });
    }
  }

  guardar(formulario: NgForm) {
    if (formulario.invalid) {
      console.log('Formulario no valido.');
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información..',
      type: 'info'
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    if (this.heroe.id) {
      peticion = this.servicioHeroe.actualizarHeroe(this.heroe);
    } else {
      peticion = this.servicioHeroe.crearHeroe(this.heroe);
    }

    peticion.subscribe(respuesta => {
      Swal.fire({
        title: 'Actualización Exitosa',
        text: 'Se actualizo correctamente.',
        type: 'success'
      });

    });

    console.log(formulario);
    console.log(this.heroe);
  }

}
