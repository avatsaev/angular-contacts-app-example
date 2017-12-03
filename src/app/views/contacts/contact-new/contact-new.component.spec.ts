import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNewComponent } from './contact-new.component';
import {ReactiveFormsModule} from '@angular/forms';
import {combineReducers, StoreModule} from '@ngrx/store';
import * as fromContacts from '@app-contacts-store'
import {RouterTestingModule} from '@angular/router/testing';
import {Actions} from '@ngrx/effects';
import {ContactsEffects} from '../store/effects/contacts-effects';
import {HttpClientModule} from '@angular/common/http';
import {ContactFormComponent} from '@app-core/components/contact-form/contact-form.component';
import {ContactsService} from '@app-core/services/contacts.service';
import * as fromRoot from '@app-root-store'


describe('ContactNewComponent', () => {
  let component: ContactNewComponent;
  let fixture: ComponentFixture<ContactNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactNewComponent, ContactFormComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'contacts': combineReducers(fromContacts.reducers)
        }),
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        ContactsEffects,
        Actions,
        ContactsService,
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
