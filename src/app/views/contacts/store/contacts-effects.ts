import { Injectable } from '@angular/core';
import {
  create,
  createSuccess,
  failure,
  load,
  loadAll,
  loadAllSuccess,
  loadSuccess,
  pageChange,
  remove,
  removeSuccess,
  update,
  updateSuccess
} from '@app/contacts-store/contacts-actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map, pluck,
  startWith,
  switchMap
} from 'rxjs/operators';
import { ContactsService } from '../services/contacts.service';


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
      map(responseList => loadAllSuccess({response: responseList}))
    )),
  ));

  pageChange$ = createEffect( () => this.actions$.pipe(
    ofType(pageChange),
    pluck('page'),
    switchMap( page => this.contactsService.index(page).pipe(
      map( responseList => loadAllSuccess({response: responseList}))
    ))
  ));


  load$ = createEffect( () => this.actions$.pipe(
    ofType(load),
    pluck('id'),
    switchMap( id => this.contactsService.show(id).pipe(
      map(response => loadSuccess({contact: response.data}))
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
      map(() => removeSuccess({id}))
    ))
  ));

  // Socket Live Events

  // @Effect()
  // liveCreate$ = this.contactsSocket.liveCreated$.pipe(
  //   map(contact => createSuccess({contact}))
  // );


  // @Effect()
  // liveUpdate$ = this.contactsSocket.liveUpdated$.pipe(
  //   map(contact => updateSuccess({contact}))
  // );

  // @Effect()
  // liveDestroy$ = this.contactsSocket.liveDeleted$.pipe(
  //   map(id => removeSuccess({id}))
  // );

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService
  ) {}

}
