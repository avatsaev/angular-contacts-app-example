import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Contact } from '@app-core/models';
import {Store, ActionsSubject} from '@ngrx/store';

import {State} from '../store';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import * as fromContacts from '@app-contacts-store'
import * as contactsActions from '@app-contacts-store/actions/contacts-actions'
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactEditComponent implements OnInit, OnDestroy {

  contact$: Observable<Contact>;
  redirectSub: Subscription;

  constructor(
      public store: Store<State>,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private actionsSubject: ActionsSubject

  ) { }

  ngOnInit() {

    this.contact$ = this.store.select(fromContacts.getCurrentContact);

    // If the update effect fires, we check if the current id is the one being updated, and redirect to its details
    this.redirectSub = this.actionsSubject.pipe(
        filter(action => action.type === contactsActions.PATCH_SUCCESS),
        filter((action: contactsActions.PatchSuccess) => action.payload.id === +this.activatedRoute.snapshot.params['contactId'])
    ).subscribe(
      (action: contactsActions.PatchSuccess) => this.router.navigate(['/contacts', action.payload.id])
    );

    this.activatedRoute.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      this.store.dispatch(new contactsActions.Load(+params['contactId']));
    });

  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.store.dispatch(new contactsActions.Patch(contact));
  }

}
