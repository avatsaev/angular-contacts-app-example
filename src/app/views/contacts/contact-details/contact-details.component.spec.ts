import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsComponent } from './contact-details.component';

import {combineReducers, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import * as fromContacts from '@app/contacts-store';
import {ContactsEffects} from '../store/contacts-effects';
import {Actions} from '@ngrx/effects';
import * as fromRoot from '@app/root-store';

import {HttpClientModule} from '@angular/common/http';
import {ContactDetailsContainerComponent} from '@app/core/components/contact-details/contact-details-container.component';
import {ContactsService} from '@app/core/services/contacts.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ContactsStoreFacade} from '@app/contacts-store/contacts-store.facade';
import {ContactsSocketService} from '@app/core/services/contacts-socket.service';
import { Router } from '@angular/router';


describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
  let contactsFacade: ContactsStoreFacade;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsComponent, ContactDetailsContainerComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
            ...fromRoot.reducers,
            contacts: combineReducers(fromContacts.reducers)
        })
      ],
      providers: [
        ContactsEffects,
        Actions,
        ContactsService,
        ContactsStoreFacade,
        ContactsSocketService

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    contactsFacade = fixture.debugElement.injector.get(ContactsStoreFacade);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call contactsFacade.setCurrentContactId and router.navigate when editContact calls', () => {
    spyOn(contactsFacade, 'setCurrentContactId');
    spyOn(router, 'navigate');
    component.editContact({id: 1, name: 'test', email: 'test@avatsaev.com'});
    expect(contactsFacade.setCurrentContactId).toHaveBeenCalledWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/contacts', 1, 'edit']);
  });

  it('should call contactsFacade.setCurrentContactId when deleteContact calls', () => {
    spyOn(window, 'confirm').and.callFake(() => {
      return true;
    });
    spyOn(contactsFacade, 'deleteContact');
    component.deleteContact({id: 1, name: 'test', email: 'test@avatsaev.com'});
    expect(contactsFacade.deleteContact).toHaveBeenCalledWith(1);
  });

  it('should call redirectSub.unsubscribe when ngOnDestroy calls', () => {
    spyOn(component.redirectSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.redirectSub.unsubscribe).toHaveBeenCalled();
  });
});
