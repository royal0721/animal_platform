import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { WebsocketRealtimeService } from '../service/websocket-realtime.service';
import { Router } from '@angular/router';
import { InformSheetService } from '../service/inform-sheet.service';
import { Subject } from 'rxjs';
import { TokenStorageService } from '../service/token-storage.service';
@Component({
  selector: 'app-check-member',
  templateUrl: './check-member.component.html',
  styleUrls: ['./check-member.component.css'],
  standalone: true,
})
export class CheckMemberComponent implements OnInit {
  username: String[] = [];
  role: String;
  informs: any[] = [];
  inform_list: any[] = [];
  formatted_inform: any[] = [];
  area_inform: any[] = [];
  Loading = false;
  getDetails = false;
  top = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected router: Router,
    private informSheetService: InformSheetService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private WebsocketService: WebsocketRealtimeService,
  ) {}

  ngOnInit(): void {
    this.Loading = true;
    var nameNrole = this.tokenStorage.getUser().username;
    var nameNroleList = nameNrole.split(',');

    if (this.tokenStorage.getUser() == null) {
      this.router.navigate(['/']);
    } else {
      this.username = nameNroleList[0];
      if (nameNroleList[1] == 1 || nameNroleList[1] == 3) {
        this.role = '一般通報者';
      } else if (nameNroleList[1] == 2) {
        this.role = '動保團體管理員';
      }
    }
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

  goHome(): void {
    this.router.navigate(['/home']);
    //篩選角色
  }

  goAdmin(): void {
    this.router.navigate(['/admin_page']);
    //篩選角色
  }
  goBack() {
    window.history.back();
    console.log('goBack()...');
  }
}
