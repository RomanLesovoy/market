import { Component } from '@angular/core';
import { MarketsService } from '../markets.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../../payment/payment-modal/payment-modal.component'; // todo find solution
import { debounceTime } from 'rxjs'; // explain: pipe + debounceTime  https://angdev.ru/rxjs/operators-and-pipe/

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrl: './instruments.component.scss'
})
export class InstrumentsComponent {
  public loading: boolean = true;
  public instruments: Array<any> = [];
  public dialogRef: MatDialogRef<PaymentDialogComponent> | undefined;

  constructor(private service: MarketsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.getInstruments();
    this.service.instruments.pipe(debounceTime(1000)).subscribe((instruments: Array<any>) => {
      this.loading = false;
      this.instruments = instruments;
      this.service.subscribeInstruments();
    });
  }

  listTrackBy(instrument: any) {
    return `${instrument.name}`;
  }

  ngOnDestroy() {
    this.service.unsubscribeInstruments();
  }
}
