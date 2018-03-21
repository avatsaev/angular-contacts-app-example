import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Contact } from '@app-core/models';
import {ActionsSubject, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

import * as contactsActions from '../store/actions/contacts-actions'
import * as fromRoot from '@app-root-store';
import {filter} from 'rxjs/operators';

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
      filter(action => action.type === contactsActions.CREATE_SUCCESS)
    ).subscribe(
      (action: contactsActions.CreateSuccess) => this.router.navigate(['/contacts', action.payload.id])
    );

  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.store.dispatch(new contactsActions.Create(contact));
  }

}
