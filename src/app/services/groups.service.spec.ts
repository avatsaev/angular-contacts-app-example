import { TestBed, inject } from '@angular/core/testing';

import { GroupsService } from './groups.service';
import {HttpClientModule} from '@angular/common/http';

describe('GroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupsService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([GroupsService], (service: GroupsService) => {
    expect(service).toBeTruthy();
  }));
});
