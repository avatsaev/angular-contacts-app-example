import { TestBed, inject } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import {HttpClientModule} from '@angular/common/http';


describe('ContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([ContactsService], (service: ContactsService) => {
    expect(service).toBeTruthy();
  }));
});
