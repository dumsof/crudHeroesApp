import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

const router: Routes = [
  { path: 'heroes', component: HeroeComponent },
  { path: 'heroe/:id', component: HeroesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'heroes' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(router)
  ],
  /* poder utilizar las rutas en cualquier modulo de forma globar */
  exports: [
    RouterModule
  ]
})
/* se debe importar en el archivo de app.module.ts, con esto las rutas son global */
export class AppRoutingModule { }
