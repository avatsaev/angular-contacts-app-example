import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailedViewComponent } from './contact-detailed-view.component';

describe('ContactCardComponent', () => {
  let component: ContactDetailedViewComponent;
  let fixture: ComponentFixture<ContactDetailedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDetailedViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
