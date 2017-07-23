import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import * as contactActions from './contacts-actions';
import * as uiActions from './ui-actions';
import {ContactsService} from '../services/contacts.service';
import {Actions, Effect} from '@ngrx/effects';
import {Contact} from '../models/contact';

import 'rxjs/add/operator/mergeMap';


@Injectable()
export class ContactEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$
      .ofType(contactActions.LOAD_ALL) /* When [Contacts] LOAD ALL action is dispatched */
      .switchMap(() =>
          this.contactsService.index() /* Hit the Contacts Index endpoint of our REST API */
              /* Dispatch LoadAllSuccess action to the central store with contact list returned by the backend as payload*/
              /* 'Contacts Reducers' will take care of the rest */
              .map((contacts: Contact[]) => new contactActions.LoadAllSuccess(contacts))
      );

  @Effect()
  load$: Observable<Action> = this.actions$
      .ofType(contactActions.LOAD)
      .map( (action: contactActions.Load ) => action.payload)
      .switchMap((id) =>
          this.contactsService.show(id)
              .mergeMap( (contact: Contact) => {
                return [
                    new contactActions.LoadSuccess(contact),
                    new uiActions.SetCurrentContactId(contact.id)
                ]
              })
      );

  @Effect()
  create$: Observable<Action> = this.actions$
      .ofType(contactActions.CREATE)
      .map((action: contactActions.Create) => action.payload)
      .switchMap((contact) =>
          this.contactsService.create(contact)
              .map( (createdContact: Contact) => new contactActions.CreateSuccess(createdContact))
      );

  @Effect()
  update$: Observable<Action> = this.actions$
      .ofType(contactActions.UPDATE)
      .map((action: contactActions.Update) => action.payload)
      .switchMap((contact) =>
          this.contactsService.update(contact)
              .map( (updatedContact: Contact) => new contactActions.UpdateSuccess(updatedContact))
      );


  @Effect()
  destroy$: Observable<Action> = this.actions$
      .ofType(contactActions.DELETE)
      .map((action: contactActions.Delete) => action.payload)
      .switchMap((contact) =>
          this.contactsService.destroy(contact)
              .map( () => new contactActions.DeleteSuccess(contact))
      );

  constructor(
      private actions$: Actions,
      private contactsService: ContactsService
  ) {}


}
