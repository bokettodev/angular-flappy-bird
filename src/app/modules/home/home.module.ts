import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgModule } from '@shared/modules/svg';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, SvgModule],
})
export class HomeModule {}
