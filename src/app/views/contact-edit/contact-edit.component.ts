import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../models/contact';
import {Store, ActionsSubject} from '@ngrx/store';
import * as fromApplication from '../../store'
import * as contactsActions from '../../store/contacts-actions'
import {ApplicationState} from '../../store/';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.sass']
})
export class ContactEditComponent implements OnInit, OnDestroy {

  contact$: Observable<Contact>;
  redirectSub: Subscription;

  constructor(
      public store: Store<ApplicationState>,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private actionsSubject: ActionsSubject

  ) { }

  ngOnInit() {

    this.contact$ = this.store.select(fromApplication.getCurrentContact);

    // If the update effect fires, we check if the current contact is the one being updated, and redirect to its details
    this.redirectSub = this.actionsSubject
        .filter(action => action.type === contactsActions.UPDATE_SUCCESS)
        .filter((action: contactsActions.UpdateSuccess) => action.payload.id === +this.activatedRoute.snapshot.params['contactId'])
        .subscribe((action: contactsActions.UpdateSuccess) => this.router.navigate(['/contacts', action.payload.id]));

    this.activatedRoute.params.subscribe(params => {
      // update our contact from the backend in case it was modified by another client
      this.store.dispatch(new contactsActions.Load(+params['contactId']));
    })

  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  submitted(contact: Contact) {
    this.store.dispatch(new contactsActions.Update(contact));
  }

}
