import { Component, OnInit } from '@angular/core';
import {Contact} from '../../models/contact';
import {Observable} from 'rxjs/Observable';
import {ApplicationState} from '../../store/index';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import * as fromStore from '../../store';
import * as contactsActions from '../../store/contacts-actions';
import * as uiActions from '../../store/ui-actions';


@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.sass']
})
export class ContactsIndexComponent implements OnInit {

  contacts$: Observable<Contact[]>;

  constructor(public store: Store<ApplicationState>, private router: Router) { }

  ngOnInit() {
    // getAllContacts selector from the main store allows us to monitor changes only on contact list from the main state
    // without monitoring the rest of the state
    this.contacts$ = this.store.select(fromStore.getAllContacts);

    // dispatch a new LOAD ALL action to the store to refresh the contact list in case it was modified remotely from another client
    this.store.dispatch(new contactsActions.LoadAll());
  }

  editContact(contact: Contact) {
    this.store.dispatch(new uiActions.SetCurrentContact(contact));
    this.router.navigate(['/contacts', contact.id, 'edit'])
  }

  showContact(contact: Contact) {
    this.store.dispatch(new uiActions.SetCurrentContact(contact));
    this.router.navigate(['/contacts', contact.id])
  }

  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new contactsActions.Delete(contact));
    }
  }

}
