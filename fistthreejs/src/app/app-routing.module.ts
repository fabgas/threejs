import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CubeComponent } from './cube/cube.component';

const routes: Routes = [ { 
  path: 'home',
  component: CubeComponent
  },
  { 
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
