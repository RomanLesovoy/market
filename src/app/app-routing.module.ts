import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { MarketsComponent } from './markets/markets.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: 'markets',
    component: MarketsComponent,
  },
  { 
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),  // explain: if we need lazy - it works only with modules
  },
  { path: '**', redirectTo: '/markets' } // 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
