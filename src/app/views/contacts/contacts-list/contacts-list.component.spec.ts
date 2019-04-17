import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromRoot from '@app/root-store';
import * as fromContacts from '@app/contacts-store';
import { ContactsListComponent } from './contacts-list.component';
import { combineReducers, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
// import { ContactsListComponent } from '@app/core/components/contacts-list/contacts-list.component';
import { ContactsStoreFacade } from '@app/contacts-store/contacts-store.facade';
import { ContactsSocketService } from '@app/services/contacts-socket.service';
import { Router } from '@angular/router';


describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;
  let contactsFacade: ContactsStoreFacade;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [ContactsListComponent],
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
    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    contactsFacade = fixture.debugElement.injector.get(ContactsStoreFacade);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should call contactsFacade.setCurrentContactId and router.navigate when editContact calls', () => {
    spyOn(contactsFacade, 'setCurrentContactId');
    spyOn(router, 'navigate');
    component.editContact({ id: 1, name: 'test', email: 'test@avatsaev.com' });
    expect(contactsFacade.setCurrentContactId).toHaveBeenCalledWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/contacts', 1, 'edit']);
  });

  it('should call contactsFacade.setCurrentContactId and router.navigate when showContact calls', () => {
    spyOn(contactsFacade, 'setCurrentContactId');
    spyOn(router, 'navigate');
    component.showContact({ id: 1, name: 'test', email: 'test@avatsaev.com' });
    expect(contactsFacade.setCurrentContactId).toHaveBeenCalledWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/contacts', 1]);
  });

  it('should call contactsFacade.setCurrentContactId when deleteContact calls', () => {
    spyOn(window, 'confirm').and.callFake(() => {
      return true;
    });
    spyOn(contactsFacade, 'deleteContact');
    component.deleteContact({ id: 1, name: 'test', email: 'test@avatsaev.com' });
    expect(contactsFacade.deleteContact).toHaveBeenCalledWith(1);
  });
});
