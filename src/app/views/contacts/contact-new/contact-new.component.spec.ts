import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNewComponent } from './contact-new.component';
import {ReactiveFormsModule} from '@angular/forms';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromContacts from '@app/contacts-store';
import {RouterTestingModule} from '@angular/router/testing';
import {Actions} from '@ngrx/effects';
import {ContactsEffects} from '../store/contacts-effects';
import {ContactFormComponent} from '@app/core/components/contact-form/contact-form.component';
import {ContactsService} from '@app/core/../services/contacts.service';
import * as fromRoot from '@app/root-store';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ContactsStoreFacade} from '@app/contacts-store/contacts-store.facade';
import {ContactsSocketService} from '@app/core/../services/contacts-socket.service';
import { Router } from '@angular/router';


describe('ContactNewComponent', () => {
  let component: ContactNewComponent;
  let fixture: ComponentFixture<ContactNewComponent>;
  let contactsFacade: ContactsStoreFacade;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactNewComponent, ContactFormComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          contacts: combineReducers(fromContacts.reducers)
        }),
        RouterTestingModule,
        HttpClientTestingModule
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
    fixture = TestBed.createComponent(ContactNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    contactsFacade = fixture.debugElement.injector.get(ContactsStoreFacade);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should call contactsFacade.createContact and router.navigate when submitted calls', () => {
    spyOn(contactsFacade, 'createContact');
    spyOn(router, 'navigate');
    const contact = {
      id: 1,
      name: 'test',
      email: 'test@avatsaev.com'
    };
    component.submitted(contact);
    expect(contactsFacade.createContact).toHaveBeenCalledWith(contact);
    expect(router.navigate).toHaveBeenCalledWith(['/contacts']);
  });
});
