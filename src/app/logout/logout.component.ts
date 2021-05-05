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
  
  username: String[]=[];
  role: String;

  constructor(protected router: Router,private authService: AuthService,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    var nameNrole = this.tokenStorage.getUser().username;
    var nameNroleList = nameNrole.split(",");


    this.username = nameNroleList[0];
      if(nameNroleList[1]==0){
        this.role = "一般通報者";
      }else{
        this.role = "動保相關團體";
      }
    console.log(this.username);
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
