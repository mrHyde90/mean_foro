import { TestBed, inject } from '@angular/core/testing';

import { PostStorageService } from './post-storage.service';

describe('PostStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostStorageService]
    });
  });

  it('should be created', inject([PostStorageService], (service: PostStorageService) => {
    expect(service).toBeTruthy();
  }));
});
