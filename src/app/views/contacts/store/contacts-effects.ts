import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import {
  catchError,
  exhaustMap,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';

import * as contactsActions from '@app/contacts-store/contacts-actions';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Contact } from '@app/core/models';
import {ContactsService} from '../services/contacts.service';
import {ContactsSocketService} from '../services/contacts-socket.service';


/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class ContactsEffects {

  @Effect()
  loadAll$ = this.actions$.pipe(
      ofType<contactsActions.LoadAll>(contactsActions.ContactsActionTypes.LOAD_ALL), /* When [Contacts] LOAD ALL action is dispatched */
      // startWith(new contactsActions.LoadAll()),
      /* Hit the Contacts Index endpoint of our REST API */
      /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
      /* 'Contacts Reducers' will take care of the rest */
      switchMap(() => this.contactsService.index().pipe(
        map( contacts => new contactsActions.LoadAllSuccess(contacts) )
      )),
    );

  @Effect()
  load$ = this.actions$.pipe(
    ofType<contactsActions.Load>(contactsActions.ContactsActionTypes.LOAD),
    map( action => action.payload),
    switchMap( id => this.contactsService.show(id).pipe(
      map( contact => new contactsActions.LoadSuccess(contact))
    ))
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType<contactsActions.Create>(contactsActions.ContactsActionTypes.CREATE),
    map( action => action.payload),
    exhaustMap((contact) => this.contactsService.create(contact).pipe(
      map( (createdContact: Contact) => new contactsActions.CreateSuccess(createdContact)),
      catchError(err => {
        alert(err.message);
        return of(new contactsActions.Failure({concern: 'CREATE', error: err}));
      })
    ))
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType<contactsActions.Patch>(contactsActions.ContactsActionTypes.PATCH),
    map( action => action.payload ),
    exhaustMap( contact => this.contactsService.update(contact).pipe(
      map((updatedContact: Contact) => new contactsActions.PatchSuccess({
        id: updatedContact.id,
        changes: updatedContact
      })),
      catchError(err => {
        alert(err.message);
        return of(new contactsActions.Failure({concern: 'PATCH', error: err}));
      })
    ))

  );

  @Effect()
  destroy$ = this.actions$.pipe(
    ofType<contactsActions.Delete>(contactsActions.ContactsActionTypes.DELETE),
    map( action => action.payload ),
    switchMap(
      id => this.contactsService.destroy(id).pipe(
        map( () => new contactsActions.DeleteSuccess(id))
      )
    )
  );

  // Socket Live Events

  @Effect()
  liveCreate$ = this.contactsSocket.liveCreated$.pipe(
    map((contact: Contact) => new contactsActions.CreateSuccess(contact))
  );


  @Effect()
  liveUpdate$ = this.contactsSocket.liveUpdated$.pipe(
    map((contact: Contact) => new contactsActions.PatchSuccess({
      id: contact.id, changes: contact
    }))
  );

  @Effect()
  liveDestroy$ = this.contactsSocket.liveDeleted$.pipe(
    map(id => new contactsActions.DeleteSuccess(+id))
  );

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private contactsSocket: ContactsSocketService
  ) {}

}
