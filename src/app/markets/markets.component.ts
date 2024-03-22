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
  public instruments: Array<any>; // todo

  constructor(private service: MarketsService) {
    this.loading = true;
    this.instruments = [];
  }

  ngOnInit(): void {
    this.service.watchInstruments().valueChanges.pipe(debounceTime(1000)).subscribe(({data, error}: any) => {
      this.loading = false;
      this.instruments = data.instruments;
    });
  }

  listTrackBy(instrument: any, index: number) {
    return `${instrument.name}${index}`;
  }
}
