import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {
  pageUrl: string;
  @Input() title;
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router) {
    const routerSubscr = router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe((val: NavigationStart) => this.pageUrl = val.url);
    this.subscriptions.add(routerSubscr);
  }

  ngOnInit() {

  }
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
