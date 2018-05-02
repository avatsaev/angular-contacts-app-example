import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsComponent } from './contact-details.component';

import {combineReducers, StoreModule} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs';
import * as fromContacts from '@app-contacts-store';
import {ContactsEffects} from '../store/effects/contacts-effects';
import {Actions} from '@ngrx/effects';
import * as fromRoot from '@app-root-store';

import {HttpClientModule} from '@angular/common/http';
import {ContactDetailsContainerComponent} from '@app-core/components/contact-details/contact-details-container.component';
import {ContactsService} from '@app-core/services/contacts.service';


describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsComponent, ContactDetailsContainerComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot({
            ...fromRoot.reducers,
            'contacts': combineReducers(fromContacts.reducers)
        })
      ],
      providers: [
        ContactsEffects,
        Actions,
        ContactsService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({contactId: 1})
          }
        }
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
