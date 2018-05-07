import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditComponent } from './contact-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {combineReducers, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import * as fromContacts from '@app-contacts-store';
import {ActivatedRoute} from '@angular/router';
import {Actions} from '@ngrx/effects';
import {ContactsEffects} from '../store/effects/contacts-effects';
import {HttpClientModule} from '@angular/common/http';
import {ContactFormComponent} from '@app-core/components/contact-form/contact-form.component';
import {ContactsService} from '@app-core/services/contacts.service';
import * as fromRoot from '@app-root-store';


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
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
