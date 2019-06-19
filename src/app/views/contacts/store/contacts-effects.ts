import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map, pluck,
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
      map(contacts => loadAllSuccess({contacts}))
    )),
  ));


  load$ = createEffect( () => this.actions$.pipe(
    ofType(load),
    pluck('id'),
    switchMap( id => this.contactsService.show(id).pipe(
      map(contact => loadSuccess({contact}))
    ))
  ));


  create$ = createEffect( () =>this.actions$.pipe(
    ofType(create),
    pluck('contact'),
    switchMap( contact => this.contactsService.create(contact).pipe(
      map(contact => createSuccess({contact})),
      catchError(err => {
        alert(err.message);
        return of(failure({err: {concern: 'CREATE', error: err}}));
      })
    ))
  ));


  update$ = createEffect( () => this.actions$.pipe(
    ofType(update),
    pluck('contact'),
    exhaustMap( contact => this.contactsService.update(contact).pipe(
      map(contact => updateSuccess({contact}))
    ))
  ));

  destroy$ = createEffect( () => this.actions$.pipe(
    ofType(remove),
    pluck('id'),
    switchMap( id => this.contactsService.destroy(id).pipe(
      pluck('id'),
      map(id => removeSuccess({id}))
    ))
  ));

  // Socket Live Events

  @Effect()
  liveCreate$ = this.contactsSocket.liveCreated$.pipe(
    map(contact => createSuccess({contact}))
  );


  @Effect()
  liveUpdate$ = this.contactsSocket.liveUpdated$.pipe(
    map(contact => updateSuccess({contact}))
  );

  @Effect()
  liveDestroy$ = this.contactsSocket.liveDeleted$.pipe(
    map(id => removeSuccess({id}))
  );

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private contactsSocket: ContactsSocketService
  ) {}

}
