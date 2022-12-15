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


  // searchKeyword(): void{
  //   this.searchResult$ = this.search.valueChanges.pipe(
  //     switchMap(keyword =>
  //       this.http.get<any>(`https://swapi.dev/api/people/?search=${keyword}`)
  //     ),
  //     map(response =>
  //       response.count > 0 ? response.results[0] : { name: "No results" }
  //     ),
  //     map(
  //       response =>
  //         ({
  //           name: response.name,
  //           birthYear: response.birth_year,
  //           height: Number(response.height),
  //           weight: Number(response.mass),
  //           eyeColor: response.eye_color
  //         } as PeopleData)
  //     )
  //   );
  // }


}
