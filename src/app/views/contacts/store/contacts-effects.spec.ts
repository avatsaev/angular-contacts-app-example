import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { ContactsEffects } from './contacts-effects';
import { ContactsService } from '@app/core/services/contacts.service';
import { ContactsServiceMock } from 'src/mock-service/contacts-mock';
import {
  LoadAll,
  LoadAllSuccess,
  Load,
  LoadSuccess,
  Create,
  CreateSuccess,
  Delete,
  DeleteSuccess,
  Patch,
  PatchSuccess
} from './contacts-actions';
import { ContactsSocketService } from '@app/core/services/contacts-socket.service';

fdescribe('Contacts Effects', () => {
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
    const actionDispatched = new LoadAll();
    const actionExpected = new LoadAllSuccess(contactsService.contacts);

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    console.log(contactsService.contacts);
    expect(effects.loadAll$).toBeObservable(expected);
  });

  it('should dispatch LoadSuccess Action when specific contact is fetched', () => {
    const actionDispatched = new Load(1);
    const actionExpected = new LoadSuccess({
      id: 1,
      name: 'john',
      email: 'john@gmail.com'
    });

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    expect(effects.load$).toBeObservable(expected);
  });

  it('should dispatch DeleteSuccess Action when specific contact is deleted', () => {
    const actionDispatched = new Delete(1);
    const actionExpected = new DeleteSuccess(1);

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    expect(effects.destroy$).toBeObservable(expected);
  });

  it('should dispatch CreateSuccess Action when specific contact is created', () => {
    const actionDispatched = new Create({
      id: 4,
      name: 'john doe',
      email: 'john@gmail.com'
    });
    const actionExpected = new CreateSuccess({
      id: 4,
      name: 'john doe',
      email: 'john@gmail.com'
    });

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    expect(effects.create$).toBeObservable(expected);
  });

  it('should dispatch UpdateSuccess Action when specific contact is updated', () => {
    const actionDispatched = new Patch({
      id: 4,
      name: 'john doe',
      email: 'john@gmail.com'
    });
    const actionExpected = new PatchSuccess({
      id: 4,
      changes: {
        id: 4,
        name: 'john doe',
        email: 'john@gmail.com'
      }
    });

    actions$ = hot('--a-', { a: actionDispatched });
    const expected = cold('--b', { b: actionExpected });
    expect(effects.update$).toBeObservable(expected);
  });

});
