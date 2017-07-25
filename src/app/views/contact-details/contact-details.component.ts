import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationState} from '../../store/index';
import { Store, ActionsSubject} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import * as contactsActions from '../../store/contacts-actions'
import * as uiActions from '../../store/ui-actions'
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../models/contact';
import * as fromApplication from '../../store';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.sass']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  contact$: Observable<Contact>;
  redirectSub: Subscription

  constructor(
      private store: Store<ApplicationState>,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private actionsSubject: ActionsSubject
  ) {}

  ngOnInit() {

    this.contact$ = this.store.select(fromApplication.getCurrentContact);


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

    this.store.dispatch(new uiActions.SetCurrentContactId(contact.id));

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
