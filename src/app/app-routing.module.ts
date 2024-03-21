import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { MarketsComponent } from './markets/markets.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: 'markets',
    component: MarketsComponent,
    // loadChildren: () => import('./markets/markets.module').then(m => m.MarketsModule), // explain: if we need lazy - it works only with modules
  },
  { 
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuardService] 
  },
  { path: '**', redirectTo: '/markets' } // 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
