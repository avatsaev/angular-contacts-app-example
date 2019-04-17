import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  currentPageTitle$: Observable<string>;
  constructor(public appService: AppService) { }

  @HostBinding('class.blade-theme') get colorTheme(): boolean {
    return this.appService.getBladeTheme;
  }
}
