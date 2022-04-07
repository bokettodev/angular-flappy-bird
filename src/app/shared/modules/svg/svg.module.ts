import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgComponent } from './components';

@NgModule({
  declarations: [SvgComponent],
  imports: [CommonModule],
  exports: [SvgComponent],
})
export class SvgModule {}
