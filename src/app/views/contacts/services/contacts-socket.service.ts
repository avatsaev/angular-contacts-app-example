import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {environment} from '@app/env';
import {ContactsEventTypes} from '@app/core/models/contact.events';


@Injectable()
export class ContactsSocketService extends Socket {

  liveCreated$ = this.fromEvent(ContactsEventTypes.LIVE_CREATED);
  liveUpdated$ = this.fromEvent(ContactsEventTypes.LIVE_UPDATED);
  liveDeleted$ = this.fromEvent(ContactsEventTypes.LIVE_DELETED);

  constructor() {
    super({
      url: `${environment.socketConfig.url}/contacts`,
      options: environment.socketConfig.opts
    });
  }
}
