import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { GridMapComponent } from './grid-map/grid-map.component';
import { InteractCubeComponent } from './interact-cube/interact-cube.component';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    GridMapComponent,
    InteractCubeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
