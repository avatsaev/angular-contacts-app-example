import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactEditComponent } from './contact-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import * as fromContacts from '@app/contacts-store';
import {Actions} from '@ngrx/effects';
import {ContactsEffects} from '../store/contacts-effects';
import {ContactFormComponent} from '@app/core/components/contact-form/contact-form.component';
import {ContactsStoreFacade} from '@app/contacts-store/contacts.store-facade';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ContactsService} from '../services/contacts.service';
import {ContactsSocketService} from '../services/contacts-socket.service';
import {ROOT_REDUCERS} from '@app/root-store';



describe('ContactEditComponent', () => {
  let component: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;
  let contactsFacade: ContactsStoreFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEditComponent, ContactFormComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(ROOT_REDUCERS),
        StoreModule.forFeature('contacts', fromContacts.reducers),
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
    contactsFacade = fixture.debugElement.injector.get(ContactsStoreFacade);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should call contactsFacade.updateContact when submitted calls', () => {
    spyOn(contactsFacade, 'updateContact');
    const contact = {
      id: 1,
      name: 'test',
      email: 'test@avatsaev.com'
    };
    component.submitted(contact);
    expect(contactsFacade.updateContact).toHaveBeenCalledWith(contact);
  });

  it('should call redirectSub.unsubscribe when ngOnDestroy calls', () => {
    spyOn(component.redirectSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.redirectSub.unsubscribe).toHaveBeenCalled();
  });
});

