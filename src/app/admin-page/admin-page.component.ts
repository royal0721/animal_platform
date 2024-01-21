import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { WebsocketRealtimeService } from '../service/websocket-realtime.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { InformSheetService } from '../service/inform-sheet.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  standalone: true,
})
export class AdminPageComponent implements OnInit {
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
    console.log(this.username);
    console.log(this.role);

    this.informSheetService
      .getInform()
      .pipe(takeUntil(this.destroy$))
      .subscribe((informs: any[]) => {
        this.Loading = false;
        this.informs = informs;
        console.log(this.informs);
        this.formatted_inform = this.create_json(this.informs);
        console.log(this.formatted_inform);
      });
  }
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  create_json(inform) {
    //{data:[{c: '', region:['','',''],number:['','','']}]}
    const grouped = this.groupBy(inform, (inform) => inform.address);
    const keys = Array.from(grouped.keys());

    for (var i = 0; i < keys.length; i++) {
      const cities = grouped.get(keys[i]);
      const region = this.groupBy(cities, (cities) => cities.address2);
      const count = Array.from(region.keys());
      let counts = [];
      for (var j = 0; j < count.length; j++) {
        counts.push({
          code: j,
          id: count[j],
          informs: region.get(count[j]),
          count: region.get(count[j]).length,
        });
      }
      console.log(count);
      this.inform_list.push({
        code: i,
        area: keys[i],
        region: count,
        counts: counts,
        details: region,
      });
    }
    console.log(keys);
    console.log(grouped);
    return this.inform_list;
  }

  get_details(id) {
    var list = id.split(',');
    console.log(id);
    console.log(this.formatted_inform[list[0]].counts[list[1]].informs);
    this.area_inform = this.formatted_inform[list[0]].counts[list[1]].informs;
    this.top = this.area_inform[0].id;
    console.log(this.top);
    this.getDetails = true;
  }

  goAdminHome() {
    this.getDetails = false;
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

  goCheckMember(): void {
    this.router.navigate(['/check_member']);
    //篩選角色
  }
}
