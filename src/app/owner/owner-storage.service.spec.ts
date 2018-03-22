import { TestBed, inject } from '@angular/core/testing';

import { OwnerStorageService } from './owner-storage.service';

describe('OwnerStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnerStorageService]
    });
  });

  it('should be created', inject([OwnerStorageService], (service: OwnerStorageService) => {
    expect(service).toBeTruthy();
  }));
});
