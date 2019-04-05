import { ChangeDetectionStrategy, Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/root-store';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  template: `
    <app-toolbar [title]="currentPageTitle$ | async" ></app-toolbar>

    <div class="container p12 flex f-col f-grow-1">
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  // @HostBinding('class') classes = 'flex f-col';
  currentPageTitle$: Observable<string>;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.currentPageTitle$ = this.store.pipe(
      select(fromRoot.getCurrentTitle)
    );
  }
}
