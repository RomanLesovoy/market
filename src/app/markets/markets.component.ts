import { Component } from '@angular/core';
import { MarketsService } from './markets.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment/payment-modal/payment-modal.component';
import { debounceTime } from 'rxjs'; // explain: pipe + debounceTime  https://angdev.ru/rxjs/operators-and-pipe/

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss'
})
export class MarketsComponent {
  public loading: boolean;
  public instruments: Array<any>;
  public dialogRef: MatDialogRef<PaymentDialogComponent> | undefined;

  constructor(private service: MarketsService, public dialog: MatDialog,) {
    this.loading = true;
    this.instruments = [];
  }

  ngOnInit(): void {
    this.service.getInstruments();
    this.service.instruments.pipe(debounceTime(1000)).subscribe((instruments) => {
      this.loading = false;
      this.instruments = instruments;
      this.service.subscribeInstruments();
    });
  }

  listTrackBy(instrument: any, index: number) {
    return `${instrument.name}${index}`;
  }

  ngOnDestroy() {
    this.service.unsubscribeInstruments();
  }
}
