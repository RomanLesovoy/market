import { Component } from '@angular/core';
import { MarketsService } from '../markets.service';
import { CognitoService } from '../../cognito.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.scss'
})
export class BalancesComponent {
  public balances: Array<any> = [];
  public isLoading: boolean = false;
  public isAuth: boolean = false;
  
  constructor(private service: MarketsService, private cognito: CognitoService) {
    this.cognito.isAuthenticated.subscribe((isAuth) => {
      this.isAuth = isAuth;
      !!isAuth && this.getBalances()
    })
  }

  getBalances() {
    this.isLoading = true;
    this.service.getBalances();
    this.service.balances.pipe(debounceTime(1000)).subscribe((balances: Array<never>) => {
      this.balances = balances;
      this.isLoading = false;
    });
  }

  balanceTrackBy(_index: number, balance: any) {
    return `${balance.free_balance}${balance.currency_id}`;
  }
}
