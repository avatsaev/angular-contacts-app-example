import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  // tslint:disable-next-line: use-host-property-decorator
  host: { class: 'f-grow-1 scroll-content' },
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent { }
