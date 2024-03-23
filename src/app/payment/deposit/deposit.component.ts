import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment-modal/payment-modal.component';
import { DialogData, PaymentAction } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'app-deposit',
  template: '',
})
export class DepositComponent {
  dialogRef: MatDialogRef<PaymentDialogComponent> | undefined;

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.dialogRef = this.dialog.open(PaymentDialogComponent, { data: {  paymentAction: PaymentAction.Deposit }} as { data: DialogData });
  }

  ngOnDestroy() {
    this.dialogRef?.close();
  }
}
