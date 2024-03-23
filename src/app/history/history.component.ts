import { Component } from '@angular/core';
import { MarketsService } from '../markets/markets.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  constructor(private service: MarketsService) {
    
  }

  ngOnInit( ) {
    // this.service.watchInstruments().valueChanges.subscribe(({data, error}: any) => {
    //   console.log(data)
    // })
  }
}
