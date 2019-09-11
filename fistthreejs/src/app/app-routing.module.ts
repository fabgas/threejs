import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CubeComponent } from './cube/cube.component';
import { GridMapComponent } from './grid-map/grid-map.component';
import { InteractCubeComponent } from './interact-cube/interact-cube.component';
import { MenuComponent } from './menu/menu.component';
const routes: Routes = [ { 
  path: 'orbit',
  component: CubeComponent
  },
  { 
    path: 'gridmap',
    component: GridMapComponent
    },{
    path: 'menu',
    component: MenuComponent
    },
    { 
      path: 'interactcube',
      component: InteractCubeComponent
      },
  { 
  path: '',
  redirectTo: '/orbit',
  pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
