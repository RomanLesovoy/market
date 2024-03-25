import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentDialogComponent } from './payment-modal/payment-modal.component';

@Component({
  selector: 'app-payment',
  template: '',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  dialogRef: MatDialogRef<PaymentDialogComponent> | undefined;

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.dialogRef = this.dialog.open(PaymentDialogComponent, { });
  }

  ngOnDestroy() {
    this.dialogRef?.close();
  }
}
