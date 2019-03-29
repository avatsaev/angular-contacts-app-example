import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {environment} from '@app/env';
import * as contactsActions from '@app/contacts-store/contacts-actions';


@Injectable()
export class ContactsSocketService extends Socket {

  liveCreated$ = this.fromEvent(contactsActions.ContactsActionTypes.LIVE_CREATED);
  liveUpdated$ = this.fromEvent(contactsActions.ContactsActionTypes.LIVE_UPDATED);
  liveDeleted$ = this.fromEvent(contactsActions.ContactsActionTypes.LIVE_DELETED);

  constructor() {
    super({
      url: `${environment.socketConfig.url}/contacts`,
      options: environment.socketConfig.opts
    });
  }
}
