import { Injectable } from '@angular/core';
import * as fromRoot from '@app/root-store';
import * as fromContacts from '@app/contacts-store';
import * as contactsActions from '@app/contacts-store/contacts-actions';
import { select, Store } from '@ngrx/store';
import { shareReplay } from 'rxjs/operators';

import { Contact } from '@app/core/models';

@Injectable()
export class ContactsStoreFacade {

  contacts$ = this.store.pipe(
    shareReplay(1),
    select(fromContacts.getAllContacts)
  );

  currentContact$ = this.store.pipe(
    shareReplay(1),
    select(fromContacts.getCurrentContact)
  );

  constructor(private store: Store<fromRoot.State>) { }

  setCurrentContactId(contactId: number) {
    this.store.dispatch(new contactsActions.SetCurrentContactId(contactId));
  }

  loadContact(contactId: number) {
    this.store.dispatch(new contactsActions.Load(contactId));
  }

  createContact(contact: Contact) {
    this.store.dispatch(new contactsActions.Create(contact));
  }

  updateContact(contact: Contact) {
    this.store.dispatch(new contactsActions.Patch(contact));
  }

  deleteContact(contactId: number) {
    this.store.dispatch(new contactsActions.Delete(contactId));
  }
}
