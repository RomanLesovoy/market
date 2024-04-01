import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorHoverDirective } from './color-hover.directive';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ColorHoverDirective,
  ],
  exports: [
    ColorHoverDirective,
  ]
})
export class DirectivesModule { }
