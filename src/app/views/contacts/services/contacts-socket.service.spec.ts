import { TestBed, inject } from '@angular/core/testing';

import { ContactsSocketService } from './contacts-socket.service';

describe('ContactsSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsSocketService]
    });
  });

  it('should be created', inject([ContactsSocketService], (service: ContactsSocketService) => {
    expect(service).toBeTruthy();
  }));
});
