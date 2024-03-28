import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { HistoryComponent } from './history/history.component';
import { PaymentComponent } from './payment/payment.component';
import { InstrumentsComponent } from './markets/instruments/instruments.component';
// import { PaymentModule } from './payment/payment.module';

const routes: Routes = [
  {
    path: 'markets',
    component: InstrumentsComponent,
    loadChildren: () => import('./markets/markets.module').then(m => m.MarketsModule),
  },
  { 
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuardService], // explain: search for canActivate method in class and run it
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthGuardService],
    // loadChildren: () => PaymentModule,  // explain: if we need lazy - it works only with modules
  },
  { path: '**', redirectTo: '/markets' }, // 404
  { path: '', redirectTo: '/markets', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
