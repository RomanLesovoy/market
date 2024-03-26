import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { HistoryComponent } from './history/history.component';
import { PaymentComponent } from './payment/payment.component';
import { InstrumentsComponent } from './markets/instruments/instruments.component';

const routes: Routes = [
  {
    path: 'markets',
    component: InstrumentsComponent,
    loadChildren: () => import('./markets/markets.module').then(m => m.MarketsModule),
  },
  { 
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'payment',
    component: PaymentComponent,
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),  // explain: if we need lazy - it works only with modules
  },
  { path: '**', redirectTo: '/markets' } // 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
