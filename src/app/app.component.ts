import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/root-store';
import { select, Store } from '@ngrx/store';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  host: { '[class.blade-theme]': 'isBladeTheme' },
  styleUrls: ['./app.component.sass'],
  template: `
    <app-toolbar [title]="currentPageTitle$ | async" ></app-toolbar>
    <div class="container flex f-col f-grow-1">
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  // @HostBinding('class') classes = 'flex f-col';
  currentPageTitle$: Observable<string>;
  isBladeTheme: boolean = this.appService.getBladeTheme;
  constructor(private store: Store<fromRoot.State>, public appService: AppService) {

  }

  ngOnInit() {
    this.currentPageTitle$ = this.store.pipe(
      select(fromRoot.getCurrentTitle)
    );
    this.appService.isBladeTheme.asObservable().subscribe(val => this.isBladeTheme = val);

  }
}
