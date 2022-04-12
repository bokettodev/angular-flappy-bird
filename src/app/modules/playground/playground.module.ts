import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgModule } from '@shared/modules/svg';
import { PlaygroundRoutingModule } from './playground-routing.module';
import {
  BackgroundComponent,
  GroundComponent,
  PlaygroundComponent,
} from './components';

@NgModule({
  declarations: [BackgroundComponent, GroundComponent, PlaygroundComponent],
  imports: [CommonModule, PlaygroundRoutingModule, SvgModule],
})
export class PlaygroundModule {}
