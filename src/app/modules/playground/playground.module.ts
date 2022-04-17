import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgModule } from '@shared/modules/svg';
import { PlaygroundRoutingModule } from './playground-routing.module';
import {
  BackgroundComponent,
  GroundComponent,
  ObstaclesComponent,
  PipesComponent,
  PlaygroundComponent,
} from './components';
import { PlaygroundStoreService } from './services';

@NgModule({
  declarations: [
    BackgroundComponent,
    GroundComponent,
    ObstaclesComponent,
    PipesComponent,
    PlaygroundComponent,
  ],
  imports: [CommonModule, PlaygroundRoutingModule, SvgModule],
  providers: [PlaygroundStoreService],
})
export class PlaygroundModule {}
