import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { 
    console.log(this.tokenStorage.getUser());
  }

  ngOnInit(): void {
  }

}
