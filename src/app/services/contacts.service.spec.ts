import { TestBed, inject } from '@angular/core/testing';

import { ContactsService } from './contacts.service';

import 'rxjs/add/operator/map'

describe('ContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsService]
    });
  });

  it('should be created', inject([ContactsService], (service: ContactsService) => {
    expect(service).toBeTruthy();
  }));
});
