import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundRoutingModule } from './playground-routing.module';
import {
  BackgroundComponent,
  BirdComponent,
  GroundComponent,
  ObstaclesComponent,
  PipesComponent,
  PlaygroundComponent,
} from './components';
import { PlaygroundStoreService } from './services';

@NgModule({
  declarations: [
    BackgroundComponent,
    BirdComponent,
    GroundComponent,
    ObstaclesComponent,
    PipesComponent,
    PlaygroundComponent,
  ],
  imports: [CommonModule, PlaygroundRoutingModule],
  providers: [PlaygroundStoreService],
})
export class PlaygroundModule {}
