import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter-pipe.pipe';

@NgModule({
  exports: [
    FilterPipe,
  ],
  imports: [
    CommonModule,
    FilterPipe,
  ],
})
export class PipesModule { }
