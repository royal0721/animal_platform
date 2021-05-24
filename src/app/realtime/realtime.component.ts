import { Component, OnInit } from '@angular/core';
import {WebsocketRealtimeService} from '../websocket-realtime.service';
@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {

  messages:any;
  constructor(private WebSocketService:WebsocketRealtimeService) { }

  ngOnInit(): void {

  }

  public showMessage(message:any){
    this.messages=message;
    console.log("realtime",this.messages);
  }

}
