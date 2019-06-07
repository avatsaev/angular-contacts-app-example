import { Injectable } from '@angular/core';
import * as fromRoot from '@app/root-store';
import * as fromContacts from '@app/contacts-store';
import { select, Store } from '@ngrx/store';
import { shareReplay } from 'rxjs/operators';

import { Contact } from '@app/core/models';
import {create, load, remove, update} from '@app/contacts-store/contacts-actions';

@Injectable()
export class ContactsStoreFacade {

  contacts$ = this.store.pipe(
    shareReplay(1),
    select(fromContacts.getAllContacts)
  );

  constructor(private store: Store<fromRoot.State>) { }

  loadContact(contactId: number) {
    this.store.dispatch(load({payload: contactId}));
  }

  createContact(contact: Contact) {
    this.store.dispatch(create({payload: contact}));
  }

  updateContact(contact: Contact) {
    this.store.dispatch(update({payload: contact}));
  }

  deleteContact(contactId: number) {
    this.store.dispatch(remove({payload: contactId}));
  }

  getContactById(id: number) {
    return this.store.pipe(
      select(fromContacts.getContactById(id))
    )
  }
}
