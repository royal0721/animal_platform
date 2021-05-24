import { TestBed } from '@angular/core/testing';

import { WebsocketRealtimeService } from './websocket-realtime.service';

describe('WebsocketRealtimeService', () => {
  let service: WebsocketRealtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketRealtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
