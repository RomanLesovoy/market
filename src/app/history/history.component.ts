import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { HistoryService } from './history.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { PaymentService } from '../payment/payment.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HistoryComponent {
  public history = new MatTableDataSource<any>; // explain: to assign paginator to table we need additional object
  public loading: boolean = true;
  public displayedColumns: string[] = ['id', 'currency', 'amount', 'type', 'date'];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator; // explain: assign property to view

  constructor(private service: HistoryService, private test: PaymentService) {}

  ngOnInit( ) {
    this.service.getHistory();
    this.service.history.pipe(debounceTime(1000)).subscribe((history: Array<any>) => {
      
      this.history.data = history;
      this.loading = false;
    })
  }

  ngAfterViewInit() { // explain can only be assigned after view initialized
    this.history.paginator = this.paginator;
  }
}
