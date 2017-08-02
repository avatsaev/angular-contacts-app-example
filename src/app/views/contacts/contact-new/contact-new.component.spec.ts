import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNewComponent } from './contact-new.component';
import {ContactFormComponent} from '../../../components/contact-form/contact-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import { reducers, APP_INIT_STATE } from '../../../store';
import {RouterTestingModule} from '@angular/router/testing';
import {ContactsService} from '../../../services/contacts.service';
import {Actions} from '@ngrx/effects';
import {ContactsEffects} from '../store/effects/contacts-effects';
import {HttpClientModule} from '@angular/common/http';


describe('ContactNewComponent', () => {
  let component: ContactNewComponent;
  let fixture: ComponentFixture<ContactNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactNewComponent, ContactFormComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, {initialState: APP_INIT_STATE}),
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
