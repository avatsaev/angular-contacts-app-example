import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store, ActionsSubject} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../../models/contact';
import {Subscription} from 'rxjs/Subscription';


import * as contactsActions from '../store/actions/contacts-actions'
import * as fromContactsStore from '../store'
import * as uiActions from '../../../store/actions/ui-actions';
import * as fromRootStore from '../../../store';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.sass']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  contact$: Observable<Contact>;
  redirectSub: Subscription;

  constructor(
      private store: Store<fromRootStore.State>,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private actionsSubject: ActionsSubject
  ) {}

  ngOnInit() {

    this.contact$ = this.store.select(fromContactsStore.getCurrentContact);
    this.store.dispatch(new uiActions.SetCurrentTitle('Contact details'));

    // If the destroy effect fires, we check if the current contact is the one being viewed, and redirect to index
    this.redirectSub = this.actionsSubject
        .filter(action => action.type === contactsActions.DELETE_SUCCESS)
        .filter((action: contactsActions.DeleteSuccess) => action.payload.id === +this.activatedRoute.snapshot.params['contactId'])
        .subscribe(_ => this.router.navigate(['/contacts']));


    this.activatedRoute.params.subscribe(params => {
      // update our contact from the backend in case it was modified by another client
      this.store.dispatch(new contactsActions.Load(+params['contactId']));
    })

  }


  editContact(contact: Contact) {

    this.store.dispatch(new contactsActions.SetCurrentContactId(contact.id));

    this.router.navigate(['/contacts', contact.id, 'edit']);

  }

  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new contactsActions.Delete(contact));
    }
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }


}
