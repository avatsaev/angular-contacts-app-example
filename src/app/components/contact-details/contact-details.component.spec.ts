import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsContainerComponent } from './contact-details-container.component';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsContainerComponent;
  let fixture: ComponentFixture<ContactDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
