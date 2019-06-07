import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromRoot from '@app/root-store';
import * as fromContacts from '@app/contacts-store';
import { ContactsIndexComponent } from './contacts-index.component';
import {combineReducers, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {ContactListComponent} from '@app/core/components/contact-list/contact-list.component';
import {ContactsStoreFacade} from '@app/contacts-store/contacts.store-facade';

import { Router } from '@angular/router';
import {ContactsSocketService} from '../services/contacts-socket.service';


describe('ContactsIndexComponent', () => {
  let component: ContactsIndexComponent;
  let fixture: ComponentFixture<ContactsIndexComponent>;
  let contactsFacade: ContactsStoreFacade;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [ ContactsIndexComponent, ContactListComponent ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          contacts: combineReducers(fromContacts.reducers)
        }),
        RouterTestingModule
      ],
      providers: [
        ContactsStoreFacade,
        ContactsSocketService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    contactsFacade = fixture.debugElement.injector.get(ContactsStoreFacade);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should call contactsFacade.setCurrentContactId and router.navigate when editContact calls', () => {

    spyOn(router, 'navigate');
    component.editContact({id: 1, name: 'test', email: 'test@avatsaev.com'});
    expect(router.navigate).toHaveBeenCalledWith(['/contacts', 1, 'edit']);
  });

  it('should call contactsFacade.setCurrentContactId and router.navigate when showContact calls', () => {

    spyOn(router, 'navigate');
    component.showContact({id: 1, name: 'test', email: 'test@avatsaev.com'});

    expect(router.navigate).toHaveBeenCalledWith(['/contacts', 1]);
  });

  it('should call contactsFacade.setCurrentContactId when deleteContact calls', () => {
    spyOn(window, 'confirm').and.callFake(() => {
      return true;
    });
    spyOn(contactsFacade, 'deleteContact');
    component.deleteContact({id: 1, name: 'test', email: 'test@avatsaev.com'});
    expect(contactsFacade.deleteContact).toHaveBeenCalledWith(1);
  });
});
