import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import * as contactActions from './contacts-actions'
import {ContactsService} from '../services/contacts.service';
import {Actions, Effect} from '@ngrx/effects';
import {Contact} from '../models/contact';


@Injectable()
export class ContactEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadAll$: Observable<Action> = this.actions$
      .ofType(contactActions.LOAD_ALL)
      .startWith(new contactActions.LoadAll())
      .switchMap(() =>
          this.contactsService.index()
              .map((contacts: Contact[]) => new contactActions.LoadAllSuccess(contacts))
      );

  @Effect()
  load$: Observable<Action> = this.actions$
      .ofType(contactActions.LOAD)
      .map(action => action.payload)
      .switchMap((id) =>
          this.contactsService.show(id)
              .map( (contact: Contact) => new contactActions.LoadSuccess(contact))
      );

  @Effect()
  create$: Observable<Action> = this.actions$
      .ofType(contactActions.CREATE)
      .map(action => action.payload)
      .switchMap((contact) =>
          this.contactsService.create(contact)
              .map( (createdContact: Contact) => new contactActions.CreateSuccess(createdContact))
      );

  @Effect()
  update$: Observable<Action> = this.actions$
      .ofType(contactActions.UPDATE)
      .map(action => action.payload)
      .switchMap((contact) =>
          this.contactsService.update(contact)
              .map( (updatedContact: Contact) => new contactActions.UpdateSuccess(updatedContact))
      );


  @Effect()
  destroy$: Observable<Action> = this.actions$
      .ofType(contactActions.DELETE)
      .map(action => action.payload)
      .switchMap((contact) =>
          this.contactsService.destroy(contact)
              .map( () => new contactActions.DeleteSuccess(contact))
      );


  constructor(
      private actions$: Actions,
      private contactsService: ContactsService
  ) {}


}