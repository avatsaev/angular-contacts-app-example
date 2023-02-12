import { Injectable } from '@angular/core';
import * as fromRoot from '@app/root-store';
import * as fromContacts from '@app/contacts-store';
import { select, Store } from '@ngrx/store';

import { Contact } from '@app/core/models';
import {create, filterContacts, load, pageChange, remove, update} from '@app/contacts-store/contacts-actions';

@Injectable()
export class ContactsStoreFacade {

  contacts$ = this.store.pipe(
    select(fromContacts.getAllContacts)
  );

  contactsPageInfo$ = this.store.pipe(
    select(fromContacts.selectContactsPageInfo)
  );

  filter$ = this.store.pipe(
    select(fromContacts.selectContactsFilter)
  );

  constructor(private store: Store<fromRoot.State>) { }

  loadContact(id: number) {
    this.store.dispatch(load({id}));
  }

  createContact(contact: Contact) {
    this.store.dispatch(create({contact}));
  }

  updateContact(contact: Contact) {
    this.store.dispatch(update({contact}));
  }

  deleteContact(id: number) {
    this.store.dispatch(remove({id}));
  }

  pageChange(page: number){
    this.store.dispatch(pageChange({page}));
  }

  filterContacts(filter: string){
    this.store.dispatch(filterContacts({filter}));
  }

  getContactById(id: number) {
    return this.store.pipe(
      select(fromContacts.getContactById(id))
    )
  }
}
