import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import * as contactsActions from '../actions/contacts-actions';


import {Actions, Effect} from '@ngrx/effects';
import { Contact } from '@app-core/models';
import {ContactsService} from '@app-core/services/contacts.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';

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
              .catch(err => {
                alert(err['error']['error']['message']);
                return Observable.of(new contactsActions.Failure({concern: 'CREATE', error: err}));
              })
      );

  @Effect()
  update$: Observable<Action> = this.actions$
      .ofType(contactsActions.PATCH)
      .map((action: contactsActions.Patch) => action.payload)
      .switchMap((contact: Contact) =>
          this.contactsService.update(contact)
              .map( (updatedContact: Contact) => new contactsActions.PatchSuccess({id: updatedContact.id, changes: updatedContact}))
              .catch(err => {
                alert(err['error']['error']['message']);
                return Observable.of(new contactsActions.Failure({concern: 'PATCH', error: err}));
              })
      );


  @Effect()
  destroy$: Observable<Action> = this.actions$
      .ofType(contactsActions.DELETE)
      .map((action: contactsActions.Delete) => action.payload)
      .switchMap((id: number) =>
          this.contactsService.destroy(id)
              .map( () => new contactsActions.DeleteSuccess(id))
      );

  constructor(
      private actions$: Actions,
      private contactsService: ContactsService
  ) {}


}
