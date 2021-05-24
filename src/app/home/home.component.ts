import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { WebsocketRealtimeService } from '../websocket-realtime.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: String[]=[];
  constructor(protected router: Router,private tokenStorage: TokenStorageService,private WebSocketService: WebsocketRealtimeService ) { 
  }

  ngOnInit(): void {
    console.log(this.tokenStorage.getUser());
    if(this.tokenStorage.getUser()==null){
      this.router.navigate(['/']);
    }else{
      this.WebSocketService.connect();
    }
  }

}
