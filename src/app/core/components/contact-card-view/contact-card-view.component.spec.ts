import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCardViewComponent } from './contact-card-view.component';

describe('ContactCardViewComponent', () => {
  let component: ContactCardViewComponent;
  let fixture: ComponentFixture<ContactCardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
