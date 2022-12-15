import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {debounceTime, filter, map, switchMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSearchComponent implements OnInit {

  @Output() searchText = new EventEmitter<string>();

  constructor() {
  }

  searchKeyword$: Observable<string>;
  search = new FormControl();

  searchFormGroup = new FormGroup({
    search: this.search
  });

  ngOnInit(): void {
   this.searchKeyword();
  }


  searchKeyword(): void {
    this.searchKeyword$ = this.search.valueChanges.pipe(
      debounceTime(500),
      filter(num => num.length >= 2 || num.length === 0 ),
      tap( word => {
        console.log(word);
        this.searchText.emit(word);
      } ),
    );
  }



}
