import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() lastPage: number;
  @Input() hasPreviousPage: boolean;
  @Input() hasNextPage: boolean;
  @Input() nextPage: number;
  @Input() previousPage: number;
  @Input() currentPage: number;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
  }

  ngOnInit(): void {
  }

  loadFirst() {
    this.change.emit(1);
  }

  loadLast() {
    this.change.emit(this.lastPage);
  }

  previousP() {
    this.change.emit(this.previousPage);
  }

  loadPrevious() {
    this.change.emit(this.currentPage - 1);
  }

  loadNext() {
    this.change.emit(this.currentPage + 1);
  }


  nextP() {
    this.change.emit(this.nextPage);
  }

}
