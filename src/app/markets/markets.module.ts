import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InstrumentsComponent } from './instruments/instruments.component';
import { MarketsService } from './markets.service';
import { ShareLibModulesModule } from '../shared/share-lib-modules/share-lib-modules.module';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';
import { FilterPipe } from '../shared/pipes/filter-pipe.pipe';

@NgModule({
  declarations: [
    InstrumentsComponent,
    CurrencySelectorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, // explain: whenever we use router we need to import it inside module
    ShareLibModulesModule,
    FilterPipe,
  ],
  exports: [
    CurrencySelectorComponent,
  ],
  providers: [
    MarketsService,
    FilterPipe,
  ]
})
export class MarketsModule { }
