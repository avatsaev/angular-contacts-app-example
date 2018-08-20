import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-contacts',
  template: `
    <!--<p>LIVE: {{(socket.connected$ | async) ? 'ON' : 'OFF'}}</p>-->
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent {
  constructor() {}
}
