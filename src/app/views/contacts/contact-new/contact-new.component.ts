import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Contact } from '@app-core/models';
import {ActionsSubject, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import * as fromRoot from '@app-root-store';
import {ContactsActionTypes, Create, CreateSuccess} from '@app-contacts-store/actions/contacts-actions';
import {ofType} from '@ngrx/effects';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactNewComponent implements OnInit, OnDestroy {

  redirectSub: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private actionsSubject: ActionsSubject
  ) { }

  ngOnInit() {
    this.redirectSub = this.actionsSubject.asObservable().pipe(
      ofType(ContactsActionTypes.CREATE_SUCCESS)
    ).subscribe(
      (action: CreateSuccess) => this.router.navigate(['/contacts', action.payload.id])
    );

  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.store.dispatch(new Create(contact));
  }

}
