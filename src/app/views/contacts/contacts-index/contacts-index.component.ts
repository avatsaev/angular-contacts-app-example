import { Component, OnInit } from '@angular/core';
import {Contact} from '../../../models/contact';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import * as fromContactsStore from '../store'
import * as contactsActions from '../store/actions/contacts-actions';
import * as uiActions from '../../../store/actions/ui-actions';
import * as fromRootStore from '../../../store';


@Component({
  selector: 'app-contacts-index',
  templateUrl: './contacts-index.component.html',
  styleUrls: ['./contacts-index.component.sass']
})
export class ContactsIndexComponent implements OnInit {

  contacts$: Observable<Contact[]>;

  constructor(public store: Store<fromRootStore.State>, private router: Router) { }

  ngOnInit() {
    // getAllContacts selector from the main store allows us to monitor changes only on contact list from the main state
    // without monitoring the rest of the state
    this.contacts$ = this.store.select(fromContactsStore.getAllContacts);
    this.store.dispatch(new contactsActions.LoadAll());
    this.store.dispatch(new uiActions.SetCurrentTitle('Contacts list'));
  }

  editContact(contact: Contact) {
    this.store.dispatch(new contactsActions.SetCurrentContactId(contact.id));
    this.router.navigate(['/contacts', contact.id, 'edit'])
  }

  showContact(contact: Contact) {
    this.store.dispatch(new contactsActions.SetCurrentContactId(contact.id));
    this.router.navigate(['/contacts', contact.id])
  }

  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new contactsActions.Delete(contact));
    }
  }

}
