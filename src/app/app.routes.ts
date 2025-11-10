import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CuestionarioComponent } from './components/cuestionario/cuestionario.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { TecnicaDetalleComponent } from './components/tecnica-detalle/tecnica-detalle.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cuestionario', component: CuestionarioComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'tecnica/:tipo/:id', component: TecnicaDetalleComponent },
  { path: '**', redirectTo: '' }
];
