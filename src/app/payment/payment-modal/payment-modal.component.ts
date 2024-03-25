import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PaymentDialogComponent {
  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // explain: works like a prop for modal to pass any data with fn call
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.router.navigateByUrl('markets');
  }
}
