import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsComponent } from './contact-details.component';
import {ContactDetailsContainerComponent} from '../../../core/components/contact-details/contact-details-container.component';
import {StoreModule} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import { reducers, APP_INIT_STATE } from '../../../store';
import {ContactsEffects} from '../store/effects/contacts-effects';
import {Actions} from '@ngrx/effects';
import {ContactsService} from '../../../core/services/contacts.service';
import {HttpClientModule} from '@angular/common/http';


describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsComponent, ContactDetailsContainerComponent],
      imports: [
        StoreModule.forRoot(reducers, {initialState: APP_INIT_STATE}),
        RouterTestingModule,
        HttpClientModule
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
