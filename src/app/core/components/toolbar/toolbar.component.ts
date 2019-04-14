import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {filter, map, shareReplay} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {

  pageUrl$: Observable<string> = this.router.events.pipe(
    filter(event => event instanceof NavigationStart),
    map((val: NavigationStart) => val.url),
    shareReplay(1)
  );

  isShowHome$ = this.pageUrl$.pipe(
    map(pageUrl => pageUrl !== '/contacts')
  );


  isShowAdd$ = this.pageUrl$.pipe(
    map(pageUrl => pageUrl !== '/contacts/new')
  );

  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
