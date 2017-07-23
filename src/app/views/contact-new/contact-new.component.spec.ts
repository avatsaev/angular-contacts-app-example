import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNewComponent } from './contact-new.component';
import {ContactFormComponent} from '../../components/contact-form/contact-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import { reducer } from '../../store';
import {RouterTestingModule} from '@angular/router/testing';


describe('ContactNewComponent', () => {
  let component: ContactNewComponent;
  let fixture: ComponentFixture<ContactNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactNewComponent, ContactFormComponent ],
      imports: [ReactiveFormsModule, StoreModule.provideStore(reducer), RouterTestingModule],

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
