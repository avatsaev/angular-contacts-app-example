import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterService } from './router.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  currentPageTitle$: Observable<string>;
  constructor(public routerService: RouterService) {
    routerService.loadRouting();
  }
}
