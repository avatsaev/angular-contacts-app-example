import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  pageUrl: string;
  @Input() title;

  constructor(private router: Router) {
    const routerSubscr = router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe((val: NavigationStart) => this.pageUrl = val.url);
  }

  ngOnInit() {

  }
}
