import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {ContactsService} from '../services/contacts.service';
import {ContactsSocketService} from '../services/contacts-socket.service';
import {
  create,
  createSuccess,
  failure,
  load,
  loadAll,
  loadAllSuccess,
  loadSuccess,
  remove,
  removeSuccess,
  update,
  updateSuccess
} from '@app/contacts-store/contacts-actions';
import {extractPayload, toPayload} from '@app/core/helpers/ngrx.helpers';


/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class ContactsEffects {


  loadAll$ = createEffect( () => this.actions$.pipe(
    ofType(loadAll), /* When action is dispatched */
    startWith(loadAll()),
    /* Hit the Contacts Index endpoint of our REST API */
    /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
    /* 'Contacts Reducers' will take care of the rest */
    switchMap(() => this.contactsService.index().pipe(
      toPayload(),
      map(loadAllSuccess)
    )),
  ));


  load$ = createEffect( () => this.actions$.pipe(
    ofType(load),
    extractPayload(),
    switchMap( id => this.contactsService.show(id).pipe(
      toPayload(),
      map(loadSuccess)
    ))
  ));


  create$ = createEffect( () =>this.actions$.pipe(
    ofType(create),
    extractPayload(),
    switchMap((contact) => this.contactsService.create(contact).pipe(
      toPayload(),
      map(createSuccess),
      catchError(err => {
        alert(err.message);
        return of(failure({payload: {concern: 'CREATE', error: err}}));
      })
    ))
  ));


  update$ = createEffect( () => this.actions$.pipe(
    ofType(update),
    extractPayload(),
    exhaustMap( contact => this.contactsService.update(contact).pipe(
      toPayload(),
      map(updateSuccess)
    ))
  ));

  destroy$ = createEffect( () => this.actions$.pipe(
    ofType(remove),
    extractPayload(),
    switchMap( id => this.contactsService.destroy(id).pipe(
      map(res => res.id),
      toPayload(),
      map(removeSuccess)
    ))
  ));

  // Socket Live Events

  @Effect()
  liveCreate$ = this.contactsSocket.liveCreated$.pipe(
    toPayload(),
    map(createSuccess)
  );


  @Effect()
  liveUpdate$ = this.contactsSocket.liveUpdated$.pipe(
    toPayload(),
    map(updateSuccess)
  );

  @Effect()
  liveDestroy$ = this.contactsSocket.liveDeleted$.pipe(
    toPayload(),
    map(removeSuccess)
  );

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private contactsSocket: ContactsSocketService
  ) {}

}
