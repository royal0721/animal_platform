import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CheckMemberComponent } from './check-member/check-member.component';
const routes: Routes = [
  {path:'', component:LoginComponent, pathMatch: "full"},
  {path:'home', component:HomeComponent, pathMatch: "full"}, // <-- 設定LoginComponent的path
  {path:'register', component:RegisterComponent, pathMatch:"full"},
  {path:'admin_page', component:AdminPageComponent, pathMatch:"full"},
  {path:'check_member', component:CheckMemberComponent, pathMatch:"full"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
