import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsIndexComponent } from './contacts-index.component';
import {ContactListComponent} from '../../components/contact-list/contact-list.component';
import {StoreModule} from '@ngrx/store';
import { reducers, APP_INIT_STATE } from '../../store';
import {RouterTestingModule} from '@angular/router/testing';


describe('ContactsIndexComponent', () => {
  let component: ContactsIndexComponent;
  let fixture: ComponentFixture<ContactsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsIndexComponent, ContactListComponent ],
      imports: [StoreModule.forRoot(reducers, {initialState: APP_INIT_STATE}), RouterTestingModule],
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
