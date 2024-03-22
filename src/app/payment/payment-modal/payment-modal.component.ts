import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

// @Component({
//   selector: 'app-payment-modal-c',
//   template: '',
// })
// export class PaymentModalComponent {
//   constructor(
//     public dialog: MatDialog,
//   ) {
//     console.log(0)
//   }

//   ngOnInit() {
//     console.log(1)
//     this.dialog.open(PaymentDialogComponent, { data: { }});
//   }
// }

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss',
})
export class PaymentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // todo
  ) {
    console.log(2)
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}