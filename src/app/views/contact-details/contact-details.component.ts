import { Component, OnInit } from '@angular/core';
import {ApplicationState} from '../../store/index';
import {Dispatcher, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import * as contactsActions from '../../store/contacts-actions'
import * as uiActions from '../../store/ui-actions'
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../models/contact';
import * as fromApplication from '../../store';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.sass']
})
export class ContactDetailsComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(
      private store: Store<ApplicationState>,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private dispatcher: Dispatcher
  ) {}

  ngOnInit() {

    this.contact$ = this.store.select(fromApplication.getCurrentContact);


    // if current contact is successfully deleted, go back to index view
    this.dispatcher
      .filter(action =>
        action.type === contactsActions.DELETE_SUCCESS
        && action.payload.id === +this.activatedRoute.snapshot.params['contactId']
      )
      .subscribe(_ => this.router.navigate(['/contacts']));


    this.activatedRoute.params.subscribe(params => {
      // update our contact from the backend in case it was modified by another client
      this.store.dispatch(new contactsActions.Load(+params['contactId']));
    })

  }


  editContact(contact: Contact) {

    this.store.dispatch(new uiActions.SetCurrentContactId(contact.id));

    this.router.navigate(['/contacts', contact.id, 'edit']);

  }

  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new contactsActions.Delete(contact));
    }
  }

}
