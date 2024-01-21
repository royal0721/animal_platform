import { Component } from '@angular/core';
import { TokenStorageService } from '../../service/token-storage.service';
import { WebsocketRealtimeService } from '../../service/websocket-realtime.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  standalone: true,
})
export class LogoutComponent {
  username: String[] = [];
  role: String;
  show = false;

  constructor(
    protected router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private WebsocketService: WebsocketRealtimeService,
  ) {}

  ngOnInit(): void {
    var nameNrole = this.tokenStorage.getUser().username;
    var nameNroleList = nameNrole.split(',');

    this.username = nameNroleList[0];
    if (nameNroleList[1] == 1 || nameNroleList[1] == 3) {
      this.role = '一般通報者';
    } else {
      this.role = '動保相關團體';
      this.show = true;
    }
    console.log(this.username);
    console.log(this.role);
  }

  logout() {
    alert('您即將登出');
    this.WebsocketService.disconnect();
    this.tokenStorage.signOut();
    this.reloadPage();
  }

  reloadPage(): void {
    this.router.navigate(['/']);
    //篩選角色
  }

  toAdminPage(): void {
    this.router.navigate(['/admin_page']);
    //篩選角色
  }
}
