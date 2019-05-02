import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RouterService } from 'src/app/router.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  pageUrl$: Observable<string> = this.routerService.pageUrl$;
  isShowAdd$ = this.pageUrl$.pipe(
    map(pageUrl => pageUrl !== '/contacts/new')
  );

  constructor(public routerService: RouterService) { }

  ngOnInit() {
  }
}
