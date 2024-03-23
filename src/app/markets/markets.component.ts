import { Component } from '@angular/core';
import { MarketsService } from './markets.service';
import { debounceTime } from 'rxjs'; // explain: pipe + debounceTime  https://angdev.ru/rxjs/operators-and-pipe/

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss'
})
export class MarketsComponent {
  public loading: boolean;
  public instrumentsBlocks: Array<any>;
 

  constructor(private service: MarketsService) {
    this.loading = true;
    this.instrumentsBlocks = [];
  }

  ngOnInit(): void {
    this.service.getInstruments();
    this.service.instruments.pipe(debounceTime(1000)).subscribe((instruments) => {
      this.loading = false;
      this.instrumentsBlocks = Object.values(instruments).sort((a, b) => b.length - a.length);
    });
  }

  listTrackBy(instrument: any, index: number) {
    return `${instrument.name}${index}`;
  }

  onSwap() {
    // todo
  }
}
