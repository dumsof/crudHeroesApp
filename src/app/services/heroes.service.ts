import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';

/* operador map, para obtener solo el id en la respuesta del post */
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = 'https://login-app-afde8.firebaseio.com';
  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };
    /* se borra el id para que no se guarde en firebase */
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }
}
