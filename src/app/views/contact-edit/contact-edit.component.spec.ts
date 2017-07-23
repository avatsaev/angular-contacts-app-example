import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditComponent } from './contact-edit.component';
import {ContactFormComponent} from '../../components/contact-form/contact-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import { reducer } from '../../store';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

describe('ContactEditComponent', () => {
  let component: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEditComponent, ContactFormComponent ],
      imports: [ReactiveFormsModule, StoreModule.provideStore(reducer), RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({contactId: 1})
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
