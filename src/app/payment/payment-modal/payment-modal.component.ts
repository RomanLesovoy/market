import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

export const enum PaymentAction {
  Deposit = 'deposit',
  Withdraw = 'withdraw'
}

export interface DialogData {
  paymentAction: PaymentAction,
}

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss',
})
export class PaymentDialogComponent {
  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.router.navigateByUrl('markets');
  }
}
