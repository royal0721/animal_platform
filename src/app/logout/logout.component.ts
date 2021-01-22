import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  firstName: String[]=[];
  lastName: String[]=[];
  role: String;

  constructor(protected router: Router,private authService: AuthService,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.firstName = this.tokenStorage.getUser().firstName;
    this.lastName = this.tokenStorage.getUser().lastName;
      if(this.tokenStorage.getUser().role==1){
        this.role = "一般通報者";
      }else{
        this.role = "動保相關團體";
      }
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.role);

  }

  logout() {
    alert("您即將登出")
    this.tokenStorage.signOut();
    this.reloadPage();
  }
  
  reloadPage(): void {
    this.router.navigate(['/']);
    //篩選角色
  }

}
