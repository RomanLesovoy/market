import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment-modal/payment-modal.component';
import { DialogData, PaymentAction } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss'
})
export class WithdrawComponent {
  dialogRef: MatDialogRef<PaymentDialogComponent> | undefined;

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.dialogRef = this.dialog.open(PaymentDialogComponent, { data: { paymentAction: PaymentAction.Withdraw }} as { data: DialogData });
  }

  ngOnDestroy() {
    this.dialogRef?.close();
  }
}
