import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { ContactsEffects } from './contacts-effects';

import { ContactsServiceMock } from 'src/app/views/contacts/services/contacts-mock.service';
import {ContactsService} from '../services/contacts.service';
import {ContactsSocketService} from '../services/contacts-socket.service';
import {
  create, createSuccess,
  load,
  loadAll,
  loadAllSuccess,
  loadSuccess,
  remove,
  removeSuccess, update, updateSuccess
} from '@app/contacts-store/contacts-actions';

describe('Contacts Effects', () => {
  let actions$: Observable<any>;
  let effects: ContactsEffects;
  let contactsService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactsEffects,
        provideMockActions(() => actions$),
        { provide: ContactsService, useClass: ContactsServiceMock },
        ContactsSocketService
      ]
    });

    effects = TestBed.get(ContactsEffects);
    contactsService = TestBed.get(ContactsService);
  });


  it('should dispatch LoadAllSuccess Action when the contacts are fetched from server', () => {
    const actionDispatched = loadAll();
    const actionExpected = loadAllSuccess({contact: contactsService.contacts});

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    expect(effects.loadAll$).toBeObservable(expected);
  });

  it('should dispatch LoadSuccess Action when specific contact is fetched', () => {
    const actionDispatched = load({id: 1});
    const actionExpected = loadSuccess({contact: {
      id: 1,
      name: 'john',
      email: 'john@gmail.com'
    }});

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    expect(effects.load$).toBeObservable(expected);
  });

  it('should dispatch DeleteSuccess Action when specific contact is deleted', () => {
    const actionDispatched = remove({id: 1});
    const actionExpected = removeSuccess({id: 1});

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    expect(effects.destroy$).toBeObservable(expected);
  });

  it('should dispatch CreateSuccess Action when specific contact is created', () => {
    const actionDispatched = create({contact: {
      id: 4,
      name: 'john doe',
      email: 'john@gmail.com'
    }});
    const actionExpected = createSuccess({contact: {
      id: 4,
      name: 'john doe',
      email: 'john@gmail.com'
    }});

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    expect(effects.create$).toBeObservable(expected);
  });

  it('should dispatch UpdateSuccess Action when specific contact is updated', () => {

    const actionDispatched = update({contact: {
      id: 4,
      name: 'john doe',
      email: 'john@gmail.com'
    }});

    const actionExpected = updateSuccess({contact: {
      id: 4,
      name: 'john doe',
      email: 'john@gmail.com'
    }});

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    expect(effects.update$).toBeObservable(expected);
  });

});
