import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromRoot from '@app/root-store';
import * as fromContacts from '@app/contacts-store';
import { ContactsIndexComponent } from './contacts-index.component';
import {combineReducers, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {ContactListComponent} from '@app/core/components/contact-list/contact-list.component';
import {ContactsStoreFacade} from '@app/contacts-store/contacts-store.facade';
import {ContactsSocketService} from '@app/core/services/contacts-socket.service';


describe('ContactsIndexComponent', () => {
  let component: ContactsIndexComponent;
  let fixture: ComponentFixture<ContactsIndexComponent>;

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
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
