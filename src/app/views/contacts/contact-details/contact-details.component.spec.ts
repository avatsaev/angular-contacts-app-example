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


describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;

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
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
