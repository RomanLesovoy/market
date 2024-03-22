import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from './payment/payment-modal/payment-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None, // explain: if not set - we can't affect any not inner selectors
})
export class AppComponent {
  title = 'market';

    constructor(
      public dialog: MatDialog,
    ) {
      console.log(0)
    }

  ngOnInit() {
    console.log(1)
    this.dialog.open(PaymentDialogComponent, { data: { }});
  }
}
