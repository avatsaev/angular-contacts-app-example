import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import * as contactsActions from '../actions/contacts-actions';

import 'rxjs/add/operator/mergeMap';
import {Actions, Effect} from '@ngrx/effects';
import {Contact} from '../../../../core/models/contact';
import {ContactsService} from '../../../../core/services/contacts.service';


@Injectable()
export class ContactsEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$
      .ofType(contactsActions.LOAD_ALL) /* When [Contacts] LOAD ALL action is dispatched */
      .startWith(new contactsActions.LoadAll())
      .switchMap(() =>
          this.contactsService.index() /* Hit the Contacts Index endpoint of our REST API */
              /* Dispatch LoadAllSuccess action to the central store with contact list returned by the backend as payload*/
              /* 'Contacts Reducers' will take care of the rest */
              .map((contacts: Contact[]) => new contactsActions.LoadAllSuccess(contacts))
      );

  @Effect()
  load$: Observable<Action> = this.actions$
      .ofType(contactsActions.LOAD)
      .map( (action: contactsActions.Load ) => action.payload)
      .switchMap((id) =>
          this.contactsService.show(id)
              .mergeMap( (contact: Contact) => {
                return [
                    new contactsActions.LoadSuccess(contact),
                    new contactsActions.SetCurrentContactId(contact.id)
                ]
              })
      );

  @Effect()
  create$: Observable<Action> = this.actions$
      .ofType(contactsActions.CREATE)
      .map((action: contactsActions.Create) => action.payload)
      .switchMap((contact) =>
          this.contactsService.create(contact)
              .map( (createdContact: Contact) => new contactsActions.CreateSuccess(createdContact))
      );

  @Effect()
  update$: Observable<Action> = this.actions$
      .ofType(contactsActions.UPDATE)
      .map((action: contactsActions.Update) => action.payload)
      .switchMap((contact) =>
          this.contactsService.update(contact)
              .map( (updatedContact: Contact) => new contactsActions.UpdateSuccess(updatedContact))
      );


  @Effect()
  destroy$: Observable<Action> = this.actions$
      .ofType(contactsActions.DELETE)
      .map((action: contactsActions.Delete) => action.payload)
      .switchMap((contact) =>
          this.contactsService.destroy(contact)
              .map( () => new contactsActions.DeleteSuccess(contact))
      );

  constructor(
      private actions$: Actions,
      private contactsService: ContactsService
  ) {}


}
