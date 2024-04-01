import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InstrumentsComponent } from './instruments/instruments.component';
import { ShareLibModulesModule } from '../shared/share-lib-modules/share-lib-modules.module';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { DirectivesModule } from '../shared/directives/directives.module';

@NgModule({
  declarations: [
    InstrumentsComponent,
    CurrencySelectorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, // explain: whenever we use router we need to import it inside module
    ShareLibModulesModule,
    PipesModule, // explain: or can use FilterPipe directly as it standalone pipe
    DirectivesModule,
  ],
  exports: [
    CurrencySelectorComponent, // explain: if some module imports this and try to use components / directives / pipes - it should be defined in 'exports' array
  ],
  providers: []
})
export class MarketsModule { }
