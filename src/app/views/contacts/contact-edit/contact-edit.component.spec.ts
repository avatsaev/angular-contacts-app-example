import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditComponent } from './contact-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {combineReducers, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import * as fromContacts from '@app/contacts-store';
import {Actions} from '@ngrx/effects';
import {ContactsEffects} from '../store/contacts-effects';
import {HttpClientModule} from '@angular/common/http';
import {ContactFormComponent} from '@app/core/components/contact-form/contact-form.component';
import {ContactsService} from '@app/core/services/contacts.service';
import * as fromRoot from '@app/root-store';
import {ContactsStoreFacade} from '@app/contacts-store/contacts-store.facade';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ContactsSocketService} from '@app/core/services/contacts-socket.service';


describe('ContactEditComponent', () => {
  let component: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEditComponent, ContactFormComponent ],
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
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should call contactsFacade.updateContact when submitted calls', () => {
    spyOn(component.contactsFacade, 'updateContact');
    const contact = {
      id: 1,
      name: 'test',
      email: 'test@avatsaev.com'
    };
    component.submitted(contact);
    expect(component.contactsFacade.updateContact).toHaveBeenCalledWith(contact);
  });

  it('should call redirectSub.unsubscribe when ngOnDestroy calls', () => {
    spyOn(component.redirectSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.redirectSub.unsubscribe).toHaveBeenCalled();
  });
});

