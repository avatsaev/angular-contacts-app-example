
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListItemComponent } from './contact-list-item.component';

describe('ContactCardComponent', () => {
  let component: ContactListItemComponent;
  let fixture: ComponentFixture<ContactListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
