import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Store, ActionsSubject} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { Contact } from '@app-core/models';
import {Subscription} from 'rxjs/Subscription';


import * as fromContacts from '@app-contacts-store'
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import * as fromRoot from '@app-root-store';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  contact$: Observable<Contact>;
  redirectSub: Subscription;

  constructor(
      private store: Store<fromRoot.State>,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private actionsSubject: ActionsSubject
  ) {}

  ngOnInit() {

    this.contact$ = this.store.select(fromContacts.getCurrentContact);

    // If the destroy effect fires, we check if the current id is the one being viewed, and redirect to index
    this.redirectSub = this.actionsSubject.pipe(
        filter(action => action.type === contactsActions.DELETE_SUCCESS),
        filter((action: contactsActions.DeleteSuccess) =>
          action.payload === +this.activatedRoute.snapshot.params['contactId'])
  ).subscribe(_ => this.router.navigate(['/contacts']));

    this.redirectSub = this.actionsSubject.pipe(
      filter(action => action.type === contactsActions.DELETE_SUCCESS),
    ).subscribe(
      _ => this.router.navigate(['/contacts'])
    );


    this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
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
      this.store.dispatch(new contactsActions.Delete(contact.id));
    }
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }


}
