import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';

import {
  ContactsActionTypes,
  Create,
  CreateSuccess,
  Delete,
  DeleteSuccess,
  Failure,
  Load,
  LoadAll,
  LoadAllSuccess,
  LoadSuccess,
  Patch,
  PatchSuccess
} from '../actions/contacts-actions';

import {Actions, Effect, ofType} from '@ngrx/effects';
import { Contact } from '@app-core/models';
import {ContactsService} from '@app-core/services/contacts.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Injectable()
export class ContactsEffects {

  @Effect()
  loadAll$: Observable<Action> = this.actions$.pipe(
      ofType(ContactsActionTypes.LOAD_ALL), /* When [Contacts] LOAD ALL action is dispatched */
      startWith(new LoadAll()),
      switchMap(() => this.contactsService.index()), /* Hit the Contacts Index endpoint of our REST API */
      /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
      /* 'Contacts Reducers' will take care of the rest */
      map((contacts: Contact[]) => new LoadAllSuccess(contacts))
    );

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(ContactsActionTypes.LOAD),
    map( (action: Load ) => action.payload),
    switchMap((id) => this.contactsService.show(id)),
    map((contact: Contact) => new LoadSuccess(contact))
  );

  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
      ofType(ContactsActionTypes.CREATE),
      map((action: Create) => action.payload),
      switchMap((contact) => this.contactsService.create(contact)),
      map( (createdContact: Contact) => new CreateSuccess(createdContact)),
      catchError(err => {
        alert(err['error']['error']['message']);
        return of(new Failure({concern: 'CREATE', error: err}));
      })
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(ContactsActionTypes.PATCH),
    map((action: Patch) => action.payload),
    switchMap((contact: Contact) => this.contactsService.update(contact)),
    map((updatedContact: Contact) => new PatchSuccess({
      id: updatedContact.id,
      changes: updatedContact
    })),
    catchError(err => {
      alert(err['error']['error']['message']);
      return of(new Failure({concern: 'PATCH', error: err}));
    })
  );


  @Effect()
  destroy$: Observable<Action> = this.actions$.pipe(
    ofType(ContactsActionTypes.DELETE),
    map((action: Delete) => action.payload),
    switchMap(
      (id: number) => this.contactsService.destroy(id).pipe(
        map( () => new DeleteSuccess(id))
      )
    )
  );

  constructor(
      private actions$: Actions,
      private contactsService: ContactsService
  ) {}


}
