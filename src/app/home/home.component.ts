import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: String[]=[];
  constructor(protected router: Router,private tokenStorage: TokenStorageService) { 
  }

  ngOnInit(): void {
    console.log(this.tokenStorage.getUser());
    if(this.tokenStorage.getUser()==null){
      this.router.navigate(['/']);
    }
  }

}
