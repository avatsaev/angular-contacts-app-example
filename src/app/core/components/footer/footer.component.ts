import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  isBladeTheme: boolean = this.appService.getBladeTheme;
  constructor(public appService: AppService) { }
  changeTheme() {
    console.log(this.isBladeTheme);
    this.appService.setBladeTheme = !this.appService.getBladeTheme;
  }
}
