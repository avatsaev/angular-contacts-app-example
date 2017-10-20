import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import * as contactsActions from '../actions/contacts-actions';

import 'rxjs/add/operator/mergeMap';
import {Actions, Effect} from '@ngrx/effects';
import { Contact } from '@app-core/models';
import {ContactsService} from '@app-core/services/contacts.service';


@Injectable()
export class ContactsEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$
      .ofType(contactsActions.LOAD_ALL) /* When [Contacts] LOAD ALL action is dispatched */
      .startWith(new contactsActions.LoadAll())
      .switchMap(() =>
          this.contactsService.index() /* Hit the Contacts Index endpoint of our REST API */
              /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
              /* 'Contacts Reducers' will take care of the rest */
              .map((contacts: Contact[]) => new contactsActions.LoadAllSuccess(contacts))
      );

  @Effect()
  load$: Observable<Action> = this.actions$
      .ofType(contactsActions.LOAD)
      .map( (action: contactsActions.Load ) => action.id)
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
      .map((action: contactsActions.Create) => action.contact)
      .switchMap((contact) =>
          this.contactsService.create(contact)
              .map( (createdContact: Contact) => new contactsActions.CreateSuccess(createdContact))
      );

  @Effect()
  update$: Observable<Action> = this.actions$
      .ofType(contactsActions.UPDATE)
      .map((action: contactsActions.Update) => action.contact)
      .switchMap((contact) =>
          this.contactsService.update(contact)
              .map( (updatedContact: Contact) => new contactsActions.UpdateSuccess(updatedContact))
      );


  @Effect()
  destroy$: Observable<Action> = this.actions$
      .ofType(contactsActions.DELETE)
      .map((action: contactsActions.Delete) => action.id)
      .switchMap((id: number) =>
          this.contactsService.destroy(id)
              .map( () => new contactsActions.DeleteSuccess(id))
      );

  constructor(
      private actions$: Actions,
      private contactsService: ContactsService
  ) {}


}
