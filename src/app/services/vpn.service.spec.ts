import { TestBed } from '@angular/core/testing';

import { VpnService } from './vpn.service';

describe('VpnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VpnService = TestBed.get(VpnService);
    expect(service).toBeTruthy();
  });
});
