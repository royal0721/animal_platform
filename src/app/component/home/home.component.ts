import { Component } from '@angular/core';
import { TokenStorageService } from '../../service/token-storage.service';
import { WebsocketRealtimeService } from '../../service/websocket-realtime.service';
import { Router } from '@angular/router';
import { InformSheetComponent } from '../inform-sheet/inform-sheet.component';
import { MapSheetComponent } from '../map-sheet/map-sheet.component';
import { LogoutComponent } from '../logout/logout.component';
import { RealtimeComponent } from '../realtime/realtime.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    InformSheetComponent,
    MapSheetComponent,
    LogoutComponent,
    RealtimeComponent,
  ],
})
export class HomeComponent {
  user: String[] = [];
  constructor(
    protected router: Router,
    private tokenStorage: TokenStorageService,
    private WebSocketService: WebsocketRealtimeService,
  ) {}

  ngOnInit(): void {
    console.log(this.tokenStorage.getUser());
    if (this.tokenStorage.getUser() == null) {
      this.router.navigate(['/']);
    } else {
      this.WebSocketService.connect();
    }
  }
}
