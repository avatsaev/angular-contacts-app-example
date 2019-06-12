import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactDetailsComponent } from './contact-details.component';
import {StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import * as fromContacts from '@app/contacts-store';
import {ContactsEffects} from '../store/contacts-effects';
import {Actions} from '@ngrx/effects';
import {ContactDetailsContainerComponent} from '@app/core/components/contact-details/contact-details-container.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ContactsStoreFacade} from '@app/contacts-store/contacts.store-facade';
import { Router } from '@angular/router';
import {ContactsService} from '../services/contacts.service';
import {ContactsSocketService} from '../services/contacts-socket.service';
import {ROOT_REDUCERS} from '@app/root-store';


describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
  let contactsFacade: ContactsStoreFacade;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsComponent, ContactDetailsContainerComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(ROOT_REDUCERS),
        StoreModule.forFeature('contacts', fromContacts.reducers),
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
    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    contactsFacade = fixture.debugElement.injector.get(ContactsStoreFacade);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call contactsFacade.setCurrentContactId and router.navigate when editContact calls', () => {
    spyOn(router, 'navigate');
    component.editContact({id: 1, name: 'test', email: 'test@avatsaev.com'});
    expect(router.navigate).toHaveBeenCalledWith(['/contacts', 1, 'edit']);
  });

  it('should call contactsFacade.setCurrentContactId when deleteContact calls', () => {
    spyOn(window, 'confirm').and.callFake(() => {
      return true;
    });
    spyOn(contactsFacade, 'deleteContact');
    component.deleteContact({id: 1, name: 'test', email: 'test@avatsaev.com'});
    expect(contactsFacade.deleteContact).toHaveBeenCalledWith(1);
  });

  it('should call redirectSub.unsubscribe when ngOnDestroy calls', () => {
    spyOn(component.redirectSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.redirectSub.unsubscribe).toHaveBeenCalled();
  });
});
