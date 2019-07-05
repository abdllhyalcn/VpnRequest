import { TestBed } from '@angular/core/testing';

import { VpngroupService } from './vpngroup.service';

describe('VpngroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VpngroupService = TestBed.get(VpngroupService);
    expect(service).toBeTruthy();
  });
});
