import { Component } from '@angular/core';
import { WebsocketRealtimeService } from '../../service/websocket-realtime.service';
@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css'],
  standalone: true,
})
export class RealtimeComponent {
  messages: any;
  constructor(private WebSocketService: WebsocketRealtimeService) {}

  ngOnInit(): void {}

  public showMessage(message: any) {
    this.messages = message;
    console.log('realtime', this.messages);
  }
}
