import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Store, ActionsSubject} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { Contact } from '@app-core/models';


import * as fromContacts from '@app-contacts-store';
import {
  ContactsActionTypes,
  Delete,
  DeleteSuccess,
  Load,
  SetCurrentContactId
} from '@app-contacts-store/actions/contacts-actions';
import * as fromRoot from '@app-root-store';
import {filter} from 'rxjs/operators';
import {ofType} from '@ngrx/effects';

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
        ofType(ContactsActionTypes.DELETE_SUCCESS),
        filter((action: DeleteSuccess) =>
          action.payload === +this.activatedRoute.snapshot.params['contactId'])
  ).subscribe(_ => this.router.navigate(['/contacts']));

    this.redirectSub = this.actionsSubject.pipe(
      filter(action => action.type === ContactsActionTypes.DELETE_SUCCESS),
    ).subscribe(
      _ => this.router.navigate(['/contacts'])
    );


    this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      this.store.dispatch(new Load(+params['contactId']));
    });

  }


  editContact(contact: Contact) {

    this.store.dispatch(new SetCurrentContactId(contact.id));

    this.router.navigate(['/contacts', contact.id, 'edit']);

  }

  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new Delete(contact.id));
    }
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }


}
