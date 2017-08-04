import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as fromRootStore from './store'
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  template: `


    <app-toolbar [title]="currentPageTitle$ | async" ></app-toolbar>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  
  `
})
export class AppComponent implements OnInit {

  currentPageTitle$: Observable<string>;
  constructor(private store: Store<fromRootStore.State>) {}

  ngOnInit() {
    this.currentPageTitle$ = this.store.select(fromRootStore.getCurrentTitle);
  }
}
