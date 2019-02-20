import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-contacts',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent {}
